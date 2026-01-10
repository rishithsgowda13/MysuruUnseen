
import React, { useEffect, useRef } from 'react';

const GlowingCursor = () => {
    const canvasRef = useRef(null);
    const points = useRef([]);
    const mouse = useRef({ x: 0, y: 0 });
    const frameCount = useRef(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        // Helper to handle edge cases for points array with safety
        const getPoint = (arr, i) => {
            if (i < 0) return arr[0];
            if (i >= arr.length) return arr[arr.length - 1];
            return arr[i];
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            frameCount.current++;

            // Shortened length for faster duration (30 points)
            if (points.current.length > 30) {
                points.current.shift();
            }

            // Fade out mechanism: Remove tail point every 2 frames
            // This makes the fade slower and smoother than removing every frame
            if (points.current.length > 1 && frameCount.current % 2 === 0) {
                points.current.shift();
            }

            if (points.current.length > 3) {
                ctx.lineCap = 'round';
                ctx.lineJoin = 'round';
                ctx.globalCompositeOperation = 'source-over';

                const isLightMode = document.body.classList.contains('light-mode');

                const strands = isLightMode ? [
                    // Gold Theme Colors for Light Mode (Darker for visibility on white)
                    { color: '#B8860B', offset: 0, width: 4 },    // Dark Goldenrod (Core)
                    { color: '#DAA520', offset: 5, width: 3 },    // Goldenrod
                    { color: '#DAA520', offset: -5, width: 3 },   // Goldenrod
                    { color: '#CD853F', offset: 10, width: 2 },   // Peru (Bronze-ish)
                    { color: '#CD853F', offset: -10, width: 2 }   // Peru
                ] : [
                    // Light Theme Colors for Dark Mode
                    { color: '#ffffff', offset: 0, width: 4 },    // White (Core)
                    { color: '#FFD700', offset: 5, width: 3 },    // Gold (Inner)
                    { color: '#FFD700', offset: -5, width: 3 },   // Gold (Inner)
                    { color: '#FFA500', offset: 10, width: 2 },   // Amber (Outer)
                    { color: '#FFA500', offset: -10, width: 2 }   // Amber (Outer)
                ];

                strands.forEach((strand) => {
                    // Calculate all points for this strand first
                    const pathPoints = [];
                    for (let i = 0; i < points.current.length; i++) {
                        const p = points.current[i];
                        const pPrev = getPoint(points.current, i - 1);
                        const pNext = getPoint(points.current, i + 1);

                        const dx = pNext.x - pPrev.x;
                        const dy = pNext.y - pPrev.y;
                        const len = Math.sqrt(dx * dx + dy * dy) || 1;
                        const nx = -dy / len; // Normal vector
                        const ny = dx / len;

                        pathPoints.push({
                            x: p.x + nx * strand.offset,
                            y: p.y + ny * strand.offset
                        });
                    }

                    // Draw segments with tapering width and alpha
                    for (let j = 0; j < pathPoints.length - 1; j++) {
                        const pt1 = pathPoints[j];
                        const pt2 = pathPoints[j + 1];

                        // Progress 0.0 (Tail) -> 1.0 (Head)
                        const progress = j / pathPoints.length;

                        ctx.beginPath();
                        ctx.moveTo(pt1.x, pt1.y);
                        ctx.lineTo(pt2.x, pt2.y);

                        // Tapering: Thin at tail, full width at head
                        ctx.lineWidth = strand.width * Math.max(0.1, progress);

                        ctx.strokeStyle = strand.color;

                        // Fading: Transparent at tail, Opaque at head
                        ctx.globalAlpha = Math.max(0, progress - 0.1);

                        ctx.shadowBlur = 10 * progress; // Glow fades too
                        ctx.shadowColor = '#FFD700';

                        ctx.stroke();
                    }
                });

                ctx.globalAlpha = 1.0;
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e) => {
            mouse.current.x = e.clientX;
            mouse.current.y = e.clientY;
            // Add point to history
            points.current.push({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove);

        resize();
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="cursor-canvas"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 0, // Behind content
            }}
        />
    );
};

export default GlowingCursor;

