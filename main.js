Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

function encrypt(key, text){
    let textBytes = aesjs.utils.utf8.toBytes(text);
    let aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
    let encryptedBytes = aesCtr.encrypt(textBytes);
    let encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
    return(encryptedHex);
}
function decrypt(key, value){
    let encryptedBytes = aesjs.utils.hex.toBytes(value);
    let aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
    let decryptedBytes = aesCtr.decrypt(encryptedBytes);
    let decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
    return(decryptedText);
}

function randomStr(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

 function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

 function decryptAll(){
    while(document.getElementsByClassName('toencrypt').length != 0){
        let msg = document.getElementsByClassName('toencrypt')[0];
        msg.classList.remove("toencrypt");
        msg.innerText = decrypt(key,msg.innerText);
    }
}

function createMsgBox(msg) {
    msg = JSON.parse(msg);
	var logbox = document.createElement("div");
	logbox.className = "msg";
    logbox.innerText=msg.msg;
    logbox.style.color = msg.color;
	return logbox;
}

function makePulse(){
    document.getElementsByClassName('pulse')[0].className = 'pulse0';
    setTimeout(function(){ document.getElementsByClassName('pulse0')[0].className = 'pulse'; }, 100);
}

if(document.getElementById('color').value == '#000001'){
    document.getElementById('color').value = getRandomColor();
}

function updatechat(roomname, lastid=0) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        let arr = JSON.parse(this.responseText);
        
        for (let i=0; i<Object.size(arr); i++){
            try {
                document.getElementById('chatroom').append(createMsgBox( decrypt(key,arr[i]) ));             

            } catch (error) {
                console.log("Fail decrypt this: "+decrypt(key,arr[i]));
            }
        }

        window['lastid']+=Object.size(arr);
        //decryptAll();
        makePulse();
      }
    };
    xhttp.open("GET", "/api/v1/get.php?room="+roomname+"&last="+lastid, true);
    xhttp.send();
}




/* No password token - leave */
if (document.location.href.split('#')[1] == undefined){
    document.location.pathname = "/index.html";
}

var key = document.location.href.split('#')[1].split('|')[1];
var roomname = document.location.href.split('#')[1].split('|')[0];
var lastid = 0;

if (key == undefined){
    document.location.pathname = "/index.html";
}else{
    if (key.length != 32){
        document.location.href = document.location.href.split('#')[0];
        document.location.pathname = "/index.html";
    }else{
        var key = aesjs.utils.utf8.toBytes(key);
        //updatechat(roomname);
        //decryptAll();
        console.log('Get msgs and decrypt');
    }
}


 /* Sending Messages */
 document.getElementById('btn-sendmsg').onclick = function() {
    document.getElementById('btn-sendmsg').disabled = true;
    let newmsg = document.getElementById('nick').value+": "+document.getElementById('newmsg').value;
    let col = document.getElementById('color').value;
    //cryptedmsg = encrypt(key, newmsg);

    cryptedmsg = encrypt(key, '{"trash":"'+randomStr(20)+'", "color":"'+col+'" ,"msg":"'+newmsg+'" ,"trash2": "'+randomStr(20)+'"}')

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById('newmsg').value = "";
        document.getElementById('btn-sendmsg').disabled = false;
      }
    };

    xhttp.open("GET", "/api/v1/send.php?room="+roomname+"&msg="+cryptedmsg, true);
    xhttp.send();
};


/* Updating chat */
const interval = setInterval(function() {
    updatechat(roomname, lastid);
}, 2000);
