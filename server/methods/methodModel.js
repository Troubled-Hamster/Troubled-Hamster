var mongoose = require('mongoose');

var MethodSchema = new mongoose.Schema({
  scrollKey: {
    type: String, 
    required: true
  },
  name: {
    type: String,
    required: true
  },
  library: {
    type: String,
    required: true
  },
  topQuestions: [{}],
  comments: [],
  documentationHTML: String

});

MethodSchema.index({library: 1, name: 1}, {unique: true});

module.exports = mongoose.model('Method', MethodSchema, 'methods');

