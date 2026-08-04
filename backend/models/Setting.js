const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema({
  heroBanner: { type: String },
  heroHeading: { type: String },
  heroSubheading: { type: String },
  ctaText: { type: String },
  contactPhone: { type: String },
  contactWhatsApp: { type: String },
  officeAddress: { type: String },
  contactEmail: { type: String },
  mapsEmbedLink: { type: String },
  facebookLink: { type: String },
  instagramLink: { type: String },
  founderName: { type: String },
  founderPhoto: { type: String }
}, {
  timestamps: true
});

module.exports = mongoose.model('Setting', settingSchema);
