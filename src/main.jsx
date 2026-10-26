import React from 'react';
import { createRoot } from 'react-dom/client';
import PortfolioHome from './pages/PortfolioHome';
import AboutPage from './pages/AboutPage';
import JourneyGateway from './pages/JourneyGateway';
import './tailwind.css';
import './galaxy-page.css';
import './about.css';
import './about-cards.css';
import './portfolio-theme.css';
import './site-polish.css';

const resolvePage = hash => ['story', 'mindset', 'exploration', 'vision'].includes(hash) ? 'about' : hash === 'journey' ? 'journey' : 'home';
const sectionTitles = {
  home: 'Didula | Portfolio',
  about: 'About Didula | Portfolio',
  education: 'Education | Didula',
  services: 'Services | Didula',
  projects: 'Projects | Didula',
  references: 'References | Didula',
  'project-list': 'Projects | Didula',
  journey: 'Flight Path | Didula'
};
const updatePageTitle = () => {
  const hash = window.location.hash.slice(1);
  document.title = sectionTitles[hash] || (resolvePage(hash) === 'about' ? sectionTitles.about : sectionTitles.home);
};

function App() {
  const [page, setPage] = React.useState(() => resolvePage(window.location.hash.slice(1)));

  React.useEffect(() => {
    const update = () => {
      const next = resolvePage(window.location.hash.slice(1));
      setPage(next);
      updatePageTitle();
    };
    update();
    window.addEventListener('hashchange', update);
    return () => window.removeEventListener('hashchange', update);
  }, []);

  React.useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const section = document.getElementById(window.location.hash.slice(1));
      if (section) section.scrollIntoView();
      else window.scrollTo(0, 0);
    });
    return () => cancelAnimationFrame(frame);
  }, [page]);

  if (page === 'about') return <AboutPage />;
  if (page === 'journey') return <JourneyGateway />;
  return <PortfolioHome />;
}

createRoot(document.getElementById('root')).render(<App />);
