//
//Copyright (c) 2016, Skedans Systems, Inc.
//All rights reserved.
//
//Redistribution and use in source and binary forms, with or without
//modification, are permitted provided that the following conditions are met:
//
//    * Redistributions of source code must retain the above copyright notice,
//      this list of conditions and the following disclaimer.
//    * Redistributions in binary form must reproduce the above copyright
//      notice, this list of conditions and the following disclaimer in the
//      documentation and/or other materials provided with the distribution.
//
//THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
//AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
//IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
//ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
//LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
//CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
//SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
//INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
//CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
//ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
//POSSIBILITY OF SUCH DAMAGE.
//
var selfEasyrtcid = "";
var url = window.location.href;
var roomId = url.substring(url.lastIndexOf("=")+1);
var audioSrc = "./demo_multiparty.html?roomId="+roomId;
var clientNumber;

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
        }else if(result.code == 401){
            var url="login.html";
            window.location.href = url
            alert(result.message);
                
        }
    },
    error :function(e){   
        console.log(e.message); 
    }
    })

function addToConversation(who, msgType, content) {
    // Escape html special characters, then add linefeeds.
    content = content.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    content = content.replace(/\n/g, '<br />');
    document.getElementById('conversation').innerHTML +=
    "<b>" + who + ":</b>&nbsp;" + content + "<br />";
}

function joinRoom() {
    var roomName = roomId;
    var roomParms = null;
    easyrtc.getRoomList(function(roomList){
        for (var item in roomList) {
            if (roomId === item.valueOf() && item.numberClients < 1) {
                console.log("会议名称重复，请重命名");
                clientNumber = item.numberClients;
                return;
            }
        }

        easyrtc.joinRoom(roomName, roomParms,
            function() {
                /* we'll geta room entry event for the room we were actually added to */
            },
            function(errorCode, errorText, roomName) {
                easyrtc.showError(errorCode, errorText + ": room name was(" + roomName + ")");
            });
    });


}


function connect() {
    easyrtc.setPeerListener(addToConversation);
    easyrtc.setRoomOccupantListener(convertListToButtons);
    easyrtc.connect("easyrtc.instantMessaging", messageLoginSuccess, messageLoginFailure);
    easyrtc.leaveRoom("default", (function(){
        console.log("leave success");
    }));
    joinRoom(window.location.href);
    initAudio();
}

function initAudio () {
    var body = document.getElementsByClassName("sidebar")[0];
    var iframe = document.createElement("iframe");

    iframe.src = audioSrc;
    iframe.style = {"visibility":"hidden"}
    body.appendChild(iframe);
}

function convertListToButtons (roomName, occupants, isPrimary) {
    var otherClientDiv = document.getElementById('otherClients');
    var others = document.getElementById('others');
    while (otherClientDiv.hasChildNodes()) {
        otherClientDiv.removeChild(otherClientDiv.lastChild);
    }
    while (others.hasChildNodes()) {
        others.removeChild(others.lastChild);
    }

    if (roomName === roomId) {
        // 左侧参会人人员
        for(var easyrtcid in occupants) {
            var div = document.createElement('div');
            var labelLeft = document.createTextNode(easyrtc.idToName(easyrtcid));
            div.appendChild(labelLeft);
            others.appendChild(div);
        }
    }

    // 发送键
    var sendButton = document.createElement('button');
    sendButton.onclick = function(occupants) {
        return function() {
            var text = document.getElementById('sendMessageText').value;
            addToConversation("Me", "message", text);
            document.getElementById('sendMessageText').value = "";
            if (roomId === roomName){
                for (var easyrtcid in occupants) {
                    sendStuffWS(easyrtcid, text);
                }
            }
        };
    }(occupants);

    var sendLabel = document.createTextNode("发送 ");
    sendButton.appendChild(sendLabel);
    otherClientDiv.appendChild(sendButton);

    if( !otherClientDiv.hasChildNodes() ) {
        otherClientDiv.innerHTML = "<em>Nobody else logged in to talk to...</em>";
    }
}


function sendStuffWS(otherEasyrtcid, text) {
    if(text.replace(/\s/g, "").length === 0) { // Don't send just whitespace
        return;
    }

    easyrtc.sendDataWS(otherEasyrtcid, "message",  text);
    document.getElementById('sendMessageText').value = "";
}


function messageLoginSuccess(easyrtcid) {
    selfEasyrtcid = easyrtcid;
    document.getElementById("mine").innerHTML = easyrtcid + " (你的账号)";
}


function messageLoginFailure(errorCode, message) {
    easyrtc.showError(errorCode, message);
}
