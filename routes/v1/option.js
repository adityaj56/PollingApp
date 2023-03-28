const express = require('express');
const router = express.Router()

const optionController = require('../../controllers/v1/option_controller');

router.post('/create-option', optionController.createOption);


module.exports = router;