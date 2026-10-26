import { BookOpen, GraduationCap, School, type LucideIcon } from 'lucide-react';
import { Timeline, type TimelineEntry } from './ui/timeline';
import '../education-timeline.css';

type EducationStage = {
  title: string;
  stage: string;
  qualification: string;
  institution: string;
  year: string;
  detail: string;
  Icon: LucideIcon;
};

// Replace these labels with verified details when Didula provides them.
const education: EducationStage[] = [
  {
    title: 'O/L',
    stage: 'Foundation stage',
    qualification: 'Ordinary Level',
    institution: 'School to be added',
    year: 'Year to be added',
    detail: 'Subjects and results to be added.',
    Icon: School
  },
  {
    title: 'A/L',
    stage: 'Advanced stage',
    qualification: 'Advanced Level',
    institution: 'School to be added',
    year: 'Year to be added',
    detail: 'Study stream and results to be added.',
    Icon: BookOpen
  },
  {
    title: 'Degree',
    stage: 'Higher education',
    qualification: 'Degree programme to be added',
    institution: 'University to be added',
    year: 'Years to be added',
    detail: 'Field of study and degree status to be added.',
    Icon: GraduationCap
  }
];

export default function TimelineDemo() {
  const entries: TimelineEntry[] = education.map(({ title, stage, qualification, institution, year, detail, Icon }, index) => ({
    title,
    stage,
    content: (
      <>
        <h3 className="education-mobile-title">{title}</h3>
        <article className={`education-card education-card--${index + 1}`}>
          <div className="education-card-image" aria-hidden="true" />
          <div className="education-card-top">
            <span className="education-card-stage">{String(index + 1).padStart(2, '0')} &nbsp;//&nbsp; {qualification}</span>
            <span className="education-card-type">{stage}</span>
            <span className="education-card-icon"><Icon size={24} strokeWidth={1.7} aria-hidden="true" /></span>
          </div>
          <div className="education-card-copy">
            <h4>{institution}</h4>
            <p className="education-card-year">{year}</p>
            <p className="education-card-detail">{detail}</p>
          </div>
        </article>
      </>
    )
  }));

  return (
    <section className="portfolio-education" id="education" aria-labelledby="education-title">
      <div className="portfolio-education-heading">
        <p className="portfolio-section-kicker">MY PATH</p>
        <h2 id="education-title">Education</h2>
        <p>From school foundations to higher education, this timeline traces my learning journey and the milestones that shaped my path in technology.</p>
      </div>
      <Timeline data={entries} />
    </section>
  );
}
