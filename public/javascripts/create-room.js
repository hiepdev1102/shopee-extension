
var txtLink = document.getElementById("txtLink");
var btnSubmit = document.getElementById("btnSubmit");

btnSubmit.addEventListener('click', () => {
    let objectId = new ObjectId();
   
    if (txtLink.value === "") {
        alert("Bạn chưa nhập link!");
    }
    else {
        let objectId = new ObjectId();
        var xhttp = new XMLHttpRequest() || ActiveXObject("Microsoft.XMLHTTP");
        xhttp.open('GET',"/create-new-room?room="+objectId.timestamp.toString(16) +objectId.machine.toString(16) +objectId.pid.toString(16) +objectId.increment.toString(16)
        +"&link="+txtLink.value, true);
        //Send the proper header information along with the request
        //Need this header when send post:
        //xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");    
        xhttp.send();
        
        xhttp.onreadystatechange =function() {
            if(this.readyState == 4 && this.status == 200){
                //--> server send back 
                if(JSON.parse(this.responseText).room_created){
                    console.log("Tạo phòng thành công");
                    //->save cookies-> use latter in /room route
                    setCookie("room",objectId,1);
                    setCookie('link',txtLink.value,1);

                    alert(objectId);
                    alert(txtLink.value);

                    location.href = "/room";
                }else{
                    //alert(this.status);
                    //alert(this.message);
                    console.log(JSON.parse(this.responseText));
                }
            }
        }
    }
});