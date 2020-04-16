## IP 117.78.9.153:24750
## 1.用户 TODO

### 1.1新建用户

### 1.2编辑用户

### 1.3鉴权



## 2.会议

### 2.1获取会议列表

#### 	URI

```URI GET 	/teamtalk/v1/meeting/getMeetingList
 GET /teamtalk/v1/meeting/getMeetingList
```

#### 	参数

```json
{}
```

#### 	返回

```json
{
  "code":200,	//返回消息码
  "message":"SUCCESS",	//返回消息内容
  "data":	//返回数据json
		[
			{
				“mId”:	//会议ID string,后台生成
        “mAccessId”:	//加入会议的唯一标识
				“mName”:	//会议名称 string,
				“mPass”:	//会议密码 string,
				“mType”:	//会议类型 string,
				“mSec”:	//会议密级 string,
				“mDesc”:	//会议描述 string,
      
        "mCreateTime"://创建人时间 string,
        "mBeginTime"://会议开始时间 string,
        "mEndTime"://会议结束时间 string,
        "createrId"://创建人ID string,
        //  "mCreater"://创建人,
      	//  	{
      	//  		"uId"://创建人ID string,
      	//  		"uName"://创建人名称 string,
      	//		},
			}
		]	

}
```



### 2.2新建会议

#### 	URI

```URI 
 POST /teamtalk/v1/meeting/addMeeting
```

#### 	参数

```json
{
  “mAccessId”:	//加入会议的唯一标识，easyRTC生成？
	“mName”:	//会议名称 string,
	“mPass”:	//会议密码 string,
	“mType”:	//会议类型 string,"普通"｜"讲课"
	“mSec”:	//会议密级 string,"绝密"|"机密"|"秘密"|"内部"|"公开"
	“mDesc”:	//会议描述 string,
  "mCreaterId"://创建人ID string,
  "mCreateTime"://创建人时间 string,
  "mBeginTime"://会议开始时间 string,
  "mEndTime"://会议结束时间 string,
}
```

#### 	返回

```json
{
  "code":200,	//返回消息码
  "message":"SUCCESS",	//返回消息内容
  
}
```

### 2.3编辑会议TODO

