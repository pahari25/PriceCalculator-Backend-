const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requestedServiceSchema = new Schema({
  name: { type: String, required: true },
  months: { type: Number },
  // Storing price at the time of request is good practice
  price: { type: Number, required: true }, 
}, { _id: false });

const estimateRequestSchema = new Schema({
    id:{
        type: String,
        required: true,
        // default: () => new Date().getTime().toString(),
        unique:true
    },
    user_name:{
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
      },
  email: {
    type: String,
    required: true,
  },
  services: [requestedServiceSchema],
  total: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    enum: ['USD', 'INR'],
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'viewed', 'processed'],
    default: 'pending',
  }
}, { timestamps: true });

module.exports = mongoose.model('Request', estimateRequestSchema);