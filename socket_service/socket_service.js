let _io;

function listen(socket){

}

module.exports = (io) =>{
    _io = io;
    return { listen }
}