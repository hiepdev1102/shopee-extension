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
        })
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
            message: "Tạo phòng thành công",
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
                res.status(200).send({
                    message: "Vào phòng thành công",
                    room_exist: true
                });
                return false;
            }
        });
        return res.status(200).send({
            message: "Không tìm thấy phòng",
            room_exist: false
        });
    }
});


module.exports = (io) =>{
    _io = io;
    return router;
}