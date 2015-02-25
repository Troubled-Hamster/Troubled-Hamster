// method that wraps all headers with flockdocs div
var flockWrap = function(doc) {
  var docElements = doc.children();
  var startIndex = undefined;
  var endIndex;
  var wrapWithFlockdocs = function() {
    docElements.slice(startIndex,endIndex).wrapAll( "<div class='flockdocs' />");
  };
  docElements.each(function(index, element) {
    var tag = element.nodeName;
    var id = element.getAttribute('id');
    if(startIndex === undefined) {
      if(id && (tag === 'PRE' || tag === 'P')) {
         startIndex = index;
      }
    } else if (id && (tag === 'PRE' || tag === 'P')) {
        endIndex = index;
        wrapWithFlockdocs();
        startIndex = index;
    } else if (tag !== 'PRE' && tag !== 'P') {
        endIndex = index;
        wrapWithFlockdocs();
        startIndex = undefined;
    }

    if (id === 'faq' || id === 'links') {
      return false; // breaks from the each loop
    }
  });
  return doc;
};

module.exports = {
  flockWrap: flockWrap
};
