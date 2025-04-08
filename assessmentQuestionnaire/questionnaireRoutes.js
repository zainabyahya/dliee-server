const express = require('express');
const router = express.Router();
const questionnaireController = require('./questionnaireController');

router.get('/', questionnaireController.getAllQuestionnaires);
router.post('/', questionnaireController.createQuestionnaire);
router.put('/:id', questionnaireController.updateQuestionnaire);
router.delete('/:id', questionnaireController.deleteQuestionnaire);

module.exports = router;
