'use strict'
window.AudioContext=window.AudioContext||
                    window.webkitAudioContext||
                    window.mozAudioContext||
                    window.msAudioContext;
window.requestAnimationFrame=window.requestAnimationFrame||
                             window.webkitrequestAnimationFrame||
                             window.mozrequestAnimationFrame||
                             window.msrequestAnimationFrame;
var songs=[
            {name:"ShakingHigh-アスノヨゾラ哨戒班",
            src:"ShakingHigh-アスノヨゾラ哨戒班.mp3"},
            {name:"まじ娘-アイロニ",src:"まじ娘-アイロニ.mp3"},
            {name:"陈慧娴-月半小夜曲",src:"陈慧娴-月半小夜曲.mp3"},
            {name:"陈淑桦-梦醒时分",src:"陈淑桦-梦醒时分.mp3"},
            {name:"陈奕迅-好久不见",src:"陈奕迅-好久不见.mp3"},
            {name:"陈展鹏、胡定欣-从未知道你最好",
            src:"陈展鹏、胡定欣-从未知道你最好.mp3"},
            {name:"程响-不再联系",src:"程响-不再联系.mp3"},
            {name:"邓丽君-月亮代表我的心",src:"邓丽君-月亮代表我的心.mp3"},
            {name:"冯提莫-凉凉",src:"冯提莫-凉凉.mp3"},
            {name:"冯提莫-我要你",src:"冯提莫-我要你.mp3"},
            {name:"邓紫棋-喜欢你",src:"邓紫棋-喜欢你.mp3"},
            {name:"海鸣威、泳儿-我的回忆不是我的",
            src:"海鸣威、泳儿-我的回忆不是我的.mp3"},
            {name:"黄子华-蓝天",src:"黄子华-蓝天.mp3"},
            {name:"老男孩-筷子兄弟",src:"老男孩-筷子兄弟.mp3"},
            {name:"李荣浩- 李白",src:"李荣浩- 李白.mp3"},
            {name:"李圣杰-最近",src:"李圣杰-最近.mp3"},
            {name:"李悦君-梦伴",src:"李悦君-梦伴.mp3"},
            {name:"梁汉文-七友",src:"梁汉文-七友.mp3"},
            {name:"梁静茹-分手快乐",src:"梁静茹-分手快乐.mp3"},
            {name:"梁静茹-暖暖",src:"梁静茹-暖暖.mp3"},
            {name:"梁静茹-勇气",src:"梁静茹-勇气.mp3"},
            {name:"林俊杰,蔡卓妍-小酒窝",src:"林俊杰,蔡卓妍-小酒窝.mp3"},
            {name:"刘若英-后来",src:"刘若英-后来.mp3"},
            {name:"刘惜君-我很快乐",src:"刘惜君-我很快乐.mp3"}, 
            {name:"那英-默",src:"那英-默.mp3"},
            {name:"南征北战-骄傲的少年",src:"南征北战-骄傲的少年.mp3"},
            {name:"牛奶咖啡-明天，你好",src:"牛奶咖啡-明天，你好.mp3"},
            {name:"朴树-平凡之路",src:"朴树-平凡之路.mp3"},
            {name:"孙燕姿-遇见",src:"孙燕姿-遇见.mp3"},
            {name:"谭艳-需要人陪",src:"谭艳-需要人陪.mp3"},
            {name:"田馥甄-小幸运",src:"田馥甄-小幸运.mp3"},
            {name:"汪苏泷-有点甜",src:"汪苏泷-有点甜.mp3"},
            {name:"王馨平-梦里是谁",src:"王馨平-梦里是谁.mp3"},
            {name:"吴雨霏-明知做戏",src:"吴雨霏-明知做戏.mp3"},
            {name:"下雨天-南拳妈妈",src:"下雨天-南拳妈妈.mp3"},
            {name:"许廷铿-遗物",src:"许廷铿-遗物.mp3"}, 
            {name:"杨丞琳-暧昧",src:"杨丞琳-暧昧.mp3"},
            {name:"杨千嬅-少女的祈祷",src:"杨千嬅-少女的祈祷.mp3"},
            {name:"张靓颖-如果这就是爱情",src:"张靓颖-如果这就是爱情.mp3"},
            {name:"张学友-总有一天等到你",src:"张学友-总有一天等到你.mp3"},
            {name:"赵雷-成都",src:"赵雷-成都.mp3"},
            {name:"周华健-难念的经",src:"周华健-难念的经.mp3"},
            {name:"周杰伦-稻香",src:"周杰伦-稻香.mp3"},
            {name:"周杰伦-晴天",src:"周杰伦-晴天.mp3"},
            ];
