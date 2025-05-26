const express = require('express');
const router = express.Router();
const moduleController = require('./moduleController');

// List all modules
router.get('/', moduleController.getAllModules);

// Get a single module
router.get('/:id', moduleController.getModuleById);

// Create a new module
router.post('/', moduleController.createModule);

// Update an existing module
router.put('/:id', moduleController.updateModule);

// Delete a module
router.delete('/:id', moduleController.deleteModule);

module.exports = router;
