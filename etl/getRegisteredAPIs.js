var jsdom = require('jsdom');
var fs = require('fs');
var mongoose = require('mongoose');
var Library = require('../server/libraries/libraryModel.js');


var libraryURLs = ['http://backbonejs.org/', 'http://underscorejs.org/', 'http://nodejs.org/api/all.html'];
var jQueryCDNURL = 'http://code.jquery.com/jquery-1.11.2.min.js';


var user = process.env.mongo_lab_user;
var password = process.env.mongo_lab_password;
if(user) { //assume prod if mongo_lab_user is set
  mongoose.connect('mongodb://'+user+':'+password+'@ds045531.mongolab.com:45531/flockdocs'); // connect to mongo database named flockdocs
  console.log('mongoose listening remotely');
} else {
  mongoose.connect('mongodb://localhost/flockdocs');
  console.log('mongoose listening locally');
}
// This function takes an URL and:
// 1. Retrieves the html document from the URL
// 2. Gets the library name (title of HTML page)
// 3. Gets the method names for the library
// 4. Writes the information as a JSON object to a flat file
var getLibraryMethods = function(url){
  jsdom.env(
    url, 
    [jQueryCDNURL],
    function(errors, window){
      var libraryCollection = {
        name: '',
        methods: []
      };

      // Get the title of the library
      if(window.location.hostname === 'nodejs.org'){
        libraryCollection.name = window.location.host.split('.')[0];
      } else {
        libraryCollection.name = window.$('title').text();
      }

      if(libraryCollection.name === 'nodejs') {
        var headers = window.$('h2, h3');

        headers.each(function(index){
          
          // Only save methods that have text
          if(window.$(this).find('span')){
            var methodDesc = window.$(this).html();
            var methodName = methodDesc.indexOf('(') > 0 ? methodDesc.split('(')[0] : methodDesc.split('<')[0];
            libraryCollection.methods.push(methodName);
          } else {
            // This is not a method
            console.log('Not a method: ', window.$(this).innerHTML);
          }
        });

      } else {
        // API methods contained in the header class
        // Filter out non-API methods that are also contained in the header class
        var headers = window.$('.header').filter(function(){
          return isNaN(parseInt(this.innerHTML.substr(0,1)));
        });

        // Fill the methods object with the method names
        headers.each(function(index){
          libraryCollection.methods.push(window.$(this).parent().attr('id'));
        });
      }

      Library.create(libraryCollection).then(function(lib, err){
        if (err) {
          console.log('error!');
        } else {
          console.log('Libraries saved!');
        }
      });
      // Write the library collection to a file
      // var fileName = './server/libraries/supportedlibraries/' + libraryCollection.name + '.json';
      // fs.writeFile(fileName, JSON.stringify(libraryCollection), function(err){
      //   if (err) throw err;
      //   console.log('Library information saved!')
      // })
    });
};

Library.remove({}).exec().then(function(numRemoved) {
  console.log('Libraries collection cleared. ' + numRemoved + ' documents removed.');
});

// Create files for each library
for(var i = 0; i < libraryURLs.length; i++){
  getLibraryMethods(libraryURLs[i]);
}