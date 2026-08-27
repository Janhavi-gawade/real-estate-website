require('dotenv').config();
const mongoose = require('mongoose');
const Enquiry = require('./models/Enquiry');

const checkEnquiries = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const enquiries = await Enquiry.find();
    console.log(`Found ${enquiries.length} enquiries in DB:`);
    console.log(enquiries);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

checkEnquiries();
