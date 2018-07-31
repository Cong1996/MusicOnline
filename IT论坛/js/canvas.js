var canvas = document.getElementById('canvas'),
			canCon = canvas.getContext('2d'),
			w,h,pX,pY;
			var aBubble=[];
			var colorArray=["#339999","#ccccff","#FF4499","#CCFFCC","#CCFF99","#FFCCCC",
			"#FF99CC","#993399"];
			~~function getsize(){
			window.onresize = arguments.callee;
			w=window.innerWidth/2;
			h=window.innerHeight/2;
			canvas.width=w;
			canvas.height=h;
			}();
			function random(min,max){//返回一定范围随机数
				return Math.ceil(Math.random()*(max-min)+min);
			};
			function Bubble(){};
			Bubble.prototype={
				init:function(){
					this.x=random(0,w);//0->w
					this.y=random(0,h);
					this.r=random(1,4);
					this.color=colorArray[random(0,colorArray.length-1)];
					this.xV=random(-2,2)==0?1:random(-2,2);//小球移动速度
					this.yV=random(-2,2)==0?1:random(-2,2);
					this.D=15;//鼠标50px像素内范围
				},
				draw:function(){
					canCon.beginPath();
					canCon.fillStyle=this.color;
					canCon.arc(this.x,this.y,this.r,0,Math.PI*2);
					canCon.fill();
				},
				move:function(){
					this.x+=this.xV;
					this.y+=this.yV;
					if(this.x-this.r<0||this.x+this.r>w){
						this.xV=-this.xV;
					}
					if(this.y-this.r<0||this.y+this.r>h){
						this.yV=-this.yV;
					}
					if(Math.sqrt(Math.pow(this.x-pX,2)+Math.pow(this.y-pY,2))<this.D&&this.r<this.D){
						this.r+=.5;
					}
					else if(this.r>3&&Math.sqrt(Math.pow(this.x-pX,2)+Math.pow(this.y-pY,2))>this.D){
						this.r-=.5;
					}
					this.draw();

				}
			}
			
			function create(num){
			for(var i=0;i<num;i++){
			var bubble = new Bubble();
			bubble.init();
			bubble.draw();
			aBubble.push(bubble);
			}
			};
			create(100);
			setInterval(function(){
				canCon.clearRect(0,0,w,h);
				for(var item of aBubble){
					item.move();
				}
			},1000/60);
			canvas.onmousemove=function(){
				var ev=window.event;
				pX=ev.clientX;
				pY=ev.clientY;

			}