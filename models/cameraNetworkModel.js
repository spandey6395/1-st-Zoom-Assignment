// models/CameraNetwork.js

const mongoose = require('mongoose');
const { Schema } = mongoose;

const cameraNetworkSchema = new Schema({
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
  cameras: [{ type: Schema.Types.ObjectId, ref: 'Camera' }],
});

const CameraNetwork = mongoose.model('CameraNetwork', cameraNetworkSchema);

module.exports = CameraNetwork;
