'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import styles from './layout.module.css';

const steps = [
    { n: 1, label: 'Style', path: '/ai-studio/step-1' },
    { n: 2, label: 'Describe', path: '/ai-studio/step-2' },
    { n: 3, label: 'Generate', path: '/ai-studio/step-3' },
    { n: 4, label: 'Customise', path: '/ai-studio/step-4' },
    { n: 5, label: 'Quote', path: '/ai-studio/step-5' },
];

function FloatingParticles() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animId: number;

        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        // Geometric particles — diamonds, lines, dots
        type Particle = {
            x: number; y: number; vx: number; vy: number;
            size: number; opacity: number; type: 'diamond' | 'dot' | 'line';
            rotation: number; rotSpeed: number; pulse: number; pulseSpeed: number;
        };

        const particles: Particle[] = Array.from({ length: 28 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.25,
            vy: (Math.random() - 0.5) * 0.25,
            size: Math.random() * 10 + 4,
            opacity: Math.random() * 0.15 + 0.05,
            type: (['diamond', 'dot', 'line'] as const)[Math.floor(Math.random() * 3)],
            rotation: Math.random() * Math.PI * 2,
            rotSpeed: (Math.random() - 0.5) * 0.005,
            pulse: Math.random() * Math.PI * 2,
            pulseSpeed: Math.random() * 0.008 + 0.003,
        }));

        const drawDiamond = (x: number, y: number, size: number, rot: number, alpha: number) => {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(rot);
            ctx.globalAlpha = alpha;
            ctx.strokeStyle = '#A88E5E';
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(0, -size);
            ctx.lineTo(size * 0.6, 0);
            ctx.lineTo(0, size);
            ctx.lineTo(-size * 0.6, 0);
            ctx.closePath();
            ctx.stroke();
            // Inner facet lines
            ctx.beginPath();
            ctx.moveTo(-size * 0.6, 0);
            ctx.lineTo(0, -size * 0.35);
            ctx.lineTo(size * 0.6, 0);
            ctx.stroke();
            ctx.restore();
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                p.rotation += p.rotSpeed;
                p.pulse += p.pulseSpeed;

                const pulsedOpacity = p.opacity * (0.6 + 0.4 * Math.sin(p.pulse));

                if (p.x < -20) p.x = canvas.width + 20;
                if (p.x > canvas.width + 20) p.x = -20;
                if (p.y < -20) p.y = canvas.height + 20;
                if (p.y > canvas.height + 20) p.y = -20;

                if (p.type === 'diamond') {
                    drawDiamond(p.x, p.y, p.size, p.rotation, pulsedOpacity);
                } else if (p.type === 'dot') {
                    ctx.save();
                    ctx.globalAlpha = pulsedOpacity;
                    ctx.fillStyle = '#A88E5E';
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size * 0.25, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.restore();
                } else {
                    ctx.save();
                    ctx.globalAlpha = pulsedOpacity * 0.6;
                    ctx.strokeStyle = '#A88E5E';
                    ctx.lineWidth = 0.6;
                    ctx.save();
                    ctx.translate(p.x, p.y);
                    ctx.rotate(p.rotation);
                    ctx.beginPath();
                    ctx.moveTo(-p.size * 1.2, 0);
                    ctx.lineTo(p.size * 1.2, 0);
                    ctx.stroke();
                    ctx.restore();
                    ctx.restore();
                }
            });

            animId = requestAnimationFrame(draw);
        };

        draw();
        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
}

export default function AIStudioLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const currentStep = steps.find(s => pathname?.includes(`step-${s.n}`))?.n ?? 0;

    return (
        <div className={styles.shell}>
            <FloatingParticles />

            {/* Top bar */}
            <div className={styles.topBar}>
                <Link href="/" className={styles.back}>← Back to Shop</Link>

                <div className={styles.stepList}>
                    {steps.map((s, i) => {
                        const isActive = currentStep === s.n;
                        const isCompleted = currentStep > s.n;
                        return (
                            <div key={s.n} className={styles.stepItem}>
                                <Link
                                    href={s.path}
                                    className={`${styles.stepLink} ${isActive ? styles.stepLinkActive : ''} ${isCompleted ? styles.stepLinkDone : ''}`}
                                >
                                    <span className={`${styles.stepNum} ${isActive ? styles.stepNumActive : ''} ${isCompleted ? styles.stepNumDone : ''}`}>
                                        {isCompleted ? '✓' : s.n}
                                    </span>
                                    <span className={`${styles.stepLabel} ${isActive ? styles.stepLabelActive : ''}`}>{s.label}</span>
                                </Link>
                                {i < steps.length - 1 && (
                                    <span className={`${styles.stepConnector} ${isCompleted ? styles.stepConnectorDone : ''}`} />
                                )}
                            </div>
                        );
                    })}
                </div>

                <span className={styles.brand}>AI Studio</span>
            </div>

            <main className={styles.main}>{children}</main>
        </div>
    );
}
