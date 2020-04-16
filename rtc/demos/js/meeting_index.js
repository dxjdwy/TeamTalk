var userMap = {};
function meeting_submit(){
	var meeting_username = document.getElementById("meeting_username").value.replace(/(^\s*)|(\s*$)/g, "");
	var meeting_passwordI = document.getElementById("meeting_passwordI").value.replace(/(^\s*)|(\s*$)/g, "");
	var meeting_passwordII = document.getElementById("meeting_passwordII").value.replace(/(^\s*)|(\s*$)/g, "");
    var meeting_info = document.getElementById("meeting_info").value.replace(/(^\s*)|(\s*$)/g, "");

    if(meeting_username==''||meeting_passwordI==''){
		alert('会议名或密码为空')
		return;
	}else if(meeting_passwordI !=meeting_passwordII){
		alert('密码不一致')
		return;
	}else if(userMap.hasOwnProperty(meeting_username)){
		alert("会议名已注册");
		return;
	}else{
		userMap[meeting_username] = meeting_passwordI;
		alert('创建成功');
		document.getElementById("meeting_username").value = '';
		document.getElementById("meeting_passwordI").value = '';
        document.getElementById("meeting_passwordII").value = '';
        document.getElementById("meeting_info").value = '';
		$('#myModal').modal('hide');
	}			
}

function meeting_cancel(){
    document.getElementById("meeting_username").value = '';
    document.getElementById("meeting_passwordI").value = '';
    document.getElementById("meeting_passwordII").value = '';
    document.getElementById("meeting_info").value = '';
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

function meeting_cancel_search(){
    document.getElementById("meeting_id").value = '';
    document.getElementById("meeting_password1").value = '';
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


