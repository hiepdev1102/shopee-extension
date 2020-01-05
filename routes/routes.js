const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');

//index:
router.get('/', controller.renderIndex);

//create new room:
router.get('/new-room', controller.createNewRoom);

//quick join room:
router.get('/')

//join specific room:


module.exports = router;