$(function(){
  var $codeBlocks = $('code');

  $codeBlocks.each(function(){
    // var newHTML = $(this).html().replace(/;/g, '; <br>');
    // newHTML = newHTML.replace(/{/g, '{ <br>');
    // $(this).html(newHTML);
    $(this).addClass('prettyprint')
  });
});
