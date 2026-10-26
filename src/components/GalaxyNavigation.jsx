import { useEffect, useRef, useState } from 'react';
import GooeyNav from './GooeyNav/GooeyNav';

const items = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Education', href: '#education' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'References', href: '#references' }
];

export default function GalaxyNavigation({ page = 'home', theme = 'dark' }) {
  const [notice, setNotice] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [homeSection, setHomeSection] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => () => clearTimeout(timeoutRef.current), []);
  useEffect(() => {
    const update = () => {
      setScrolled(window.scrollY > 32);
      if (page !== 'home') return;
      const position = window.scrollY + 2;
      const about = document.getElementById('about');
      const services = document.getElementById('services');
      const projects = document.getElementById('projects');
      const references = document.getElementById('references');
      const education = document.getElementById('education');
      const next = references && position >= references.offsetTop ? 5 : projects && position >= projects.offsetTop ? 4 : services && position >= services.offsetTop ? 3 : education && position >= education.offsetTop ? 2 : about && position >= about.offsetTop ? 1 : 0;
      setHomeSection(current => current === next ? current : next);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [page]);

  const handleChange = (_index, item) => {
    clearTimeout(timeoutRef.current);
    if (item.href) {
      setNotice('');
      return;
    }
    setNotice(`${item.label} is coming soon.`);
    timeoutRef.current = setTimeout(() => setNotice(''), 3000);
  };

  return (
    <header className={`galaxy-navigation${scrolled ? ' is-scrolled' : ''}`}>
      <a className="navigation-brand" href="#home" aria-label="Didula home">DIDULA<span>.</span></a>
      <GooeyNav
        items={items}
        initialActiveIndex={0}
        activeIndex={page === 'about' || page === 'journey' ? 1 : homeSection}
        onChange={handleChange}
        theme={theme}
        color="#3B82F6"
        activeTextColor="#F1F5F9"
        colors={['#3B82F6', '#67E8F9', '#3B82F6']}
        size="md"
        frame
        particleCount={8}
        spread={34}
        animationTime={500}
        timeVariance={150}
        gooeyness={0.45}
        wobble={0.3}
        hoverEffect
      />
      <p className="navigation-notice" aria-live="polite">{notice}</p>
    </header>
  );
}
