const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');

//index:
router.get('/', controller.renderIndex);

//create new room:
router.get('/enter-room', controller.enterRoom);

router.get('/room', controller.renderRoom);

router.get('/create-room', controller.createNewRoom)

module.exports = router;