
~~(function getAllBlackList(){
	var xhr=new XMLHttpRequest();
	xhr.open('post','http://202.116.162.57:8080/se52/blacklist/findall.do',true);
	xhr.send(null);
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4){
			if(xhr.status==200){
				showALLBlackList(JSON.parse(xhr.responseText)['blacklist']);
			}
		}
	}
})();
function showALLBlackList(array){
	let str="",
		blackList=document.getElementById('blackList');
	for(let i in array){
		str+=`
				<li>
					<span>${i-0+1}</span>
					<span>${array[i]['user_id']}</span>
					<span>${array[i]['user_name']}</span>
					<span>${array[i]['solution']}</span>
					<span>${array[i]['howlong']}</span>
					<span>
						<span class="manage-button-area">
							<input name="${array[i]['user_id']}" class="editButton" type="button" value="恢复"  onclick="recoverUser('${array[i]['user_id']}')">
						</span>						
					</span>
				</li>	
			`;
	}
	blackList.innerHTML+=str;
}
function deleteUser(user_id){

}
function recoverUser(user_id){
	let xhr=new XMLHttpRequest();
	xhr.open('post','http://202.116.162.57:8080/se52/blacklist/delete.do',true);
	xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
	xhr.send('user_id='+user_id);
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4){
			if(xhr.status==200){
				if(JSON.parse(xhr.responseText)['message']=="删除成功"){
					window.location.href="";
				}
				else{
					coolAlert('操作失败');
				}	
			}
		}
	}
}