var canvas=document.getElementById('canvas'),
    ctx=canvas.getContext('2d'),
    outCanvas=document.createElement('canvas'),
    octx=outCanvas.getContext('2d'),
    title=document.getElementById('title'),
    mainBody=document.getElementById('mainBody'),
    musicControl=document.getElementById('musicControl'),
    musicPhoto=document.getElementById('musicPhoto'),
    buttonControl=document.getElementById('buttonControl'),
    rangeControl=document.getElementById('rangeControl'),
    rangeNow=document.getElementById('rangeNow'),
    audio=document.getElementById('theTruthPlay'),
    stopOrPlay=document.getElementById('stopOrPlay'),
    sonsList=document.getElementById('songsList'),
    listTool=document.getElementById('listTool'),
    list=document.getElementById('list'),
    wordsOfSongs=document.getElementById('wordsOfSongs'),
    play=null,
    nowIndex=0,
    wW=window.innerWidth,
    wH=window.innerHeight,
    height=Math.ceil(wH/15),
    varH=height*12.5,
    RAF = (function() {
    return window.requestAnimationFrame})(),
    linearColor=ctx.createLinearGradient(0,110,0,270);
    setDivSize();
    linearColor.addColorStop(0.45,"#FFFFFF");
    linearColor.addColorStop(0.75,"#FFCCCC");
    linearColor.addColorStop(1,"#CCCCFF");
