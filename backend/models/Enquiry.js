const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  propertyOfInterest: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: String, required: true },
  contacted: { type: Boolean, default: false }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

enquirySchema.virtual('id').get(function() {
  return this._id.toHexString();
});

module.exports = mongoose.model('Enquiry', enquirySchema);
