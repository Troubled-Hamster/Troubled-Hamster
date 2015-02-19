// generate headers of html file
// loads bootstrap css, crowd-docs css, jquery, prettify, and codeformatter.js
var generateHeader = function(req) {
  var host = req.headers.host;
  return '<!DOCTYPE html><html><head><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css"><link rel="stylesheet" href="http://' + host + '/crowd-docs.css"><script src="http://code.jquery.com/jquery-1.11.2.min.js"></script><script src="https://google-code-prettify.googlecode.com/svn/loader/run_prettify.js"></script><script type="text/javascript" src="http://' + host + '/codeFormatter.js"></script><script type="text/javascript" src="http://' + host + '/stackAuthentication.js"></script></head>';
};

// generate navbar of html file
var generateNavbar = function(req, html) {
  var host = req.headers.host;
  var lib = req.params.library;
  var method = req.params.method;
  return html + '<body><ul class="nav nav-tabs navbar-fixed-top"><a class="navbar-brand" href="#"><img src="http://' + host + '/hamster-transparent.png"></a><li role="presentation" class="active"><a href="#">Stack Overflow</a></li><li role="presentation"><a href="http://' + host + '/flockdocs/' + lib + '/' + method + '">Tips and Tricks</a></li></ul>';
};

// generate contents of html file
var generateContents = function(req, html, data) {
  var host = req.headers.host;
  // wrap html in fluid container (bootstrap)
  html += '<div class="container-fluid">';

  // contents: questions and answers
  for (var i = 0; i < data.length; i++) {
    html += '<div class="submission"><h4 class="question title">Question: ' + data[i].title + '</h4><div class="question hidden">' + data[i].body + '</div>';
    for (var j = 0; j < data[i].answers.length; j++) {
      if (data[i].answers[j].is_accepted) {
        html += '<div class="answer hidden"><hr><h4>Answer <img class="checkmark" src="http://' + host + '/checkmark.gif"><span class="votes">Votes: ' + data[i].answers[j].score + '</span></h4>' + data[i].answers[j].body + '</h4></div>';
      } else {
        html += '<div class="answer hidden"><hr><h4>Answer <span class="votes">Votes: ' + data[i].answers[j].score + '</span></h4>' + data[i].answers[j].body + '</h4></div>';

      }
    }
    html += '</div>';

    if (i + 1 < data.length) {
      html += '<hr>';
    }
  }

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
    if (data[0]) {
      html = generateContents(req, html, data);
    } else {
      html += '<div class="question"><h4>No questions found for ' + req.params.library + ' ' + req.params.method + '</h4></div>';
    }
    html = endHTML(html);

    res.write(html);
  }
}