window.onresize=function(){
    wW=window.innerWidth;
    wH=window.innerHeight;
    height=Math.ceil(wH/15);
    varH=height*12.5;
    setDivSize();
    play.rt_length=window.innerWidth/20;
    play.rt_array=[];
    play.initAnimation();//页面缩放会导致速度变快
}
var EventUtil={
  addHandler:function(element,type,handler){
    if(element.addEventListener){
      element.addEventListener(type,handler,false);
    }else if(element.attachEvent){
      element.attachEvent("on"+type,handler);
    }else{
      element["on"+type]=handler;
    }
  },
  removeHandler:function(element,type,handler){
    if(element.removeEventListener){
      element.removeEventListener(type,handler,false);
    }else if(element.detachEvent){
      element.detachEvent("on"+type,handler);
    }else{
      element["on"+type]=null;
    }
  },
  getEvent:function(event){
    return event?event:window.event;
  },
  getTarget:function(event){
    return event.target||event.srcElement;
  }
};
function setDivSize(){
    canvas.setAttribute("width",wW);
    canvas.setAttribute("height",wH);
    outCanvas.width=canvas.width;
    outCanvas.height=canvas.height/2;
    title.style="font-size:"+height/2+'px';
    listTool.style="font-size:"+height/2+'px';
    mainBody.style.height=wH+'px';
    musicControl.style.height=wH-varH+'px';
    musicPhoto.style.width=musicPhoto.style.height=
    wH-varH+'px';
    songsList.style='width:'+wW/3+'px;height:'+
                    wH+'px;left:'+(-wW/3)+'px;';
    var sizeOfPhone=wW>wH?wW/25:wH/25;             
    buttonControl.style="font-size:"+sizeOfPhone+'px;bottom:'+
                 (sizeOfPhone/10)+'px';
    sizeOfPhone=wW>wH?5:20;
    rangeControl.style='height:'+sizeOfPhone+'px;width:'+
                 (wW-wH+varH)+'px;bottom:'+
                 (wH-varH)/3+'px;left:'+
                 (wH-varH)+'px';
    wordsOfSongs.style="width:"+wW+'px;height:'+(wH/2-(wH-varH))+'px;bottom:'+
                       +(wH-varH)+"px;";
}
//加载完成
window.onload=function(){
        play = new player();
        audio.volume=0.5;
        audio.src="songs/"+songs[0].src; 
        play.playMusic(play.audio);
        addSongsList();
        changeMusicSrc();
}
EventUtil.addHandler(audio,'ended',function(){
        if(nowIndex==songs.length-1){
        nowIndex=-1;
        }          
        audio.src="songs/"+songs[++nowIndex].src;
        stopOrPlay.innerHTML="▨";
        document.getElementsByClassName('thePlayingNow')[0].className="";
        var thislist=document.getElementsByTagName('li');  
        thislist[nowIndex].className='thePlayingNow';
        audio.play();
});
//音乐控制
EventUtil.addHandler(musicControl,"click",function(e){
  e=EventUtil.getEvent(e);
  var target=EventUtil.getTarget(e);
  switch(target.id){
    case "rangeControl"://进度条控制
          var percent=(e.clientX-(wH-varH))/(wW-(wH-varH));
          audio.currentTime=percent.toFixed(2)*audio.duration;
      break;
    case "rangeNow":
          var percent=(e.clientX-(wH-varH))/(wW-(wH-varH));
          audio.currentTime=percent.toFixed(2)*audio.duration;
      break;
    case "stopOrPlay"://播放控制
        if(audio.paused){ 
          stopOrPlay.innerHTML="▨";
          audio.play();
          }
        else{
          stopOrPlay.innerHTML="▶";
          audio.pause();
          }
      break;
      case "addVolume"://音量增大
        if(audio.volume<0.9)
        audio.volume+=0.1;
        break;
      case "reduceVolume"://音量减小 
        if(audio.volume>0.1)
        audio.volume-=0.1;
        break;
      case "last":
        if(nowIndex==0){
         nowIndex=songs.length
        }
          audio.src="songs/"+songs[--nowIndex].src;
          stopOrPlay.innerHTML="▨";
          audio.play();
          changeMusicSrc();
        break;
      case "next":
        if(nowIndex==songs.length-1){
          nowIndex=-1;
        }          
          audio.src="songs/"+songs[++nowIndex].src;
          stopOrPlay.innerHTML="▨";
          audio.play();
          changeMusicSrc();
        break;
      case "noVolume":
        if(audio.muted){
          audio.muted=false;
          document.getElementById('noVolume').innerHTML="🔊";
        }
        else{
          audio.muted=true;
          document.getElementById('noVolume').innerHTML="ø";
        }
        break;
      case "showSongsList":
        var listWidth=parseFloat(songsList.style.left);
        var listOut=setInterval(function(){
          listWidth+=100;
          if(listWidth>0){
            listWidth=0;
            songsList.style.left=listWidth+'px';
            clearInterval(listOut);
          }
          songsList.style.left=listWidth+'px';
        },10)
        break;
  }
});
EventUtil.addHandler(listTool,"click",function(e){
  e=EventUtil.getEvent(e);
  var target=EventUtil.getTarget(e);
  switch(target.id){
    case "e_mail":
      break;
    case "closeList":
        var listWidth=parseFloat(songsList.style.width),
            listLeft=0;
        var listOut=setInterval(function(){
          listLeft+=100;
          if(listLeft>listWidth){
            listLeft=listWidth;
            songsList.style.left=(-listLeft)+'px';
            clearInterval(listOut);
          }
          songsList.style.left=(-listLeft)+'px';
        },10)
      break;
  }
});
//列表点击
EventUtil.addHandler(list,'click',function(e){
  e=EventUtil.getEvent(e);
  var target=EventUtil.getTarget(e);
  document.getElementsByClassName('thePlayingNow')[0].className="";
  e.target.className="thePlayingNow";
  for(var i=0;i<songs.length;i++){
    if(e.target.innerHTML===songs[i].name){
      nowIndex=i;
    }
  }
  audio.src="songs/"+songs[nowIndex].src;  
  title.innerHTML="<span>loading  "+songs[nowIndex].name+"</span>";
  document.getElementsByClassName('thePlayingNow')[0].className="";
  var thislist=document.getElementsByTagName('li');  
  thislist[nowIndex].className='thePlayingNow';
  audio.oncanplay=function(){
           title.innerHTML="<span>Playing  "+songs[nowIndex].name+"</span>";
            if(audio.paused){ 
             stopOrPlay.innerHTML="▨";
             audio.play();
            }
        }   
});

