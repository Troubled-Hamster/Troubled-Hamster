var mongoose = require('mongoose');
var http = require('http');
var Library = require('../server/libraries/libraryModel.js');
var zlib = require('zlib');
var Method = require('../server/methods/methodModel.js');
var bing = require('node-bing-api')({accKey: process.env.BING_ACCOUNT_KEY});
var _ = require('underscore');

var QUESTIONS_PER_METHOD = 3;
var QUESTION_ID_REGEX = /stackoverflow.com\/questions\/(\d+)\//;

mongoose.connect('mongodb://localhost/flockdocs'); // connect to mongo database named flockdocs

var waitTime = 0;

Method.remove({}).exec().then(function(numRemoved) {
  console.log('Methods collection cleared. ' + numRemoved + ' documents removed.');

  Library.find().exec().then(function(libs) {
    // console.dir(libs);
    libs.forEach(function(lib) {
      //TODO scrape official library documentation URL for fresh methods??
      // console.dir(lib);
      lib.methods.forEach(function(method) {
        setTimeout(function() { getStackOverflowData(lib.name, method); }, waitTime);
        waitTime += 500;
        //TODO autogenerated question answers... - autogenerate questions?
      
        //followed by updating the data in the mongoDB..
      });
    });
  });
});

var getStackOverflowData = function(libraryName, method) {
  var options = {
    host:'api.stackexchange.com',
    path:'/2.2/search?page=1&pagesize=3&order=desc&sort=relevance&intitle=' +
     libraryName + '%20' + method + '&site=stackoverflow&key=ssNWU)nQZdqCIR3kXFf0IA((&filter=!-*f(6rkuau1P',
    headers: {
      'Accept-Encoding': 'gzip'
    }
  };

  http.request(options,function(res) {
    var gzstream = zlib.createGunzip();
    res.pipe(gzstream);

    var json = "";
    gzstream.on('data',function(chunk) {
      json+= chunk;
    });

    gzstream.on('end', function() {
      // console.log(json);
      var data = JSON.parse(json);
      console.log(libraryName + "::" + method);
      console.log("QUOTA REMAINING:" + data.quota_remaining);
      // console.dir(data.items[0]);

      //order the answer arrays by score, and restrict them to the top 3 non-negative-scored answers
      data.items.forEach(function(item) {
        if(item.answers) {
          item.answers.sort(function(a,b) {
            if(a.score > b.score) {
              return -1;
            } else if (b.score < a.score) {
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
        Method.create({name: method, library: libraryName, topQuestions: data.items}).then(function(doc,err) {
          if(err){
            console.dir(err);
          }
        });
      }
    });
  }).end();

};
