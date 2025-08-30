// public/js/fireworks.js — 烟花效果

(function() {
    let isFireworksActive = false;
    let particles = [];
    let animationId;

    window.startFireworks = function() {
        if (isFireworksActive) return;
        isFireworksActive = true;

        // 创建烟花容器
        let container = document.getElementById('fireworks-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'fireworks-container';
            container.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 9999;
            `;
            document.body.appendChild(container);
        }

        // 启动烟花动画
        createFireworks();

        // 5秒后停止
        setTimeout(() => {
            stopFireworks();
        }, 5000);
    };

    function createFireworks() {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                launchFirework();
            }, i * 300);
        }

        animationId = requestAnimationFrame(updateParticles);
    }

    function launchFirework() {
        const colors = ['#ff69b4', '#ff1493', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7'];
        const startX = Math.random() * window.innerWidth;
        const startY = window.innerHeight;
        const targetX = startX + (Math.random() - 0.5) * 200;
        const targetY = Math.random() * window.innerHeight * 0.4 + 100;

        // 创建爆炸粒子
        for (let i = 0; i < 15; i++) {
            const particle = {
                x: targetX,
                y: targetY,
                vx: (Math.random() - 0.5) * 8,
                vy: (Math.random() - 0.5) * 8,
                life: 1.0,
                decay: Math.random() * 0.02 + 0.015,
                color: colors[Math.floor(Math.random() * colors.length)],
                size: Math.random() * 4 + 2
            };
            particles.push(particle);
        }
    }

    function updateParticles() {
        const container = document.getElementById('fireworks-container');
        if (!container || !isFireworksActive) return;

        // 清空容器
        container.innerHTML = '';

        // 更新粒子
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.1; // 重力
            p.life -= p.decay;

            if (p.life <= 0) {
                particles.splice(i, 1);
                continue;
            }

            // 创建粒子DOM元素
            const dot = document.createElement('div');
            dot.style.cssText = `
                position: absolute;
                left: ${p.x}px;
                top: ${p.y}px;
                width: ${p.size}px;
                height: ${p.size}px;
                background: ${p.color};
                border-radius: 50%;
                opacity: ${p.life};
                transform: translate(-50%, -50%);
            `;
            container.appendChild(dot);
        }

        if (particles.length > 0 || isFireworksActive) {
            animationId = requestAnimationFrame(updateParticles);
        }
    }

    function stopFireworks() {
        isFireworksActive = false;
        if (animationId) {
            cancelAnimationFrame(animationId);
        }

        // 清理容器
        setTimeout(() => {
            const container = document.getElementById('fireworks-container');
            if (container) {
                container.remove();
            }
            particles = [];
        }, 2000);
    }
})();