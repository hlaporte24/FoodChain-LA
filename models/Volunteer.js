const mongoose = require('mongoose');
const slug = require('slugs');

const volunteerSchema = new mongoose.Schema({
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

volunteerSchema.pre('save', function(next) {
  if (!this.isModified('name')) {
    next();
    return;
  }
  this.slug = slug(this.name);
  next();
});

const VolunteerInfo = mongoose.model('volunteerInfo', volunteerSchema);

module.exports = VolunteerInfo;
