$(function() {
  var content = $('#content').annotator();
/*  content.annotator('setupPlugins', {tokenUrl: 'http://localhost:3000/api/token'}, {
             Tags: false,
             Filter: false
           });
*/
  content.annotator('addPlugin', 'Auth', {
    // The URL to request the token from. Defaults to /auth/token
    tokenUrl: 'http://flockdocs-dev.elasticbeanstalk.com:3000/api/token',
    // If this is present it will not be requested from the server above. Defaults to null.
    // token: '<TOKEN_FOR_TESTING_THAT_LASTS_FOR_A_DAY>',
    // Whether to fetch the token when the plugin is loaded. Defaults to true
    autoFetch: true
  });

  // +++ Store +++
  content.annotator('addPlugin', 'Store', {
    // This is the API endpoint. If the server supports Cross Origin Resource
    // Sharing (CORS) a full URL can be used here. Defaults to /store. The
    // trailing slash should be omitted.
    prefix: 'http://ec2-52-10-42-234.us-west-2.compute.amazonaws.com:5000',
    // Custom meta data that will be attached to every annotation that is sent
    // to the server. This will override previous values. E.g. attach the uri of the
    // current page to all annotations to allow search.
    // annotationData: {
    //   'uri': 'http://localhost:4000/example/page/to/annotate'
    // },
    // An object literal containing query string parameters to query the store.
    // If loadFromSearch is set, then we load the first batch of annotations
    // from the ‘search’ URL as set in options.urls instead of the registry path
    // ‘prefix/read’. Defaults to false.
    // loadFromSearch: {
    //   'limit': 20,
    //   'all_fields': 1,
    //   'uri': 'http://localhost:4000/example/page/to/annotate'
    // },
    // The server URLs for each available action (excluding prefix). These URLs
    // can point anywhere but must respond to the appropriate HTTP method. The
    // :id token can be used anywhere in the URL and will be replaced with the
    // annotation id.
    // Methods for actions are as follows:
    // create:  POST
    // update:  PUT
    // destroy: DELETE
    // search:  GET
    urls: {
      // These are the default URLs.
      create:  '/annotations',
      update:  '/annotations/:id',
      destroy: '/annotations/:id',
      search:  '/search'
    },
    // If true will display the "anyone can view this annotation" checkbox.
    // showViewPermissionsCheckbox: true,
    // // If true will display the "anyone can edit this annotation" checkbox.
    // showEditPermissionsCheckbox: true
  });
});
