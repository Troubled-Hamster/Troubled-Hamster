$(function (){
  var title =  window.location.host.split('.')[0];
  if (title === 'nodejs') {
    // select headers
    var headers = $('h2, h3');

    // handles mouse-enter event
    var displayButton = function() {
      var image = chrome.extension.getURL('assets/hamster-transparent.png');
      var $img = $('<img/>');
      $img.addClass('crowd-docs-button').attr('src', image);
      $img.css({
        'margin-left': 20
      });
      $img.click(displayIframe.bind(null, $(this)));
      $(this).append($img);
    };
    // handles mouse-leave event
    var removeButton = function() {
      // select existing button in the DOM and remove it
      var existingButton = $('.crowd-docs-button');
      if (existingButton) {
        existingButton.remove();
      }
    };

    // for parent of the header element, add mouse-enter and mouse-leave event
    headers.each(function() {
      $(this).hover(displayButton, removeButton);
    });

    var displayIframe = function(headerParent) {
      // get method name
      var method = headerParent.find('a')[0].id;
      console.log('title: ', title, ' method: ', method);
      var $existingIframe = $('iframe')[0];
      if (!$('.crowd-docs-' + method)[0]) {
        if ($existingIframe) {
          $existingIframe.remove();
          $('.remove').remove();
        }
        // position of iframe to be inserted
        var offsetTop = headerParent[0].offsetTop;
        var $dragDiv = $('<div/>');
        $dragDiv.addClass('drag');
        $dragDiv.draggable();

        // create iframe element
        var $iframe = $('<iframe/>');
        var iFrameWidth = 400;
        // $iframe.attr('src', 'http://flockdocs-dev.elasticbeanstalk.com/api/methods/' + title + '/' + method);
        $iframe.attr('src', 'http://flockdocs-dev.elasticbeanstalk.com/api/methods/Backbone.js/Model-extend');
        var offset = 100;
        var styles = {
          position: 'absolute',
          width: iFrameWidth,
          height: $(window).height(),
          padding: 5
        };
        $iframe.css(styles);
        $iframe.css('background-color', '#999999');

        // add a button next to the iframe to remove it
        var $button = $('<button/>');
        $button.addClass('remove');
        var buttonOffset = 20;
        var buttonStyles = {
          position: 'absolute',
          left: iFrameWidth
        };
        $button.css(buttonStyles);
        $button.text('x');
        $button.click(function() {
          $('.remove').remove();
          $('iframe').remove();
        });
        $dragDiv.append($button);

        var dragStyles = {
          position: 'absolute',
          top: offsetTop,
          left: 0,
        };
        $dragDiv.css(dragStyles);
        $dragDiv.css('z-index', '10000');
        $dragDiv.append($iframe);
        $('body').prepend($dragDiv);
      }
    };
  }
});
