import React from 'react'

function JobCard({ job }) {
  return (
    <article className="job-card">
      <div className="job-card__header">
        <div className="job-card__avatar" aria-hidden>
          {job.company?.[0] || '🏢'}
        </div>
        <span className="job-card__badge">24h Ago</span>
      </div>
      <h3 className="job-card__title">{job.title}</h3>
      <div className="job-card__sub">
        <span className="job-card__company">{job.company}</span>
        <span className="job-card__pill">{job.type || 'Full Time'}</span>
      </div>
      <div className="job-card__meta">
        <span>1-3 yr Exp</span>
        <span>Onsite</span>
        <span>{job.location}</span>
      </div>
      <ul className="job-card__bullets">
        <li>A user-friendly interface lets you browse photos and videos</li>
        <li>Filter destinations based on interests and travel style</li>
      </ul>
      <div className="job-card__footer">
        <button className="job-card__apply">Apply Now</button>
      </div>
    </article>
  )
}

export default JobCard

