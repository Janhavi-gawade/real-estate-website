const app = require('../backend/server.js');
module.exports = app;

// Disable Vercel's default body parser so Multer can parse image uploads
module.exports.config = {
  api: {
    bodyParser: false,
  },
};
