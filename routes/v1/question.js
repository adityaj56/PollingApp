const express = require('express');
const router = express.Router();

const questionController = require('../../controllers/v1/question_controller');

router.get('/delete', questionController.delete);

router.post('/create-question', questionController.createQuestion);


module.exports = router;