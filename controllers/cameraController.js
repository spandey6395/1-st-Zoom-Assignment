const Camera = require('../models/cameraModel');
// const CameraNetwork = require('../models/cameraNetworkModel');
const mongoose = require('mongoose');



// create a new camera
const createCamera = async (req, res) => {
    try{
    const { name, description, url } = req.body;
    const camera = new Camera({ name, description, url });
    await camera.save();
    res.json(camera);
}
catch (err) {
  res.status(500).send({ status: false, error: err.message });
}
  };

// retrieve all cameras
const getCameras =  async (req, res) => {
    try{
    const cameras = await Camera.find();
    res.json(cameras);
    }
    catch (err) {
      res.status(500).send({ status: false, error: err.message });
    }
  };

// retrieve a single camera by id
const getCameraById =  async (req, res) => {
    try{
    const camera = await Camera.findById(req.params.id);
    res.json(camera);
}
catch (err) {
  res.status(500).send({ status: false, error: err.message });
}  
};

// update a camera by id
const updateCameraById = async (req, res) => {
    try{
    const { name, description, url } = req.body;
    const camera = await Camera.findByIdAndUpdate(
      req.params.id,
      { name, description, url },
      { new: true }
    );
    await CameraNetwork.updateMany(
      { cameras: req.params.id },
      { $set: { 'cameras.$': camera } }
    );
    res.json(camera);
}
catch (err) {
  res.status(500).send({ status: false, error: err.message });
}  
};

// delete a camera by id
  const deleteCameraById = async (req, res, next) => {
    try {
      const camera = await Camera.findByIdAndDelete(req.params.id);
      if (!camera) {
        return res.status(404).send(`Camera with ID ${req.params.id} not found`);
      }
      // Find the networks that contain the deleted camera
      const networks = await Network.find({ cameras: camera._id });
      // Remove the deleted camera from each network
      for (let network of networks) {
        network.cameras.pull(camera._id);
        await network.save();
      }
      res.send(camera);
    } catch (err) {
      next(err);
    }
  };

module.exports = {
    createCamera,
    getCameras,
    getCameraById,
    updateCameraById,
    deleteCameraById
  
  }
