~~(function getAllUser(){
	let xhr=new XMLHttpRequest();
	xhr.open('post','http://202.116.162.57:8080/se52/findWhiteUser.do',true);
	xhr.send(null);
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4){
			if(xhr.status==200){
				showAllUser(JSON.parse(xhr.responseText)['whitelist']);
			}
		}
	}
})();

function showAllUser(userList){
	let str="";
	for(let i in userList){
		if(userList[i]['user_id']!='admin'){
			str+=`
					<li>
						<span>${userList[i]['user_id']}</span>
						<span>${userList[i]['user_name']}</span>
						<span>${userList[i]['user_email']}</span>
						<span>${userList[i]['create_time']}</span>
						<span>
							<span class="manage-button-area">
								<input class="editButton" type="button" value="拉黑" onclick="laheiUser('${userList[i]['user_id']}')">
							</span>						
						</span>
					</li>
			`;
		}
	}
	document.getElementById('userList').innerHTML=str;
}
function laheiUser(user_id){
	// let xhr=new XMLHttpRequest();
	// xhr.open('post','http://202.116.162.57:8080/se52/blacklist/add.do',true);
	// xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
	// xhr.send('user_id=')
	document.getElementById('enterResultArea').classList.remove('disappear');
	str=`
		<div class="enterResult">
			<h3>确定拉黑用户${user_id}吗？</h3>
			<input id="howLong" type="text" placeholder="输入拉黑天数（例如1)">
			<input id="result" type="text" placeholder="输入拉黑原因(例如：太胖了)">
			<input id="submitButton" type="button" value="提交" onclick="laheiUserXhr('${user_id}')">
			<input id="cancelButton" type="button" value="取消" onclick="document.getElementById('enterResultArea').classList.add('disappear')">
		</div>
		`;
		document.getElementById('enterResultArea').innerHTML=str;
}	
function laheiUserXhr(user_id){
	let howlong=document.getElementById('howLong').value,
	result=document.getElementById('result').value;
	if(howlong==''){
		coolAlert('请输入拉黑天数');
		return false;
	}
	if(result==''){
		coolAlert('请输入拉黑原因');
		return false;
	}
	let xhr=new XMLHttpRequest();
	xhr.open('post','http://202.116.162.57:8080/se52/blacklist/add.do',true);
	xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
	xhr.send('user_id='+user_id+'&solution='+result+'&howlong='+howlong);
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4){
			if(xhr.status==200){
				if(JSON.parse(xhr.responseText)['message']=='添加成功'){
					window.location.href='';
				}
				else{
					coolAlert('拉黑失败');
				}
			}
		}
	}
}