let postContent=document.getElementById('postContent'),
	excelFile=document.getElementById('excelFile'),
	navList=document.getElementById('navList'),
	articleTypeArray=['前端','Android','后台','人工智能','iOS','工具资源','阅读','运维'],
	articleButton=document.getElementById('articleButton'),
	postButton=document.getElementById('postButton'),
	article={
		"note_title":null,
		"poster_id":null,
		"poster_name":null,
		"categories_id":1,
		"type":'share',
		"content":null
	};
postContent.onfocus=edit;
postContent.onblur=noedit;
function edit(){
	if(postContent.innerHTML=="输入正文..."){
		postContent.innerHTML="";
		postContent.style="color:#444";
	}
}
function noedit(){
	if(!postContent.innerHTML){
		postContent.innerHTML="输入正文..."
		postContent.style="color:#aaa";
	}
}
	navList.addEventListener('click',function(e){
	let target=e.target;
	switch(target.classList[1]){
		case 'fa-bold':changeStyle('bold');break;
		case 'fa-italic':changeStyle('italic');break;
		case 'fa-underline':changeStyle('underline');break;
		case 'fa-header':changeStyle('FontSize');break;
		case 'fa-code':changeStyle('code');break;
		case 'fa-quote-right':changeStyle('quote');break;
	}
});

function changeStyle(style){
	switch(style){
		case 'bold':
		case 'italic':
		case 'underline':
			document.execCommand(style);
			break;
		case 'FontSize':
			document.execCommand(style,false,5);
			document.execCommand('bold');
			document.execCommand('ForeColor',false,'#000');
			break;
		case 'code':
			postContent.innerHTML+=`<code contentEditable='true'>输入代码</code>
									<span class="newPage" contentEditable='true'></span>`
			break;
		case 'quote':
			postContent.innerHTML+=`<span class="italic">--“插入引用”</span>`;
			break;
	}
}

excelFile.addEventListener('change',function(){
	let str=window.URL.createObjectURL(excelFile.files[0]);
	uploadPhoto();
});
function uploadPhoto(){
	let excelFile=document.getElementById('excelFile');
	if(excelFile.files[0].size>5000000){
		coolAlert('图片不能大于5M');
	}
	else{
		let uploadFile = new FormData(document.getElementById("file"));
		if("undefined" != typeof(uploadFile) && uploadFile != null && uploadFile != ""){
		let	xhr=new XMLHttpRequest();
			xhr.open('post','http://202.116.162.57:8080/se52/noteimg.do',true);
			xhr.send(uploadFile);
			xhr.onreadystatechange=function(){
				if(xhr.readyState==4){
					if(xhr.status==200){
						postContent.innerHTML+=`<img src="${'http://202.116.162.57:8080'+xhr.responseText}" width="300px" style="display:block;">`
					}
				}
			}
		}
	}
}
postButton.onclick=function(){
	let selectTypeArea=document.getElementById('selectTypeArea');
	selectTypeArea.classList.toggle('disappear');
};



/*给指定子元素添加样式，其他子元素去除样式*/
function selectOne(fatherDom,tag,target,className){
	let array=fatherDom.getElementsByTagName(tag);
	for(let i of array){
		i.classList.remove(className);
	}
	target.classList.add(className);

}

/*选择文章类别*/
articleType.addEventListener('click',function(e){
	selectOne(articleType,'li',e.target,'active');
	for(let i in articleTypeArray){
		if(articleTypeArray[i]==e.target.innerText)
			article['categories_id']=(i-0+1);
	}
});
articleButton.addEventListener('click',function(e){
	article['content']=postContent.innerHTML;
	article['note_title']=document.getElementById('articleTitle').value;
	if(!article['note_title']){
		coolAlert('小伙子傻到忘记加标题');
	}
	else{
		if(article['content'].length<100){
			coolAlert('小伙子话太少了吧');
		}
		else{
			sendArticle();
		}
	}
});

function uniencode(text)
{
    text = escape(text.toString()).replace(/\+/g, "%2B");
    var matches = text.match(/(%([0-9A-F]{2}))/gi);
    if (matches)
    {
        for (var matchid = 0; matchid < matches.length; matchid++)
        {
            var code = matches[matchid].substring(1,3);
            if (parseInt(code, 16) >= 128)
            {
                text = text.replace(matches[matchid], '%u00' + code);
            }
        }
    }
    text = text.replace('%25', '%u0025');
 
    return text;
}
/*发布文章*/
function sendArticle(){
	let xhr=new XMLHttpRequest(),
		data;
	xhr.open('post','http://202.116.162.57:8080/se52/note/add.do',true);
	article['content']= encodeURIComponent(article['content']);
	console.log(article['content']);
	data=Serialize(article,'content');
	xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded"); 		
	xhr.send(data);
	xhr.onreadystatechange=function(){
				if(xhr.readyState==4){
					if(xhr.status==200){
						if(JSON.parse(xhr.responseText)['message']=='发布成功'){
							alert('发布成功');
							window.location.href="index.html";
						}
						else{
							coolAlert('发布失败');
							let selectTypeArea=document.getElementById('selectTypeArea');
							selectTypeArea.classList.toggle('disappear');
						}
					}
				}
			}
}

function Serialize(data,final){
	let str="";
	for(let [key,value] of Object.entries(data)){
		let substr=key+'='+value;
		str+=substr;
		if(key!=final)
		str+='&';
	}
	return str;
}

/*弹窗提示*/
function coolAlert(str){
	let coolAlert=document.getElementById('coolAlert');
	coolAlert.innerText=str;
	coolAlert.classList.add('coolAlertShow');
	setTimeout(function(){
		coolAlert.classList.remove('coolAlertShow');
	},3000);
}
window.onload=function(){
	if(!localStorage.getItem('nowUserId'))
	{
		alert('请先登录！');
		window.location.href='index.html';
	}
	getUserMessage();
	document.getElementById('nowTime').innerHTML=new Date().toLocaleString();
}
/*获取信息*/
function getUserMessage(){
	let xhr=new XMLHttpRequest();
	xhr.open('post','http://202.116.162.57:8080/se52/user/check.do',true);
	xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xhr.send("id="+localStorage.getItem('nowUserId'));
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4){
			if(xhr.status==200){
				article['poster_id']=localStorage.getItem('nowUserId');
				article['poster_name']=JSON.parse(xhr.responseText)['userinfo']['user_id'];
			}
		}
	}
}