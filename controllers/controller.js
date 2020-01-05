exports.renderIndex = (req,res) =>{
    res.render('index');
}
exports.createNewRoom = (req,res) =>{
    res.render('create-new-room');
}
exports.enterRoom = (req,res)=>{
    res.render('enter-room');
}
exports.renderRoom = (req,res) =>{
    res.render('room');
}
