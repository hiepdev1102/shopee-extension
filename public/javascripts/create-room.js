
var txtLink = document.getElementById("txtLink");
var btnSubmit = document.getElementById("btnSubmit");

btnSubmit.addEventListener('click', () => {
    if (txtLink.value === "") {
        alert("Bạn chưa nhập link!");
    }
    else {
        /*
        socket.emit('join-room', txtMaPhong.value);
        */
        /*
        $.ajax({
            url: window.location.origin+"/create-room?room="+txtMaPhong.value,
            type: 'GET',
            success: function (result) {
                alert(result.message);
                
            },
            fail: function (xhr, textStatus) {
                console.log(textStatus);
            }
        });
        */
       
    }
});