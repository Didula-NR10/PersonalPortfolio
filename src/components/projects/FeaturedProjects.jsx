import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowRight, ArrowUpRight, Box, BrainCircuit, Ellipsis, Factory, Layers3, LayoutGrid, Monitor, Target, Wrench, X, Zap } from 'lucide-react';
import { projectCategories, projects as initialProjects } from '../../data/projects';
import ProjectCard from './ProjectCard';
import './featured-projects.css';

const ProjectMediaManager = import.meta.env.DEV ? lazy(() => import('./ProjectMediaManager')) : null;
const filterIcons = [LayoutGrid, Factory, Monitor, BrainCircuit, Wrench, Ellipsis];

function ProjectDetails({ project, onClose }) {
  const closeRef = useRef(null);
  useEffect(() => {
    closeRef.current?.focus();
    const onKeyDown = event => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  return <div className="project-modal-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) onClose(); }}>
    <section className="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-detail-title">
      <button ref={closeRef} className="project-modal-close" type="button" aria-label="Close project details" onClick={onClose}><X size={20} /></button>
      <p className="project-modal-kicker">MISSION ARCHIVE / {project.number}</p>
      <h2 id="project-detail-title">{project.title}</h2>
      <p className="project-modal-category">{project.categoryLabel}</p>
      <p>{project.description}</p>
      <p className="project-modal-stack-label">Suggested technologies</p>
      <div className="mission-tech">{project.technologies.map(technology => <span key={technology}>{technology}</span>)}</div>
      <p className="project-modal-note">Detailed case study and live preview are not available yet.</p>
    </section>
  </div>;
}

function ProjectStatistics({ projects, reducedMotion }) {
  const stats = [
    { Icon: Box, value: String(projects.length), label: 'Projects Built', note: 'Projects featured here' },
    { Icon: Layers3, value: '—', label: 'Technologies Explored', note: 'To be confirmed' },
    { Icon: Zap, value: '—', label: 'Development Experience', note: 'To be confirmed' },
    { Icon: Target, value: '4', label: 'Core Specializations', note: 'Software · AI · Security · Cloud' }
  ];
  return <motion.section
    className="mission-stats"
    aria-label="Portfolio statistics"
    initial={reducedMotion ? false : { opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.25 }}
    transition={{ duration: reducedMotion ? 0 : 0.55 }}
  >
    {stats.map(({ Icon, value, label, note }, index) => <motion.div
      className="mission-stat"
      key={label}
      initial={reducedMotion ? false : { opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: reducedMotion ? 0 : 0.4, delay: reducedMotion ? 0 : index * 0.08 }}
    >
      <span className="mission-stat-icon"><Icon size={27} strokeWidth={1.7} aria-hidden="true" /></span>
      <div><strong>{value}</strong><span>{label}</span><small>{note}</small></div>
    </motion.div>)}
  </motion.section>;
}

export default function FeaturedProjects() {
  const [projects, setProjects] = useState(initialProjects);
  const [filter, setFilter] = useState('All Projects');
  const [selectedId, setSelectedId] = useState(() => new URLSearchParams(window.location.search).get('project'));
  const [manageOpen, setManageOpen] = useState(false);
  const objectUrls = useRef([]);
  const reducedMotion = !!useReducedMotion();
  const selected = projects.find(project => project.id === selectedId);
  const visible = filter === 'All Projects' ? projects : projects.filter(project => project.category === filter);

  useEffect(() => {
    const onPopState = () => setSelectedId(new URLSearchParams(window.location.search).get('project'));
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);
  useEffect(() => () => objectUrls.current.forEach(url => URL.revokeObjectURL(url)), []);

  const openProject = project => {
    const url = new URL(window.location.href);
    url.searchParams.set('project', project.id);
    window.history.pushState(null, '', url);
    setSelectedId(project.id);
  };
  const closeProject = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete('project');
    window.history.replaceState(null, '', url);
    setSelectedId(null);
  };
  const updateProject = (id, update) => setProjects(current => current.map(project => project.id === id ? update(project) : project));

  return <>
    <section className="portfolio-projects mission-projects" id="projects" aria-labelledby="projects-title">
      <div className="mission-projects-inner">
        <div className="mission-projects-header">
          <div>
            <p className="mission-eyebrow"><span /> SELECTED WORK <small>// EXPLORATION LOG 003</small></p>
            <h2 id="projects-title">Featured <em>Projects</em></h2>
            <p className="mission-intro">A collection of real-world projects showcasing my curiosity, engineering approach, and passion for building meaningful solutions.</p>
          </div>
          <a className="mission-view-all" href="#project-list" onClick={() => setFilter('All Projects')}>View All Projects <ArrowRight size={18} /></a>
        </div>
        <div className="mission-filters" role="group" aria-label="Filter projects by category">
          {projectCategories.map((category, index) => {
            const Icon = filterIcons[index];
            return <button className={filter === category ? 'is-active' : ''} type="button" key={category} onClick={() => setFilter(category)} aria-pressed={filter === category}>
              {filter === category && <motion.span className="mission-filter-active" layoutId="mission-filter-active" transition={{ duration: reducedMotion ? 0 : 0.3 }} />}
              <Icon size={16} aria-hidden="true" /><span>{category}</span>
            </button>;
          })}
        </div>
        <div className="mission-grid" id="project-list">
          <AnimatePresence mode="popLayout">
            {visible.map(project => <ProjectCard key={project.id} project={project} onOpen={openProject} reducedMotion={reducedMotion} />)}
          </AnimatePresence>
        </div>
        {visible.length === 0 && <div className="mission-empty"><p>No projects in {filter} yet.</p><button type="button" onClick={() => setFilter('All Projects')}>Show all projects</button></div>}
        <ProjectStatistics projects={projects} reducedMotion={reducedMotion} />
        {ProjectMediaManager && <button className="mission-dev-control" type="button" onClick={() => setManageOpen(true)}>Manage project images (development)</button>}
      </div>
    </section>
    {selected && <ProjectDetails project={selected} onClose={closeProject} />}
    {manageOpen && ProjectMediaManager && <Suspense fallback={null}><ProjectMediaManager projects={projects} onUpdate={updateProject} registerUrl={url => objectUrls.current.push(url)} onClose={() => setManageOpen(false)} /></Suspense>}
  </>;
}
