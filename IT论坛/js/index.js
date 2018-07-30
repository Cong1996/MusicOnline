let articleTypeArray=['推荐','前端','Android','后台','人工智能','iOS','工具资源','阅读','运维'],
	aritcleLogo=['web','android','back','ai','ios','toolResouce','read','runAndProtect'],
	navList=document.getElementById('navList');

/*给指定子元素添加样式，其他子元素去除样式*/
function selectOne(fatherDom,tag,target,className){
	let array=fatherDom.getElementsByTagName(tag);
	for(let i of array){
		i.classList.remove(className);
	}
	target.classList.add(className);
}
navList.addEventListener('click',function(e){
	selectOne(navList,'li',e.target,'active');
	let type=0;
	for(let i in navList.getElementsByTagName('li')){
		if(articleTypeArray[i]==e.target.innerText)
			type=i;
	}
	if(type!=0)
	getHotOfType(type);
	else{
		getHotArticleAll()
	}
});

/*获取特定种类热门*/
function getHotOfType(type){
	let xhr=new XMLHttpRequest();
	xhr.open('post','http://202.116.162.57:8080/se52/note/findHotByCategories.do',true);
	xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xhr.send("categorites_id="+type);
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4){
			if(xhr.status==200){
				showHotArticleAll(JSON.parse(xhr.responseText)['list']);
			}
		}
	}
}

/*获取所有热门*/
function getHotArticleAll(){
	let xhr=new XMLHttpRequest();
	xhr.open('post','http://202.116.162.57:8080/se52/note/hotall.do',true);
	xhr.send(null);
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4){
			if(xhr.status==200){
				showHotArticleAll(JSON.parse(xhr.responseText)['list']);
			}
		}
	}
}
function showHotArticleAll(array){
	let str="";
	if(array.length==0){
		str=`<li id="noPost">暂时没有文章</li>`;
	}
	else{
			for(let i in array){	
	str+=`<li>
						<a href="article.html?${array[i]['note_id']}">
							<p class="postTitle">${array[i]['note_title']}</p>
							<div class="postDescription">
								<span class=
								"tag ${aritcleLogo[array[i]['categories_id']-1]}">${articleTypeArray[array[i]['categories_id']]}</span>
								<a class="author">${array[i]['poster_name']}</a>
								<span class="postTime">${array[i]['create_time']}</span>
								<span class="pointNumber">${array[i]['visitor_number']}</span>
							</div>
						</a>
					</li>
		`
	}
	
	}
	document.getElementById('postList').innerHTML=str;
}
getHotArticleAll();