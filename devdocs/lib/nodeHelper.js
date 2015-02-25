// method that gets all sub urls in node's index.html
var getSubURLs = function(doc, window) {
  var $ = window.$;
  var subURLs = [];
  // get all the headers of subURLs
  var subURLsHeaders = $('li').slice(2);
  subURLsHeaders.each(function() {
    subURLs.push($(this).find('a')[0].href + '.html');
  });
  return subURLs;
}

// method that wraps all headers with flockdocs div
var flockWrap = function(doc, window) {
  var $ = window.$;
  var headers = doc.find('h2, h3');
  // for each headers, wrap
  headers.each(function(){
    $(this).nextUntil('h2, h3').andSelf().wrapAll('<div class="flockdocs" />');
  });
  return doc;
}

module.exports = {
  getSubURLs: getSubURLs,
  flockWrap: flockWrap
}
