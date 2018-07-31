let submitButton=document.getElementById('submitButton'),
	resetButton=document.getElementById('resetButton'),
	noticeTitle=document.getElementById('noticeTitle'),
	noticeContent=document.getElementById('noticeContent');
submitButton.onclick=checkNotice;
resetButton.onclick=function(){
	noticeTitle.value='';
	noticeContent.value='';
}
	
	/*公告检查*/
function checkNotice(){
	if(noticeTitle.value==''){
		coolAlert('公告标题不能为空');
		return false;
	}
	if(noticeContent.value==""){
		coolAlert('公告内容为空,你发着玩？');
		return false;
	}
	let title=noticeTitle.value,
		content=noticeContent.value;
	content=encodeURIComponent(content);

	data=`note_title=${title}&content=${content}&poster_id=admin&poster_name=admin&type=announcement&categories_id=7`;
	let xhr=new XMLHttpRequest();
	xhr.open('post','http://202.116.162.57:8080/se52/note/add.do',true);
	xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded"); 
	xhr.send(data);
	xhr.onreadystatechange=function(){
			if(xhr.readyState==4){
					if(xhr.status==200){
						if(JSON.parse(xhr.responseText)['message']=='发布成功'){
							alert('发布成功');
							window.location.href="";
						}
						else{
							coolAlert('发布失败');
						}
					}
				}
	}
}

~~(function getAllAnnouncement(){
	let xhr=new XMLHttpRequest();
	xhr.open('post','http://202.116.162.57:8080/se52/note/findByType.do',true);
	xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
	xhr.send('type=announcement');
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4){
			if(xhr.status==200){
				let array=JSON.parse(xhr.responseText)['list'];
				for(let i in array){
					getAnnouncementContent(array[i]['note_id'],array[i]['note_title'],array[i]['create_time']);
				}
			}
		}
	}
})();

function getAnnouncementContent(note_id,title,create_time){
	let xhr=new XMLHttpRequest();
	xhr.open('post','http://202.116.162.57:8080/se52/viewNote.do',true);
	xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xhr.send('noteId='+note_id);
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4){
			if(xhr.status==200){
				let str=JSON.parse(xhr.responseText)['content'].substr(0,JSON.parse(xhr.responseText)['content'].length-4),
					date=new Date(create_time),
					li=`
					<li class="old-announcement">
							<div class="old-announcement-title">
								<input type="text" placeholder="输入标题（小于20字）" value="${title}" readonly maxlength="20">
								<span class="old-announcement-time">
								${date.getFullYear()+"-"+(date.getMonth()-0+1)+"-"+date.getDate()}
								</span>
							</div>
							<div class="old-announcement-body">
								<textarea placeholder="输入正文（小于1000字）" readonly>${str}
								</textarea>
							</div>
							<div class="old-announcement-button">
								<span onclick="deleteAnnouncement('${note_id}')" class="deletebutton">删除</span>
							</div>
						</li>
				`;
				document.getElementById('oldAnnouncement').innerHTML+=li;
			}
		}
	}
}
function deleteAnnouncement(note_id){
	let xhr=new XMLHttpRequest();
	xhr.open('post','http://202.116.162.57:8080/se52/note/delete.do',true);
	xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
	xhr.send('note_id='+note_id);
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4){
			if(xhr.status==200){
				if(JSON.parse(xhr.responseText)['message']=="删除成功"){
					window.location.href="";
				}
				else{
					coolAlert('删除失败');
				}
			}
		}
	}
}