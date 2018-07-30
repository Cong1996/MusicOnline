let canvas=document.getElementById('canvas'),
	context=canvas.getContext('2d'),
	center=document.getElementsByClassName('center')[0],
	vW=center.clientWidth-20,
	data=[1000,200,3000,40,9999],
	padding=50;
window.onload=init();
function init(){
	canvas.width=vW;
	canvas.height=vW/2;
	context.beginPath();
	context.strokeStyle="#444";
	context.moveTo(50,50);
	context.lineTo(50,vW/2-50);
	context.stroke();
	context.beginPath();
	context.strokeStyle="#444";
	context.moveTo(50,vW/2-50);
	context.lineTo(vW-50,vW/2-50);
	context.stroke();

	/*绘制竖线*/
	for(let i=200;i<vW-50;i+=150)
	{
			context.beginPath();
			context.strokeStyle="#ccc";
			context.moveTo(i,50);
			context.lineTo(i,vW/2-50);
			context.stroke();
	}	
	/*绘制横线*/
	for(let i=vW/2-70;i>50;i-=20)
	{
			context.beginPath();
			context.strokeStyle="#ccc";
			context.moveTo(50,i);
			context.lineTo(vW-50,i);
			context.stroke();
	}
	for(let i=100;i<vW/2-50;i++)	
	context.beginPath();
	context.arc(350,vW/2-70,10,0,2*Math.PI);
	context.fillStyle="#000";
	context.fill();
	context.closePath();
}
