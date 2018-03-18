var mainBodyPhotoArea=document.getElementById('mainBodyPhotoArea'),
	mainBodyLyricArea=document.getElementById('mainBodyLyricArea'),
	wW=window.innerWidth,
	wH=window.innerHeight,
	showList=document.getElementById('showList'),
	pre=document.getElementById('pre'),
	play=document.getElementById('play'),
	next=document.getElementById('next'),
	songProcess=document.getElementById('songProcess'),
	songArray=[],
	list= document.getElementById('list'),
	nowIndex=0,
	song=document.getElementById('song'),
	liArray=[],//获取歌词列表
	liIndex=0,
	finishCommont=document.getElementById('finishCommont');
window.onload=function(){
	document.getElementById('backgroundLyric').style.height=(wH-50)+"px";
	mainBodyPhotoArea.style.height=(wH-50)+"px";;
	mainBodyLyricArea.style.height=(wH-50)+"px";
	var xhr=new XMLHttpRequest();
	xhr.open("get","php/loadSongList.php",false);
	xhr.send(null);
	songArray=JSON.parse(xhr.responseText);
	song.volume=.5;
	songArray.sort(compare);
	console.log(localStorage.getItem("userName"));
	document.getElementById('userName').innerHTML=localStorage.getItem("userName")||"田野一根葱";
	addSongToList();
};
function compare(value1,value2){
	return value1["singer_name"].localeCompare(value2["singer_name"]); 
}
function addSongToList(){
	for(var item in songArray){
		var li=document.createElement('li'),
			string="";
		string=songArray[item]["singer_name"]+"-"+songArray[item]["song_name"];
		li.innerHTML=string;
		if(item==0)
			li.className="thePlayNow";
		list.appendChild(li);
	}
	playSong(0);
}
function setAllTime(){
	var allTime=document.getElementById('allTime'),
		minutes=Math.floor(song.duration/60),
		seconds=Math.ceil(song.duration-minutes*60);
	if(seconds<10) seconds="0"+seconds;
	allTime.innerHTML="0"+minutes+":"+seconds;
}
function playSong(nowIndex){
	song.src="songs/"+songArray[nowIndex]["singer_name"]+"-"+songArray[nowIndex]["song_name"]+".mp3";
	var songTitle=document.getElementById('songTitle'),
		singerName=document.getElementById('singerName'),
		showLyricArea=document.getElementById('showLyricArea'),
		mainBodySongPhoto=document.getElementById('mainBodySongPhoto');
	mainBodySongPhoto.src="singer/"+songArray[nowIndex]["singer_name"]+".jpg";
	document.getElementById('backgroundLyric').src="singer/"+songArray[nowIndex]["singer_name"]+".jpg";
	document.getElementsByTagName('title')[0].innerText=songArray[nowIndex]["song_name"];
	songTitle.innerHTML="当前播放：<span>"+songArray[nowIndex]["song_name"]+"</span>";
	singerName.innerHTML="歌手：<span>"+songArray[nowIndex]["singer_name"]+"</span>";
	getLyric("lrc/"+songArray[nowIndex]["singer_name"]+"-"+songArray[nowIndex]["song_name"]);
	document.getElementsByClassName('thePlayNow')[0].className="";
	var thislist=document.getElementsByTagName('li');  
  	thislist[nowIndex].className='thePlayNow';
  	getCommontList();
	song.oncanplay=setAllTime;
}
function getLyric(url){
	var xhr= new XMLHttpRequest();
	xhr.open("get",url+".lrc",false);
	var lyric;
	xhr.onload=function(){
		lyric=xhr.responseText;
		showLyric(lyric);
	};
	xhr.send(null)
}

