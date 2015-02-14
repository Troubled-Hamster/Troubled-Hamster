var mongoose = require('mongoose');

var LibrarySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  methods: [{
    name: String,
    topQuestions: {},
    explanations: {}
  }]
});

model.exports = mongoose.model('Library', LibrarySchema);

