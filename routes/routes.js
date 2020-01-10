const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');
const ObjectId = require('mongoose').Types.ObjectId;
const constraint = require('../util/constraint');
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

//api:
router.get('/create-new-room', (req,res,next)=>{
    if(!req.query.room){
        return res.status(200).send({
            message: "Bạn chưa điền mã phòng",
            room_created: false
        });
    }
    else if(!req.query.link){
        return res.status(200).send({
            message: "Bạn chưa chèn đường link",
            room_created : false
        });
    }
    else if(!ObjectId.isValid(req.query.room)){
        return res.status(200).send({
            message: "Thông tin phòng chưa đúng",
            room_created : false
        });
    }
    else{
        Object.keys(_io.sockets.adapter.rooms).forEach(_room =>{
            if(_room === req.query.room){
                res.status(200).send({
                    message: "Phòng đã tồn tại",
                    room_created: false
                });
                return false;
            }
        });

        return res.status(200).send({
            message: "Có thể tạo phòng",
            room_created: true
        });
    }
});

router.get('/check-room' ,(req,res,next)=>{
    console.log(req.query);
    if(!req.query.room){
        return res.status(200).send({
            message: "Yêu cầu nhập mã phòng",
        });
    }
    else{
        console.log(req.query);
        Object.keys(_io.sockets.adapter.rooms).forEach(_room =>{
            if(_room === req.query.room){
                if(Object.keys(_io.sockets.adapter.rooms[_room].sockets).length <= constraint.ROOM_SIZE){
                    res.status(200).send({
                        message: "Phòng có tồn tại, có thể vào",
                        room_exist: true,
                        room_full: false
                    });
                }
                else{
                    res.status(200).send({
                        message: "Phòng có tồn tại, nhưng đã đầy",
                        room_exist: true,
                        room_full: true
                    });
                }
                return false;
            }
        });
        return res.status(200).send({
            message: "Phòng không tồn tại",
            room_exist: false
        });
    }
});


module.exports = (io) =>{
    _io = io;
    return router;
}