


// ......................................................
// ..................RTCMultiConnection Code.............
// ......................................................

var connection = new RTCMultiConnection();

// by default, socket.io server is assumed to be deployed on your own URL
connection.socketURL = '/';

// comment-out below line if you do not have your own socket.io server
// connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';

connection.socketMessageEvent = 'audio-conference-demo';

connection.session = {
    data: true,
    audio: true,
    video: false
};

connection.mediaConstraints = {
    audio: true,
    video: false
};

connection.sdpConstraints.mandatory = {
    OfferToReceiveAudio: true,
    OfferToReceiveVideo: false
};

// https://www.rtcmulticonnection.org/docs/iceServers/
// use your own TURN-server here!
connection.iceServers = [{
    'urls': [
        'stun:stun.l.google.com:19302',
        'stun:stun1.l.google.com:19302',
        'stun:stun2.l.google.com:19302',
        'stun:stun.l.google.com:19302?transport=udp',
    ]
}];
connection.onmessage = appendDIV;


var name="";
window.onload = function() {
    
    getUserInfo();
    var url = window.location.href;
    var roomId = url.substring(url.lastIndexOf("=") + 1);

    

    // connection.openOrJoin(roomId, function(isRoomExist, roomid) {
    //     if (!isRoomExist) {
    //     showRoomURL(roomid);
    //     }
    // });
    connection.openOrJoin(roomId);


    
    document.getElementById('sendMessageText').onkeyup = function(e) {
        if (e.keyCode != 13) return;

        // removing trailing/leading whitespace
        this.value = this.value.replace(/^\s+|\s+$/g, '');
        if (!this.value.length) return;

        connection.send(this.value);
        appendDIV(this.value);
        this.value = '';
};

}
function getUserInfo(){
    $.ajax({         
        //请求方式
        type : "POST",
        dataType: "json",
        //请求的媒体类型
        contentType: "application/json;charset=UTF-8",
        //请求地址
        url : "http://117.78.9.153:24750/teamtalk/v1/user/getUserInfo",
        //数据，json字符串
        // data:JSON.stringify(postData),
        xhrFields:{
            withCredentials:true
        },
        //请求成功
        success : function(result) {         
            if(result.code == 200){
              
                $("#userInfo").text(result.data.username);
               
                document.getElementById("mine").innerHTML = result.data.username + " (你的账号)";

              
            }else if(result.code == 401){
                var url = "login.html"
                window.location.href = url;
            console.log(e.message);
        }
        },
        //请求失败，包含具体的错误信息
        error : function(e){
            console.log(e.message);
            
        }
      });	
}


        



function sendMessage() {
    var textarea = document.getElementById('sendMessageText')
    textarea.value = textarea.value.replace(/^\s+|\s+$/g, '');
        if (!textarea.value.length) return;

        connection.send(textarea.value);
        appendDIV(textarea.value);
        textarea.value = '';

}


function appendDIV(event) {
    var li = document.createElement('li');
    var name = document.getElementById('userInfo').text;
    var myDate = new Date().toLocaleString();
    li.innerHTML = name+'::::'+myDate+'<br>'+(event.data || event);
    document.getElementById('conversation').append(li);
    li.tabIndex = 0;
    li.focus();

    document.getElementById('sendMessageText').focus();
}