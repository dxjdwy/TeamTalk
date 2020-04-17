function Pclogin(){	
	var condIdUser = document.getElementById('user').value;	
	var textUserII = condIdUser.replace(/(^\s*)|(\s*$)/g, "");
	if (textUserII == null || textUserII == "") {
		document.getElementById('Loginhive').style.display = 'block';
		document.getElementById('Loginhive').innerHTML ="用户名不可为空";
		return;
	}
	document.getElementById('Loginhive').style.display = 'none';
	// else if(textUserII != null || textUserII != ""){
	//     /*用户名正则表达式*/
	//     if (!(/^[a-zA-Z0-9]{1,50}$/.test(condIdUser))) {
	//     	vm.errorMsg = "用户名不合法";
	//         return;
	//     }else{
	//     	vm.errorMsg = "";
	//     }
	// }
}


function PcloginI(){
	var textPassword = document.getElementById('PasswordI').value;	
	var textPasswordII = textPassword.replace(/(^\s*)|(\s*$)/g, "");
	if (textPasswordII == null || textPasswordII == "") {
		document.getElementById('Loginhive').style.display = 'block';
		document.getElementById('Loginhive').innerHTML ="密码不可为空";
		return;
	}
	document.getElementById('Loginhive').style.display = 'none';
	//  else {
	//     /*用户密码正则表达式*/
	//     // if (!(/^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)[0-9A-Za-z]{6,11}$/.test(textPassword))) {
	//     if (!(/^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)[0-9A-Za-z]{6,11}$/.test(textPassword))) {
	//         vm.errFlag = true;
	//     	vm.errorMsg = "密码不合法";
	//         return;
	//     }else{
	//     	vm.errorMsg = "";
	//     }
	// }
		
}


function login(event) {			
	var condIdUser = document.getElementById('user').value;	
	var textUserII = condIdUser.replace(/(^\s*)|(\s*$)/g, "");
	if (textUserII == null || textUserII == "") {
		document.getElementById('Loginhive').style.display = 'block';
		document.getElementById('Loginhive').innerHTML ="用户名不可为空";
		return;
	}
	document.getElementById('Loginhive').style.display = 'none';
	// else {
	//     /*用户名正则表达式*/
	//     if (!(/^[a-zA-Z0-9]{1,50}$/.test(condIdUser))) {
	//         vm.errFlag = true;
	//     	vm.errorMsg = "用户名不合法";
	//         return;
	//     }else{
	//         vm.errFlag = false;
	//     }
	// }
	
	var textPassword = document.getElementById('PasswordI').value;	
	var textPasswordII = textPassword.replace(/(^\s*)|(\s*$)/g, "");
	if (textPasswordII == null || textPasswordII == "") {
		document.getElementById('Loginhive').style.display = 'block';
		document.getElementById('Loginhive').innerHTML ="密码不可为空";
		return;
	}
	document.getElementById('Loginhive').style.display = 'none';

	// else {
	//     /*用户密码正则表达式*/
	// 	if (!(/^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)[0-9A-Za-z]{6,11}$/.test(textPassword))) {
	//         vm.errFlag = true;
	//     	vm.errorMsg = "密码不合法";
	//         return;
	//     }else{
	//         vm.errFlag = false;
	//     	vm.errorMsg = "";
	//     }
	// };
	// if(vm.userMap.hasOwnProperty(textUserII)){
	// 	console.log(vm.userMap[textUserII],textPasswordII);
		
	// 	if(vm.userMap[textUserII] == textPasswordII){
	// 		alert('登录成功');					
	// 	}else{
	// 		alert('密码不正确');
	// 		return;
	// 	}
	// }else{
	// 	alert('用户名不存在');
	// 	return;
	// }


	// var data = "username="+vm.username+"&password="+vm.password+"&captcha="+vm.captcha;
	// $.ajax({
	// 	type: "POST",
	//     url: "login",
	//     data: data,
	//     dataType: "json",
	//     success: function(result){
	//     	console.log(result);
	// 		if(result.code == 0){//登录成功
	// 			parent.location.href ='index.html';
	// 			console.log(result.code);
	// 		}else{
	// 			$("#Loginhive")[0].style.display = 'block';
	// 			vm.error = true;
	// 			vm.errorMsg = result.msg;
	// 			vm.refreshCode();
	// 		}
	// 		/* else if(result.code == "2"){
	// 			vm.error = true;
	// 			vm.Password = result.msg;
	// 			vm.refreshCode();
	// 		}
	// 		else if(result.code == "3"){
	// 			vm.error = true;
	// 			vm.errorMsg = result.msg;
	// 			vm.refreshCode();
	// 		} */
	// 	}
	// });
	$.ajax({
		//请求方式
		type : "POST",
		//请求的媒体类型
		contentType: "application/json;charset=UTF-8",
		//请求地址
		url : "http://117.78.9.153:24750/user/login",
		//数据，json字符串
		data : {
			uName:textUserII,
			uPass:textPasswordII
			
		},
		//请求成功
		success : function(result) {
			if(result.code == 200){
				alert('登录成功');
				var url="meeting_index.html";
				window.location.href = url
			}
		},
		//请求失败，包含具体的错误信息
		error : function(e){
			console.log(e.message);			
		}
	});
}

var userMap = {};
function reg_submit(){
	var reg_username = document.getElementById("reg_username").value.replace(/(^\s*)|(\s*$)/g, "");
	var reg_passwordI = document.getElementById("reg_passwordI").value.replace(/(^\s*)|(\s*$)/g, "");
	var reg_passwordII = document.getElementById("reg_passwordII").value.replace(/(^\s*)|(\s*$)/g, "");
	if(reg_username==''||reg_passwordI==''){
		alert('用户名或密码为空')
		return;
	}else if(reg_passwordI !=reg_passwordII){
		alert('密码不一致')
		return;
	}else if(userMap.hasOwnProperty(reg_username)){
		alert("用户名已注册");
		return;
	}else{
		userMap[reg_username] = reg_passwordI;

		$.ajax({
            //请求方式
            type : "POST",
            //请求的媒体类型
            contentType: "application/json;charset=UTF-8",
            //请求地址
            url : "http://117.78.9.153:24750/user/addUser",
            //数据，json字符串
            data : {
				uId:'1234',
				uName:reg_username,
				uPass:reg_passwordI
				
			},
            //请求成功
            success : function(result) {
                if(result.code == 200){
					alert('注册成功');
					document.getElementById("reg_username").value = '';
					document.getElementById("reg_passwordI").value = '';
					document.getElementById("reg_passwordII").value = '';
					$('#myModal').modal('hide');
				}
            },
            //请求失败，包含具体的错误信息
            error : function(e){
				console.log(e.message);
				
            }
        });

		
		
	}			
}

function reg_cancel(){
    document.getElementById("reg_username").value = '';
    document.getElementById("reg_passwordI").value = '';
    document.getElementById("reg_passwordII").value = '';
}

