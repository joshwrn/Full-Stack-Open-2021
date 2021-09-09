const mongoose = require('mongoose');

require('dotenv').config();

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String },
  url: { type: String, required: true },
  likes: { type: Number },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

// Duplicate the ID field.
blogSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
blogSchema.set('toJSON', {
  virtuals: true,
});

module.exports = mongoose.model('Blog', blogSchema);
