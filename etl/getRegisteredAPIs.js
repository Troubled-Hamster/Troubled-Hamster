var jsdom = require('jsdom');
var fs = require('fs');

var libraryURLs = ['http://backbonejs.org/', 'http://underscorejs.org/'];
var jQueryCDNURL = 'http://code.jquery.com/jquery-1.11.2.min.js';

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
      libraryCollection.name = window.$('title').text();

      // API methods contained in the header class
      // Filter out non-API methods that are also contained in the header class
      var headers = window.$('.header').filter(function(){
        return isNaN(parseInt(this.innerHTML.substr(0,1)));
      });

      // Fill the methods object with the method names
      headers.each(function(index){
        libraryCollection.methods.push(window.$(this).parent().attr('id'));
      });

      // Write the library collection to a file
      var fileName = '../server/libraries/supportedlibraries/' + libraryCollection.name + '.json';
      fs.writeFile(fileName, JSON.stringify(libraryCollection), function(err){
        if (err) throw err;
        console.log('Library information saved!')
      })
    });
};

// Create files for each library
for(var i = 0; i < libraryURLs.length; i++){
  getLibraryMethods(libraryURLs[i]);
}