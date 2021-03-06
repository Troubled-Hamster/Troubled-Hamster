var mongoose = require('mongoose');
var http = require('http');
var zlib = require('zlib');
var Method = require('../server/methods/methodModel');
var bing = require('node-bing-api')({accKey: process.env.BING_ACCOUNT_KEY});
var _ = require('underscore');
var path = require('path');
// var async = require('async');
var jsdom = require('jsdom');
var fs = require('fs');
var async = require('async');

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

var getStackOverflowData = function(libraryName, method, scrollKey) {
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
            Method.create({name: method, library: libraryName, topQuestions: data.items, scrollKey: scrollKey}).then(function(doc,err) {
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


var waitTime = 0;

var resetMethodData = function() {
  Method.remove({}).exec().then(function(numRemoved) {

    var libraries = ['underscore', 'backbone', 'node'];

    libraries.forEach(function(libraryName){

      var url = 'http://localhost:3000/docs/' + libraryName + '/index.json';

      http.get(url,function(response) {

        var body = '';
        response.on('data', function(d) {
            body += d;
        });
        response.on('end', function() {
          var parsed = JSON.parse(body);
          parsed.entries.forEach(function(entry){
            if (entry.path.indexOf('#') >= 0) {
              var scrollKey = entry.path.split('#')[1];
            } else {
              var scrollKey = entry.path;
            }
            setTimeout(function() { 
              getStackOverflowData(libraryName, entry.name, scrollKey); 
            }, waitTime);
            waitTime += 500;
          });
        });
      });
    });
  });
}

resetMethodData();

