var http = require('http');
var zlib = require('zlib');
var Method = require('../server/methods/methodModel');
var bing = require('node-bing-api')({accKey: process.env.BING_ACCOUNT_KEY});
var _ = require('underscore');

var QUESTIONS_PER_METHOD = 10;
var QUESTION_ID_REGEX = /stackoverflow.com\/questions\/(\d+)\//;

module.exports.getStackOverflowData = function(libraryName, method, scrollKey, callback) {
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
            var stackQA = {name: method, library: libraryName, topQuestions: data.items, scrollKey: scrollKey};
            Method.create(stackQA).then(function(doc,err) {
              console.log("Successfully loaded: " + libraryName + '|' + method + '|' + data.quota_remaining);
              if(err){
                console.dir(err);
              }
            });
            callback(stackQA);
          } else {
            callback(null);
          }

        });
      }).end();
    }
  },
  {
    top: QUESTIONS_PER_METHOD // Number of results (max 50)
  });
};