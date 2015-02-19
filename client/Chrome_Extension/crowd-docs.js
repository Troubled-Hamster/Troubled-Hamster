$(function (){
  // filter out change logs
  var headers = $('.header').filter(function(index) {
    return isNaN(parseInt(this.innerHTML.substring(0, 1)));
  });

  // add position:relative css property to the container
  if ($('.container').css('position') !== 'relative') {
    $('.container').css('position', 'relative');
  }

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
      var image = chrome.extension.getURL('assets/hamster-transparent.png');
      var $img = $('<img/>');
      $img.addClass('crowd-docs-button').attr('src', image);
      $img.css({
        'margin-left': 20
      });
      $img.click(displayIframe.bind(null, $(this)));
      appendPosition.after($img);
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
    var title = $('title')[0].innerHTML;
    var method = headerParent[0].id;
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
      // $iframe.attr('src', 'http://shinuesugi.web.fc2.com');
      $iframe.attr('src', 'http://flockdocs-dev.elasticbeanstalk.com/api/methods/' + title + '/' + method);
      // define and set iframe's styles
      var windowWidth = $(window).width();
      var windowHeight = $(window).height();
      var containerWidth = $('.container').width();
      var sidebarWidth = $('#sidebar').width();
      var containerMarginLeft = parseInt($('.container').css('marginLeft'));
      var sidebarPaddingLeft = parseInt($('#sidebar').css('paddingLeft'));
      var offset = 100;
      var iFramePadding = 5;
      var minimumWidth = 320;
      var iFrameWidth = Math.max((windowWidth - containerWidth - (containerMarginLeft - sidebarWidth) - sidebarWidth - sidebarPaddingLeft - offset), minimumWidth);

      var styles = {
        position: 'absolute',
        width: iFrameWidth,
        height: windowHeight - offset,
        top: offsetTop,
        left: offsetWidth + offset,
        padding: iFramePadding
      };

      $iframe.css(styles);
      $iframe.addClass('crowd-docs-' + method);
      headerParent.after($iframe);
    }
  };

});
