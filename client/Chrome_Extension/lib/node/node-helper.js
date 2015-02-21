// helper function that creates draggable div
// components are offsetTop and offsetWidth
var createDraggable = function(components) {
  var $dragDiv = $('<div/>');
  $dragDiv.addClass('drag');
  $dragDiv.draggable();
  var dragStyles = {
    position: 'absolute',
    top: components.offsetTop,
    left: components.offsetWidth,
    'z-index': 10000,
    display: 'none'
  };
  $dragDiv.css(dragStyles);
  return $dragDiv;
}

// helper function that creates an iframe
// components include src, class, width, height, and padding
var createIframe = function(components) {
  var $iframe = $('<iframe/>');
  $iframe.attr('src', components.src);
  $iframe.addClass('crowd-docs-' + components.class);
  var styles = {
    position: 'absolute',
    width: components.width,
    height: components.height,
    padding: components.padding,
    'background-color': '#999999'
  };
  $iframe.css(styles);
  return $iframe;
}
// helper function that creates removeButton
var createRemoveButton = function(iFrameWidth) {
  // add a button to the iframe to remove it
  var $button = $('<button/>');
  $button.addClass('remove');
  var buttonOffset = 20;
  var buttonStyles = {
    position: 'absolute',
    left: iFrameWidth - buttonOffset,
    'z-index': 10000
  };
  $button.css(buttonStyles);
  $button.text('x');
  // clicking this button will remove both the button and the iframe and the button
  $button.click(function() {
    $('.remove').remove();
    $('iframe').remove();
  });

  return $button;
};
