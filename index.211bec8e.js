function runConfeti(){var t=1/30,i=Math.PI/180;function s(t,i){this.x=t,this.y=i,this.Length=function(){return Math.sqrt(this.SqrLength())},this.SqrLength=function(){return this.x*this.x+this.y*this.y},this.Equals=function(t,i){return t.x==i.x&&t.y==i.y},this.Add=function(t){this.x+=t.x,this.y+=t.y},this.Sub=function(t){this.x-=t.x,this.y-=t.y},this.Div=function(t){this.x/=t,this.y/=t},this.Mul=function(t){this.x*=t,this.y*=t},this.Normalize=function(){var t=this.SqrLength();if(0!=t){var i=1/Math.sqrt(t);this.x*=i,this.y*=i}},this.Normalized=function(){var t=this.SqrLength();if(0!=t){var i=1/Math.sqrt(t);return new s(this.x*i,this.y*i)}return new s(0,0)}}function o(t,i,o,e){this.position=new s(t,i),this.mass=o,this.drag=e,this.force=new s(0,0),this.velocity=new s(0,0),this.AddForce=function(t){this.force.Add(t)},this.Integrate=function(t){var i=this.CurrentForce(this.position);i.Div(this.mass);var o=new s(this.velocity.x,this.velocity.y);o.Mul(t),this.position.Add(o),i.Mul(t),this.velocity.Add(i),this.force=new s(0,0)},this.CurrentForce=function(t,i){var o=new s(this.force.x,this.force.y),e=this.velocity.Length(),n=new s(this.velocity.x,this.velocity.y);return n.Mul(this.drag*this.mass*e),o.Sub(n),o}}function e(t,o){this.pos=new s(t,o),this.rotationSpeed=600*Math.random()+800,this.angle=i*Math.random()*360,this.rotation=i*Math.random()*360,this.cosA=1,this.size=5,this.oscillationSpeed=1.5*Math.random()+.5,this.xSpeed=40,this.ySpeed=60*Math.random()+50,this.corners=new Array,this.time=Math.random(),this.frontColor="#ffffff",this.backColor="#ffffff";for(var n=0;n<4;n++){var h=Math.cos(this.angle+i*(90*n+45)),r=Math.sin(this.angle+i*(90*n+45));this.corners[n]=new s(h,r)}this.Update=function(t){this.time+=t,this.rotation+=this.rotationSpeed*t,this.cosA=Math.cos(i*this.rotation),this.pos.x+=Math.cos(this.time*this.oscillationSpeed)*this.xSpeed*t,this.pos.y+=this.ySpeed*t,this.pos.y>e.bounds.y&&(this.pos.x=Math.random()*e.bounds.x,this.pos.y=0)},this.Draw=function(t){this.cosA>0?t.fillStyle=this.frontColor:t.fillStyle=this.backColor,t.beginPath(),t.moveTo(this.pos.x+this.corners[0].x*this.size,this.pos.y+this.corners[0].y*this.size*this.cosA);for(var i=1;i<4;i++)t.lineTo(this.pos.x+this.corners[i].x*this.size,this.pos.y+this.corners[i].y*this.size*this.cosA);t.closePath(),t.fill()}}function n(t,e,h,r,a,l,c,p){this.particleDist=r,this.particleCount=h,this.particleMass=c,this.particleDrag=p,this.particles=new Array,this.frontColor="#ffffff",this.backColor="#ffffff",this.xOff=Math.cos(i*l)*a,this.yOff=Math.sin(i*l)*a,this.position=new s(t,e),this.prevPosition=new s(t,e),this.velocityInherit=2*Math.random()+4,this.time=100*Math.random(),this.oscillationSpeed=2*Math.random()+2,this.oscillationDistance=40*Math.random()+40,this.ySpeed=40*Math.random()+80;for(var f=0;f<this.particleCount;f++)this.particles[f]=new o(t,e-f*this.particleDist,this.particleMass,this.particleDrag);this.Update=function(t){var i=0;this.time+=t*this.oscillationSpeed,this.position.y+=this.ySpeed*t,this.position.x+=Math.cos(this.time)*this.oscillationDistance*t,this.particles[0].position=this.position;var o=this.prevPosition.x-this.position.x,e=this.prevPosition.y-this.position.y,h=Math.sqrt(o*o+e*e);for(this.prevPosition=new s(this.position.x,this.position.y),i=1;i<this.particleCount;i++){var r=s.Sub(this.particles[i-1].position,this.particles[i].position);r.Normalize(),r.Mul(h/t*this.velocityInherit),this.particles[i].AddForce(r)}for(i=1;i<this.particleCount;i++)this.particles[i].Integrate(t);for(i=1;i<this.particleCount;i++){var a=new s(this.particles[i].position.x,this.particles[i].position.y);a.Sub(this.particles[i-1].position),a.Normalize(),a.Mul(this.particleDist),a.Add(this.particles[i-1].position),this.particles[i].position=a}this.position.y>n.bounds.y+this.particleDist*this.particleCount&&this.Reset()},this.Reset=function(){this.position.y=-Math.random()*n.bounds.y,this.position.x=Math.random()*n.bounds.x,this.prevPosition=new s(this.position.x,this.position.y),this.velocityInherit=2*Math.random()+4,this.time=100*Math.random(),this.oscillationSpeed=2*Math.random()+1.5,this.oscillationDistance=40*Math.random()+40,this.ySpeed=40*Math.random()+80,this.frontColor="#ffffff",this.backColor="#ffffff",this.particles=new Array;for(var t=0;t<this.particleCount;t++)this.particles[t]=new o(this.position.x,this.position.y-t*this.particleDist,this.particleMass,this.particleDrag)},this.Draw=function(t){for(var i=0;i<this.particleCount-1;i++){var o=new s(this.particles[i].position.x+this.xOff,this.particles[i].position.y+this.yOff),e=new s(this.particles[i+1].position.x+this.xOff,this.particles[i+1].position.y+this.yOff);this.Side(this.particles[i].position.x,this.particles[i].position.y,this.particles[i+1].position.x,this.particles[i+1].position.y,e.x,e.y)<0?(t.fillStyle=this.frontColor,t.strokeStyle=this.frontColor):(t.fillStyle=this.backColor,t.strokeStyle=this.backColor),0==i?(t.beginPath(),t.moveTo(this.particles[i].position.x,this.particles[i].position.y),t.lineTo(this.particles[i+1].position.x,this.particles[i+1].position.y),t.lineTo(.5*(this.particles[i+1].position.x+e.x),.5*(this.particles[i+1].position.y+e.y)),t.closePath(),t.stroke(),t.fill(),t.beginPath(),t.moveTo(e.x,e.y),t.lineTo(o.x,o.y),t.lineTo(.5*(this.particles[i+1].position.x+e.x),.5*(this.particles[i+1].position.y+e.y)),t.closePath(),t.stroke(),t.fill()):i==this.particleCount-2?(t.beginPath(),t.moveTo(this.particles[i].position.x,this.particles[i].position.y),t.lineTo(this.particles[i+1].position.x,this.particles[i+1].position.y),t.lineTo(.5*(this.particles[i].position.x+o.x),.5*(this.particles[i].position.y+o.y)),t.closePath(),t.stroke(),t.fill(),t.beginPath(),t.moveTo(e.x,e.y),t.lineTo(o.x,o.y),t.lineTo(.5*(this.particles[i].position.x+o.x),.5*(this.particles[i].position.y+o.y)),t.closePath(),t.stroke(),t.fill()):(t.beginPath(),t.moveTo(this.particles[i].position.x,this.particles[i].position.y),t.lineTo(this.particles[i+1].position.x,this.particles[i+1].position.y),t.lineTo(e.x,e.y),t.lineTo(o.x,o.y),t.closePath(),t.stroke(),t.fill())}},this.Side=function(t,i,s,o,e,n){return(t-s)*(n-o)-(i-o)*(e-s)}}s.Lerp=function(t,i,o){return new s((i.x-t.x)*o+t.x,(i.y-t.y)*o+t.y)},s.Distance=function(t,i){return Math.sqrt(s.SqrDistance(t,i))},s.SqrDistance=function(t,i){var s=t.x-i.x,o=t.y-i.y;return s*s+o*o+z*z},s.Scale=function(t,i){return new s(t.x*i.x,t.y*i.y)},s.Min=function(t,i){return new s(Math.min(t.x,i.x),Math.min(t.y,i.y))},s.Max=function(t,i){return new s(Math.max(t.x,i.x),Math.max(t.y,i.y))},s.ClampMagnitude=function(t,i){var o=t.Normalized;return new s(o.x*i,o.y*i)},s.Sub=function(t,i){return new s(t.x-i.x,t.y-i.y,t.z-i.z)},e.bounds=new s(0,0),n.bounds=new s(0,0),(h={}).Context=function(i){var o=0,r=document.getElementById(i),a=document.createElement("canvas");a.width=r.offsetWidth,a.height=r.offsetHeight,r.appendChild(a);var l=a.getContext("2d"),c=new Array;for(n.bounds=new s(a.width,a.height),o=0;o<7;o++)c[o]=new n(Math.random()*a.width,-Math.random()*a.height*2,30,8,8,45,1,.05);var p=new Array;for(e.bounds=new s(a.width,a.height),o=0;o<25;o++)p[o]=new e(Math.random()*a.width,Math.random()*a.height);this.resize=function(){a.width=r.offsetWidth,a.height=r.offsetHeight,e.bounds=new s(a.width,a.height),n.bounds=new s(a.width,a.height)},this.start=function(){this.stop();this.interval=setInterval((function(){h.update()}),1e3/30)},this.stop=function(){clearInterval(this.interval)},this.update=function(){var i=0;for(l.clearRect(0,0,a.width,a.height),i=0;i<25;i++)p[i].Update(t),p[i].Draw(l);for(i=0;i<7;i++)c[i].Update(t),c[i].Draw(l)}};var h=new h.Context("confetti");h.start(),$(window).resize((function(){h.resize()}))}$(document).ready((function(){var t,i,s=$(".wheel"),o=$(".active"),e=0,n=$("#btnPlay"),h=new TimelineMax,r=new TimelineMax;h.to(o,.13,{rotation:-10,transformOrigin:"65% 36%",ease:Power1.easeOut}).to(o,.13,{rotation:3,ease:Power4.easeOut}).add("end"),n.click((function(){n.addClass("hide"),r.to(s,20,{rotation:4e3,transformOrigin:"50% 50%",ease:Power4.easeOut,onUpdate:function(){t=Math.round(this.target[0]._gsTransform.rotation),i=t-e,Math.round(t)%30<=i&&(h.progress()>.2||0===h.progress())&&h.play(0),4e3===t&&($("body").addClass("final"),setTimeout((function(){runConfeti()}),1e3)),e=t}}),r.add("end")}))}));
//# sourceMappingURL=index.211bec8e.js.map