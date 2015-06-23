var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/' + 'cursoNode');

module.exports = mongoose;