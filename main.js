// 轻微视差跟随鼠标移动，让图中心始终在屏幕中心附近
(function () {
    const hero = document.getElementById('hero');
    if (!hero) return;

    // 位移幅度（像素），可按需要微调
    const maxShift = 12; // 最大偏移，避免位移过大导致空边

    let viewportWidth = window.innerWidth;
    let viewportHeight = window.innerHeight;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId = 0;

    function onResize() {
        viewportWidth = window.innerWidth;
        viewportHeight = window.innerHeight;
    }

    function onPointerMove(e) {
        const x = e.clientX;
        const y = e.clientY;
        const dx = (x / viewportWidth) * 2 - 1;  // [-1, 1]
        const dy = (y / viewportHeight) * 2 - 1; // [-1, 1]
        targetX = -dx * maxShift;
        targetY = -dy * maxShift;
        start();
    }

    function tick() {
        // 惯性插值，平滑移动
        const lerp = 0.08;
        currentX += (targetX - currentX) * lerp;
        currentY += (targetY - currentY) * lerp;
        hero.style.setProperty('--tx', currentX + 'px');
        hero.style.setProperty('--ty', currentY + 'px');
        rafId = requestAnimationFrame(tick);
    }

    function start() {
        if (!rafId) rafId = requestAnimationFrame(tick);
    }

    function stop() {
        if (rafId) {
            cancelAnimationFrame(rafId);
            rafId = 0;
        }
    }

    window.addEventListener('resize', onResize, { passive: true });
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    // 在标签页隐藏时暂停动画以省电
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stop();
        } else if (targetX !== currentX || targetY !== currentY) {
            start();
        }
    });
})();


