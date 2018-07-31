let userIcon=document.getElementById('userIcon'),
	userMenu=document.getElementById('userMenu'),
	returnToLogin=document.getElementById('returnToLogin'),
	signOut=document.getElementById('signOut');
returnToLogin.onclick=exitRoot;
signOut.onclick=exitRoot;
userIcon.addEventListener('click',function(){
	userMenu.style.display=userMenu.style.display=="block"?"none":"block";
});/*管理员页面公用脚本*/
~~(function isRoot(){
	if(!localStorage.getItem('superRoot'))
		window.location.href="backLogin.html";
})();
/*弹窗*/
function coolAlert(str){
	let coolAlert=document.getElementById('coolAlert');
	coolAlert.innerText=str;
	coolAlert.classList.add('coolAlertShow');
	setTimeout(function(){
		coolAlert.classList.remove('coolAlertShow');
	},3000);
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
function exitRoot(){
	delete localStorage.superRoot;
	window.location.href="backLogin.html";
}