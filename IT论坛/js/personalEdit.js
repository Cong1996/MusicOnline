let editButton=document.getElementById('editMessageButton'),
	personalArea=document.getElementById('personalArea'),
	personalDataArea=document.getElementById('personalDataArea'),
	returnMainButton=document.getElementById('returnMainButton'),
	fixedTool=document.getElementById('fixedTool'),
	userJson;
editButton.onclick=disappear;
returnMainButton.onclick=disappear;
/*切换信息区域*/
function disappear(){
	personalArea.classList.toggle('disappear');
	personalDataArea.classList.toggle('disappear');
}

/*上传图片*/
function uploadFiles(){ 
	let excelFile=document.getElementById('excelFile');
	if(excelFile.files[0].size>5000000){
		coolAlert('图片不能大于5M');
	}
	else{
		let uploadFile = new FormData(document.getElementById("file"));
		if("undefined" != typeof(uploadFile) && uploadFile != null && uploadFile != ""){
		let	xhr=new XMLHttpRequest();
			xhr.open('post','http://202.116.162.57:8080/se52/userimg.do',true);
			xhr.send(uploadFile);
			xhr.onreadystatechange=function(){
				if(xhr.readyState==4){
					if(xhr.status==200){
						updateUser('user_img',xhr.responseText);
						changePhoto(xhr.responseText);
					}
				}
			}
		}
	}
}   

/*弹窗*/
function coolAlert(str){
	let coolAlert=document.getElementById('coolAlert');
	coolAlert.innerText=str;
	coolAlert.classList.add('coolAlertShow');
	setTimeout(function(){
		coolAlert.classList.remove('coolAlertShow');
	},3000);
}

/*获取数据*/
function getUserMessage(){
	let xhr=new XMLHttpRequest();
	xhr.open('post','http://202.116.162.57:8080/se52/user/check.do',true);
	xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xhr.send("id="+localStorage.getItem('nowUserId'));
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4){
			if(xhr.status==200){
				userJson=(JSON.parse(xhr.responseText));
				fixedTool.classList.remove('disappear');
				showUserMessage((JSON.parse(xhr.responseText))['userinfo']);
			}
		}
	}
}

/*更新显示数据*/
function showUserMessage(str){
	changePhoto(str['user_img']);
	changeName(str['user_name']);
	document.getElementById('tel').value=str['user_tel'];
	document.getElementById('email').value=str['user_email'];
}

/*更新数据*/
function updateUser(key,value){
	userJson['userinfo'][key]=value;
	let str="";
	for(let [key,value] of Object.entries(userJson['userinfo'])){
		let substr=key+'='+value;
		str+=substr;
		if(key!='user_img')
		str+='&';
	}
	if(userJson){
		let xhr=new XMLHttpRequest;
			xhr.open('post',"http://202.116.162.57:8080/se52/user/modify.do",true);
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			xhr.send(str);
			xhr.onreadystatechange=function(){
				if(xhr.readyState==4){
					if(xhr.status==200){
						if(JSON.parse(xhr.responseText)['modifyResult']=='修改成功!'){
							coolAlert('更新数据成功');
						}
						else{
							coolAlert('更新数据失败');
						}
						
					}
				}
			}
			
	}
	else{
		coolAlert('数据加载中');
	}
}
/*改变图片显示*/
function changePhoto(url){
	document.getElementById("userPhoto").src="http://202.116.162.57:8080"+url;
	document.getElementById("navUserPhoto").src="http://202.116.162.57:8080"+url;
	document.getElementById("personalUserPhoto").src="http://202.116.162.57:8080"+url;
}
function changeName(str){
	document.getElementById('personalName').innerText=str;
	document.getElementById('userName').value=str;
}

/*监听修改信息*/
personalDataArea.addEventListener('click',function(e){
	let pattern;
	switch(e.target.id){
		case 'userNameSave':
			updateUser('user_name',document.getElementById('userName').value);
			break;
		case 'userTelSave':
			pattern=/^[0-9]+$/;
			if(pattern.test(document.getElementById('tel').value)){
			updateUser('user_tel',document.getElementById('tel').value);
			}
			else{
				coolAlert('电话号码只可以是数字！！');
			}
			break;
		case 'userEmailSave':
			pattern=/^[a-zA-Z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
			if(pattern.test(document.getElementById('email').value)){
				updateUser('user_email',document.getElementById('email').value);
			}
			else{
				coolAlert('邮箱格式错误');
			}
			break;
		case 'updatePassword':
			if(document.getElementById('oldPassword').value!=userJson['userinfo']['user_password']){
				coolAlert('密码输入错误');
			}
			else{
				if(document.getElementById('newPassword').value!=
					document.getElementById('newPasswordAgain').value){
					coolAlert('前后密码不一致');
				}
				else{
				updateUser('user_password',document.getElementById('newPasswordAgain').value)
				break;
				}
			}
		}
});

/*工具栏监听*/
fixedTool.addEventListener('click',function(e){
	switch(e.target.id){
		case 'signOut':
			delete localStorage.nowUserId;
			window.location.href="index.html";
	}
});

window.onload=function(){
	if(localStorage.nowUserId)
	getUserMessage();
	else{
		window.location.href="index.html";
	}
}