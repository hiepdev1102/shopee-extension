function getCookieValue(a) {
    var b = document.cookie.match('(^|[^;]+)\\s*' + a + '\\s*=\\s*([^;]+)');
    return b ? b.pop() : '';
}

function copyToClipboard(text) {
    window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
}

var socket = io.connect(window.location.origin);
var txtCopyLink = document.getElementById('txtCopyLink');
var btnCopyLink = document.getElementById('btnCopyLink');
var btnOutRoom = document.getElementById('btnOutRoom');

btnCopyLink.addEventListener('click', ()=>{
    
});

//check if join a room before:
if(getCookieValue("room")){

    //currently in some room:
    //-> display room
    //-> display link
    //-> go to socket and get number of user  
}
else{
    //alert you havent join a room
    //back to main page
}

//main page:
