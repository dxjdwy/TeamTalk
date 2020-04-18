$(function role_confirm(){
    var result = {
        code:200,
        data:1
    }
    // $.ajax({         
    //     //请求方式
    //     type : "POST",
    //     dataType: "json",
    //     //请求的媒体类型
    //     contentType: "application/json;charset=UTF-8",
    //     //请求地址
    //     url : "http://117.78.9.153:24750/teamtalk/v1/user/getRole",
    //     //数据，json字符串
    //     data:JSON.stringify(postData),
    //     //请求成功
    //     success : function(result) {
            
            if(result.code == 200){
                if(result.data == 4){
                    $("#role_manager").hide();
                    $("#log_manager").hide();
                }else if(result.data == 3){
                    $("#role_manager").hide();
                }else if(result.data == 2){
                    $("#role_manager").hide();
                }else if(result.data == 1){
                    $("#log_manager").hide();
                }
            }
        // },
    //     //请求失败，包含具体的错误信息
    //     error : function(e){
    //         console.log(e.message);
            
    //     }
    // });		
})
function meeting_submit(){
	var meeting_username = document.getElementById("meeting_username").value.replace(/(^\s*)|(\s*$)/g, "");
	var meeting_passwordI = document.getElementById("meeting_passwordI").value.replace(/(^\s*)|(\s*$)/g, "");
    var meeting_passwordII = document.getElementById("meeting_passwordII").value.replace(/(^\s*)|(\s*$)/g, "");
    var meeting_type = document.getElementById("meeting_type").value;
    var meeting_sec = document.getElementById("meeting_sec").value;
    var meeting_info = document.getElementById("meeting_info").value.replace(/(^\s*)|(\s*$)/g, "");
    console.log(meeting_username,typeof(meeting_username));
    if(meeting_username==''||meeting_passwordI==''){
		alert('会议名或密码为空')
		return;
	}else if(meeting_passwordI !=meeting_passwordII){
		alert('密码不一致')
		return;
    }else if(meeting_type == ''){
		alert("请选择会议类型");
        return;
    }else if(meeting_sec == ''){
		alert("请选择会议密级");
        return; 
	}else{ 
        var postData = {
            "mName":meeting_username,	//会议名称 string,
            "mPass":meeting_passwordI,	//会议密码 string,
            "mType":meeting_type,	//会议类型 string,"普通"｜"讲课"
            "mSec":	meeting_sec,	//会议密级 string,
            "mDesc":meeting_info,	//会议描述 string,
            
        };      
        $.ajax({         
            //请求方式
            type : "POST",
            dataType: "json",
            //请求的媒体类型
            contentType: "application/json;charset=UTF-8",
            //请求地址
            url : "http://117.78.9.153:24750/teamtalk/v1/meeting/addMeeting",
            //数据，json字符串
            data:JSON.stringify(postData),
            //请求成功
            success : function(result) {
                
                if(result.code == 200){
					alert('创建成功');
                    document.getElementById("meeting_username").value = '';
                    document.getElementById("meeting_passwordI").value = '';
                    document.getElementById("meeting_passwordII").value = '';
                    document.getElementById("meeting_type").value = '';
                    document.getElementById("meeting_sec").value = '';
                    document.getElementById("meeting_info").value = '';
                    $('#myModal').modal('hide');
                    $.ajax({
                        //请求方式
                        type : "POST",
                        //请求的媒体类型
                        contentType: "application/json;charset=UTF-8",
                        //请求地址
                        url : "http://117.78.9.153:24750/teamtalk/v1/meeting/getMeetingList",
                        //数据，json字符串
                        data : {
                         
                        },
                        //请求成功
                        success : function(result_get) {
                            if(result_get.code == 200){
                                var meetingList = result_get.data;
                                var meetingUl = document.getElementById('meetingListGroup');
                                $('#meetingListGroup li').remove();
                                
                                var liHead = document.createElement("li");
                                liHead.innerHTML = '<li class="list-group-item active">' + '当前会议' +'</li>';
                                meetingUl.appendChild(liHead);
                                for(let i = 0,len = meetingList.length; i < len; i++){
                                    var li = document.createElement("li");
                                    let meetingId = meetingList[i].mId;
                                    let meetingPass = meetingList[i].mPass;
                                    let meetingName = meetingList[i].mName;
                                    let meetingDesc = meetingList[i].mDesc;
                                    li.onclick = function(){
                                      $("#modal_join_meeting_title").html(meetingId);
                                    }
                                    li.innerHTML = '<li class="list-group-item">\n'+
                                                        '<div id="'+meetingId+'" class="meeting-item" data-toggle="modal" data-target="#modal_join_meeting">'+meetingId+'.'+meetingName+'</div>'+
                                                        
                                                        '<span class="meetingInfo">'+ meetingDesc + '</span>'+
                                                    '</li>';
                                meetingUl.appendChild(li);
                            }
                        }else if(result.code == 401){
                            var url="login.html";
                            window.location.href = url
                            alert(result.message);
                                
                        }
                    },
                    error : function(e){
                    
                        console.log(e.message);                      
                    }
                    })
				}
            },
            //请求失败，包含具体的错误信息
            error : function(e){
				console.log(e.message);
				
            }
        });		
	}			
}

