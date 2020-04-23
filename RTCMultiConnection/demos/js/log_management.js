
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
            if(result.data.userRole == "3"){
                $("#role_manager").hide();
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

var $table = $('#table')

var selections = []

  function getIdSelections() {
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

  function detailFormatter(index, row) {
    var html = []
    $.each(row, function (key, value) {
      html.push('<p><b>' + key + ':</b> ' + value + '</p>')
    })
    return html.join('')
  }

  function operateFormatter(value, row, index) {
    return [
      '<a class="like" href="javascript:void(0)" title="Like">',
      '<i class="fa fa-heart"></i>',
      '</a>  ',
      '<a class="remove" href="javascript:void(0)" title="Remove">',
      '<i class="fa fa-trash"></i>',
      '</a>'
    ].join('')
  }

  window.operateEvents = {
    'click .like': function (e, value, row, index) {
      alert('You click like action, row: ' + JSON.stringify(row))
    },
    'click .remove': function (e, value, row, index) {
      $table.bootstrapTable('remove', {
        field: 'id',
        values: [row.id]
      })
    }
  }

  function totalTextFormatter(data) {
    return 'Total'
  }

  function totalNameFormatter(data) {
    return data.length
  }

  function totalPriceFormatter(data) {
    var field = this.field
    return '$' + data.map(function (row) {
      return +row[field].substring(1)
    }).reduce(function (sum, i) {
      return sum + i
    }, 0)
  }

  function initTable() {
    $table.bootstrapTable('destroy').bootstrapTable({
      height: 550,
      locale: $('#locale').val(),
      columns: [
        [{
          field: 'state',
          checkbox: true,
          rowspan: 2,
          align: 'center',
          valign: 'middle'
        }, {
          title: 'Item ID',
          field: 'id',
          rowspan: 2,
          align: 'center',
          valign: 'middle',
          sortable: true,
          footerFormatter: totalTextFormatter
        }, {
          title: 'Item Detail',
          colspan: 3,
          align: 'center'
        }],
        [{
          field: 'name',
          title: 'Item Name',
          sortable: true,
          footerFormatter: totalNameFormatter,
          align: 'center'
        }, {
          field: 'price',
          title: 'Item Price',
          sortable: true,
          align: 'center',
          footerFormatter: totalPriceFormatter
        }, {
          field: 'operate',
          title: 'Item Operate',
          align: 'center',
          clickToSelect: false,
          events: window.operateEvents,
          formatter: operateFormatter
        }]
      ]
    })
    $table.on('check.bs.table uncheck.bs.table ' +
      'check-all.bs.table uncheck-all.bs.table',
    function () {
      $remove.prop('disabled', !$table.bootstrapTable('getSelections').length)

      // save your data, here just save the current page
      selections = getIdSelections()
      // push or splice the selections if you want to save all data selections
    })
    $table.on('all.bs.table', function (e, name, args) {
      console.log(name, args)
    })
    $remove.click(function () {
      var ids = getIdSelections()
      $table.bootstrapTable('remove', {
        field: 'id',
        values: ids
      })
      $remove.prop('disabled', true)
    })
  }

  $(function() {
    initTable()

    $('#locale').change(initTable)
  })

function user_cancel(){
    document.getElementById("role_password1").value='';
    document.getElementById("role_password2").value='';
}



function role_management(){

    var role_type = document.getElementById("role_type").value; 
    var userId = $("#userId").text().replace(/(^\s*)|(\s*$)/g, "");
    var role_password1 = document.getElementById("role_password1").value.replace(/(^\s*)|(\s*$)/g, ""); 
    var role_password2 = document.getElementById("role_password2").value.replace(/(^\s*)|(\s*$)/g, ""); 
    console.log(role_type,role_password1);
            
   
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
                    roleList();
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



function logList(){ 
    $.ajax({
        //请求方式
        type : "POST",
        //请求的媒体类型
        contentType: "application/json;charset=UTF-8",
        //请求地址
        url : "http://117.78.9.153:24750/teamtalk/v1/log/getlogs",
        //数据，json字符串
        xhrFields:{
            withCredentials:true
        },
        dataType: "json",
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
                        $("#role_type").val(userRole);
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
};
// window.onload = roleList();