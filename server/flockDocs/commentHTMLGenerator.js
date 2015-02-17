// generate headers of html file for flockdocs comments section
// loads bootstrap css, crowd-docs css, jquery, prettify, codeformatter.js, and stackauthentication.js
var generateHeader = function(req) {
  var host = req.headers.host;
  return '<!DOCTYPE html><html><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css"><link rel="stylesheet" href="http://' + host + '/crowd-docs.css"><script src="http://code.jquery.com/jquery-1.11.2.min.js"></script><script src="https://google-code-prettify.googlecode.com/svn/loader/run_prettify.js"></script><script type="text/javascript" src="http://' + host + '/codeFormatter.js"></script><script type="text/javascript" src="http://' + host + '/stackAuthentication.js"></script>';
};

// generate navbar of html file
var generateNavbar = function(req, html) {
  var host = req.headers.host;
  var lib = req.params.library;
  var method = req.params.method;
  return html + '<body><ul class="nav nav-tabs navbar-fixed-top"><a class="navbar-brand" href="#"><img src="http://' + host + '/hamster-transparent.png"></a><li role="presentation"><a href="http://' + host + '/api/methods/' + lib + '/' + method + '">Stack Overflow</a></li><li role="presentation" class="active"><a href="#">FlockDocs</a></li></ul>';
};

// generate contents of html file
var generateContents = function(req, html, data) {
  var host = req.headers.host;
  var lib = req.params.library;
  var method = req.params.method;
  // wrap html in fluid container (bootstrap)
  html += '<div class="container-fluid">';

  html += '<div class="question"><h4>Question: Can you explain ' + lib + ' ' + method + ' method?</h4><div class="addAnswer"><hr><h4>Add an Answer</h4><textarea class="userAnswer"></textarea><div><button type="button" class="btn btn-success">Success</button></div></div></div>';

  // create answers class and populate with each answer in the database
  html += '<div class="answers">';
  for (var i = data.length - 1; i >= 0; i--) {
   html += '<hr><div class="answer"><h4>Answer</h4><p>' + data[i] + '</p></div>';
  }
  html += '</div>';

  // end fluid container div
  html += '</div>';

  return html;
};

// end the HTML with appropriate closing tags
var endHTML = function(html) {
  return html + '</body></head></html>';
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
