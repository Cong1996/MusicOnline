var updateFileToMySql=document.getElementById('updateFileToMySql'),
	array=[],
	arrayName=[],
	arraySinger=[],
	enter=document.getElementById('enterPlay');
enterPlay.addEventListener('click',function(){
	
		window.location.href="songPlay.html";
});
function getArray(){
	var filesArray=document.getElementById('musicFiles');
	if(filesArray.files.length>0){
	for(var i=0;i<filesArray.files.length;i++){
		array[i]=filesArray.files[i].name;
	}
	for(var item in array){
	 	var value=array[item].split('-');
	 	arrayName[item]=value[1];
	 	arraySinger[item]=value[0];	
	 	var songName=arrayName[item].split('.')[0],
	 		singerName=arraySinger[item],
	 		src="song",
	 		lrc="lrc";
         var xhr = new XMLHttpRequest();
		 xhr.open('post','php/updateSong.php',false);
		 xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		 xhr.send("songName="+songName+"&singerName="+
		 		singerName+"&src="+
		 		src+"&lrc="+lrc);
	 }
	 
	}
	loadSong();
}	
updateFileToMySql.addEventListener('click',getArray);
window.onload=function(){
	if(localStorage.getItem("userName")!="Cong"){
		window.location.href="index.html";
	}
	loadSong();
};
function loadSong(){
		var wH=window.innerHeight,
		songList=document.getElementById('songList'),
		xhr=new XMLHttpRequest(),
		arrayList=[];
	songList.style.height=wH+"px";
	xhr.open('get','php/loadSongList.php',false);
	xhr.send(null);
	arrayList=JSON.parse(xhr.responseText);
	songList.innerHTML="";
	var ul=document.createElement('ul');
	for(var item in arrayList){
		var li=document.createElement('li');
			li.className="theSong";
			li.innerHTML=arrayList[item]['singer_name']+"-"+
		    			 	arrayList[item]['song_name'];
		  ul.appendChild(li);
	}
	songList.appendChild(ul);
}
document.getElementById('songList').addEventListener('click',function(e){
	var value=e.target.innerText,
		arrayOfValue=value.split('-'),
		confirmBox=confirm("真的要删除吗？");
	if(confirmBox==true){
	var	xhr=new XMLHttpRequest();
		xhr.open('post','php/从数据库删除歌曲.php',false);
		xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xhr.send('songName='+arrayOfValue[1]+"&singerName="+arrayOfValue[0]);
		loadSong();
	}
	else{
		
	}
});