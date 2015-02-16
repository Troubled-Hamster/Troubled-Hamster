var mongoose = require('mongoose');

var MethodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  library: {
    type: String,
    required: true,
  },
  topQuestions: [{}],
  docHelp: [{}],
});

MethodSchema.index({library: 1, name: 1}, {unique: true});

module.exports = mongoose.model('Method', MethodSchema, 'methods');

