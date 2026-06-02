import React, { useEffect, useRef } from 'react';

export function FunnelCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let width = 0, height = 0, cx = 0, cy = 0;
    
    // No logos - using abstract glowing datanodes for premium tech aesthetic
    
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

    const project = (x: number, y: number, z: number, time: number, pitch: number) => {
      // 1. Orbit Rotation (Y-axis)
      const theta = ((time % 15) / 15) * Math.PI * 2;
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
      // Make everything exquisitely slow and subtle for high-end feel
      time = ((now - startTime) / 1000) * 0.3;
      
      // 15 seconds loop
      const loopDuration = 15;
      const loopTime = (time % loopDuration) / loopDuration; // 0 to 1
      
      // Funnel intensity curve (0 -> 1 -> 0 over the 15s)
      let funnelIntensity = 0;
      if (loopTime > 0.05 && loopTime < 0.95) {
        // Smooth transition using sine wave mapping
        const activeTime = (loopTime - 0.05) / 0.9;
        funnelIntensity = Math.pow(Math.sin(activeTime * Math.PI), 1.5); 
      }

      // Camera Animation (Look down when charging, tilt up towards peak)
      const lerp = (start: number, end: number, t: number) => start + (end - start) * t;
      const easeInOut = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      
      if (loopTime < 0.2) {
        // 0.0 -> 0.2: Camera moves UP to look steeper down at the charging (e.g., -400 to -900)
        const t = easeInOut(loopTime / 0.2);
        cameraY = lerp(-400, -900, t);
      } else if (loopTime < 0.5) {
        // 0.2 -> 0.5 (peak): Camera lowers to tilt up towards the peak (e.g., -900 to -150)
        const t = easeInOut((loopTime - 0.2) / 0.3);
        cameraY = lerp(-900, -150, t);
      } else if (loopTime < 0.95) {
        // 0.5 -> 0.95: Camera returns smoothly to base (-150 to -400)
        const t = easeInOut((loopTime - 0.5) / 0.45);
        cameraY = lerp(-150, -400, t);
      } else {
        cameraY = -400;
      }

      // Calculate the camera pitch to track the center of the base grid.
      // This makes the camera look steeply down when it's high up, 
      // but keeps it looking level (without tilting upwards) when it drops low, 
      // allowing the massive peak to tower over the camera.
      const targetY = 0; 
      const pitch = Math.atan2(-(cameraY - targetY), -cameraZ);

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
          
          projectedGrid[i][j] = project(v.x, v.currentY, v.z, time, pitch);
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
          const proj = project(tp.x, tp.y, tp.z, time, pitch);
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

      // Pass 2: Render Abstract Glowing Datapoints (Screen blending for tech aesthetic)
      ctx.globalCompositeOperation = 'screen';
      particles.forEach(p => {
        if (!p.active || p.trail.length < 2) return;

        const headTp = p.trail[p.trail.length - 1];
        const head = project(headTp.x, headTp.y, headTp.z, time, pitch);
        if (head) {
            const isWarm = p.colorIndex > 0.5;
            const colorBase = isWarm ? '255, 180, 50' : '92, 203, 186';
            
            // Outer Bloom
            ctx.beginPath();
            ctx.arc(head.x, head.y, head.scale * 15, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${colorBase}, 0.15)`;
            ctx.fill();

            // Mid Glow
            ctx.beginPath();
            ctx.arc(head.x, head.y, head.scale * 5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${colorBase}, 0.6)`;
            ctx.fill();

            // Core
            ctx.beginPath();
            ctx.arc(head.x, head.y, head.scale * 1.5, 0, Math.PI * 2);
            ctx.fillStyle = '#ffffff';
            ctx.fill();
        }
      });

      // Core Glow at the bottom of the funnel
      const coreProj = project(0, -1800 * funnelIntensity, 0, time, pitch);
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
