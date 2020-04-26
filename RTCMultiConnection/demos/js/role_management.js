
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
            console.log(result,'ssssssss');
            
            $("#userInfo").text(result.data.username);
            if(result.data.userRole == "1"){
                $("#log_manager").hide();
                $("#role_type_div").hide();
            }else if(result.data.userRole == "2"){
                $("#role_password_div1").hide();
                $("#role_password_div2").hide();
            }
        }else if(result.code == 401){
            var url = "login.html"
            window.location.href(url);
        console.log(e.message);
    }
    },
    //请求失败，包含具体的错误信息
    error : function(e){
        console.log(e.message);
        
    }
});		


function user_cancel(){
    document.getElementById("role_password1").value='';
    document.getElementById("role_password2").value='';
}



function role_management(){    
    var role_type = document.getElementById("role_type").value; 
    var userId = $("#userId").text().replace(/(^\s*)|(\s*$)/g, "");
    var role_password1 = document.getElementById("role_password1").value.replace(/(^\s*)|(\s*$)/g, ""); 
    var role_password2 = document.getElementById("role_password2").value.replace(/(^\s*)|(\s*$)/g, ""); 
    console.log(userId,role_type,role_password1);
            
   
    if(role_password1 != role_password2){
        alert('密码输入错误')
        return;
    }else{
        var checkData = {
            "userId":userId,	
            "userRole":role_type,
            "userPass":	role_password2        
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
            xhrFields:{
                withCredentials:true
            },
            //请求成功
            success : function(result) {               
                if(result.code == 200){
					alert('修改成功');
                    document.getElementById("role_password1").value='';
                    document.getElementById("role_password2").value='';
                    $('#userModal').modal('hide');
                    // roleList();
                    initTable();
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



// function roleList(){ 
//     $.ajax({
//         //请求方式
//         type : "POST",
//         //请求的媒体类型
//         contentType: "application/json;charset=UTF-8",
//         //请求地址
//         url : "http://117.78.9.153:24750/teamtalk/v1/user/getUserList",
//         //数据，json字符串
//         xhrFields:{
//             withCredentials:true
//         },
//         dataType: "json",
//         //请求成功
//         success : function(result) {
//             if(result.code == 200){
//                 var userList = result.data;
//                 var userUl = document.getElementById('userListGroup');
//                 $('#userListGroup li').remove();
//                 var liHead = document.createElement("li");
//                 liHead.innerHTML = '<li class="list-group-item active">' + '管辖人员' +'</li>';
//                 userUl.appendChild(liHead);
                
//                 for(i = 0,len = userList.length; i < len; i++){
//                     let li = document.createElement("li");
//                     let userId = userList[i].userId;
//                     let userName = userList[i].username;
//                     // let userSec = userList[i].userSec;
//                     let userRole = userList[i].userRole;
//                     li.onclick= function(){
//                         $("#userId").html(userId);
//                         $("#role_type").val(userRole);
//                     }
                    
//                     li.innerHTML = '<li class="list-group-item">\n'+
//                     '<div id="" class="meeting-item" onclick="" data-toggle="modal" data-target="#userModal">'+userId+'.'+userName+'</div>'+
                    
//                     '<span class="meetingInfo">'+ userRole + '</span>'+
//                     '</li>'
//                     userUl.appendChild(li);
//                 }
//             }else if(result.code == 401){
//                 var url="login.html";
//                 window.location.href = url
//                 alert(result.message);
                    
//             }
//         },
//     error:function(e){
        
//         console.log(e.message); 
//     }
//     })
// };
// window.onload = roleList();

var $table = $('#table')

var selections = []

function getIdSelections() {
    // console.log($table.bootstrapTable('getSelections'));
    
  return $.map($table.bootstrapTable('getSelections'), function (row) {
    return row.id
  })
}

function responseHandler(res) {
  $.each(res.rows, function (i, row) {
    row.state = $.inArray(row.id, selections) !== -1
  })
  return res
}

function initTable() {
    $table.bootstrapTable('destroy').bootstrapTable({
      ajax:function(request){                    
          $.ajax({
              type : "POST",
              dataType: "json",
              //请求的媒体类型
              contentType: "application/json;charset=UTF-8",
              //请求地址
              url : "http://117.78.9.153:24750/teamtalk/v1/user/getUserList",
              //数据，json字符串
              // data:JSON.stringify(postData),
              xhrFields:{
                  withCredentials:true
              },             
              success:function (res) {
                if(res.code == 200){
                  // console.log(res);
                  
                  request.success({
                    row:res.data,
                  });
                  $('#table').bootstrapTable('load', res.data);
                }else if(res.code == 401){
                    var url = "login.html"
                    window.location.href = url;
                    console.log(e.message);
                }                
              },
              error:function(error){
                  console.log(error);
              }
          })
      },
      height: 550,
      locale: $('#locale').val(),
      columns: [
        // [{
        //   field: 'state',
        //   checkbox: false,
        //   rowspan: 2,
        //   align: 'center',
        //   valign: 'middle'
        // }, {
        [{
          title: "序号",
          field: 'id',
          rowspan: 2,
          align: 'center',
          valign: 'middle',
          sortable: true,
          width:150,
          formatter: indexMethod
          
          // footerFormatter: totalTextFormatter
        }, {
          title: '用户详情',
          colspan: 4,
          align: 'center',
        }],
        [{
            title: '用户ID',
            field: 'userId',
            // rowspan: 2,
            align: 'center',
            valign: 'middle',
            sortable: true,
            width:150,
            // footerFormatter: totalTextFormatter
          },{
          field: 'username',
          title: '姓名',
          sortable: false,
          // footerFormatter: totalNameFormatter,
          align: 'center'
        },{
          field: 'userRole',
          title: '角色',
          sortable: false,
          align: 'center',
          width:300,
        }
        ,{
            field: 'operate',
            title: '修改',
            align: 'center',
            clickToSelect: false,
            events: window.operateEvents,
            formatter: operateFormatter
          }
        ]
      ]
    })
    // $table.on('check.bs.table uncheck.bs.table ' +
    //   'check-all.bs.table uncheck-all.bs.table',
    // function () {
    //   $remove.prop('disabled', !$table.bootstrapTable('getSelections').length)
  
    //   // save your data, here just save the current page
    //   selections = getIdSelections()
    //   // push or splice the selections if you want to save all data selections
    // })
    // $table.on('all.bs.table', function (e, name, args) {
    //   console.log(name, args)
    // })
  //   $remove.click(function () {
  //     var ids = getIdSelections()
  //     $table.bootstrapTable('remove', {
  //       field: 'id',
  //       values: ids
  //     })
  //     $remove.prop('disabled', true)
  //   })
  }
  
  $(function() {
    initTable()
  
    $('#locale').change(initTable)
  })
  
  function user_cancel(){
    document.getElementById("role_password1").value='';
    document.getElementById("role_password2").value='';
  }

  function operateFormatter(value, row, index) {
    return [
      '<a class="remove" href="javascript:void(0)" title="Remove">',
      '<i class="fa fa-pencil"></i>',
      '</a>'
    ].join('')
  }

  window.operateEvents = {
    'click .remove': function(e, value, row, index) {
        $('#userModal').modal();
        $("#role_type").val(row.userRole);
        $("#userId").html(row.userId);
        console.log(row);       
    }
  }

  function indexMethod(value, row, index) {
    return index + 1;
  }

