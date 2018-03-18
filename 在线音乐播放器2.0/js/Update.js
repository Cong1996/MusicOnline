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
}	
updateFileToMySql.addEventListener('click',getArray);