function meeting_cancel(){
    document.getElementById("meeting_username").value = '';
    document.getElementById("meeting_passwordI").value = '';
    document.getElementById("meeting_passwordII").value = '';
    document.getElementById("meeting_info").value = '';
    document.getElementById("meeting_id").value = '';
    document.getElementById("meeting_password1").value = '';
    document.getElementById("meeting_type").value = '';
    document.getElementById("meeting_sec").value = '';
}

function meeting_join(){
	var meeting_id = document.getElementById("meeting_id").value.replace(/(^\s*)|(\s*$)/g, "");
	var meeting_password1 = document.getElementById("meeting_password1").value.replace(/(^\s*)|(\s*$)/g, "");

    if(meeting_id==''||meeting_password1==''){
		alert('会议名或密码为空')
        return;
    }else{
        var checkData = {
            "mId":meeting_id,	//会议名称 string,
            "mPass":meeting_password1,	//会议密码 string,         
        };      
        $.ajax({         
            //请求方式
            type : "POST",
            dataType: "json",
            //请求的媒体类型
            contentType: "application/json;charset=UTF-8",
            //请求地址
            url : "http://117.78.9.153:24750/teamtalk/v1/meeting/checkMeetingPassword",
            //数据，json字符串
            data:JSON.stringify(checkData),
            //请求成功
            success : function(result) {                              
                if(result.code == 200){                   
					alert('加入成功');
                    document.getElementById("meeting_id").value = '';
                    document.getElementById("meeting_password1").value = '';
                    $('#myModal1').modal('hide');
                    var url="demo_meeting.html?id="+meeting_id+"";
				    window.location.href = url
                }else if(result.code == 400){
                    alert(result.message);
                }else if(result.code == 401){
                    var url="login.html";
                    window.location.href = url
                    alert(result.message);
                        
                }
            },
            error : function(e){
                console.log(e.message);                             
            }
        })
    }   	
}



function modal_join_meeting_submit(){
	var meeting_password2 = document.getElementById("modal_join_meeting_password").value.replace(/(^\s*)|(\s*$)/g, "");               
    // console.log(document.getElementById("meeting-item1"));
    var meeting_id = $("#modal_join_meeting_title").text().replace(/(^\s*)|(\s*$)/g, "");
    
    // var meeting_id = document.getElementById("modal_join_meeting_title").value.replace(/(^\s*)|(\s*$)/g, "");        
    // console.log(meeting_id,meeting_password2);
    // $('#meeting').on('show.bs.modal',function (e) {
    //     var id = $(e.relatedTarget).data('orderid'); //根据上面a标签中传递的data-orderid取值,这里也可以通过data-id取值
    //     console.log(id);
    // })
    if(meeting_password2==''){
		alert('密码为空')
        return;
    }else{
        var checkData = {
            "mId":meeting_id,	//会议名称 string,
            "mPass":meeting_password2,	//会议密码 string,         
        };      
        $.ajax({         
            //请求方式
            type : "POST",
            dataType: "json",
            //请求的媒体类型
            contentType: "application/json;charset=UTF-8",
            //请求地址
            url : "http://117.78.9.153:24750/teamtalk/v1/meeting/checkMeetingPassword",
            //数据，json字符串
            data:JSON.stringify(checkData),
            //请求成功
            success : function(result) {               
                if(result.code == 200){
					alert('加入成功');
                    document.getElementById("meeting_password1").value = '';
                    $('#meeting').modal('hide');
                    var url="demo_meeting.html?id="+meeting_id+"";
				    window.location.href = url
                }else if(result.code == 401){
                    var url="login.html";
                    window.location.href = url
                    alert(result.message);           
                }
            },
            error : function(e){
                console.log(e.message);                                
            }
        })
    }	
}

