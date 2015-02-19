$(function() {
  var content = $('#content').annotator();
  content.annotator('setupPlugins', {tokenUrl: 'http://localhost:3000/api/token'}, {
             Tags: false,
             Filter: false
           });
});
