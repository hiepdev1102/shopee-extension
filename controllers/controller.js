exports.renderIndex = (req,res) =>{
    res.render('index');
}
exports.createNewRoom = (req,res) =>{
    res.render('create-room');
}
exports.enterRoom = (req,res,io)=>{
    res.render('enter-room');
}
exports.renderRoom = (req,res) =>{
    res.render('room');
}
