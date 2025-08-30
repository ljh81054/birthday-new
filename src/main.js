

// src/main.js — Vue应用入口（只保留Vue相关代码）

import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
//     // js/main.js — 公共脚本（星空、漂心、按钮、音乐）
//     // 放在所有页面 <script src="js/main.js"></script> 后面加载
//
//     (function () {
//         // ====== 星空 ======
//         const canvas = document.getElementById('stars');
//         if (canvas) {
//             const ctx = canvas.getContext('2d');
//             let stars = [];
//             let rafId = null;
//
//             function buildStars() {
//                 const area = window.innerWidth * window.innerHeight;
//                 const count = Math.min(260, Math.max(80, Math.floor(area / 9000)));
//                 stars = Array.from({ length: count }).map(() => ({
//                     x: Math.random() * canvas.width,
//                     y: Math.random() * canvas.height,
//                     r: Math.random() * 1.4 + 0.2,
//                     a: Math.random() * 0.8 + 0.1,
//                     tw: (Math.random() * 0.02 + 0.003) * (Math.random() < 0.5 ? -1 : 1)
//                 }));
//             }
//
//             function resizeCanvas() {
//                 canvas.width = window.innerWidth;
//                 canvas.height = window.innerHeight;
//                 buildStars();
//             }
//             window.addEventListener('resize', () => {
//                 resizeCanvas();
//             }, { passive: true });
//             resizeCanvas();
//
//             function draw() {
//                 ctx.clearRect(0, 0, canvas.width, canvas.height);
//                 for (const s of stars) {
//                     s.a += s.tw;
//                     if (s.a < 0.08 || s.a > 0.95) s.tw *= -1;
//                     ctx.globalAlpha = s.a;
//                     ctx.beginPath();
//                     ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
//                     ctx.fillStyle = '#fff';
//                     ctx.fill();
//                 }
//                 rafId = requestAnimationFrame(draw);
//             }
//             if (!rafId) draw();
//         }
// // robust-bindings.js —— 确保在 DOMContentLoaded 后绑定
//         document.addEventListener('DOMContentLoaded', function () {
//             // 音乐播放（稳健的播放/暂停切换）
//             const bgm = document.getElementById('bgm');
//             const playBtn = document.getElementById('playMusic');
//
//             function setPlayText(isPlaying){
//                 if(!playBtn) return;
//                 playBtn.textContent = isPlaying ? '⏸ 暂停音乐' : '♪ 播放音乐';
//             }
//
//             if(playBtn){
//                 if(!bgm){
//                     playBtn.disabled = true;
//                     playBtn.title = '未找到音频，请检查 assets/birthday.mp3 路径';
//                 } else {
//                     // 初始化文字
//                     setPlayText(!bgm.paused && !bgm.ended);
//
//                     playBtn.addEventListener('click', async function () {
//                         try {
//                             if (bgm.paused) {
//                                 await bgm.play();
//                                 setPlayText(true);
//                             } else {
//                                 bgm.pause();
//                                 setPlayText(false);
//                             }
//                         } catch (err) {
//                             console.warn('audio play error:', err);
//                             alert('音乐无法播放（浏览器限制或文件路径错误）。请查看控制台 (F12) 的错误信息。');
//                         }
//                     });
//
//                     // 音乐结束恢复按钮文案
//                     bgm.addEventListener('ended', function () { setPlayText(false); });
//                 }
//             }
//
//             // 礼物按钮与祝福卡片（确保 messageCard 存在）
//             const giftBtn = document.getElementById('giftBtn');
//             const messageCard = document.getElementById('messageCard');
//             if (giftBtn && messageCard) {
//                 giftBtn.addEventListener('click', function () {
//                     messageCard.classList.remove('hidden');
//                     // 平滑滚动到卡片
//                     try { messageCard.scrollIntoView({ behavior: 'smooth', block: 'center' }); } catch(e) {}
//                     // 触发烟花（如果存在）
//                     if (window.startFireworks && typeof window.startFireworks === 'function') {
//                         try { window.startFireworks(); } catch(e) { console.warn(e); }
//                     }
//                 });
//             }
//         });
//
//         // ====== 漂浮爱心（点击） ======
//         document.body.addEventListener('click', (e) => {
//             const tag = (e.target || {}).tagName || '';
//             if (tag.toLowerCase() === 'button' || (e.target && e.target.classList.contains && e.target.classList.contains('btn'))) {
//                 return; // 避免按钮触发心
//             }
//             const x = e.pageX, y = e.pageY;
//             for (let i = 0; i < 2 + Math.floor(Math.random() * 3); i++) {
//                 spawnHeart(x + (Math.random() * 24 - 12), y + (Math.random() * 18 - 9));
//             }
//         }, { passive: true });
//
//         function spawnHeart(left, top) {
//             const d = document.createElement('div');
//             d.textContent = '❤';
//             d.className = 'floating-heart';
//             // inline style 保证在没有样式表时也能显示
//             d.style.position = 'absolute';
//             d.style.left = left + 'px';
//             d.style.top = top + 'px';
//             d.style.transform = 'translate(-50%, -50%)';
//             d.style.pointerEvents = 'none';
//             d.style.fontSize = (14 + Math.floor(Math.random() * 12)) + 'px';
//             d.style.opacity = '1';
//             document.body.appendChild(d);
//
//             const anim = d.animate([
//                 { transform: 'translateY(0) scale(1)', opacity: 1 },
//                 { transform: `translateY(-${120 + Math.random() * 90}px) scale(${1.1 + Math.random() * 0.8})`, opacity: 0 }
//             ], {
//                 duration: 1400 + Math.random() * 900,
//                 easing: 'cubic-bezier(.22,.9,.35,1)'
//             });
//             anim.onfinish = () => d.remove();
//         }
//
//         // ====== 礼物按钮（共用行为） ======
//         const giftBtn = document.getElementById('giftBtn');
//         if (giftBtn) {
//             giftBtn.addEventListener('click', () => {
//                 const card = document.getElementById('messageCard');
//                 if (card) {
//                     card.classList.remove('hidden');
//                     card.scrollIntoView({ behavior: 'smooth', block: 'center' });
//                 }
//                 // 如果 fireworks 模块提供了 startFireworks，则触发一次（安全调用）
//                 if (window.startFireworks && typeof window.startFireworks === 'function') {
//                     try { window.startFireworks(); } catch (err) { /* 忽略 */ }
//                 }
//             });
//         }
//
//         // ====== 音乐按钮 ======
//         const playBtn = document.getElementById('playMusic') || document.getElementById('play-music');
//         if (playBtn) {
//             const bgm = document.getElementById('bgm');
//             playBtn.addEventListener('click', async () => {
//                 if (!bgm) return;
//                 try {
//                     await bgm.play();
//                 } catch (err) {
//                     // 浏览器策略可能阻止自动播放：简单提示用户
//                     console.warn('音频无法播放（需要用户手动允许）：', err);
//                 }
//             });
//         }
//         / 添加音频控制和messageCard显示逻辑
//         document.addEventListener('DOMContentLoaded', () => {
//             const playButton = document.getElementById('playMusic');
//             const bgm = document.getElementById('bgm');
//             const messageCard = document.getElementById('messageCard');
//
//             // 播放音乐功能
//             if (playButton && bgm) {
//                 playButton.addEventListener('click', () => {
//                     if (bgm.paused) {
//                         bgm.play().then(() => {
//                             console.log('音乐开始播放');
//                             playButton.textContent = '暂停音乐 🎵';
//                         }).catch(err => {
//                             console.error('音乐播放失败:', err);
//                             alert('音乐播放失败，请检查音频文件路径');
//                         });
//                     } else {
//                         bgm.pause();
//                         playButton.textContent = '播放音乐 🎵';
//                     }
//                 });
//             }
//
//             // 显示messageCard（如果存在hidden class）
//             if (messageCard) {
//                 // 你可以选择立即显示或延迟显示
//                 setTimeout(() => {
//                     messageCard.classList.remove('hidden');
//                     messageCard.style.opacity = '0';
//                     messageCard.style.transition = 'opacity 1s ease-in-out';
//                     setTimeout(() => {
//                         messageCard.style.opacity = '1';
//                     }, 100);
//                 }, 2000); // 2秒后显示
//             }
//         });
//     })();
