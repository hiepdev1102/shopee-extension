const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');
let _io;
//index:
router.get('/', (req, res, next) =>{
    controller.renderIndex(req,res,_io);
});

//create new room:
router.get('/enter-room', (req, res, next)=>{
    controller.enterRoom(req,res,_io);
});

router.get('/room', controller.renderRoom);

router.get('/create-room', controller.createNewRoom)

module.exports = (io) =>{
    _io = io;
    return router;
}