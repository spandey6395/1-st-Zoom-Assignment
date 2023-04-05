// models/Camera.js

const mongoose = require('mongoose');

const cameraSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  url: {
    type: String,
    required: true,
    trim: true,
  },
});

const Camera = mongoose.model('Camera', cameraSchema);

module.exports = Camera;
