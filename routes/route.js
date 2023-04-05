// routes/cameraRoutes.js

const express = require('express');
const router = express.Router();
const camera = require('../controllers/cameraController')
const cameraNetwork = require('../controllers/cameraNetworkController');

// routes for camera

router.get('/cameras', camera.getCameras)

router.post('/cameras', camera.createCamera)

router.get('/cameras/:id', camera.getCameraById)

router.put('/cameras/:id', camera.updateCameraById)

router.delete('/cameras/:id', camera.deleteCameraById)


// routes for cameraNetwork

router.get('/networks', cameraNetwork.getNetworks)

router.post('/networks', cameraNetwork.createNetwork)

router.get('/networks/:id', cameraNetwork.getNetworkById)

router.put('/networks/:id', cameraNetwork.updateNetworkById)

router.delete('/networks/:id', cameraNetwork.deleteNetworkById)

module.exports = router;
