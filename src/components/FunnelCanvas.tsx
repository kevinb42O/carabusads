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
    
    // Load Logos for particle heads
    const encodeSvg = (svg: string) => `data:image/svg+xml;base64,${btoa(svg)}`;
    
    const metaSvg = `<svg width="256" height="256" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="8" fill="#1877F2" /><path d="M9.25 16V10.375h2.218l.354-2.326H9.25V6.539c0-.637.31-1.258 1.303-1.258h1.009V3.301s-.915-.157-1.791-.157c-1.827 0-3.022 1.114-3.022 3.131V8.05H4.72v2.326h2.03V16h2.5z" fill="#FFFFFF" /></svg>`;
    const igSvg = `<svg width="256" height="256" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="igGrad" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stop-color="#FED976" /><stop offset="25%" stop-color="#F56040" /><stop offset="50%" stop-color="#C13584" /><stop offset="100%" stop-color="#833AB4" /></linearGradient></defs><path fill="url(#igGrad)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" /></svg>`;
    const liSvg = `<svg width="256" height="256" viewBox="0 0 24 24" fill="#0A66C2" xmlns="http://www.w3.org/2000/svg"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`;
    const tikSvg = `<svg width="256" height="256" viewBox="0 0 16 16" fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg"><path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z" /></svg>`;

    const logos = [metaSvg, igSvg, liSvg, tikSvg].map(svg => {
      const img = new Image();
      img.src = encodeSvg(svg);
      return img;
    });
    
    const resize = () => {
      const parent = canvas.parentElement;
      width = parent?.clientWidth || window.innerWidth;
      height = parent?.clientHeight || window.innerHeight;
      
      // High DPI support for ultra professional look
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

    // 3D Engine Constants
    const focalLength = 700;
    let cameraY = -400; // Camera Y position (animated)
    const cameraZ = -800;
    const isMobile = window.innerWidth < 768;
    const gridCols = isMobile ? 25 : 50;
    const gridRows = isMobile ? 25 : 50;
    const spacing = isMobile ? 120 : 60;
    
    // Grid generation
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

    // Particles (Data Packets)
    class Particle {
      x: number = 0;
      y: number = 0;
      z: number = 0;
      speed: number = 0;
      trail: {x: number, y: number, z: number}[] = [];
      active: boolean = false;
      colorIndex: number = 0;
      logoIndex: number = 0;

      constructor() {
        this.reset();
      }
      
      reset() {
        const angle = Math.random() * Math.PI * 2;
        const radius = 1000 + Math.random() * 800; // spawn far outside
        this.x = Math.cos(angle) * radius;
        this.z = Math.sin(angle) * radius;
        this.y = 0;
        this.speed = 4 + Math.random() * 5;
        this.trail = [];
        this.active = true;
        this.colorIndex = Math.random();
        this.logoIndex = Math.floor(Math.random() * 4);
      }

      update(funnelIntensity: number, time: number) {
        if (!this.active) return;
        
        // Move towards center (0,0)
        const dx = 0 - this.x;
        const dz = 0 - this.z;
        const dist = Math.sqrt(dx * dx + dz * dz);
        
        if (dist < 40) {
          this.active = false;
          setTimeout(() => this.reset(), Math.random() * 2000);
          return;
        }

        // Acceleration towards the funnel hole
        const gravity = funnelIntensity * 25 * (1 - Math.min(dist/1200, 1));
        const currentSpeed = this.speed + gravity;
        
        // Swirl effect
        const swirlAngle = Math.atan2(dz, dx) + (funnelIntensity * 0.5 * (1 - dist/1200));
        
        this.x += Math.cos(swirlAngle) * currentSpeed;
        this.z += Math.sin(swirlAngle) * currentSpeed;
        
        // Calculate Y based on surface to stick to the grid
        const r = Math.sqrt(this.x * this.x + this.z * this.z);
        let funnelDrop = 0;
        if (r < 800) {
          const normalizedR = r / 800;
          funnelDrop = 1800 * Math.pow(1 - normalizedR, 3.5) * funnelIntensity;
        }
        const wave = Math.sin(this.x * 0.003 + time * 2) * 50 + Math.cos(this.z * 0.003 + time * 1.5) * 50;
        this.y = wave - funnelDrop;

        this.trail.push({ x: this.x, y: this.y, z: this.z });
        if (this.trail.length > 25) this.trail.shift();
      }
    }

    const particles = Array.from({ length: isMobile ? 15 : 35 }, () => new Particle());

    const project = (x: number, y: number, z: number, time: number, pitch: number, theta: number) => {
      // 1. Orbit Rotation (Y-axis)
      const rotatedX = x * Math.cos(theta) - z * Math.sin(theta);
      const rotatedZ = x * Math.sin(theta) + z * Math.cos(theta);
      
      // 2. Translate to Camera Space
      const cx_space = rotatedX;
      const cy_space = y - cameraY;
      const cz_space = rotatedZ - cameraZ;
      
      // 3. Pitch Rotation (X-axis) to look up/down
      const cosP = Math.cos(pitch);
      const sinP = Math.sin(pitch);
      
      const finalZ = cz_space * cosP + cy_space * sinP;
      const finalY = cy_space * cosP - cz_space * sinP;
      
      if (finalZ < 10) return null; 
      
      const scale = focalLength / finalZ;
      return {
        x: cx + cx_space * scale,
        y: cy + finalY * scale + 150, // Framing offset
        scale: scale,
        dz: finalZ
      };
    };

    let time = 0;
    let animationFrameId: number;
    let startTime = performance.now();

    const render = () => {
      const now = performance.now();
      // Particles still use real time
      time = ((now - startTime) / 1000) * 0.3;
      
      const progress = scrollProgress ? scrollProgress.get() : -1;
      const isScrubbing = progress >= 0;

      // When scrubbing, we map 0->1 scroll to 0->1 loopTime
      // When not scrubbing, we just loop normally over 15 seconds
      const loopDuration = 15;
      const loopTime = isScrubbing ? progress : ((time % loopDuration) / loopDuration);
      
      // Funnel intensity curve
      let funnelIntensity = 0;
      if (loopTime > 0.05 && loopTime < 0.95) {
        const activeTime = (loopTime - 0.05) / 0.9;
        funnelIntensity = Math.pow(Math.sin(activeTime * Math.PI), 1.5); 
      }

      // Camera Animation
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

      // The theta calculation (orbit)
      // When scrubbing, we rotate the camera 2 full times (4 * PI) across the entire scroll
      const theta = isScrubbing 
        ? progress * Math.PI * 4 
        : ((time % loopDuration) / loopDuration) * Math.PI * 2;

      // Draw background
      ctx.fillStyle = '#1a2e2e';
      ctx.fillRect(0, 0, width, height);

      // We need to calculate projected points first to draw lines
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

      // Function to draw grid lines with depth fading
      const drawLine = (p1: any, p2: any) => {
        if (!p1 || !p2) return;
        // Depth fade: much darker and subtler
        const avgDz = (p1.dz + p2.dz) / 2;
        const alpha = Math.max(0.01, Math.min(0.25, 1500 / avgDz));
        ctx.strokeStyle = `rgba(92, 203, 186, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      };

      // Draw Grid Horizontal & Vertical Lines
      for (let i = 0; i < gridRows; i++) {
        for (let j = 0; j < gridCols; j++) {
          const p = projectedGrid[i][j];
          if (!p) continue;

          // Draw right connection
          if (j < gridCols - 1) {
            drawLine(p, projectedGrid[i][j+1]);
          }
          // Draw bottom connection
          if (i < gridRows - 1) {
            drawLine(p, projectedGrid[i+1][j]);
          }

          // Draw node dots subtler
          const nodeAlpha = Math.max(0.01, Math.min(0.3, 1200 / p.dz));
          ctx.fillStyle = `rgba(92, 203, 186, ${nodeAlpha})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.scale * 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw Vignette over the grid (so grid fades, but particles stay perfectly bright)
      const gradBg = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(width, height) * 0.75);
      gradBg.addColorStop(0, 'rgba(15, 25, 25, 0)');
      gradBg.addColorStop(1, 'rgba(15, 25, 25, 0.95)');
      ctx.fillStyle = gradBg;
      ctx.fillRect(0, 0, width, height);

      ctx.globalCompositeOperation = 'screen';

      // Pass 1: Render Particle Trails (Screen Blending for glowing effect)
      particles.forEach(p => {
        p.update(funnelIntensity, time);
        if (!p.active || p.trail.length < 2) return;

        // Draw trail
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
        
        // Colors from video: Yellow/Orange/White
        const isWarm = p.colorIndex > 0.5;
        const colorBase = isWarm ? '255, 180, 50' : '255, 230, 150';
        
        ctx.strokeStyle = `rgba(${colorBase}, ${Math.min(0.8, p.trail.length * 0.05)})`;
        ctx.lineWidth = 1.2; // Thinner, sharper laser-like trails
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
      });

      // Pass 2: Render Platform Logos 
      ctx.globalCompositeOperation = 'source-over';
      particles.forEach(p => {
        if (!p.active || p.trail.length < 2) return;

        const headTp = p.trail[p.trail.length - 1];
        const head = project(headTp.x, headTp.y, headTp.z, time, pitch, theta);
        if (head) {
          const img = logos[p.logoIndex];
          if (img.complete) {
            // Give them a subtle white glow behind the logo
            ctx.beginPath();
            ctx.arc(head.x, head.y, head.scale * 18, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
            ctx.fill();

            // Sized for a premium, balanced look
            const size = head.scale * 35;
            
            // Draw Logo 
            ctx.drawImage(img, head.x - size/2, head.y - size/2, size, size);
          }
        }
      });

      // Core Glow at the bottom of the funnel
      const coreProj = project(0, -1800 * funnelIntensity, 0, time, pitch, theta);
      if (coreProj && funnelIntensity > 0.05) {
        const glowRadius = 800 * coreProj.scale * funnelIntensity;
        const grad = ctx.createRadialGradient(coreProj.x, coreProj.y, 0, coreProj.x, coreProj.y, glowRadius);
        grad.addColorStop(0, `rgba(92, 203, 186, ${0.4 * funnelIntensity})`);
        grad.addColorStop(0.2, `rgba(92, 203, 186, ${0.1 * funnelIntensity})`);
        grad.addColorStop(1, 'rgba(92, 203, 186, 0)');
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
