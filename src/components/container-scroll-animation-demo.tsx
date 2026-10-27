// Project-specific version of Aceternity UI's container-scroll-animation-demo.
// https://ui.aceternity.com/registry/container-scroll-animation-demo.json
import { useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, Factory, MapPinned, UtensilsCrossed, X } from 'lucide-react';
import { ContainerScroll } from './ui/container-scroll-animation';
import { projects } from '../data/projects';

const projectIcons = {
  'manufacturing-erp': Factory,
  'smart-restaurant-360': UtensilsCrossed,
  'salesman-tracking': MapPinned
};

function ProjectArtwork({ project, detail = false }: { project: typeof projects[number]; detail?: boolean }) {
  const ProjectIcon = projectIcons[project.id as keyof typeof projectIcons] ?? ArrowUpRight;
  const className = `${detail ? 'project-device-hero' : 'project-device-item-image'} project-device-item-art project-device-item-art--${project.id}`;
  const content = <>
    <span className="project-device-item-art-mark"><ProjectIcon size={36} strokeWidth={1.5} /></span>
    <span className="project-device-item-art-number">{project.number}</span>
  </>;

  return detail
    ? <div className={className} role="img" aria-label={`${project.title} illustrated cover`}>{content}</div>
    : <span className={className} aria-hidden="true">{content}</span>;
}

function ProjectTablet() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const gridButtons = useRef<Record<string, HTMLButtonElement | null>>({});
  const closeButton = useRef<HTMLButtonElement | null>(null);
  const selected = projects.find(project => project.id === selectedId);

  const closeDetails = () => {
    const previouslySelected = selectedId;
    setSelectedId(null);
    requestAnimationFrame(() => {
      if (previouslySelected) gridButtons.current[previouslySelected]?.focus();
    });
  };

  const projectButton = (project: typeof projects[number], inGrid = false) => {
    return <button
    className={`project-device-item project-device-item--${project.id}${selectedId === project.id ? ' is-selected' : ''}`}
    type="button"
    key={project.id}
    ref={inGrid ? element => { gridButtons.current[project.id] = element; } : undefined}
    aria-pressed={selectedId === project.id}
    aria-label={`View details for ${project.title}`}
    onClick={() => {
      setSelectedId(project.id);
      if (inGrid) requestAnimationFrame(() => closeButton.current?.focus());
    }}
  >
    <ProjectArtwork project={project} />
    <span className="project-device-item-meta"><small>{project.number} / {project.categoryLabel}</small><strong>{project.title}</strong></span>
    <ArrowUpRight size={16} aria-hidden="true" />
  </button>;
  };

  return <div className={`project-device${selected ? ' is-detail-open' : ' is-overview'}`} id="project-list">
    <div className="project-device-toolbar">
      <div className="project-device-toolbar-brand"><span className="project-device-toolbar-seal" aria-hidden="true">D</span><span>DIDULA / WORK</span></div>
      <span>SELECTED PROJECTS</span>
      <div className="project-device-toolbar-end">
        <small>{String(projects.length).padStart(2, '0')} projects</small>
        {selected && <button className="project-device-close" ref={closeButton} type="button" onClick={closeDetails} aria-label="Close project details and return to all projects"><X size={16} aria-hidden="true" /><span>Close</span></button>}
      </div>
    </div>

    {selected ? <div className="project-device-body">
      <aside className="project-device-sidebar" aria-label="Browse projects">
        <div className="project-device-sidebar-heading">
          <span>THE COLLECTION</span>
          <strong>Choose another project</strong>
        </div>
        <div className="project-device-list" role="group" aria-label="Projects; scroll to browse" tabIndex={0}>
          {projects.map(project => projectButton(project))}
        </div>
        <p className="project-device-scroll-hint"><ArrowDown size={13} aria-hidden="true" /><span className="project-device-scroll-desktop">Scroll to browse · Select to preview</span><span className="project-device-scroll-mobile">Swipe projects · Scroll for details</span></p>
      </aside>

      <article className="project-device-detail" key={selected.id} aria-live="polite" aria-label={`${selected.title} project details`}>
        <ProjectArtwork project={selected} detail />
        <div className="project-device-detail-copy">
          <p className="project-device-kicker">Project {selected.number}<span aria-hidden="true">·</span>{selected.categoryLabel}</p>
          <h3>{selected.title}</h3>
          <p>{selected.description}</p>
          <small>A closer look at this project is coming soon.</small>
        </div>
      </article>
    </div> : <div className="project-device-overview">
      <div className="project-device-overview-heading">
        <div><span>THE COLLECTION / 001—{String(projects.length).padStart(3, '0')}</span><h3>Projects with purpose</h3></div>
        <p>Pick a project to see its details. The collection stays in order at the side.</p>
      </div>
      <div className="project-device-grid" role="group" aria-label="All projects in order">
        {projects.map(project => projectButton(project, true))}
      </div>
    </div>}
  </div>;
}

export default function ContainerScrollAnimationDemo() {
  return <ContainerScroll titleComponent={<div className="project-scroll-title">
    <p>A COLLECTION OF WORK / 003</p>
    <h2 id="projects-title">Selected <span>Projects</span></h2>
    <span>Scroll to enter the archive. Explore each project inside the screen.</span>
  </div>}>
    <ProjectTablet />
  </ContainerScroll>;
}
