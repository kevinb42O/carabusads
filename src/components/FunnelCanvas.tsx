import React, { useEffect, useRef } from 'react';
import { MotionValue } from 'motion/react';

interface FunnelCanvasProps {
  scrollProgress?: MotionValue<number>;
}

export function FunnelCanvas({ scrollProgress }: FunnelCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let width = 0, height = 0, cx = 0, cy = 0;
    
    const resize = () => {
      const parent = canvas.parentElement;
      width = parent?.clientWidth || window.innerWidth;
      height = parent?.clientHeight || window.innerHeight;
      
      const maxDpr = window.innerWidth < 768 ? 1.5 : 2;
      const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      
      cx = width / 2;
      cy = height / 2;
    };
    window.addEventListener('resize', resize);
    resize();

    const focalLength = 700;
    let cameraY = -400; 
    const cameraZ = -800;
    const isMobile = window.innerWidth < 768;
    const gridCols = isMobile ? 20 : 30;
    const gridRows = isMobile ? 20 : 30;
    const spacing = isMobile ? 140 : 100;
    
    const vertices: {x: number, z: number, currentY: number}[] = [];
    for (let i = 0; i < gridRows; i++) {
      for (let j = 0; j < gridCols; j++) {
        vertices.push({
          x: (j - gridCols / 2) * spacing,
          z: (i - gridRows / 2) * spacing,
          currentY: 0
        });
      }
    }

    class Particle {
      x: number = 0;
      y: number = 0;
      z: number = 0;
      speed: number = 0;
      trail: {x: number, y: number, z: number}[] = [];
      active: boolean = false;
      chaosFactor: number = 1;

      constructor() {
        this.reset();
      }
      
      reset() {
        const angle = Math.random() * Math.PI * 2;
        const radius = 1000 + Math.random() * 800; 
        this.x = Math.cos(angle) * radius;
        this.z = Math.sin(angle) * radius;
        this.y = 0;
        this.speed = 4 + Math.random() * 5;
        this.trail = [];
        this.active = true;
        this.chaosFactor = Math.random() * 1.5;
      }

      update(funnelIntensity: number, time: number) {
        if (!this.active) return;
        
        const dx = 0 - this.x;
        const dz = 0 - this.z;
        const dist = Math.sqrt(dx * dx + dz * dz);
        
        if (dist < 40) {
          this.active = false;
          setTimeout(() => this.reset(), Math.random() * 2000);
          return;
        }

        // As they get closer, gravity increases massively
        const gravity = funnelIntensity * 35 * (1 - Math.min(dist/1200, 1));
        const currentSpeed = this.speed + gravity;
        
        // Swirl aggressively
        const swirlAngle = Math.atan2(dz, dx) + (funnelIntensity * 0.4 * (1 - dist/1200));
        
        this.x += Math.cos(swirlAngle) * currentSpeed;
        this.z += Math.sin(swirlAngle) * currentSpeed;
        
        const r = Math.sqrt(this.x * this.x + this.z * this.z);
        let funnelDrop = 0;
        if (r < 800) {
          const normalizedR = r / 800;
          funnelDrop = 1800 * Math.pow(1 - normalizedR, 3.5) * funnelIntensity;
        }
        
        // Chaos logic: erratically move up/down when far away, become perfectly straight/focused when near center
        const chaoticDistance = Math.max(0, Math.min(1, (r - 300) / 700)); // 1 when far, 0 when near
        const wave = Math.sin(this.x * 0.003 + time * 2) * 80 * chaoticDistance * this.chaosFactor + 
                     Math.cos(this.z * 0.003 + time * 1.5) * 80 * chaoticDistance * this.chaosFactor;
                     
        this.y = wave - funnelDrop;

        this.trail.push({ x: this.x, y: this.y, z: this.z });
        if (this.trail.length > 25) this.trail.shift();
      }
    }

    const particles = Array.from({ length: isMobile ? 20 : 45 }, () => new Particle());

    const project = (x: number, y: number, z: number, time: number, pitch: number, theta: number) => {
      const rotatedX = x * Math.cos(theta) - z * Math.sin(theta);
      const rotatedZ = x * Math.sin(theta) + z * Math.cos(theta);
      
      const cx_space = rotatedX;
      const cy_space = y - cameraY;
      const cz_space = rotatedZ - cameraZ;
      
      const cosP = Math.cos(pitch);
      const sinP = Math.sin(pitch);
      
      const finalZ = cz_space * cosP + cy_space * sinP;
      const finalY = cy_space * cosP - cz_space * sinP;
      
      if (finalZ < 10) return null; 
      
      const scale = focalLength / finalZ;
      return {
        x: cx + cx_space * scale,
        y: cy + finalY * scale + 150,
        scale: scale,
        dz: finalZ
      };
    };

    let time = 0;
    let animationFrameId: number;
    let startTime = performance.now();

    const render = () => {
      const now = performance.now();
      time = ((now - startTime) / 1000) * 0.3;
      
      const progress = scrollProgress ? scrollProgress.get() : -1;
      const isScrubbing = progress >= 0;

      const loopDuration = 15;
      const loopTime = isScrubbing ? progress : ((time % loopDuration) / loopDuration);
      
      let funnelIntensity = 0;
      if (loopTime > 0.05 && loopTime < 0.95) {
        const activeTime = (loopTime - 0.05) / 0.9;
        funnelIntensity = Math.pow(Math.sin(activeTime * Math.PI), 1.5); 
      }

      const lerp = (start: number, end: number, t: number) => start + (end - start) * t;
      const easeInOut = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      
      if (loopTime < 0.2) {
        const t = easeInOut(loopTime / 0.2);
        cameraY = lerp(-400, -900, t);
      } else if (loopTime < 0.5) {
        const t = easeInOut((loopTime - 0.2) / 0.3);
        cameraY = lerp(-900, -150, t);
      } else if (loopTime < 0.95) {
        const t = easeInOut((loopTime - 0.5) / 0.45);
        cameraY = lerp(-150, -400, t);
      } else {
        cameraY = -400;
      }

      const targetY = 0; 
      const pitch = Math.atan2(-(cameraY - targetY), -cameraZ);

      const theta = isScrubbing 
        ? progress * Math.PI * 4 
        : ((time % loopDuration) / loopDuration) * Math.PI * 2;

      ctx.fillStyle = '#0b1a29';
      ctx.fillRect(0, 0, width, height);

      const projectedGrid: any[][] = [];
      for (let i = 0; i < gridRows; i++) {
        projectedGrid[i] = [];
        for (let j = 0; j < gridCols; j++) {
          const v = vertices[i * gridCols + j];
          const r = Math.sqrt(v.x * v.x + v.z * v.z);
          
          let funnelDrop = 0;
          if (r < 800) {
            const normalizedR = r / 800;
            funnelDrop = 1800 * Math.pow(1 - normalizedR, 3.5) * funnelIntensity;
          }
          
          const wave = Math.sin(v.x * 0.003 + time * 2) * 50 + Math.cos(v.z * 0.003 + time * 1.5) * 50;
          v.currentY = wave - funnelDrop;
          
          projectedGrid[i][j] = project(v.x, v.currentY, v.z, time, pitch, theta);
        }
      }

      const drawLine = (p1: any, p2: any) => {
        if (!p1 || !p2) return;
        const avgDz = (p1.dz + p2.dz) / 2;
        const alpha = Math.max(0.005, Math.min(0.2, 1200 / avgDz));
        ctx.strokeStyle = `rgba(155, 188, 217, ${alpha})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      };

      for (let i = 0; i < gridRows; i++) {
        for (let j = 0; j < gridCols; j++) {
          const p = projectedGrid[i][j];
          if (!p) continue;

          if (j < gridCols - 1) {
            drawLine(p, projectedGrid[i][j+1]);
          }
          if (i < gridRows - 1) {
            drawLine(p, projectedGrid[i+1][j]);
          }

          const nodeAlpha = Math.max(0.02, Math.min(0.5, 1000 / p.dz));
          ctx.fillStyle = `rgba(180, 210, 230, ${nodeAlpha})`;
          ctx.beginPath();
          // Cap scale to prevent massive nodes near camera
          ctx.arc(p.x, p.y, Math.min(p.scale, 1.5) * 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.globalCompositeOperation = 'screen';

      particles.forEach(p => {
        p.update(funnelIntensity, time);
        if (!p.active || p.trail.length < 2) return;

        ctx.beginPath();
        let trailDrawing = false;
        for (let i = 0; i < p.trail.length; i++) {
          const tp = p.trail[i];
          const proj = project(tp.x, tp.y, tp.z, time, pitch, theta);
          if (proj) {
            if (!trailDrawing) {
              ctx.moveTo(proj.x, proj.y);
              trailDrawing = true;
            } else {
              ctx.lineTo(proj.x, proj.y);
            }
          }
        }
        
        ctx.strokeStyle = `rgba(155, 188, 217, ${Math.min(0.8, p.trail.length * 0.05)})`;
        ctx.lineWidth = 1.5; 
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
      });

      particles.forEach(p => {
        if (!p.active || p.trail.length < 2) return;

        const headTp = p.trail[p.trail.length - 1];
        const head = project(headTp.x, headTp.y, headTp.z, time, pitch, theta);
        if (head) {
          // Cap visual scale heavily to make orbs sharp and tiny, preventing massive overdraw
          const visualScale = Math.min(head.scale, 1.5);
          
          ctx.beginPath();
          ctx.arc(head.x, head.y, visualScale * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'; 
          ctx.fill();
          
          ctx.beginPath();
          ctx.arc(head.x, head.y, visualScale * 8, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(155, 188, 217, 0.25)'; 
          ctx.fill();
        }
      });

      const coreProj = project(0, -1800 * funnelIntensity, 0, time, pitch, theta);
      if (coreProj && funnelIntensity > 0.05) {
        // Cap the max radius of the gradient to prevent fill-rate lag spikes
        const glowRadius = Math.min(width * 0.5, 400 * coreProj.scale * funnelIntensity);
        const grad = ctx.createRadialGradient(coreProj.x, coreProj.y, 0, coreProj.x, coreProj.y, glowRadius);
        grad.addColorStop(0, `rgba(155, 188, 217, ${0.4 * funnelIntensity})`);
        grad.addColorStop(0.2, `rgba(155, 188, 217, ${0.1 * funnelIntensity})`);
        grad.addColorStop(1, 'rgba(155, 188, 217, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(coreProj.x, coreProj.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalCompositeOperation = 'source-over';
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0 pointer-events-none" />;
}
