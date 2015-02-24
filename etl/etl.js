var mongoose = require('mongoose');
var http = require('http');
var Library = require('../server/libraries/libraryModel.js');
var zlib = require('zlib');
var Method = require('../server/methods/methodModel.js');
var bing = require('node-bing-api')({accKey: process.env.BING_ACCOUNT_KEY});
var _ = require('underscore');
var path = require('path');
// var async = require('async');
var jsdom = require('jsdom');
var fs = require('fs');
var async = require('async');

var libraryURLs = ['http://backbonejs.org/', 'http://underscorejs.org/', 'http://nodejs.org/api/all.html'];
var jQueryCDNURL = 'http://code.jquery.com/jquery-1.11.2.min.js';

var QUESTIONS_PER_METHOD = 10;
var QUESTION_ID_REGEX = /stackoverflow.com\/questions\/(\d+)\//;

var user = process.env.mongo_lab_user;
var password = process.env.mongo_lab_password;

if(user) { //assume prod if mongo_lab_user is set
  mongoose.connect('mongodb://'+user+':'+password+'@ds045531.mongolab.com:45531/flockdocs'); // connect to mongo database named flockdocs
} else {
  mongoose.connect('mongodb://localhost/flockdocs');
}

var getStackOverflowData = function(libraryName, method) {  
  bing.search('site:stackoverflow.com ' + libraryName + ' ' + method, function(error, res, body){
   
    if (error) {
      if(error.code === 'ETIMEDOUT') {
        console.log("TIMED OUT, TRYING AGAIN: " + libraryName + '|' + method);
        getStackOverflowData(libraryName, method);
      } else {
        console.error(error);
      }
      return;
    }

    var results = body.d.results;
    if(results.length > 0) {
      var questionIDs = [];
      for (var i = 0; i < results.length; i++) {
        var urlMatch = results[i].Url.match(QUESTION_ID_REGEX);
        if(urlMatch && urlMatch[1]) { //if we have a question ID
          questionIDs.push(parseInt(urlMatch[1]));
        }
      }

      var options = {
        host:'api.stackexchange.com',
        path:'/2.2/questions/' + questionIDs.join(';') + '?pagesize=' + QUESTIONS_PER_METHOD + '&site=stackoverflow&key=ssNWU)nQZdqCIR3kXFf0IA((&filter=!-*f(6rkuau1P',
        headers: {
          'Accept-Encoding': 'gzip'
        }
      };

      http.request(options,function(res) {
        var gzstream = zlib.createGunzip();
        res.pipe(gzstream);

        var json = '';
        gzstream.on('data',function(chunk) {
          json+= chunk;
        });

        gzstream.on('end', function() {

          var data = JSON.parse(json);

          var sortedQuestions = [];
          for(var i=0; i<questionIDs.length;i++) {
           var dataItem = _.find(data.items,function(item) {
              return item.question_id === questionIDs[i];
            });
            if(dataItem) {
              sortedQuestions.push(dataItem);
            }
          }

          data.items = sortedQuestions;

          //order the answer arrays by score, and restrict them to the top 3 non-negative-scored answers
          data.items.forEach(function(item) {
            if(item && item.answers) {
              item.answers.sort(function(a,b) {
                if(a.score > b.score) {
                  return -1;
                } else if (a.score < b.score) {
                  return 1;
                } else {
                  return 0;
                }
              });

              item.answers = item.answers.slice(0,3);
              for (var i = item.answers.length - 1; i >= 0; i--) {
                if(item.answers[i].score < 0) {
                  item.answers.pop();
                }
              }
            }
          });

          if(data.items.length) {
            Method.create({name: method, library: libraryName, topQuestions: data.items, documentationHTML: methodDocumentationHTML[libraryName + '|' + method]}).then(function(doc,err) {
              console.log("Successfully loaded: " + libraryName + '|' + method + '|' + data.quota_remaining);
              if(err){
                console.dir(err);
              }
            });
          }
        });
      }).end();
    }
  },
  {
    top: QUESTIONS_PER_METHOD // Number of results (max 50)
  });
};

//populate the methodDocumentationHTML hash
var getMethodDocumentationHTML = function (callback) {
  async.each(libraryURLs, function(url, cb) {
    jsdom.env(url, [jQueryCDNURL], function(errors, window){

      if(window.location.hostname === 'nodejs.org'){
        library = 'nodejs';
      } else {
        library = window.$('title').text();
      }

      if(library === 'nodejs') {
        var headers = window.$('h2, h3');

        headers.each(function(index){
          window.$(this).nextUntil('h2, h3').andSelf().wrapAll('<div class="flockdocs" />');
        });

        window.$('.flockdocs').each(function(index,element) {
          if(window.$(element).find('span')) {
            var methodDesc = window.$(element).html();
            var method = window.$(element).html().indexOf('(') > 0 ? methodDesc.split('(')[0] : methodDesc.split('<')[0];
            methodDocumentationHTML[library + '|' + method] = window.$(element).html();
          }
        });
      } else {

        //wrap sections in flockdocs divs
        var docElements;
        if (library === 'Underscore.js') {
          docElements = window.$('#documentation').children();
          var inAPIDocs = true;
        } else {
          docElements = window.$('.container').children();
          var inAPIDocs = false;
        }
        var startIndex = undefined;
        var endIndex;

        var wrapWithFlockdocs = function() {
          docElements.slice(startIndex,endIndex).wrapAll( "<div class='flockdocs' />");
        }

        docElements.each(function(index, element) {
          var tag = element.nodeName;
          var id = element.getAttribute('id');

          if(inAPIDocs) {
            if(startIndex === undefined) {
              if(id && (tag === 'PRE' || tag === 'P')) {
                 startIndex = index;      
              } 
            } else if (id && (tag === 'PRE' || tag === 'P')) {
                endIndex = index;
                wrapWithFlockdocs();
                startIndex = index;
            } else if (tag !== 'PRE' && tag !== 'P') {
                endIndex = index;
                wrapWithFlockdocs();
                startIndex = undefined;
            }

            if (id === 'faq' || id === 'links') {
              return false; // breaks from the each loop
            }
          } else {
            if(tag === 'H2' && id === 'Events') {
              inAPIDocs = true;
            }
          }
        });

        window.$('.flockdocs').each(function(index,element) {
          // console.log(window.$(element).html());
          var method = window.$(element).find('p').first().attr('id');
          methodDocumentationHTML[library + '|' + method] = window.$(element).html();
        });
      }

      cb();
    });
  }, callback);
};
  

var waitTime = 0;
//object for storing all the documentation HTML, for annotating
var methodDocumentationHTML = {};

getMethodDocumentationHTML(function() {
  console.log("HEEEEEEEERE");
   Method.remove({}).exec().then(function(numRemoved) {
    console.log('Methods collection cleared. ' + numRemoved + ' documents removed.');

    Library.find().exec().then(function(libs) {
      libs.forEach(function(lib) {
        lib.methods.forEach(function(method) {
          setTimeout(function() { getStackOverflowData(lib.name, method); }, waitTime);
          waitTime += 500;
          //TODO autogenerated question answers... - autogenerate questions?
        
          //followed by updating the data in the mongoDB..
        });
      });
    });
  });
});

