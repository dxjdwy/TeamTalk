function getUser(){
    $.ajax({
        //请求方式
        type : "POST",
        //请求的媒体类型
        contentType: "application/json;charset=UTF-8",
        //请求地址
        url : "http://117.78.9.153:24750/teamtalk/v1/user/getUserInfo",
        //数据，json字符串
        dataType:'json',
        data : {
         
        },
        xhrFields:{
            withCredentials:true
    
        },
        success : function(result) {
            // console.log(typeof(result),result);
        //    var result = JSON.parse(result) ? typeof(result) == String : result;
            if(result.code == 200){
                console.log(result.data.username);
                
                $("#userInfo").text(result.data.username);
                document.getElementById("mine").innerHTML = result.data.username ;
            }else if(result.code == 401){
                var url="login.html";
                window.location.href = url;
                alert(result.message)                
            }else if(result.code == 400){
                alert(result.message)
            }
        },
        error :function(e){   
            console.log(e.message); 
        }
        })
}


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

// connection.setRoomOccupantListener(convertListToButtons);

// function convertListToButtons (roomName, occupants, isPrimary) {
//     var otherClientDiv = document.getElementById('otherClients');
//     var others = document.getElementById('others');
//     while (otherClientDiv.hasChildNodes()) {
//         otherClientDiv.removeChild(otherClientDiv.lastChild);
//     }
//     while (others.hasChildNodes()) {
//         others.removeChild(others.lastChild);
//     }

//     if (roomName === roomId) {
//         // 左侧参会人人员
//         for(var connection in occupants) {
//             var div = document.createElement('div');
//             var labelLeft = document.createTextNode(easyrtc.idToName(easyrtcid));
//             div.appendChild(labelLeft);
//             others.appendChild(div);
//         }
//     }

//     // 发送键
//     var sendButton = document.createElement('button');
//     sendButton.onclick = function(occupants) {
//         return function() {
//             var text = document.getElementById('sendMessageText').value;
//             addToConversation("Me", "message", text);
//             document.getElementById('sendMessageText').value = "";
//             if (roomId === roomName){
//                 for (var easyrtcid in occupants) {
//                     sendStuffWS(easyrtcid, text);
//                 }
//             }
//         };
//     }(occupants);

//     var sendLabel = document.createTextNode("发送 ");
//     sendButton.appendChild(sendLabel);
//     otherClientDiv.appendChild(sendButton);

//     if( !otherClientDiv.hasChildNodes() ) {
//         otherClientDiv.innerHTML = "<em>Nobody else logged in to talk to...</em>";
//     }
// }

// connection.audiosContainer = document.getElementById('others');
// connection.onstream = function(event) {
//     var width = parseInt(connection.audiosContainer.clientWidth / 2) - 20;
//     var mediaElement = getHTMLMediaElement(event.mediaElement, {
//         title: event.userid,
//         buttons: ['full-screen'],
//         width: width,
//         showOnMouseEnter: false
//     });

//     connection.audiosContainer.appendChild(mediaElement);

//     setTimeout(function() {
//         mediaElement.media.play();
//     }, 5000);

//     mediaElement.id = event.streamid;
// };

// connection.onstreamended = function(event) {
//     var mediaElement = document.getElementById(event.streamid);
//     if (mediaElement) {
//         mediaElement.parentNode.removeChild(mediaElement);
//     }
// };

window.onload = function() {
    var url = window.location.href;
    var roomId = url.substring(url.lastIndexOf("=") + 1);
    getUser()
    // connection.openOrJoin(roomId, function(isRoomExist, roomid) {
    //     if (!isRoomExist) {
    //     showRoomURL(roomid);
    //     }
    // });
    connection.openOrJoin(roomId);
    // console.log(document.getElementById('userInfo').text);
    
    // messageLoginSuccess();
}
function messageLoginSuccess() {
    var name = document.getElementById('userInfo').text;
    document.getElementById("mine").innerHTML = name + " ";
}
document.getElementById('sendMessageText').onkeyup = function(e) {
        if (e.keyCode != 13) return;
        // removing trailing/leading whitespace
        this.value = this.value.replace(/^\s+|\s+$/g, '');
        if (!this.value.length) return;

        connection.send(this.value);
        appendDIV(this.value);
        this.value = '';
};
function sendMessage() {
    var textarea = document.getElementById('sendMessageText')
    textarea.value = textarea.value.replace(/^\s+|\s+$/g, '');
        if (!textarea.value.length) return;

        connection.send(textarea.value);
        appendDIV(textarea.value);
        textarea.value = '';

}
// var chatContainer = document.querySelector('.active');
var chatContainer = document.getElementById('conversation');

function appendDIV(event) {
    var li = document.createElement('li');
    var name = document.getElementById('userInfo').text;
    var myDate = new Date().toLocaleString();
    var event = event.data || event;
    li.innerHTML =` <div class="talking">
    <div class="talking_title">${name} &nbsp; ${myDate}</div>
    <div class="talking_content">${event}</div>
  </div>`
    chatContainer.append(li);
    li.tabIndex = 0;
    li.focus();

    document.getElementById('sendMessageText').focus();
}