// var json1 = {
// "mId":'1',
// "mName":'点对点',	//会议名称 string,
// "mPass":'23',	//会议密码 string,
// "mType":'meeting_type',	//会议类型 string,"普通"｜"讲课"
// "mSec":	'meeting_sec',	//会议密级 string,
// "mDesc":'afra'
// }
// var json2 = {
//     "mId":'2',
//     "mName":'切切切',	//会议名称 string,
//     "mPass":'445',	//会议密码 string,
//     "mType":'meeting_type',	//会议类型 string,"普通"｜"讲课"
//     "mSec":	'meeting_sec',	//会议密级 string,
//     "mDesc":'meeeee'
//     }
// var meetingList = [json1,json2];
// var meetingUl = document.getElementById('meetingListGroup');
// $('meetingUl').html("");
// var liHead = document.createElement("li");
// liHead.innerHTML = '<li class="list-group-item active">' + '当前会议' +'</li>';
// meetingUl.appendChild(liHead);
// for(i = 0,len = meetingList.length; i < len; i++){
//     var li = document.createElement("li");
//     var meetingId = meetingList[i].mId;
//     var meetingPass = meetingList[i].mPass;
//     var meetingName = meetingList[i].mName;
//     var meetingDesc = meetingList[i].mDesc;
//     li.innerHTML = '<li class="list-group-item">\n'+
//     '<div id="meeting-item1" class="meeting-item" onclick="" data-toggle="modal" data-target="#meeting">'+meetingId+'.'+meetingName+'</div>'+
//     '<div class="modal fade" id="meeting" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'+
//     '<div class="modal-dialog">'+
//         '<div class="modal-content">'+
//             '<div class="modal-header">'+
//             ' <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'+
//                 '<h4 class="modal-title" id="myModalLabel">加入会议</h4>'+
//             '</div>'+
//             '<div class="modal-body">'+
//                 '<div class="form-group has-feedback">'+
//             ' <input type="password" id="meeting_password2" class="form-control"  placeholder="请输入密码" >'+
//                 '</div>' +                              
//             '</div>'+
//             '<div class="modal-footer">'+
//                 '<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>'+
//                 '<button type="button" class="btn btn-primary" onclick="meeting_join1();">加入会议</button>'+
//             '</div>'+
//         '</div>'+
//     '</div>'+
//     '</div>' +
//     '<span class="meetingInfo">'+ meetingDesc + '</span>'+
// '</li>'
// meetingUl.appendChild(li);
// }
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
        }
    },
    error :function(e){   
        console.log(e.message); 
    }
    })


$.ajax({
    //请求方式
    type : "POST",
    //请求的媒体类型
    contentType: "application/json;charset=UTF-8",
    //请求地址
    url : "http://117.78.9.153:24750/teamtalk/v1/meeting/getMeetingList",
    //数据，json字符串
    data : {
     
    },
    dataType:'json',
    xhrFields:{
        withCredentials:true
    },
    //请求成功
    success : function(result) {
        // console.log(typeof(result),result);
    //    var result = JSON.parse(result);
        if(result.code == 200){
            var meetingList = result.data;
            var meetingUl = document.getElementById('meetingListGroup');
            $('meetingUl').html("");
            var liHead = document.createElement("li");
            liHead.innerHTML = '<li class="list-group-item active">' + '当前会议' +'</li>';
            meetingUl.appendChild(liHead);
            for(let i = 0,len = meetingList.length; i < len; i++){
                let li = document.createElement("li");
                let meetingId = meetingList[i].mId;
                let meetingPass = meetingList[i].mPass;
                let meetingName = meetingList[i].mName;
                let meetingDesc = meetingList[i].mDesc;
                li.onclick = function(){
                  $("#modal_join_meeting_title").html(meetingId);
                }
                li.innerHTML = '<li class="list-group-item">\n'+
                                    '<div id="'+meetingId+'" class="meeting-item" data-toggle="modal" data-target="#modal_join_meeting">'+meetingId+'.'+meetingName+'</div>'+
                                    
                                    '<span class="meetingInfo">'+ meetingDesc + '</span>'+
                                '</li>';
                               
            meetingUl.appendChild(li);
        }
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
