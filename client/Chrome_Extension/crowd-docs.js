$(function (){
  // filter out change logs
  var headers = $('.header').filter(function(index) {
    return isNaN(parseInt(this.innerHTML.substring(0, 1)));
  });

  var title = $('title')[0].innerHTML;

  //wrap sections in flockdocs divs
  var docElements;
  if (title === 'Underscore.js') {
    docElements = $('#documentation').children();
    var inAPIDocs = true;
  } else {
    docElements = $('.container').children();
    var inAPIDocs = false;
  }
  var startIndex = undefined;
  var endIndex;

  var wrapWithFlockdocs = function() {
    docElements.slice(startIndex,endIndex).wrapAll( "<div class='flockdocs'  style='display:table-row;'><div style='display:table-cell'></div></div>");
  }

  docElements.each(function(index, element) {
    var tag = element.nodeName;
    var id = element.getAttribute('id');

    if(inAPIDocs) {
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
    } else {
      if(tag === 'H2' && id === 'Events') {
        inAPIDocs = true;
      }
    }
  });

  // add position:relative css property to the container
  if ($('.container').css('position') !== 'relative') {
    $('.container').css('position', 'relative');
  }

  // handles mouse-enter event
  var displayButton = function() {
    // position in which we append the button
    var $appendPosition = $(this);

    var height = 0;
    $appendPosition.children().each(function(index, element) {
      height += $(element).height();
    });
    // console.log(height);
    // if alias exists, use that as appending position
    // if ($(this).children('.alias')[0]) {
    //   $appendPosition = $(this).children('.alias');
    // // else use code as appending position
    // } else {
    //   $appendPosition = $(this).children('code');
    // }
    // if either one of alias or code exist, append the button
    if ($appendPosition) {
      // create button and add class & onclick event
      var image = chrome.extension.getURL('assets/stackLogo.png');
      var $img = $('<img/>');
      $img.addClass('crowd-docs-button').attr('src', image);
      var leftOffset;
      if(title === 'Underscore.js') {
        leftOffset = '-120px';
      } else {
        leftOffset = '0px';
      }
      $img.css({
        position: 'relative',
        display: 'none',
        top: '12px',
        left: leftOffset,
      });
      $appendPosition.append($img);
      $img.wrapAll("<div style='display:table-cell;vertical-align:top;' class='crowd-docs-button-div' />")
      $img.fadeIn(1000);
    }
  };
  // handles mouse-leave event
  var removeButton = function() {
    // select existing button in the DOM and remove it
    var existingButton = $(this).children('.crowd-docs-button-div')[0];
    if (existingButton) {
      existingButton.remove();
    }
  };

  var displayIframe = function($section) {
    console.dir($section);
    // method and library title that we are using to search in stackoverflow API / comments
    var $firstParagraph = $section.children().first().children().first();
    var method = $firstParagraph.attr('id');
    // select existing iframe
    var $existingIframe = $('iframe')[0];
    // spam check
    if (!$('.crowd-docs-' + method)[0]) {
      // if there is an existing iframe, remove it
      if ($existingIframe) {
        $existingIframe.remove();
        $('.remove').remove();
      }
      // position of iframe to be inserted
      var offsetTop = $firstParagraph[0].offsetTop;
      var offsetWidth = $firstParagraph[0].offsetWidth;

      var $dragDiv = $('<div/>');
      $dragDiv.addClass('drag');

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
      var iFramePadding = 7;
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
      $dragDiv.draggable();
      $iframe.css('background-color', '#999999');
      $iframe.addClass('crowd-docs-' + method);
      $dragDiv.append($iframe);

      // add a button next to the iframe to remove it
      var $button = $('<button/>');
      $button.addClass('remove');
      var buttonOffset = 5;
      var buttonStyles = {
        position: 'absolute',
        top: offsetTop,
        left: offsetWidth + offset + iFrameWidth - buttonOffset
      };
      $button.css(buttonStyles);
      $button.text('x');
      $button.click(function() {
        $('.remove').remove();
        $('iframe').remove();
      });
      $dragDiv.append($button);
      $('body').prepend($dragDiv);

      var dragOffset = 225;
      var dragStyles = {
        position: 'absolute',
        left: dragOffset,
      };
      $('.drag').css(dragStyles);
      $('.drag').css('z-index', '10000');
    }
  };

  // for parent of the header element, add mouse-enter and mouse-leave event
  $('.flockdocs').each(function() {
    $(this).hover(displayButton, removeButton);
    $(this).click(displayIframe.bind(null, $(this)));
  }); 
});
