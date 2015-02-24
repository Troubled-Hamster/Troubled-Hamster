
var mongoose = require('mongoose');

var LibrarySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  methods: [String]
});

module.exports = mongoose.model('Library', LibrarySchema, 'libraries');

