import { useEffect, useRef } from 'react';
import CoderCircuitBackground from './CoderCircuitBackground';

function DesignerBackground() {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return undefined;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = true;
    const update = () => {
      const paused = motion.matches || document.hidden || !visible;
      svg.classList.toggle('is-paused', paused);
      if (paused) svg.pauseAnimations();
      else svg.unpauseAnimations();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    }, { rootMargin: '80px' });
    observer.observe(svg);
    document.addEventListener('visibilitychange', update);
    motion.addEventListener('change', update);
    update();
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', update);
      motion.removeEventListener('change', update);
    };
  }, []);

  return <svg ref={svgRef} className="home-designer-system" viewBox="0 0 700 700" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <g className="home-design-grid">
      <path d="M0 110H700M0 205H700M0 300H700M0 395H700M0 490H700M0 585H700M105 0V700M215 0V700M325 0V700M435 0V700M545 0V700M655 0V700" />
    </g>
    <g className="home-design-frame home-design-frame--one">
      <rect x="48" y="118" width="355" height="250" rx="10" />
      <path d="M48 156h355M91 156v212M146 156v212M201 156v212M256 156v212M311 156v212M366 156v212" />
      <circle cx="87" cy="137" r="3" /><circle cx="103" cy="137" r="3" /><circle cx="119" cy="137" r="3" />
    </g>
    <g className="home-design-frame home-design-frame--two">
      <rect x="85" y="448" width="295" height="171" rx="8" />
      <path d="M85 481h295M111 515h205M111 540h153M111 565h178" />
      <circle cx="346" cy="554" r="18" />
    </g>
    <g className="home-design-graph">
      <path d="M90 411Q156 368 220 427T359 419Q433 388 494 464">
        <animate attributeName="d" values="M90 411Q156 368 220 427T359 419Q433 388 494 464;M90 400Q156 370 220 446T359 401Q433 377 494 451;M90 411Q156 368 220 427T359 419Q433 388 494 464" dur="7.8s" repeatCount="indefinite" />
      </path>
      <circle cx="90" cy="411" r="4"><animate attributeName="cy" values="411;400;411" dur="7.8s" repeatCount="indefinite" /></circle>
      <circle cx="220" cy="427" r="5"><animate attributeName="cy" values="427;446;427" dur="7.8s" repeatCount="indefinite" /></circle>
      <circle cx="359" cy="419" r="4"><animate attributeName="cy" values="419;401;419" dur="7.8s" repeatCount="indefinite" /></circle>
      <circle cx="494" cy="464" r="5"><animate attributeName="cy" values="464;451;464" dur="7.8s" repeatCount="indefinite" /></circle>
    </g>
    <path className="home-design-curve home-design-curve--one" d="M20 346C128 217 226 497 341 290S511 188 684 103">
      <animate attributeName="d" values="M20 346C128 217 226 497 341 290S511 188 684 103;M20 346C149 274 245 425 341 321S513 226 684 103;M20 346C128 217 226 497 341 290S511 188 684 103" dur="8s" repeatCount="indefinite" />
    </path>
    <path className="home-design-curve home-design-curve--two" d="M0 584C130 526 207 654 330 522S543 454 700 357">
      <animate attributeName="d" values="M0 584C130 526 207 654 330 522S543 454 700 357;M0 584C149 492 248 601 330 500S537 490 700 357;M0 584C130 526 207 654 330 522S543 454 700 357" dur="9.6s" repeatCount="indefinite" />
    </path>
    <g className="home-design-handles">
      <path d="M136 315L220 427l77-76M273 307l68-17 50-55" />
      <circle cx="136" cy="315" r="3" /><circle cx="297" cy="351" r="3" />
      <circle cx="273" cy="307" r="3" /><circle cx="391" cy="235" r="3" />
    </g>
    <g className="home-design-markers">
      <path d="M71 78h41m-20-20v41M450 132h42m-21-21v42" />
      <circle cx="460" cy="526" r="42" /><circle cx="460" cy="526" r="25" strokeDasharray="3 9" />
      <path d="M453 526h14m-7-7v14" />
    </g>
    <path className="home-design-color" d="M78 615l135-45 66 16-145 51" fill="none" stroke="#e5bc67" strokeWidth="3" />
    <path className="home-design-color home-design-color--second" d="M118 635l148-35 59 14-157 38" fill="none" stroke="#59c6c9" strokeWidth="2" />
  </svg>;
}

export default function AnimatedHomeBackground() {
  return <div className="home-hero-background" aria-hidden="true">
    <DesignerBackground />
    <CoderCircuitBackground />
  </div>;
}
