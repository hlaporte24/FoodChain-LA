const mongoose = require('mongoose');
const slug = require('slugs');

const produceSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Please enter a store name!'
  },
  slug: String,
  description: {
    type: String,
    trim: true
  },
  volContact: {
    type: String,
    trim: true
  },
  date: {
    type: String,
    trim: true
  }
});

produceSchema.pre('save', function(next) {
  if (!this.isModified('name')) {
    next();
    return;
  }
  this.slug = slug(this.name);
  next();
});

const ProduceInfo = mongoose.model('produceInfo', produceSchema);

module.exports = ProduceInfo;
