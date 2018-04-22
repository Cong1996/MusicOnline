	var mainBodyPhotoArea=document.getElementById('mainBodyPhotoArea'),
		mainBodyLyricArea=document.getElementById('mainBodyLyricArea'),
		body=document.body;
		showList=document.getElementById('showList'),
		pre=document.getElementById('pre'),
		play=document.getElementById('play'),
		next=document.getElementById('next'),
		songProcess=document.getElementById('songProcess'),
		theRealProcessArea=document.getElementById('theRealProcessArea'),
		songArray=[],
		list= document.getElementById('list'),
		nowIndex=0,
		song=document.getElementById('song'),
		liArray=[],//获取歌词列表
		liIndex=0,
		finishCommont=document.getElementById('finishCommont'),
		volumeControl=document.getElementById('volumeControl'),
		songPhoto=document.getElementById('songPhoto'),
		inputSongOrSingerName=document.getElementById('inputSongOrSingerName'),
		searchButton=document.getElementById('searchButton');
		userPower=document.getElementById('userPower'),
		phoneList=document.getElementById('phoneList')
		model=1;
	window.onload=function(){
		if(localStorage.getItem("userName")==""){
			window.location.href="index.html";
		}
		setSize();
		var xhr=new XMLHttpRequest();
		xhr.open("get","php/loadSongList.php",false);
		xhr.send(null);
		songArray=JSON.parse(xhr.responseText);
		song.volume=.5;
		songArray.sort(compare);
		document.getElementById('userName').innerText=localStorage.getItem("userName")||"田野一根葱";
		addSongToList();
		song.preload=true;
		song.metadata=true;
	};
	window.onresize=setSize;
	function setSize(){
		var wW=window.innerWidth,
			wH=window.innerHeight,
			commont=document.getElementById('commont'),
			theRealProcessArea=document.getElementById('theRealProcessArea'),
			loadingDiv=document.getElementById('loading');
		loadingDiv.style.height=(wH)+"px";
		loadingDiv.style.width=(wW)+"px";
		theRealProcessArea.style.width="75%";
		songProcess.style.width="100%";
		songProcess.style.height="auto";
		document.getElementById('backgroundLyric').style.height=(wH)+"px";
		mainBodyPhotoArea.style.height=(wH)+"px";
		mainBodyLyricArea.style.height=(wH)+"px";
	
		
	}
	function playReady(){
		document.getElementById('loading').style.display="none";
	}
	function compare(value1,value2){
		return value1["singer_name"].localeCompare(value2["singer_name"],'zh'); 
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
		playReady();
		var allTime=document.getElementById('allTime'),
			minutes=Math.floor(song.duration/60),
			seconds=Math.ceil(song.duration-minutes*60);
		if(seconds<10) seconds="0"+seconds;
		allTime.innerHTML="0"+minutes+":"+seconds;
	}
	function playSong(nowIndex){		
		document.getElementById('loading').style.display="block";
		song.src="songs/"+songArray[nowIndex]["singer_name"]+"-"+songArray[nowIndex]["song_name"]+".mp3";
		var songTitle=document.getElementById('songTitle'),
			singerName=document.getElementById('singerName'),
			showLyricArea=document.getElementById('showLyricArea'),
			mainBodySongPhoto=document.getElementById('mainBodySongPhoto');
		volumeControl.value=.5;
		song.volume=.5;
		mainBodySongPhoto.src="singer/"+songArray[nowIndex]["singer_name"]+".jpg";
		document.getElementById('backgroundLyric').src="singer/"+songArray[nowIndex]["singer_name"]+".jpg";
		document.title=songArray[nowIndex]["song_name"];
		songTitle.innerHTML="<span>"+songArray[nowIndex]["song_name"]+"</span>";
		singerName.innerHTML="歌手：<span>"+songArray[nowIndex]["singer_name"]+"</span>";
		getLyric("lrc/"+songArray[nowIndex]["singer_name"]+"-"+songArray[nowIndex]["song_name"]);
		document.getElementsByClassName('thePlayNow')[0].className="";
		var thislist=document.getElementsByTagName('li');  
	  	thislist[nowIndex].className='thePlayNow';
	  	showLyricArea.scrollTop=0;
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
		xhr.send(null);
		
		
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
		if(song.duration-song.currentTime<2){
			var xhr=new XMLHttpRequest();
			xhr.open('post','php/songEnd.php',false);
			xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
			xhr.send("songName="+songArray[nowIndex]['song_name']
						+"&singerName="+songArray[nowIndex]['singer_name']);
			nextOrPre(1);
			song.play();
		}
		else{
		var theProcessNow=document.getElementById('theProcessNow'),
			showLyricArea=document.getElementById('showLyricArea'),
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
				showLyricArea.scrollTop=showLyricArea.scrollTop+20;
			}
		if(seconds<10) seconds="0"+seconds;
		nowTime.innerHTML="0"+minutes+":"+seconds;
		theProcessNow.style.width=((song.currentTime/song.duration)*100)+'%';
		}
	}

	function nextOrPre(number){

		if(model==1){
			nowIndex=Math.floor(Math.random()*(songArray.length-1));
		}
		else{
		nowIndex=nowIndex+number;
		nowIndex=(nowIndex+songArray.length)%(songArray.length);
		}
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
	    	if(e.target.innerText==(songArray[i]["singer_name"]+"-"+songArray[i]["song_name"])){
	      		nowIndex=i;
	    	}
	  	}
	  	playSong(nowIndex);
	  	play.src="images/pause.png";
	  	song.play();
	  	setTimeout(addVolume,100);
	});
	//以下是评论功能的实现
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
	finishCommont.addEventListener('click',sendCommontToDateBase);
	function sendCommontToDateBase(){
		var theUserName=document.getElementById('userName').innerText,
			theCommontContent=document.getElementById('commont').value.trim(),
			theSongName=songArray[nowIndex]["song_name"],
			theSingerName=songArray[nowIndex]["singer_name"];
		if(theCommontContent!=""){
			var dateTime=getServerDate().toLocaleString();
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
		var commontArray=JSON.parse(xhr.responseText);
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
	volumeControl.onchange=function(){
		song.volume=volumeControl.value;
	}
	userPower.onmouseenter=function(){
			userPower.style.opacity="1";
	}
	userPower.onmouseout=function(){
		userPower.style.opacity="0";
	}
	userPower.onclick=function(){
		localStorage.setItem("userName","");
		window.location.href="index.html";
	}

//搜索功能的实现
searchButton.addEventListener('click',showResultOfSearch);
function showResultOfSearch(reg){
		if(reg!=""){
			var xhr=new XMLHttpRequest(),
				searchContent=inputSongOrSingerName.value,
				searchSongArray=[],
				str="",
				showResultSongListArea=document.getElementById('showResultSongListArea');
			xhr.open('post','php/查询歌曲.php',false);
			xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
			xhr.send("searchContent="+searchContent);
			searchSongArray=JSON.parse(xhr.responseText);
			showResultSongList.innerHTML="";
			if(searchSongArray.length==0){
				showResultSongList.innerHTML="未搜到你想要的歌曲";
				showResultSongList.style.display="block";
			}
			else{
			for(var item in searchSongArray){
				str+="<li>"+searchSongArray[item]['singer_name']+"-"
						   +searchSongArray[item]['song_name']+"</li>";
			}
			showResultSongList.innerHTML=str;
			showResultSongList.style.display="block";
			}
		}
	}
showResultSongList.addEventListener("click",function(e){
		for(var i=0;i<songArray.length;i++){
	    	if(e.target.innerText==(songArray[i]["singer_name"]+"-"+songArray[i]["song_name"])){
	      		nowIndex=i;
	    	}
	  	}
	  	showResultSongList.innerHTML="";
	  	showResultSongList.style.display="none";
	  	play.src="images/pause.png";
	  	playSong(nowIndex);
	  	song.play();
});
body.addEventListener('click',function(e){
	switch(e.target.id){
		case "showList":break;
		case "phoneList":break;
		default:songList.style.display="none";
	}
});
phoneList.onclick=function(){
	var songList=document.getElementById('songList');
	if(songList.style.display!="block"){
		phoneList.innerHTML="∧";
		songList.style.display="block";
	}
	else{
		phoneList.innerHTML="∨";
		songList.style.display="none";
	}
}
theRealProcessArea.addEventListener('click',function(e){
	switch(e.target.id){
		case "theProcessNow":
		default:
			var width=theRealProcessArea.getBoundingClientRect().right-theRealProcessArea.getBoundingClientRect().left,
				percent=(e.clientX-theRealProcessArea.getBoundingClientRect().left)/width;
				song.currentTime=song.duration*percent;
				document.getElementById('theProcessNow').style=percent*100+"%";
	}
});
mainBodyLyricArea.onclick=function(){
	showResultSongList.style.display="none";
};