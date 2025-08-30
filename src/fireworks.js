// 简单烟花粒子（canvas）
(function(){
    function start(){
        const canvas = document.createElement('canvas'); canvas.style.position='fixed'; canvas.style.left=0; canvas.style.top=0; canvas.style.width='100%'; canvas.style.height='100%'; canvas.style.zIndex=9999; canvas.style.pointerEvents='none'; document.body.appendChild(canvas);
        const ctx = canvas.getContext('2d'); function resize(){ canvas.width=innerWidth; canvas.height=innerHeight } window.addEventListener('resize',resize); resize();
        let particles=[];
        function rand(min,max){return Math.random()*(max-min)+min}
        function spawn(x,y){
            const count = 30 + Math.floor(Math.random()*30);
            const hue = Math.floor(rand(0,360));
            for(let i=0;i<count;i++) particles.push({ x, y, vx:Math.cos(i/count*Math.PI*2)*rand(1,6), vy:Math.sin(i/count*Math.PI*2)*rand(1,6), life:60+Math.random()*40, color:`hsl(${hue} 80% ${50+Math.random()*20}%)` })
        }
        function loop(){ ctx.clearRect(0,0,canvas.width,canvas.height); for(let i=particles.length-1;i>=0;i--){ const p=particles[i]; p.x+=p.vx; p.y+=p.vy; p.vy+=0.08; p.life--; ctx.globalAlpha=Math.max(0,p.life/100); ctx.fillStyle=p.color; ctx.fillRect(p.x,p.y,2.6,2.6); if(p.life<=0) particles.splice(i,1) } requestAnimationFrame(loop) }
        loop();
// 定期在屏幕顶部随机位置触发烟花
        const timer = setInterval(()=>{ spawn(rand(100,innerWidth-100), rand(100, innerHeight*0.5)); }, 700);
// 允许外部调用停止
        window.startFireworks = ()=>{ spawn(innerWidth/2, innerHeight*0.35); }
        window.stopFireworks = ()=>{ clearInterval(timer) }
    }
// 自动初始化，但守护确保不会重复多次
    if(!window._fireworksLoaded){ window._fireworksLoaded = true; start(); }
})();