function changeMusicSrc(){//歌曲变换时触发
  title.innerHTML="<span>loading  "+songs[nowIndex].name+"</span>";
  document.getElementsByClassName('thePlayingNow')[0].className="";
  var thislist=document.getElementsByTagName('li');  
  thislist[nowIndex].className='thePlayingNow';
  audio.oncanplay=function(){
           title.innerHTML="<span>Playing  "+songs[nowIndex].name+"</span>";
        }
}
function addSongsList(){//歌单
  var ol=document.getElementById('list');
  for(var i=0;i<songs.length;i++){
    var li=document.createElement('li');
    if(i==0){
      li.className="thePlayingNow";
    }
    li.innerHTML=songs[i].name;
    ol.appendChild(li);
  }
  ol.setAttribute('id','list');
  songsList.appendChild(ol);
}
function animate() {
    var songs=play.songs,
        nowIndex=play.nowIndex,
        analyser=play.analyser,
        rt_length=play.rt_length,
        rt_array=play.rt_array;
    if (!songs[nowIndex].decoding) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      octx.clearRect(0, 0, canvas.width, canvas.height);
      //出来的数组为8bit整型数组，即值为0~256，整个数组长度为1024，即会有1024个频率，只需要取部分进行显示
      var array_length = analyser.frequencyBinCount;
      var array = new Uint8Array(array_length);
      analyser.getByteFrequencyData(array); //将音频节点的数据拷贝到Uin8Array中
      //数组长度与画布宽度比例
      var bili = array_length / canvas.width;
      for (var i = 0; i < rt_array.length; i++) {
        var rt = rt_array[i];
        //根据比例计算应该获取第几个频率值，并且缓存起来减少计算
        rt.index = ('index' in rt) ? rt.index : ~~(rt.x * bili);
        rt.update(array[rt.index]);
      }
      draw();
    } else {
      console.log("音频解码中...")
    }
    RAF(animate);
  }

  //制造半透明投影
  function draw() {
    ctx.drawImage(outCanvas, 0, 0);
    ctx.save();
    ctx.translate(0, canvas.height / 2);
    ctx.rotate(Math.PI);
    ctx.scale(-1, 1);
    ctx.drawImage(outCanvas, 0, -canvas.height / 2);
    ctx.restore();  
    ctx.fillStyle = 'rgba(0, 0, 0, .7)';
    ctx.fillRect(0, canvas.height/ 2, canvas.width, canvas.height / 2);
  } 

//禁止滚动
var scrollFunc=function(e){
 e=e || window.event;
 if(e.wheelDelta && event.ctrlKey){//IE/Opera/Chrome
  event.returnValue=false;
 }else if(e.detail){//Firefox
  event.returnValue=false;
 }
 }
 /*注册事件*/
 if(document.addEventListener){
 document.addEventListener('DOMMouseScroll',scrollFunc,false);
 }//W3C
 window.onmousewheel=document.onmousewheel=scrollFunc;

//播放器对象
var player = function(){
        this.songs=songs;
        this.nowIndex=nowIndex;
        this.rt_array=[]; //用于存储柱形条对象
        this.rt_length=canvas.width/20;
        this.AC=new AudioContext();
        this.audio=audio;
        this.audioSource=null;
        this.analyser=this.AC.createAnalyser();
        this.gainnode=this.AC.createGain();
        this.gainnode.gain.value=1;
        this.source=null;
        this.loop;
    };
player.prototype={
    playMusic:function(arg){
        this.audioSource=this.audioSource||this.AC.createMediaElementSource(arg);
        this.source=this.audioSource;
        this.source.connect(this.analyser);
        this.analyser.connect(this.gainnode);
        this.gainnode.connect(this.AC.destination);
        rangeNow.style="width:0;";
        this.initAnimation();
        this.loop=setInterval(this.getPross,500);
    },
    initAnimation:function(){ //动画初始化，获取analyserNode里的音频buffer
        var aw=canvas.width/this.rt_length,//每个柱形条的宽度，及柱形条宽度+间隔
            w=aw-3;
        for(var i=0;i<this.rt_length;i++){
            this.rt_array.push(new Retangle(w,5,i*aw,canvas.height/2));
        }
        animate();
    },
    getPross:function(){
      if(audio.currentTime===audio.duration)
        clearInterval(this.loop);
        var percent=audio.currentTime/audio.duration;
        rangeNow.style="width:"+(percent*100).toFixed(2)+"%";
    }
};


  // 音谱条对象 
 var Retangle=function(w, h, x, y) {
    this.w = w;
    this.h = h; // 小白块高度
    this.x = x;
    this.y = y;
    this.jg = 3;
    this.power = 0;
    this.dy = y; // 小白块位置
    this.num = 0;
  };

  Retangle.prototype={
    update: function(power) {
    this.power = power;
    this.num = 0;//小方块间隔
    //更新小白块的位置，如果音频条长度高于白块位置，则白块位置则为音频条高度，否则让小白块下降
    var nh = this.dy + this.h;//小白块当前位置
    if (this.power >= this.y - nh) {
      this.dy = this.y - this.power - this.h - (this.power == 0 ? 0 : 1);
    } else if (nh > this.y) {
      this.dy = this.y - this.h;
    } else {
      this.dy += 1;
    }
    this.draw();
  },
  draw: function() {
    octx.fillStyle =linearColor;
    var h = (~~(this.power / (this.h + this.jg))) * (this.h + this.jg);
    octx.fillRect(this.x, this.y - h, this.w, h);
    for (var i = 0; i < this.num; i++) {
      var y = this.y - i * (this.h + this.jg);
      octx.clearRect(this.x-1, y, this.w + 2, this.jg);
    }
    octx.fillStyle = "rgba(256,256,256,1)";
    octx.fillRect(this.x, ~~this.dy, this.w, this.h);
  }
};   
