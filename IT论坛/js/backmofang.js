function initMofang(containerID,maxwidth,minwidth,number,durationMin,durationMax){
	/*传入魔方容器ID，魔方最大宽度，魔方最小宽度，魔方个数,最小过度时长，最大过度时长*/
	document.body.innerHTML+=`<div id="${containerID}"></div>`;
	var mofang=function(){},
	getRandom=(max,min)=>(Math.ceil(Math.random()*(max-min)+min)),
	vW=window.innerWidth,
	vH=window.innerHeight;
mofang.prototype={
	init(){
		this.ul=document.createElement('ul');
		this.ul.className="mofang";
		this.w=getRandom(maxwidth,minwidth);
		this.h=this.w;
		this.pointY=getRandom(vH,vH+200);
		this.pointX=getRandom(0,vW);
		this.duration=getRandom(durationMax,durationMin);
		this.ul.style.top=this.pointY+'px';
		this.ul.style.left=this.pointX+'px';
		this.addLi();
		this.ul.style.animationDuration=this.duration+'s';
		document.getElementById('wrap').append(this.ul);
	},
	addLi(){
		var style=`width:${this.w}px;height:${this.h}px;`,
			li="";
		for(var i=0;i<6;i++){
			switch(i){
				case 0:style+=`transform:translateZ(${this.w/2}px);`;break;
				case 1:style+=`transform:translateZ(${-this.w/2}px);`;break;
				case 2:style+=`transform:rotateY(90deg) translateZ(${this.w/2}px);`;break;
				case 3:style+=`transform:rotateY(90deg) translateZ(${-this.w/2}px);`;break;
				case 4:style+=`transform:rotateX(90deg) translateZ(${this.w/2}px);`;break;
				case 5:style+=`transform:rotateX(90deg) translateZ(${-this.w/2}px);`
			}
			li+=`<li style="${style}"></li>`
		}
		this.ul.innerHTML=li;
	}
}
function addMofang(num){
	for(var i=0;i<num;i++){
		new mofang().init();
	}
}
addMofang(number);
}
initMofang('wrap',10,50,20,10,20);