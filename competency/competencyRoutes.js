const express = require('express');
const router = express.Router();
const competencyController = require('./competencyController.js');

router.get('/', competencyController.getAllCompetencies);
router.get('/:id', competencyController.getCompetencyById);
router.post('/', competencyController.createCompetency);
router.put('/:id', competencyController.updateCompetency);
router.delete('/:id', competencyController.deleteCompetency);

module.exports = router;
