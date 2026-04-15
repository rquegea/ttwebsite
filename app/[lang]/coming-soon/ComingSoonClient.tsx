'use client';

import { useEffect, useRef, useState } from 'react';

export function generateStaticParams() {
  return [{ lang: 'es' }, { lang: 'en' }];
}
import { useParams } from 'next/navigation';
import './coming-soon.css';

export default function ComingSoon() {
  const params = useParams();
  const lang = params.lang === 'en' ? 'en' : 'es';
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scoreLeft, setScoreLeft] = useState(0);
  const [scoreRight, setScoreRight] = useState(0);
  const [playerMode, setPlayerMode] = useState(false);
  const [coinInserted, setCoinInserted] = useState(false);

  // Pong game
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    let W = 0, H = 0;
    let animId: number;
    let mouseY = 0;
    let isPlayerMode = false;
    let sLeft = 0, sRight = 0;

    const isMobileCheck = () => window.innerWidth <= 600;
    const BALL_SIZE = () => isMobileCheck() ? 14 : 18;
    const PADDLE_H = () => isMobileCheck() ? 50 : 70;
    const PADDLE_W = 10;
    const AI_SPEED = 3.5;

    const ball = { x: 0, y: 0, vx: 3, vy: 2, trail: [] as {x:number,y:number}[] };
    const paddleLeft = { x: 20, y: 0 };
    const paddleRight = { x: 0, y: 0 };
    let particles: { x:number, y:number, vx:number, vy:number, life:number }[] = [];

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      ball.x = W / 2;
      ball.y = H / 2;
      paddleLeft.y = H / 2 - PADDLE_H() / 2;
      paddleRight.x = W - 20 - PADDLE_W;
      paddleRight.y = H / 2 - PADDLE_H() / 2;
      mouseY = H / 2;
    }

    function spawnParticles(x: number, y: number) {
      for (let i = 0; i < 6; i++) {
        particles.push({ x, y, vx: (Math.random()-0.5)*4, vy: (Math.random()-0.5)*4, life: 1 });
      }
    }

    function resetBall(dir: number) {
      ball.x = W / 2;
      ball.y = H / 2;
      ball.vx = 3 * dir;
      ball.vy = (Math.random() - 0.5) * 4;
      ball.trail = [];
    }

    function update() {
      const pH = PADDLE_H();
      const bs = BALL_SIZE();
      ball.x += ball.vx;
      ball.y += ball.vy;

      ball.trail.push({ x: ball.x, y: ball.y });
      if (ball.trail.length > 8) ball.trail.shift();

      const half = bs / 2;
      if (ball.y - half <= 0 || ball.y + half >= H) {
        ball.vy *= -1;
        ball.y = ball.y - half <= 0 ? half : H - half;
      }

      const leftTarget = ball.y - pH / 2;
      if (paddleLeft.y < leftTarget - 5) paddleLeft.y += AI_SPEED;
      else if (paddleLeft.y > leftTarget + 5) paddleLeft.y -= AI_SPEED;
      paddleLeft.y = Math.max(0, Math.min(H - pH, paddleLeft.y));

      if (isPlayerMode) {
        paddleRight.y = mouseY - pH / 2;
      } else {
        const rightTarget = ball.y - pH / 2;
        if (paddleRight.y < rightTarget - 5) paddleRight.y += AI_SPEED;
        else if (paddleRight.y > rightTarget + 5) paddleRight.y -= AI_SPEED;
      }
      paddleRight.y = Math.max(0, Math.min(H - pH, paddleRight.y));

      if (ball.x - half <= paddleLeft.x + PADDLE_W && ball.y + half >= paddleLeft.y && ball.y - half <= paddleLeft.y + pH && ball.vx < 0) {
        ball.vx = Math.abs(ball.vx) * 1.02;
        ball.x = paddleLeft.x + PADDLE_W + half;
        ball.vy += ((ball.y - paddleLeft.y) / pH - 0.5) * 2;
        spawnParticles(ball.x, ball.y);
      }

      if (ball.x + half >= paddleRight.x && ball.y + half >= paddleRight.y && ball.y - half <= paddleRight.y + pH && ball.vx > 0) {
        ball.vx = -Math.abs(ball.vx) * 1.02;
        ball.x = paddleRight.x - half;
        ball.vy += ((ball.y - paddleRight.y) / pH - 0.5) * 2;
        spawnParticles(ball.x, ball.y);
      }

      if (ball.x < -bs) { sRight++; setScoreRight(sRight); resetBall(-1); }
      if (ball.x > W + bs) { sLeft++; setScoreLeft(sLeft); resetBall(1); }

      const maxSpeed = 7;
      ball.vx = Math.max(-maxSpeed, Math.min(maxSpeed, ball.vx));
      ball.vy = Math.max(-maxSpeed, Math.min(maxSpeed, ball.vy));

      particles = particles.filter(p => { p.x += p.vx; p.y += p.vy; p.life -= 0.03; return p.life > 0; });
    }

    function draw() {
      const pH = PADDLE_H();
      const bs = BALL_SIZE();
      ctx.clearRect(0, 0, W, H);

      ctx.setLineDash([10, 10]);
      ctx.strokeStyle = '#eee';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(W / 2, 0);
      ctx.lineTo(W / 2, H);
      ctx.stroke();
      ctx.setLineDash([]);

      const half = bs / 2;
      ball.trail.forEach((t, i) => {
        const alpha = (i / ball.trail.length) * 0.15;
        const s = bs * (0.5 + (i / ball.trail.length) * 0.5);
        ctx.globalAlpha = alpha;
        ctx.fillStyle = '#B74128';
        ctx.fillRect(t.x - s/2, t.y - s/2, s, s);
      });
      ctx.globalAlpha = 1;

      ctx.save();
      ctx.shadowColor = '#B74128';
      ctx.shadowBlur = 12;
      ctx.fillStyle = '#B74128';
      ctx.fillRect(ball.x - half, ball.y - half, bs, bs);
      ctx.restore();

      ctx.shadowColor = '#0a0a0a';
      ctx.shadowBlur = 5;
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(paddleLeft.x, paddleLeft.y, PADDLE_W, pH);
      ctx.fillRect(paddleRight.x, paddleRight.y, PADDLE_W, pH);
      ctx.shadowBlur = 0;

      particles.forEach(p => {
        ctx.globalAlpha = p.life;
        ctx.fillStyle = '#B74128';
        ctx.fillRect(p.x - 2, p.y - 2, 4, 4);
      });
      ctx.globalAlpha = 1;
    }

    function loop() { update(); draw(); animId = requestAnimationFrame(loop); }

    const onMouseMove = (e: MouseEvent) => { mouseY = e.clientY; };
    const onTouchMove = (e: TouchEvent) => { mouseY = e.touches[0].clientY; };

    resize();
    window.addEventListener('resize', resize);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('touchmove', onTouchMove, { passive: true });
    loop();

    (window as any).__pongActivatePlayer = () => {
      isPlayerMode = true;
      sLeft = 0; sRight = 0;
      setScoreLeft(0); setScoreRight(0);
      resetBall(1);
    };

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('touchmove', onTouchMove);
      delete (window as any).__pongActivatePlayer;
    };
  }, []);

  function handleInsertCoin() {
    setCoinInserted(true);
    setPlayerMode(true);
    (window as any).__pongActivatePlayer?.();
  }

  return (
    <div className="cs-wrap">
      <canvas ref={canvasRef} style={{ display: 'block', position: 'fixed', inset: 0 }} />

      <div className="cs-score">
        <span>{scoreLeft}</span>
        <span>{scoreRight}</span>
      </div>

      <div className="cs-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logos/tyt80s.png" alt="T&T" className="cs-logo" />
        <div className="cs-title">{lang === 'en' ? 'COMING SOON' : 'PRÓXIMAMENTE'}</div>
        <div className="cs-tagline">
          {lang === 'en'
            ? 'ACCELERATING GROWTH THROUGH MARKETING AND TECHNOLOGY.'
            : 'ACELERANDO EL CRECIMIENTO A TRAVÉS DEL MARKETING Y LA TECNOLOGÍA.'}
        </div>
      </div>

      {!coinInserted && (
        <button className="cs-insert-coin" onClick={handleInsertCoin}>
          {lang === 'en' ? 'INSERT COIN TO PLAY' : 'INSERTA MONEDA PARA JUGAR'}
        </button>
      )}

      <div className={`cs-player-mode${playerMode ? ' active' : ''}`}>
        {lang === 'en' ? 'PLAYER 1 — MOVE YOUR MOUSE / TOUCH' : 'JUGADOR 1 — MUEVE TU RATÓN / TOCA'}
      </div>

      <div className="cs-contact">
        <p>{lang === 'en' ? 'MEANWHILE, WRITE TO US' : 'MIENTRAS TANTO, ESCRÍBENOS'}</p>
        <a href="mailto:trucoytrufa@trucoytrufa.es">trucoytrufa@trucoytrufa.es</a>
      </div>
    </div>
  );
}
