import { useEffect, useRef, useState } from 'react';
import { Github, Linkedin, Mail, Phone, Code2, ShieldCheck, Cloud } from 'lucide-react';
import GalaxyNavigation from '../components/GalaxyNavigation';
import PortfolioFooter from '../components/PortfolioFooter';
import { phoneNumbers, profileImageUrl, socialLinks } from '../config';
import '../about-reconstruction.css';

const focuses = [
  { label: 'Software Development', Icon: Code2 },
  { label: 'Cybersecurity', Icon: ShieldCheck },
  { label: 'Cloud & Architecture', Icon: Cloud }
];
const techIconBase = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/';
const technologies = [
  { name: 'C++', icon: 'cplusplus/cplusplus-original.svg', fallback: 'C++' },
  { name: 'PHP', icon: 'php/php-original.svg', fallback: 'PHP' },
  { name: 'Java', icon: 'java/java-original.svg', fallback: 'Java' },
  { name: 'JavaScript', icon: 'javascript/javascript-original.svg', fallback: 'JS' },
  { name: 'MySQL', icon: 'mysql/mysql-original.svg', fallback: 'SQL' },
  { name: 'HTML', icon: 'html5/html5-original.svg', fallback: 'HTML' },
  { name: 'CSS', icon: 'css3/css3-original.svg', fallback: 'CSS' },
  { name: 'Git', icon: 'git/git-original.svg', fallback: 'Git' },
  { name: 'React', icon: 'react/react-original.svg', fallback: 'React' },
  { name: 'Node.js', icon: 'nodejs/nodejs-original.svg', fallback: 'Node' }
];
const contacts = [
  { label: 'Email', Icon: Mail, href: socialLinks.email ? `mailto:${socialLinks.email}` : '', value: socialLinks.email || 'Email to add' },
  { label: 'Phone', Icon: Phone, numbers: phoneNumbers },
  { label: 'LinkedIn', Icon: Linkedin, href: socialLinks.linkedin || '', value: socialLinks.linkedin ? 'LinkedIn profile' : 'Profile link to add' },
  { label: 'GitHub', Icon: Github, href: socialLinks.github || '', value: socialLinks.github ? 'GitHub profile' : 'Profile link to add' }
];

function Contact({ item }) {
  const { Icon, href, value, label, numbers } = item;
  return <li className="about-glass-contact-item"><Icon size={21} aria-hidden="true" />{numbers
    ? <span className="about-glass-phone-links">{numbers.map(number => <a key={number} href={`tel:+94${number.slice(1)}`}>{number}</a>)}</span>
    : href ? <a href={href} target={href.startsWith('mailto:') ? undefined : '_blank'} rel="noopener noreferrer" aria-label={label}>{value}</a> : <span>{value}</span>}</li>;
}

function TechIcon({ icon, fallback }) {
  const [failed, setFailed] = useState(false);
  return failed
    ? <span className="about-glass-tech-fallback" aria-hidden="true">{fallback}</span>
    : <img className="about-glass-tech-icon" src={`${techIconBase}${icon}`} alt="" loading="lazy" onError={() => setFailed(true)} />;
}

export function AboutSection({ embedded = true }) {
  const ref = useRef(null);
  const Heading = embedded ? 'h2' : 'h1';
  useEffect(() => {
    const section = ref.current;
    if (!section || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.08 });
    section.querySelectorAll('.about-reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return <section className="about-reconstruction about-glass" id="about" ref={ref} aria-labelledby="about-title">
    <div className="about-glass-container">
      <div className="about-glass-top about-reveal">
        <div className="about-glass-intro">
          <div className="about-glass-eyebrow">ABOUT ME <span /></div>
          <Heading className="about-glass-title" id="about-title">About Me</Heading>
          <h3>Hi, I'm <em>Didula</em></h3>
          <p>I see technology as a way to turn ideas into systems that solve real problems. I'm a computer science student and software developer interested in where software engineering, artificial intelligence, machine learning, and cybersecurity meet.</p>
          <p>I enjoy working across these fields, from designing applications and building software to exploring intelligent automation and secure systems. Understanding how the pieces fit together helps me build solutions that are useful and reliable.</p>
          <p>Curiosity drives my work, along with one question: <strong>How can we make technology smarter, safer, and more useful for the people who rely on it?</strong></p>
          <div className="about-glass-focus">{focuses.map(({ label, Icon }) => <div className="about-glass-focus-pill" key={label}><Icon size={24} aria-hidden="true"/><span>{label}</span></div>)}</div>
        </div>
        <div className="about-glass-portrait-wrap">
          <div className="about-glass-portrait-glow" />
          <div className="about-glass-portrait"><img src={profileImageUrl} alt="Portrait of Didula" loading="eager" fetchPriority="high" /></div>
          <div className="about-glass-tech-orbit" role="list" aria-label="Technologies I work with">
            {technologies.map(({ name, icon, fallback }, index) => {
              const angle = index * 360 / technologies.length;
              return <div className="about-glass-tech-position" role="listitem" aria-label={name} key={name} style={{
                '--angle': `${angle}deg`,
                '--end-angle': `${angle + 360}deg`,
                '--inverse-angle': `${-angle}deg`,
                '--inverse-end-angle': `${-angle - 360}deg`
              }}>
                <div className="about-glass-tech">
                  <TechIcon icon={icon} fallback={fallback} />
                  <span className="about-glass-tech-mark" aria-hidden="true">{name}</span>
                </div>
              </div>;
            })}
          </div>
        </div>
      </div>
      <section className="about-glass-contact about-reveal"><h3><Mail aria-hidden="true"/> Contact</h3><ul>{contacts.map(item => <Contact item={item} key={item.label}/>)}</ul></section>
    </div>
  </section>;
}
export default function AboutPage() { return <main className="galaxy-page about-page-shell"><GalaxyNavigation page="about"/><AboutSection embedded={false}/><PortfolioFooter/></main>; }
