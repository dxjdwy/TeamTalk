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
                if(result.data == 1){
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

function user_cancel(){
    document.getElementById("role_type").value = '';
}



function role_management(){
    var role_type = document.getElementById("role_type").value; 
    var userId = $("#userId").text().replace(/(^\s*)|(\s*$)/g, "");
              
    if(role_type==''){
		alert('权限为空')
        return;
    }else{
        var checkData = {
            "userId":userId,	
            "userRole":role_type,	        
        };      
        $.ajax({         
            //请求方式
            type : "POST",
            dataType: "json",
            //请求的媒体类型
            contentType: "application/json;charset=UTF-8",
            //请求地址
            url : "http://117.78.9.153:24750/teamtalk/v1/user/updateUser",
            //数据，json字符串
            data:JSON.stringify(checkData),
            //请求成功
            success : function(result) {               
                if(result.code == 200){
					alert('修改成功');
                    document.getElementById("role_type").value = '';
                    $('#userModal').modal('hide');
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
// "userId":'1',
// "userName":'点对点',	//会议名称 string,
// "userSec":	'1',	//会议密级 string,
// "userRole":'afra'
// }
// var json2 = {
//     "userId":'2',
//     "userName":'wwww',	//会议名称 string,
//     "userSec":	'2',	//会议密级 string,
//     "userRole":'qwqe'
//     }
// var meetingList = [json1,json2];
// var meetingUl = document.getElementById('meetingListGroup');
// $('#meetingListGroup li').remove();
// var liHead = document.createElement("li");
// liHead.innerHTML = '<li class="list-group-item active">' + '当前会议' +'</li>';
// meetingUl.appendChild(liHead);
// for(let i = 0,len = meetingList.length; i < len; i++){
//     let li = document.createElement("li");
//     let userId = meetingList[i].userId;
//     let userName = meetingList[i].userName;
//     let userSec = meetingList[i].userSec;
//     let userRole = meetingList[i].userRole;

    
//     li.innerHTML = '<li class="list-group-item">\n'+
//     '<div id="meeting-item1" class="meeting-item" onclick="" data-toggle="modal" data-target="#meeting">'+userId+'.'+userName+'</div>'+
//     '<div class="modal fade" id="meeting" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'+
//     '<div class="modal-dialog">'+
//         '<div class="modal-content">'+
//             '<div class="modal-header">'+
//             ' <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'+
//                 '<h4 class="modal-title" id="myModalLabel">加入会议</h4>'+
//             '</div>'+
//             '<div class="modal-body">'+
//                 '<div class="form-group has-feedback">'+
//             ' <input type="password" id="meeting_password2" class="form-control"  placeholder="请输入密码" >'+userId+
//                 '</div>' +                              
//             '</div>'+
//             '<div class="modal-footer">'+
//                 '<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>'+
//                 '<button type="button" class="btn btn-primary" onclick="meeting_join1();">加入会议</button>'+
//             '</div>'+
//         '</div>'+
//     '</div>'+
//     '</div>' +
//     '<span class="meetingInfo">'+ userSec + '</span>'+
// '</li>'
// meetingUl.appendChild(li);
// }


$.ajax({
    //请求方式
    type : "POST",
    //请求的媒体类型
    contentType: "application/json;charset=UTF-8",
    //请求地址
    url : "http://117.78.9.153:24750/teamtalk/v1/user/getUserList",
    //数据，json字符串

    //请求成功
    success : function(result) {
        if(result.code == 200){
            var userList = result.data;
            var userUl = document.getElementById('userListGroup');
            $('#userListGroup li').remove();
            var liHead = document.createElement("li");
            liHead.innerHTML = '<li class="list-group-item active">' + '管辖人员' +'</li>';
            userUl.appendChild(liHead);
            
            for(i = 0,len = userList.length; i < len; i++){
                let li = document.createElement("li");
                let userId = userList[i].userId;
                let userName = userList[i].userName;
                // let userSec = userList[i].userSec;
                let userRole = userList[i].userRole;
                li.onclick= function(){
                    $("#userId").html(userId);
                }
                
                li.innerHTML = '<li class="list-group-item">\n'+
                '<div id="" class="meeting-item" onclick="" data-toggle="modal" data-target="#userModal">'+userId+'.'+userName+'</div>'+
                
                '<span class="meetingInfo">'+ userRole + '</span>'+
            '</li>'
            userUl.appendChild(li);
        }
    }else if(result.code == 401){
        var url="login.html";
        window.location.href = url
        alert(result.message);
            
    }
},
error:function(e){
    
    console.log(e.message); 
}
})
