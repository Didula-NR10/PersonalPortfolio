import { ArrowRight, BrainCircuit, Code2, Download, ShieldCheck, Target } from 'lucide-react';
import GalaxyBackground from '../components/GalaxyBackground';
import GalaxyNavigation from '../components/GalaxyNavigation';
import TimelineDemo from '../components/timeline-demo';
import ServicesUniverse from '../components/ServicesUniverse';
import FeaturedProjects from '../components/projects/FeaturedProjects';
import ReferencesSection from '../components/ReferencesSection';
import PortfolioFooter from '../components/PortfolioFooter';
import { profileImageUrl } from '../config';
import { AboutSection } from './AboutPage';
import '../portfolio-home.css';

const focusAreas = [
  { number: '01', title: 'Software Engineering', description: 'Designing reliable, maintainable, and scalable software solutions.', Icon: Code2 },
  { number: '02', title: 'AI & Intelligent Systems', description: 'Exploring machine learning, intelligent automation, and AI-powered applications.', Icon: BrainCircuit },
  { number: '03', title: 'Cybersecurity & Cloud', description: 'Building knowledge in secure systems, cloud infrastructure, and modern security practices.', Icon: ShieldCheck },
  { number: '04', title: 'Career Vision', description: 'Working toward becoming a Software, Cloud, and Enterprise Architect.', Icon: Target }
];

const scrollToSection = id => event => {
  event.preventDefault();
  window.history.replaceState(null, '', `#${id}`);
  document.title = id === 'projects' ? 'Projects | Didula' : id === 'education' ? 'Education | Didula' : 'Didula | Portfolio';
  document.getElementById(id)?.scrollIntoView({
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
  });
};

export default function PortfolioHome() {
  return (
    <main className="galaxy-page portfolio-home" id="home" aria-label="Didula portfolio home">
      <GalaxyBackground backgroundColor="#050816" />
      <GalaxyNavigation />

      <section className="portfolio-intro" aria-labelledby="portfolio-title">
        <div className="portfolio-intro-copy">
          <p className="portfolio-greeting">Hello, I'm</p>
          <h1 id="portfolio-title">Didula</h1>
          <p className="portfolio-role">Software Developer &amp; Future Solutions Architect</p>
          <p className="portfolio-description">Building intelligent, secure, and scalable digital experiences through software engineering, artificial intelligence, cybersecurity, and modern cloud technologies.</p>
          <div className="portfolio-actions">
            <a className="portfolio-primary-action" href="#projects" onClick={scrollToSection('projects')}>Explore My Projects <ArrowRight size={18} aria-hidden="true" /></a>
            <button className="portfolio-resume-action" type="button" disabled title="Resume PDF coming soon"><Download size={18} aria-hidden="true" /> Download Resume <small>Coming soon</small></button>
          </div>
          <a className="portfolio-education-link" href="#education" onClick={scrollToSection('education')}>Education timeline <ArrowRight size={15} aria-hidden="true" /></a>
        </div>

        <aside className="portfolio-profile" aria-label="Professional focus areas">
          <div className="portfolio-profile-heading">
            <div className="portfolio-avatar"><img src={profileImageUrl} alt="Didula" /></div>
            <div><span>PROFILE / 001</span><h2>Areas of Focus</h2></div>
          </div>
          <ol className="portfolio-focus-list">
            {focusAreas.map(({ number, title, description, Icon }) => (
              <li key={number}>
                <span className="portfolio-focus-icon"><Icon size={18} strokeWidth={1.7} aria-hidden="true" /></span>
                <div><span className="portfolio-focus-number">{number}</span><h3>{title}</h3><p>{description}</p></div>
              </li>
            ))}
          </ol>
        </aside>
      </section>

      <AboutSection />

      <TimelineDemo />

      <ServicesUniverse />

      <FeaturedProjects />
      <ReferencesSection />
      <PortfolioFooter />
    </main>
  );
}
