// generate headers of html file
// loads bootstrap css, crowd-docs css, jquery, prettify, and codeformatter.js
var generateHeader = function() {
  return '<!DOCTYPE html><html><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css"><link rel="stylesheet" href="http://localhost:3000/crowd-docs.css"><script src="http://code.jquery.com/jquery-1.11.2.min.js"></script><script src="https://google-code-prettify.googlecode.com/svn/loader/run_prettify.js"></script><script type="text/javascript" src="http://localhost:3000/codeFormatter.js"></script>';
};

// generate navbar of html file
var generateNavbar = function(html) {
  return html + '<body><ul class="nav nav-tabs navbar-fixed-top"><a class="navbar-brand" href="#"><img src="http://localhost:3000/hamster-transparent.png"></a><li role="presentation" class="active"><a href="#">Stack Overflow</a></li><li role="presentation"><a href="http://localhost:3000/FlockDocs.html">FlockDocs</a></li></ul>';
};

// generate contents of html file
var generateContents = function(html, data) {
  // wrap html in fluid container (bootstrap)
  html += '<div class="container-fluid">';

  // create question: title and contents
  html += '<div class="question"><h4>Library name is ' + data.library + '</h4><p>Question contents here</p></h4></div>';

  // create answer. <hr> inserts horizontal line
  html += '<div class="answer"><hr><h4>Answer</h4><p>Method name is ' + data.method + '</p></h4></div>';

  // end fluid container div
  html += '</div>';

  return html;
};

// end the HTML with appropriate closing tags
var endHTML = function(html) {
  return html + '</body></head></html>';
}

module.exports = {
  generateStackHTML: function(req, res, data) {
    // response is in the form of html
    res.writeHead(200, {
      'Content-Type': 'text/html'
    });

    var html = generateHeader();
    html = generateNavbar(html);
    html = generateContents(html, data);
    html = endHTML(html);

    res.write(html);
  }
}
