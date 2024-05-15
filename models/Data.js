const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slugs');

const dataSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Please enter a store name!'
  },
  slug: String,
  description: {
    type: Number,
    trim: true
  },
   volContact: {
       type:String,
       trim: true
   },
    date: {
        type:String,
        trim: true
    }
});

dataSchema.pre('save', function(next) {
  if (!this.isModified('name')) {
    next(); // skip it
    return; // stop this function from running
  }
  this.slug = slug(this.name);
  next();
  // TODO make more resiliant so slugs are unique
});

module.exports = mongoose.model('volunteerInfo', dataSchema);
module.exports = mongoose.model('produceInfo', dataSchema);
