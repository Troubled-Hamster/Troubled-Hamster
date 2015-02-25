/* JS File that gets DevDocs' HTMLs for libraries that we support in
client/react/assets folder. type 'node devdocs/getDevDocs.js' in the terminal
to run the file.
*/

var jsdom = require('jsdom');

// helpers for each library
var underBoneHelper = require('./lib/underBoneHelper.js');
var nodeHelper = require('./lib/nodeHelper.js');

// utility helper functions
var helper = require('./helper.js');

// grab supported libraries
var libraries = ['underscore', 'backbone', 'node'];
var libraryURLs = [];
for (var i = 0; i < libraries.length; i++) {
  // maxcdn holds all the html files for devdocs.io
  var libraryURL = 'http://maxcdn-docs.devdocs.io/' + libraries[i] + '/index.html';
  libraryURLs.push(libraryURL);
}
var jQueryCDNURL = 'http://code.jquery.com/jquery-1.11.2.min.js';

var getDevDocsHTML = function(url, lib, crawl) {
  jsdom.env(
    url,
    [jQueryCDNURL],
    function(errors, window) {
      var $ = window.$;
      var content;
      if (lib === 'underscore' || lib === 'backbone') {
        // wrap the content with flockdocs div
        content = underBoneHelper.flockWrap($('body')).html();
        // write and save the html into the assets folder
        helper.saveHTML(content, lib);
      }
      if (lib === 'node' && !crawl) {
        // subURLs is an array containing all urls contained within index.html
        var subURLs = nodeHelper.getSubURLs($('body'), window);
        for (var i = 0; i < subURLs.length; i++) {
          // crawl into the suburl with recursive call
          getDevDocsHTML(subURLs[i], 'node', true);
        }
      }
      if (lib === 'node' && crawl) {
        // wrap the content with flockdocs div
        var header = url.split('node/')[1].split('.')[0];
        content = nodeHelper.flockWrap($('body'), window).html();
        // write and save the html into the assets folder
        helper.saveHTML(content, 'node/' + header);
      }

    });
};

// get devdocs HTML for libraries we support
for (var i = 0; i < libraryURLs.length; i++) {
  getDevDocsHTML(libraryURLs[i], libraries[i], false);
}
