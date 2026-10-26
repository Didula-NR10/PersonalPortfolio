import { UserRound } from 'lucide-react';
import './references-section.css';

const references = [
  { number: '01', name: 'Name to be added', title: 'Title to be added', organization: 'Organization to be added' },
  { number: '02', name: 'Name to be added', title: 'Title to be added', organization: 'Organization to be added' }
];

export default function ReferencesSection() {
  return (
    <section className="portfolio-references" id="references" aria-labelledby="references-title">
      <div className="portfolio-references-inner">
        <header className="portfolio-references-heading">
          <p className="portfolio-references-kicker"><span aria-hidden="true" /> PEOPLE / REFERENCES</p>
          <h2 id="references-title">References<span>.</span></h2>
          <p>Professional references will be listed here once their details are confirmed.</p>
        </header>
        <div className="portfolio-references-grid">
          {references.map(({ number, name, title, organization }) => (
            <article className="portfolio-reference-card" key={number}>
              <div className="portfolio-reference-card-top">
                <span>REFERENCE / {number}</span>
                <span className="portfolio-reference-icon"><UserRound size={22} strokeWidth={1.6} aria-hidden="true" /></span>
              </div>
              <div className="portfolio-reference-card-details">
                <h3>{name}</h3>
                <p>{title}</p>
                <p>{organization}</p>
              </div>
              <p className="portfolio-reference-status">Details coming soon</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
