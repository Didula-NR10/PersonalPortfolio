import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ArrowRight, Atom, BrainCircuit, Cloud, Code2, Lightbulb, Moon, Rocket, ShieldCheck, Sun, Users } from 'lucide-react';
import { gsap } from 'gsap';
import GalaxyNavigation from '../components/GalaxyNavigation';
import HolographicPortrait from '../components/HolographicPortrait';
import ObservatoryScene from '../components/ObservatoryScene';
import ProfileDetails from '../components/ProfileDetails';
import PortfolioFooter from '../components/PortfolioFooter';
import '../about-orbital.css';

const indicators = [
  { label: '01 / SOFTWARE', title: 'Engineering', detail: 'Building reliable digital solutions.', Icon: Code2 },
  { label: '02 / CLOUD', title: 'Architecture', detail: 'Exploring scalable infrastructure.', Icon: Cloud },
  { label: '03 / INTELLIGENCE', title: 'AI', detail: 'Learning intelligent systems.', Icon: BrainCircuit },
  { label: '04 / SECURITY', title: 'Cybersecurity', detail: 'Designing with protection in mind.', Icon: ShieldCheck }
];

const values = [
  { title: 'Curiosity', detail: 'Turning questions into solutions through continuous learning.', Icon: Lightbulb },
  { title: 'Impact', detail: 'Building technology that solves real-world problems.', Icon: Rocket },
  { title: 'Innovation', detail: 'Exploring new ideas at the intersection of technology and creativity.', Icon: Atom },
  { title: 'Growth', detail: 'Evolving through challenges, collaboration, and open-mindedness.', Icon: Users }
];

function AboutContent({ light, setLight }) {
  const heroRef = useRef(null);
  const revealedRef = useRef(false);
  const [active, setActive] = useState(false);

  useLayoutEffect(() => {
    const hero = heroRef.current;
    if (!hero) return undefined;
    let context;
    const reveal = () => {
      if (revealedRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      revealedRef.current = true;
      context = gsap.context(() => {
        gsap.timeline({ defaults: { ease: 'power2.out' } })
          .from('.about-visual-card', { y: 20, opacity: 0, duration: .72 }, .15)
          .from('.about-summary-card', { y: 18, opacity: 0, duration: .7 }, .3)
          .from('.orbital-indicator', { y: 10, opacity: 0, duration: .42, stagger: .08 }, .75)
          .from('.orbital-side', { y: 18, opacity: 0, duration: .68 }, .6)
          .from('.orbital-focus-item', { y: 10, opacity: 0, duration: .35, stagger: .07 }, .9)
          .from('.orbital-values', { y: 16, opacity: 0, duration: .65 }, 1)
          .from('.orbital-value', { y: 8, opacity: 0, duration: .32, stagger: .07 }, 1.2);
      }, hero);
    };
    if (!('IntersectionObserver' in window)) {
      setActive(true);
      reveal();
      return () => context?.revert();
    }
    const observer = new IntersectionObserver(([entry]) => {
      setActive(entry.isIntersecting);
      if (entry.isIntersecting) reveal();
    }, { threshold: .08 });
    observer.observe(hero);
    return () => { observer.disconnect(); context?.revert(); };
  }, []);

  return <section className={`observatory-hero${active ? ' is-active' : ''}`} ref={heroRef} aria-labelledby="about-title">
    <ObservatoryScene />
    <button className="orbital-theme-toggle" type="button" aria-label={light ? 'Switch About to dark mode' : 'Switch About to light mode'} aria-pressed={light} onClick={() => setLight(!light)}>
      {light ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
      <span>{light ? 'Light' : 'Dark'}</span>
    </button>
    <div className="about-composition">
      <section className="about-visual-card" aria-label="Didula identity portrait">
        <div className="orbital-identity-top"><p>// PROFILE 001</p><span>01</span></div>
        <div className="observatory-hologram"><HolographicPortrait /></div>
        <div className="about-visual-caption"><strong>DIDULA</strong><span>SOFTWARE DEVELOPER</span></div>
      </section>

      <section className="about-summary-card" aria-labelledby="about-title">
        <div className="orbital-intro-heading">
          <div className="orbital-summary-top"><span>// ABOUT THE EXPLORER</span><small>TRANSMISSION 002</small></div>
          <h1 id="about-title">The mind behind<br />the <em>universe.</em></h1>
        </div>
        <div className="orbital-intro-body">
          <p>I'm Didula, a software developer drawn to the space where engineering, cloud architecture, AI, and cybersecurity meet.</p>
          <p>I explore how complex systems connect, scale, and stay secure — turning curiosity into technology that matters.</p>
        </div>
        <div className="orbital-indicators" aria-label="Engineering interests">
          {indicators.map(({ label, title, detail, Icon }) => <div className="orbital-indicator" key={title}>
            <Icon size={21} strokeWidth={1.6} aria-hidden="true" />
            <span>{label}</span>
            <strong>{title}</strong>
            <small>{detail}</small>
            <i aria-hidden="true" />
          </div>)}
        </div>
        <a className="about-scroll orbital-journey" href="#journey">EXPLORE MY JOURNEY <ArrowRight size={18} aria-hidden="true" /></a>
      </section>

      <ProfileDetails />

      <section className="orbital-values" aria-labelledby="about-values-title">
        <p className="orbital-panel-label" id="about-values-title">// WHAT DRIVES ME</p>
        <div className="orbital-values-grid">
          {values.map(({ title, detail, Icon }) => <div className="orbital-value" key={title}>
            <span className="orbital-value-icon"><Icon size={27} strokeWidth={1.5} aria-hidden="true" /></span>
            <div><strong>{title}</strong><p>{detail}</p></div>
          </div>)}
        </div>
      </section>
    </div>
  </section>;
}

function AboutExperience({ embedded = false }) {
  const [light, setLight] = useState(() => {
    try { return window.localStorage.getItem('about-theme') === 'light'; } catch { return false; }
  });
  useEffect(() => {
    try { window.localStorage.setItem('about-theme', light ? 'light' : 'dark'); } catch { /* Storage may be unavailable. */ }
  }, [light]);
  const Tag = embedded ? 'section' : 'main';
  return <Tag className="about-page about-one-page about-orbital" id="about" data-theme={light ? 'light' : 'dark'} aria-label="About Didula">
    {!embedded && <GalaxyNavigation page="about" theme={light ? 'light' : 'dark'} />}
    <AboutContent light={light} setLight={setLight} />
    {!embedded && <PortfolioFooter />}
  </Tag>;
}

export function AboutSection() { return <AboutExperience embedded />; }
export default function AboutPage() { return <AboutExperience />; }
