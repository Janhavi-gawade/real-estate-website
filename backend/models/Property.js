const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  price: { type: String, required: true },
  location: { type: String, required: true },
  carpetArea: { type: String, required: true },
  status: { type: String, required: true },
  shortDescription: { type: String, required: true },
  fullDescription: { type: String, required: true },
  amenities: [{ type: String }],
  landmarks: { type: String },
  mapsLink: { type: String },
  images: [{ type: String }],
  featured: { type: Boolean, default: false }
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt
  toJSON: { virtuals: true }, // Ensure virtuals (like id) are included when sending to frontend
  toObject: { virtuals: true }
});

// Create a virtual 'id' field that maps to '_id' so the frontend doesn't need to change
propertySchema.virtual('id').get(function() {
  return this._id.toHexString();
});

module.exports = mongoose.model('Property', propertySchema);