function showLyric(lyric){
	var showLyric=document.getElementById('showLyric'),
		lyricArray=lyric.split('\n'),
		pattern=/\[\d{2}:\d{2}.\d{2}\]/g;
		liArray=showLyric.getElementsByTagName('li');
	showLyric.innerHTML="";
	liIndex=0;
	while(!pattern.test(lyricArray[0])){
		lyricArray=lyricArray.slice(1);
	}
	for(var item in lyricArray){
		var li=document.createElement('li'),
			v=lyricArray[item],
			time=v.match(pattern),
			value=v.replace(pattern,'');
		li.innerHTML=value;
		li.setAttribute("data-time",time);
		if(item==0)
			li.className="theLyricShowNow";
		showLyric.appendChild(li);
	}
}
song.ontimeupdate=function(e){
	var theProcessNow=document.getElementById('theProcessNow'),
		nowTime=document.getElementById('nowTime')
		minutes=Math.floor(song.currentTime/60),
		seconds=Math.ceil(song.currentTime-minutes*60),
		dataTime=liArray[liIndex].getAttribute('data-time'),
		smallArray=[];
		dataTime=dataTime.replace('[',"").replace(']',"");
		smallArray=dataTime.split(":");
		if(song.currentTime>parseFloat(smallArray[0])*60+parseFloat(smallArray[1])){
			document.getElementsByClassName('theLyricShowNow')[0].className="";
			liArray[liIndex].className="theLyricShowNow";
			if(liIndex<liArray.length-1)
			liIndex++;
		}
	if(seconds<10) seconds="0"+seconds;
	nowTime.innerHTML="0"+minutes+":"+seconds;
	theProcessNow.style.width=((song.currentTime/song.duration)*100)+'%';

}
song.onended=function(){
	nextOrPre(1);
	play.src="images/pause.png";
	song.play();
}
function nextOrPre(number){
	nowIndex=nowIndex+number;
	nowIndex=(nowIndex+songArray.length)%(songArray.length);
	play.src="images/pause.png";
 	playSong(nowIndex);
}
songProcess.addEventListener('click',function(e){
	switch(e.target.id){
		case "showList":
				var songList=document.getElementById('songList');
				songList.style.display=songList.style.display!="block"?"block":"none";
				break;
		case "pre":
				nextOrPre(-1);
				song.play();
				setTimeout(addVolume,100);
				break;
		case "play":
			if(song.paused){
				play.src="images/pause.png";
				song.play();
				setTimeout(addVolume,100);
			}
			else{
				play.src="images/play.png";
				setTimeout(reduceVolume,100)
				
			}
			break;
		case "next":
				nextOrPre(1);
				song.play();
				setTimeout(addVolume,100);
				break;
	}
});
function addVolume(){//音乐暂停、播放过度效果
				if(song.volume<.5){
					song.volume+=.1;
					setTimeout(addVolume,100);
				}	
}
function reduceVolume(){
				if(song.volume>0.1){
						song.volume-=.1;
						setTimeout(reduceVolume,100);
				}
				else{
					song.pause();
				}
		}
list.addEventListener('click',function(e){
	document.getElementsByClassName('thePlayNow')[0].className="";
	e.target.className="thePlayNow";
	for(var i=0;i<songArray.length;i++){
    	if(e.target.innerHTML==(songArray[i]["singer_name"]+"-"+songArray[i]["song_name"])){
      		nowIndex=i;
    	}
  	}
  	playSong(nowIndex);
  	play.src="images/pause.png";
  	song.play();
  	setTimeout(addVolume,100);
});
//以下是评论功能的实现
finishCommont.addEventListener('click',sendCommontToDateBase);
function sendCommontToDateBase(){
	var theUserName=document.getElementById('userName').innerText,
		theCommontContent=document.getElementById('commont').value.trim(),
		theSongName=songArray[nowIndex]["song_name"],
		theSingerName=songArray[nowIndex]["singer_name"];
	if(theCommontContent!=""){
		var dateTime=new Date().toLocaleString();
		 var xhr=new XMLHttpRequest();
		 xhr.open('post','php/写入评论.php',false);
		 xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		 xhr.send("userName="+theUserName+"&commontContent="+theCommontContent+
		 "&songName="+theSongName+"&singerName="+theSingerName+
		 "&dateTime="+dateTime);
		 finishCommont.removeEventListener('click',sendCommontToDateBase);
		 alert('留言成功');
		 document.getElementById('commont').value="";
		 getCommontList();
		 setTimeout(function(){finishCommont.addEventListener('click',sendCommontToDateBase);},2000);
	}
	else{
		alert('评论为空');
	}
}

function getCommontList(){
	var ul=document.getElementById('commontList');
	ul.innerHTML="";
		var xhr=new XMLHttpRequest(),
			value1=songArray[nowIndex]['song_name'],
			value2=songArray[nowIndex]['singer_name'];
		xhr.open('post','php/读取评论列表.php',false);
		xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xhr.send("songName="+value1+
				 "&singerName="+value2);
	var commontArray=JSON.parse(xhr.responseText);	console.log(commontArray);
	for(var item in commontArray){
		value1=commontArray[item]['user_name'];
		value2=commontArray[item]['content'];
		var li=document.createElement('li'),
		 	div= document.createElement('div'),
		  	img=document.createElement('img'),
		  	span=document.createElement('span'),
		  	textarea=document.createElement('textarea');
		li.className="commontListLi";
		div.className="commontListUser";
		img.className="commontListUserPhoto";
		img.src="images/微信图片_20180316141945.jpg";
		span.className="commontListUserName";
		span.innerHTML=value1+"&nbsp;&nbsp;<span class='commontTime'>"+
					  commontArray[item]['commont_time']+"</span>";
		textarea.className="commontContent";
		textarea.readonly="readonly";
		textarea.value=value2;
		div.appendChild(img);
		div.appendChild(span);
		li.appendChild(div);
		li.appendChild(textarea);
		ul.appendChild(li);
	}
}