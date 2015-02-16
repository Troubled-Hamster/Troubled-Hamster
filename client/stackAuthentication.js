$(function(){
  var token = window.localStorage.getItem('flockDocsToken');

  if(token){
    $('.btn').click(function(){
      console.log($('.userAnswer').val());
      var userAnswer = $('.userAnswer').val();
      $.ajax({
        type: 'POST',
        url: '',
        data: {answer: userAnswer}
      });

      var postedAnswer = '<div class="answer"><hr><h4>Answer</h4><p>' + userAnswer + '</p>';
      $('.addAnswer').before(postedAnswer);
      $('.userAnswer').val('');

    });
  } else {
    $('.btn').text('Log in to Stack Overflow to answer');
    $('.btn').click(function(){
      window.open('https://stackexchange.com/oauth/dialog?client_id=4259&scope=&redirect_uri=http://www.google.com')
    });
  }
})