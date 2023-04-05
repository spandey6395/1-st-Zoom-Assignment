// const Camera = require('../models/cameraModel');
const CameraNetwork = require('../models/cameraNetworkModel');
const mongoose = require('mongoose');

// create a new camera network
const createNetwork = async (req, res) => {
    try{
    const { name, description, cameras } = req.body;
    const network = new CameraNetwork({ name, description, cameras });
    await network.save();
    res.json(network);
    }catch (err) {
        res.status(500).send({ status: false, error: err.message });
      }
  };

// retrieve all camera networks
const getNetworks = async (req, res) => {
    try{
    const networks = await CameraNetwork.find().populate('cameras');
    res.json(networks);
}catch (err) {
    res.status(500).send({ status: false, error: err.message });
  }  
};

// retrieve a single camera network by ID
const getNetworkById = async (req, res) => {
    try{
    const network = await CameraNetwork.findById(req.params.id).populate('cameras');
    res.json(network);
}catch (err) {
    res.status(500).send({ status: false, error: err.message });
  }  
};

// update a camera network by ID
const updateNetworkById =  async (req, res) => {
    try{
    const { name, description, cameras } = req.body;
    const network = await CameraNetwork.findByIdAndUpdate(
      req.params.id,
      { name, description, cameras },
      { new: true }
    );
    res.json(network);
}catch (err) {
    res.status(500).send({ status: false, error: err.message });
  }  
};

// delete a camera network by ID
const deleteNetworkById = async (req, res) => {
    try{
    const network = await CameraNetwork.findByIdAndDelete(req.params.id);
    res.json(network);
}catch (err) {
    res.status(500).send({ status: false, error: err.message });
  }  
};

module.exports = {
    createNetwork,
    getNetworks,
    getNetworkById,
    updateNetworkById,
    deleteNetworkById
}
