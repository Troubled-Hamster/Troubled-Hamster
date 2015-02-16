$(function(){
  var $codeBlocks = $('code');

  $codeBlocks.each(function(){
    var newHTML = $(this).html().replace(/;/g, '; <br><br>');
    newHTML = newHTML.replace(/{/g, '{ <br><br>');
    $(this).html(newHTML);
    $(this).addClass('prettyprint')
  });
});