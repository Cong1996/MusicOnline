let userNumber=document.getElementById('userNumber'),
	userPassword=document.getElementById('userPassword'),
	submitButton=document.getElementById('submitButton');
userNumber.addEventListener('focus',function(){
	if(userNumber.value=="输入账号"){
		userNumber.value='';
	}
});
userNumber.addEventListener('blur',function(){
	if(userNumber.value==''){
		userNumber.value="输入账号";
	}
});
userPassword.addEventListener('focus',function(){
	if(userPassword.value=="输入密码"){
		userPassword.type="password";
		userPassword.value='';
	}
});
userPassword.addEventListener('blur',function(){
	if(userPassword.value==""){
		userPassword.type="text";
		userPassword.value='输入密码';
	}
});

/*弹窗*/
function coolAlert(str){
	let coolAlert=document.getElementById('coolAlert');
	coolAlert.innerText=str;
	coolAlert.classList.add('coolAlertShow');
	setTimeout(function(){
		coolAlert.classList.remove('coolAlertShow');
	},3000);
}
function login(data){
	let xhr=new XMLHttpRequest();
		xhr.open('post','http://202.116.162.57:8080/se52/login.do',true);
		xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		xhr.send(data);
	xhr.onreadystatechange = function(){
		    if(xhr.readyState === 4){
		        if(xhr.status == 200){
		        	if(JSON.parse(xhr.responseText).result=="0"){ 
		        		localStorage.setItem('superRoot','true');
						window.location.href="rootIndex.html";
					}
					else if(JSON.parse(xhr.responseText).result=="1"){
						localStorage.setItem('nowUserId',userNumber.value);
						window.location.href="index.html";
					}
					else{
						coolAlert('用户或密码错误');
					}
		        }
   			}
		}
}
submitButton.onclick=function(){
	if(userNumber.value=='输入账号'){
		coolAlert('账号不能为空');
		return false;
	}
	if(userPassword.value=="输入密码"){
		coolAlert('密码不能为空');
		return false;
	}
	let data="id="+userNumber.value+"&password="+userPassword.value;
	login(data);
}