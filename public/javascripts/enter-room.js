//enter room script:

const socket = io.connect(window.location.origin);

var txtMaPhong = document.getElementById("txtMaPhong");
var btnSubmit = document.getElementById("btnSubmit");


//event:
btnSubmit.addEventListener('click', () => {
    if (txtMaPhong.value === "") {
        alert("Bạn chưa nhập mã phòng!");
    }
    else {
        /*
        socket.emit('join-room', txtMaPhong.value);
        */
       console.log(txtMaPhong.value);
        $.ajax({
            url: window.location.origin+"/check-room?room="+txtMaPhong.value,
            type: 'GET',
            success: function (result) {
                alert(result.message);
                document.cookie = "room="+txtMaPhong.value;
            },
            fail: function (xhr, textStatus) {
                console.log(textStatus);
            }
        });
    }
});
/*
socket.on('join-room', value =>{
    if(value.status == true){
        alert("Vào phòng thành công!");

        //lưu thông tin:
        req.session.room = value.room;
        req.session.link = value.link;

        location.href = "/room";
    }
});
*/
