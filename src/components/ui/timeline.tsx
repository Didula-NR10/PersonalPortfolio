import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useEffect, useRef, useState, type ReactNode } from 'react';

export interface TimelineEntry {
  title: string;
  stage: string;
  content: ReactNode;
}

/** Aceternity's sticky timeline and scroll beam, styled for this portfolio. */
export function Timeline({ data }: { data: TimelineEntry[] }) {
  const containerRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const items = itemsRef.current;
    if (!items) return;
    const updateHeight = () => setHeight(items.getBoundingClientRect().height);
    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(items);
    return () => observer.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 10%', 'end 50%']
  });
  const beamHeight = useTransform(scrollYProgress, [0, 1], [0, height]);
  const beamOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <section className="education-timeline" ref={containerRef} aria-label="Education timeline">
      <div className="education-timeline-items relative mx-auto w-full" ref={itemsRef}>
        {data.map((item, index) => (
          <div className="education-timeline-entry flex" key={`${item.title}-${index}`}>
            <div className="education-timeline-marker sticky self-start">
              <span className="education-timeline-dot" aria-hidden="true" />
              <div className="education-timeline-label">
                <span className="education-timeline-number">{String(index + 1).padStart(2, '0')}</span>
                <h3>{item.title}</h3>
                <span className="education-timeline-stage">{item.stage}</span>
              </div>
            </div>
            <div className="education-timeline-content">{item.content}</div>
          </div>
        ))}
        <div className="education-timeline-track" style={{ height }} aria-hidden="true">
          <motion.div
            className="education-timeline-beam"
            style={{ height: reducedMotion ? height : beamHeight, opacity: reducedMotion ? 1 : beamOpacity }}
          />
        </div>
      </div>
    </section>
  );
}
