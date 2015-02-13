$(function (){
  // filter out change logs
  var headers = $('.header').filter(function(index) {
    return isNaN(parseInt(this.innerHTML.substring(0, 1)));
  });
  // handles mouse-enter event
  var displayButton = function() {
    // position in which we append the button
    var appendPosition;
    // if alias exists, use that as appending position
    if ($(this).children('.alias')[0]) {
      appendPosition = $(this).children('.alias');
    // else use code as appending position
    } else {
      appendPosition = $(this).children('code');
    }
    // if either one of alias or code exist, append the button
    if (appendPosition) {
      // create button and add class & onclick event
      var $button = $('<button/>');
      $button.addClass('crowd-docs-button');
      $button.click(displayIframe.bind(null, $(this)));
      appendPosition.after($button);
    }
  };
  // handles mouse-leave event
  var removeButton = function() {
    // select existing button in the DOM and remove it
    var existingButton = $(this).children('.crowd-docs-button')[0];
    if (existingButton) {
      existingButton.remove();
    }
  };

  // for parent of the header element, add mouse-enter and mouse-leave event
  headers.each(function() {
    $(this).parent().hover(displayButton, removeButton);
  });

  var displayIframe = function(headerParent) {
    // method and library title that we are using to search in stackoverflow API / comments
    var method = headerParent[0].id;
    var title = $('title')[0].innerHTML;
    // select existing iframe
    var $existingIframe = $('iframe')[0];
    // spam check
    if (!$('.crowd-docs-' + method)[0]) {
      // if there is an existing iframe, remove it
      if ($existingIframe) {
        $existingIframe.remove();
      }
      // position of iframe to be inserted
      var offsetTop = headerParent[0].offsetTop;
      var offsetWidth = headerParent[0].offsetWidth;

      // create iframe element
      var $iframe = $('<iframe/>');
      // set iframe src
      $iframe.attr('src', 'http://shinuesugi.web.fc2.com');
      // define and set iframe's styles
      var styles = {
        position: 'absolute',
        'float': 'right',
        width: 400,
        height: 600,
        top: offsetTop,
        left: offsetWidth + 100
      };
      $iframe.css(styles);
      $iframe.addClass('crowd-docs-' + method);
      headerParent.after($iframe);
    }
  };

});
