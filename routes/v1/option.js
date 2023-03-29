const express = require('express');
const router = express.Router()

const optionController = require('../../controllers/v1/option_controller');

router.get('/vote', optionController.vote);
router.get('/delete', optionController.delete);

router.post('/create-option', optionController.createOption);


module.exports = router;