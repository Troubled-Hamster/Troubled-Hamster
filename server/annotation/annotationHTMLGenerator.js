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
  return html + '<body><ul class="nav nav-tabs navbar-fixed-top"><img class="navbar-brand" src="http://' + host + '/hamster-transparent.png"><li role="presentation"><a href="http://' + host + '/api/methods/' + lib + '/' + method + '">Stack Overflow</a></li><li role="presentation"><a href="http://' + host + '/flockdocs/' + lib + '/' + method + '">Comments</a></li><li role="presentation" class="active"><a href="#">Annotation</a></li></ul>';
};

// generate contents of html file
var generateContents = function(req, html, data) {
  var host = req.headers.host;
  var lib = req.params.library;
  var method = req.params.method;
  // wrap html in fluid container (bootstrap)
  html += '<div class="container-fluid">';

  html += '<div id="content">';

  html += 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc congue diam ac eros suscipit facilisis. Praesent vestibulum congue pulvinar. Duis rutrum posuere dui ut venenatis. Curabitur magna elit, ornare quis feugiat vel, ornare sit amet nisi. Nam ut orci eu quam maximus condimentum sit amet vel nulla. Etiam imperdiet, augue nec posuere dictum, ligula nulla porttitor ante, a bibendum tellus libero eget arcu. Integer egestas ex ac scelerisque ullamcorper. Sed sed hendrerit lectus, et bibendum nisi. Nulla posuere leo nunc, a euismod mi tincidunt efficitur. Nunc facilisis, lacus at condimentum laoreet, lectus libero vestibulum felis, eget dictum erat tortor sed eros. In fringilla ultrices diam eu consequat. In tristique venenatis turpis at tincidunt. Morbi sagittis dui in finibus facilisis. Proin vitae ante et ante laoreet fermentum nec et arcu. Pellentesque at risus eu magna molestie egestas quis nec lorem. Suspendisse maximus dolor a justo dignissim, ac ultrices lorem luctus.Nulla condimentum placerat magna. Etiam nisl magna, efficitur sed cursus at, suscipit eget risus. Aliquam id lorem faucibus, venenatis est ac, imperdiet metus. Fusce lacinia condimentum felis vel gravida. Donec volutpat ipsum sagittis nunc mattis, id vehicula quam sagittis. Etiam vel sapien eget lectus facilisis facilisis eget condimentum mi. Vivamus urna est, cursus at nisl a, fermentum sollicitudin mauris. Suspendisse elit lorem, bibendum non tortor ut, viverra facilisis ex. Integer laoreet nunc ut diam aliquet congue. Etiam mattis aliquam dolor, sed porttitor purus viverra sed. Praesent volutpat volutpat purus, eu hendrerit sapien pharetra lobortis. Aliquam sed iaculis purus. Vestibulum suscipit felis nec enim vehicula, non volutpat mauris pellentesque. Morbi ullamcorper purus sit amet arcu luctus, nec ullamcorper massa aliquam. Sed eu quam neque. Etiam dignissim arcu blandit venenatis mollis.Etiam aliquet scelerisque velit, ac dapibus tellus maximus ac. Fusce eu elit varius, euismod enim quis, fringilla tortor. Sed gravida interdum nibh, nec semper lorem consectetur et. Nulla pharetra leo eget dolor elementum hendrerit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin at urna ac sapien ultrices aliquet. Aliquam eget eros lobortis eros porta sollicitudin ut et ante. Fusce tempus id mauris non venenatis. Maecenas eget ligula vitae elit elementum malesuada sed eget tortor. Sed vestibulum mollis nunc, vitae sodales dolor imperdiet et.';

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
