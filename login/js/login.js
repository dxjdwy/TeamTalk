var vm = new Vue({
	el:'#rrapp',
	data:{
		username: '',
		password: '',
		captcha: '',
		error: false,
		errorMsg: '',
		user:'',
		Password:'',
        src: 'captcha.jpg',
		errFlag:false,
		userMap:{'aaa':'111','bbb':'222'},
		username1:'',
		password1:'',
		password2:'',
		errorMsg1:'',
		errFlag1:false,
	},
	beforeCreate: function(){
		if(self != top){
			top.location.href = self.location.href;
		}
	},
	methods: {
		// refreshCode: function(){
		// 	this.src = "captcha.jpg?t=" + $.now();
		// },
		
		Pclogin: function(){
			var condIdUser = this.username;		
		    var textUserII = condIdUser.replace(/(^\s*)|(\s*$)/g, "");
		    if (textUserII == null || textUserII == "") {
                vm.errFlag = true;
		    	vm.errorMsg = "用户名不可为空";
		        return;
            }
            // else if(textUserII != null || textUserII != ""){
		    //     /*用户名正则表达式*/
		    //     if (!(/^[a-zA-Z0-9]{1,50}$/.test(condIdUser))) {
		    //     	vm.errorMsg = "用户名不合法";
		    //         return;
		    //     }else{
		    //     	vm.errorMsg = "";
		    //     }
		    // }
		},
		
		
		PcloginI: function(){
			var textPassword = this.password;
		    var textPasswordII = textPassword.replace(/(^\s*)|(\s*$)/g, "");
		    if (textPasswordII == null || textPasswordII == "") {
                vm.errFlag = true;
		        vm.errorMsg = "密码不可为空";
		        return;
            }
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
			  
		},
		
		
		login: function (event) {			
			var condIdUser = this.username;
		    var textUserII = condIdUser.replace(/(^\s*)|(\s*$)/g, "");
		    if (textUserII == null || textUserII == "") {
                vm.errFlag = true;
		    	vm.errorMsg = "用户名不可为空";
		        return;
            } 
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
		    
			var textPassword = this.password;
		    var textPasswordII = textPassword.replace(/(^\s*)|(\s*$)/g, "");
		    if (textPasswordII == null || textPasswordII == "") {
                vm.errFlag = true;
		        vm.errorMsg = "密码不可为空";
		        return;
            } 
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
			if(vm.userMap.hasOwnProperty(textUserII)){
				console.log(vm.userMap[textUserII],textPasswordII);
				
				if(vm.userMap[textUserII] == textPasswordII){
					alert('登录成功');					
				}else{
					alert('密码不正确');
					return;
				}
			}else{
				alert('用户名不存在');
				return;
			}
			
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
		},
		
	}
});
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
	}else if(vm.userMap.hasOwnProperty(reg_username)){
		alert("用户名已注册");
		return;
	}else{
		vm.userMap[reg_username] = reg_passwordI;
		alert('注册成功');
		document.getElementById("reg_username").value = '';
		document.getElementById("reg_passwordI").value = '';
		document.getElementById("reg_passwordII").value = '';
		$('#myModal').modal('hide');
	}
			
}