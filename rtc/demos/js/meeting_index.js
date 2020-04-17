// var userMap = {};
function meeting_submit(){
	var meeting_username = document.getElementById("meeting_username").value.replace(/(^\s*)|(\s*$)/g, "");
	var meeting_passwordI = document.getElementById("meeting_passwordI").value.replace(/(^\s*)|(\s*$)/g, "");
    var meeting_passwordII = document.getElementById("meeting_passwordII").value.replace(/(^\s*)|(\s*$)/g, "");
    var meeting_type = document.getElementById("meeting_type").value;
    var meeting_sec = document.getElementById("meeting_sec").value;
    var meeting_info = document.getElementById("meeting_info").value.replace(/(^\s*)|(\s*$)/g, "");

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
    // }else if(userMap.hasOwnProperty(meeting_username)){
	// 	alert("会议名已注册");
    //     return;   
	}else{
        // userMap[meeting_username] = meeting_passwordI;
        $.ajax({
            //请求方式
            type : "POST",
            //请求的媒体类型
            contentType: "application/json;charset=UTF-8",
            //请求地址
            url : "http://117.78.9.153:24750/teamtalk/v1/meeting/addMeeting",
            //数据，json字符串
            data : {
				"mName":meeting_username,	//会议名称 string,
                "mPass":meeting_passwordI,	//会议密码 string,
                "mType":meeting_type,	//会议类型 string,"普通"｜"讲课"
                "mSec":	meeting_sec,	//会议密级 string,
                "mDesc":meeting_info,	//会议描述 string,
				
			},
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
                    var meetingList = result.data;
                    var meetingUl = document.getElementById('meeting-list-group');
                    for(i = 0,len = meetingList.length; i < len; i++){
                        
                    }
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
	}else if(!userMap.hasOwnProperty(meeting_id)){
        console.log(userMap);
        
		alert("会议不存在");
		return;
    }else if(userMap[meeting_id] != meeting_password1){
		alert("密码不正确");
		return;
    }else{	
		alert('加入成功');
		document.getElementById("meeting_id").value = '';
		document.getElementById("meeting_password1").value = '';
		$('#myModal1').modal('hide');
	}			
}

function meeting_join1(){
	var meeting_password2 = document.getElementById("meeting_password2").value.replace(/(^\s*)|(\s*$)/g, "");    
    if(meeting_password2==''){
		alert('密码为空')
		return;
    // }else if(userMap[meeting_id] != meeting_password1){
	// 	alert("密码不正确");
	// 	return;
    }else{	
		alert('加入成功');
		document.getElementById("meeting_password2").value = '';
		$('#meeting1').modal('hide');
	}			
}


