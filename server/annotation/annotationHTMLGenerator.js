// generate headers of html file for flockdocs comments section
// loads bootstrap css, crowd-docs css, jquery, prettify, codeformatter.js, and stackauthentication.js
var generateHeader = function(req) {
  var host = req.headers.host;
  return '<!DOCTYPE html><html><head><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css"><link rel="stylesheet" href="http://' + host + '/crowd-docs.css"><script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js"></script><script src="http://assets.annotateit.org/annotator/v1.2.5/annotator-full.min.js"></script><link rel="stylesheet" href="http://assets.annotateit.org/annotator/v1.2.5/annotator.min.css"><script type="text/javascript" src="http://' + host + '/annotate.js"></script></head>';
};

// generate navbar of html file
var generateNavbar = function(req, html) {
  var host = req.headers.host;
  var lib = req.params.library;
  var method = req.params.method;
  return html + '<body><ul class="nav nav-tabs navbar-fixed-top"><img class="navbar-brand" src="http://' + host + '/colorcrowd.png"><li role="presentation"><a href="http://' + host + '/api/methods/' + lib + '/' + method + '">Stack Overflow</a></li><li role="presentation"><a href="http://' + host + '/flockdocs/' + lib + '/' + method + '">Q&A</a></li><li role="presentation" class="active"><a href="#">Examples</a></li></ul>';
};

// generate contents of html file
var generateContents = function(req, html, data) {
  var host = req.headers.host;
  var lib = req.params.library;
  var method = req.params.method;
  // wrap html in fluid container (bootstrap)
  html += '<div class="container-fluid">';

  html += '<div id="content">';

  html += data;

  // end content id div
  html += '</div>';
  // end fluid container div
  html += '</div>';

  return html;
};

// end the HTML with appropriate closing tags
var endHTML = function(html) {
  return html + '</body></html>';
}

module.exports = {
  generateHTML: function(req, res, data) {
    var host = req.headers.host;
    // response is in the form of html
    res.writeHead(200, {
      'Content-Type': 'text/html'
    });

    var html = generateHeader(req);
    html = generateNavbar(req, html);
    html = generateContents(req, html, data);
    html = endHTML(html);

    res.write(html);
  }
}
