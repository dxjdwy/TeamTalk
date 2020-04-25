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
          window.location.href = url;
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

// function detailFormatter(index, row) {
//   var html = []
//   $.each(row, function (key, value) {
//     html.push('<p><b>' + key + ':</b> ' + value + '</p>')
//   })
//   return html.join('')
// }

// function operateFormatter(value, row, index) {
//   return [
//     '<a class="like" href="javascript:void(0)" title="Like">',
//     '<i class="fa fa-heart"></i>',
//     '</a>  ',
//     '<a class="remove" href="javascript:void(0)" title="Remove">',
//     '<i class="fa fa-trash"></i>',
//     '</a>'
//   ].join('')
// }

// window.operateEvents = {
//   'click .like': function (e, value, row, index) {
//     alert('You click like action, row: ' + JSON.stringify(row))
//   },
//   'click .remove': function (e, value, row, index) {
//     $table.bootstrapTable('remove', {
//       field: 'id',
//       values: [row.id]
//     })
//   }
// }

// function totalTextFormatter(data) {
//   return 'Total'
// }

// function totalNameFormatter(data) {
//   return data.length
// }

// function totalPriceFormatter(data) {
//   var field = this.field
//   return '$' + data.map(function (row) {
//     return +row[field].substring(1)
//   }).reduce(function (sum, i) {
//     return sum + i
//   }, 0)
// }

function initTable() {
  $table.bootstrapTable('destroy').bootstrapTable({
    ajax:function(request){                    
        $.ajax({
            type : "POST",
            dataType: "json",
            //请求的媒体类型
            contentType: "application/json;charset=UTF-8",
            //请求地址
            url : "http://117.78.9.153:24750/teamtalk/v1/log/getLogs",
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
        title: '用户ID',
        field: 'id',
        rowspan: 2,
        align: 'center',
        valign: 'middle',
        sortable: true,
        width:150,
        // footerFormatter: totalTextFormatter
      }, {
        title: '变更记录',
        colspan: 4,
        align: 'center',
      }],
      [{
        field: 'eventUserId',
        title: '姓名',
        sortable: false,
        // footerFormatter: totalNameFormatter,
        align: 'center'
      }, {
        field: 'eventUserRole',
        title: '角色',
        sortable: false,
        align: 'center',
      },{
        field: 'eventName',
        title: '操作',
        sortable: false,
        align: 'center',
        width:300,
      },{
        field: 'createTime',
        title: '时间',
        sortable: false,
        align: 'center',
        width:300,
      }]
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


