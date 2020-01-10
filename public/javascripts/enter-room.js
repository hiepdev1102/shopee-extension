//enter room script:

//const socket = io.connect(window.location.origin);

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
       /* 
       $.ajax({
            url: window.location.origin+"/check-room?room="+txtMaPhong.value,
            type: 'GET',
            success: function (result) {
                alert(result.message);
                document.cookie = "room="+txtMaPhong.value;
                location.href = "/room";
            },
            fail: function (xhr, textStatus) {
                console.log(textStatus);
            }
        });
        */

        var xhttp = new XMLHttpRequest() || ActiveXObject("Microsoft.XMLHTTP");

        xhttp.onreadystatechange =function() {
            if(this.readyState == 4 && this.status == 200){
                //--> server send back 
                let res = JSON.parse(this.responseText);
                if(JSON.parse(res.room_exist)){
                    if(res.room_full == true){
                        alert("Phòng đã đầy");
                    }
                    else{
                        alert("Vào phòng thành công");
                        setCookie("room",txtMaPhong.value,1);
                        location.href = "/room";
                    }
                }else{
                    alert("Phòng không tồn tại");
                }
            }
        }
        xhttp.open('GET', 'check-room?room='+txtMaPhong.value, true);
        xhttp.send();
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
