$(function() {
  var content = $('#content').annotator();
  content.annotator('setupPlugins', {tokenUrl: 'http://flockdocs-dev.elasticbeanstalk.com/api/token'}, {
             Tags: false,
             Filter: false
           });
});
