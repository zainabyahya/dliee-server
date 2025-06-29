// routes/moduleRoutes.js
const express = require('express');
const router = express.Router();
const moduleController = require('./moduleController');

router.get('/', moduleController.getAllModules);
router.get('/:id', moduleController.getModuleById);
router.post('/', moduleController.createModule);
router.put('/:id', moduleController.updateModule);
router.delete('/:id', moduleController.deleteModule);
router.get('/competency/:competencyId', moduleController.getModulesByCompetency);

module.exports = router;
