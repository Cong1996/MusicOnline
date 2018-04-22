var signInUserNameInput=document.getElementById('signInUserNameInput'),
	signInUserPasswordInput=document.getElementById('signInUserPasswordInput'),
	signInUserPhoneInput=document.getElementById('signInUserPhoneInput'),
	signInNameExisted=document.getElementById('signInNameExisted'),
	signInWrongNumber=document.getElementById('signInWrongNumber'),
	signInEmptyInput=document.getElementById('signInEmptyInput'),
	signInNow=document.getElementById('signInNow'),
	buttonList=document.getElementById('buttonList'),
	loginNow=document.getElementById('loginNow'),
	loginUserNameInput=document.getElementById('loginUserNameInput'),
	loginUserPasswordInput=document.getElementById('loginUserPasswordInput');
	//读取用户信息，便于对比昵称是否被占用
window.onload=function(){
};
	function getServerDate(){//获取服务器时间
    var xhr = null;
    if(window.XMLHttpRequest){
      xhr = new window.XMLHttpRequest();
    }else{ // ie
      xhr = new ActiveObject("Microsoft")
    }
    xhr.open("GET","/",false)//false不可变
    xhr.send(null);
    var date = xhr.getResponseHeader("Date");
    return new Date(date);
	}
buttonList.addEventListener('click',function(e){//监听用户使用注册还是登录功能
	var target=e.target,
	loginForm=document.getElementById('loginForm'),
	signInForm=document.getElementById('signInForm'),
	signIn=document.getElementById('signIn'),
	login=document.getElementById('login');
	switch(target.id){
		case "signIn":
			signIn.className="login_button buttonActive";
			login.className="login_button";
			loginForm.style.animation="displaynone 2s linear forwards";
			loginForm.style="display:none";
			signInForm.style="display:block";
			signInForm.style.animation="displayblock 2s linear forwards";
			break;
		case "login":
			login.className="login_button buttonActive";
			signIn.className="login_button";
			signInForm.style.animation="displaynone 2s linear forwards";
			signInForm.style="display:none";
			loginForm.style="display:block";
			loginForm.style.animation="displayblock 2s linear forwards";
			break;
	}
});
//注册表单相关
var nameExistedOrNot=function(){//监听昵称是否被占用
	var value=signInUserNameInput.value,
		xhr=new XMLHttpRequest(),
		existed=false;
	xhr.open("post","php/读取用户数据.php",false);
	xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xhr.send("userName="+value);
	existed=xhr.responseText;
	if(existed){
		signInNameExisted.style="display:block";
	}
	else{
		signInNameExisted.style="display:none";
	}
};
signInUserNameInput.addEventListener('blur',nameExistedOrNot);

signInUserPhoneInput.addEventListener('blur',function(){//监听电话号码格式是否正确
	var reg=new RegExp("^[0-9]*$");
	if(reg.test(signInUserPhoneInput.value)){
		signInWrongNumber.style="display:none";
	}
	else{
		signInWrongNumber.style="display:block";
	}
});

var signInNowEvent=function(){//向数据库发送注册信息
	if(signInUserNameInput.value&&signInUserPasswordInput.value&&signInUserPhoneInput.value){
	var value=signInUserNameInput.value,
		xhr=new XMLHttpRequest(),
		existed=false;
		xhr.open("post","php/读取用户数据.php",false);
		xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xhr.send("userName="+value);
		existed=xhr.responseText;
		if(existed){
		signInNameExisted.style="display:block";
		}
		else{
		if(signInWrongNumber.style.display=="none"){
		signInNameExisted.style="display:none";
		signInEmptyInput.style="display:none";
		var xhr = new XMLHttpRequest(),
			userName=loginUserNameInput.value,
			userPassword=loginUserPasswordInput.value,
			dateTime=getServerDate().toLocaleString();;
		xhr.open('post','php/注册用户.php',false);
		xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xhr.send("userName="+signInUserNameInput.value+"&userPassword="+
				signInUserPasswordInput.value+"&userPhone="+
				signInUserPhoneInput.value+"&registerTime="+dateTime);
		loginSuccess(signInUserNameInput.value,signInUserPasswordInput.value,2);
		signInNow.removeEventListener('click',signInNowEvent);
		}
		else{

		}
		}
	}
	else{
		signInEmptyInput.style="display:block";
	}
}
signInNow.addEventListener('click',signInNowEvent);
//登录表单部分
var loginNowEvent=function(){
	var userName=loginUserNameInput.value,
		userPassword=loginUserPasswordInput.value;
	if(userName!=""&&userPassword!=""){
	var xhr=new XMLHttpRequest(),
		value=false;
	xhr.open("post","php/验证用户数据.php",false);
	xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xhr.send("userName="+userName+"&userPassword="+userPassword);
	value=xhr.responseText;
	if(value){
		 if(userName=="Cong"){
		 	loginSuccess(userName,userPassword,1);
		 }
		 else{
		 	loginSuccess(userName,userPassword,2);
		 }
		 loginNow.removeEventListener('click',loginNowEvent);
	}
	else{
		alert("用户不存在或密码不正确");
	}
	}
	else{
		alert("昵称和密码不能为空");
	}
}
loginNow.addEventListener('click',loginNowEvent);
//跳转网页
function loginSuccess(userName,userPassword,userType){
	if(userType==1){
		
		localStorage.setItem("userName",userName);
		window.location.href="theRoot.html";
	}
	else{
		localStorage.setItem("userName",userName);
		window.location.href="songPlay.html";
	}
}