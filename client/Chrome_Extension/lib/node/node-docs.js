$(function (){
  var title =  window.location.host.split('.')[0];
  // only run this when we're on nodejs.org
  if (title === 'nodejs') {
    // select for headers
    // in node, they are h2 and h3 elements
    var headers = $('h2, h3');

    headers.each(function() {
      $(this).nextUntil('h2, h3').andSelf().wrapAll('<div class="flockdocs" />');
    });

    // function that handles mouse-enter event
    var displayButton = function() {
      // get hamster's image and create img element
      var image = chrome.extension.getURL('assets/hamster-transparent.png');
      var $img = $('<img/>');
      $img.addClass('crowd-docs-button').attr('src', image);
      $img.css({
        'margin-left': 50,
        display: 'none'
      });
      // display iframe when clicking this image
      $img.click(displayIframe.bind(null, $(this)));
      $(this).find('.mark').after($img);
      $img.fadeIn(500);
    };

    // function that handles mouse-leave event
    var removeButton = function() {
      // select existing button in the DOM and remove it
      var existingButton = $('.crowd-docs-button');
      if (existingButton) {
        existingButton.remove();
      }
    };

    // for parent of the header element, add mouse-enter and mouse-leave event
    $('.flockdocs').each(function() {
      // filter out elements that doesn't have a span element (e.g. Table of Contents)
      if($(this).find('span')[0]) {
        // display button on mouse-enter and remove button on mouse-leave
        $(this).hover(displayButton, removeButton);
      }
    });

    // function that creates an draggable iframe and appends it to the DOM
    var displayIframe = function(headerParent) {
      // get method name
      var method;
      // if method has open paren, splitting with open paren is same as original innerHTML
      var methodHeader = headerParent.find('h2, h3')[0].innerHTML;
      if (methodHeader === methodHeader.split('(')[0]) {
        // because we don't have open paren, split with open carrot (start of span tag)
        method = methodHeader.split('<')[0];
      } else {
        // we have open paren, so split with it
        method = methodHeader.split('(')[0];
      }
      // scrape off the white space to attach it to iframe as a class
      var methodClassName = method.replace(/ |'/g, '');
      console.log('title: ', title, ' method: ', method);
      // if this iframe doesn't exist, do the following
      if (!$('.crowd-docs-' + methodClassName)[0]) {
        // get existing iframe and remove it from the DOM
        var $existingIframe = $('iframe')[0];
        if ($existingIframe) {
          $existingIframe.remove();
          $('.remove').remove();
        }

        // create draggable div with these components
        var $dragDiv = createDraggable({
          offsetTop: headerParent[0].offsetTop,
          offsetWidth: 0
        });

        // create iframe with following components and add it to draggable div
        var iframeWidth = 400;
        var $iframe = createIframe({
          src: 'http://flockdocs-dev.elasticbeanstalk.com/api/methods/' + title + '/' + method,
          class: methodClassName,
          width: iframeWidth,
          height: $(window).height(),
          padding: 7
        });
        $dragDiv.append($iframe);

        // create close button and add it to draggable div
        var $button = createRemoveButton(iframeWidth);
        $dragDiv.append($button);

        // add draggable div to the body with animation
        $('body').prepend($dragDiv);
        $dragDiv.fadeIn(250);
      }
    };
  }
});
