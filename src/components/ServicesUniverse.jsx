import { useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import OriginalServices from './hich-space-travel/main';
import originalStyles from './hich-space-travel/style.css?raw';
import themeStyles from './hich-space-travel/theme.css?raw';

export default function ServicesUniverse() {
  const hostRef = useRef(null);
  const [shadowRoot, setShadowRoot] = useState(null);

  useLayoutEffect(() => {
    const host = hostRef.current;
    if (host && !host.shadowRoot) setShadowRoot(host.attachShadow({ mode: 'open' }));
  }, []);

  return <section id="services" ref={hostRef} aria-label="Services" style={{ display: 'block', minHeight: '100svh' }}>
    {shadowRoot && createPortal(<>
      <style>{`:host{display:block;font-family:Inter,Arial,sans-serif;color:#F1F5F9;background:#050816;font-synthesis:none}`}</style>
      <style>{originalStyles}</style>
      <style>{themeStyles}</style>
      <OriginalServices />
    </>, shadowRoot)}
  </section>;
}
