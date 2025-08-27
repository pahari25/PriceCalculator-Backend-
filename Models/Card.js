const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const serviceSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  INRPrice: {
    type: Number,
    required: true
  },
  USDPrice: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  billing: {
    type: String,
    enum: ['one-time', 'monthly'],
    required: true
  }
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

module.exports = mongoose.model('Card', serviceSchema);

