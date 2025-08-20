import React from 'react'

function formatCurrencyINR(value) {
  if (value === '' || value === undefined || value === null) return ''
  const n = Number(value)
  if (Number.isNaN(n)) return ''
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n)
}

function SearchFilters({ query, location, jobType, salaryMin = 0, salaryMax = 0, onChange, onSearch }) {
  return (
    <section className="filters">
      <div className="filters__group">
        <div className="filters__field">
          <span className="filters__icon" aria-hidden>🔍</span>
          <input
            type="text"
            name="query"
            placeholder="Search By Job Title, Role"
            value={query}
            onChange={onChange}
            className="filters__input"
          />
        </div>

        <div className="filters__sep" />

        <div className="filters__field">
          <span className="filters__icon" aria-hidden>📍</span>
          <input
            type="text"
            name="location"
            placeholder="Preferred Location"
            value={location}
            onChange={onChange}
            className="filters__input"
          />
        </div>

        <div className="filters__sep" />

        <div className="filters__field">
          <span className="filters__icon" aria-hidden>💼</span>
          <select
            name="jobType"
            value={jobType}
            onChange={onChange}
            className="filters__select"
          >
            <option value="">Job type</option>
            <option value="fulltime">Full Time</option>
            <option value="parttime">Part Time</option>
            <option value="contract">Contract</option>
            <option value="intern">Internship</option>
          </select>
        </div>

        <div className="filters__sep" />

        <div className="filters__salary-inline">
          <div className="filters__salary-label">Salary Per Month</div>
          <div className="filters__slider">
            <input className="slider slider--min" type="range" name="salaryMin" min="0" max="200000" step="1000" value={salaryMin} onChange={onChange} />
            <input className="slider slider--max" type="range" name="salaryMax" min="0" max="200000" step="1000" value={salaryMax} onChange={onChange} />
          </div>
          <div className="filters__salary-values">
            <span>{formatCurrencyINR(salaryMin)}</span>
            <span>{formatCurrencyINR(salaryMax)}</span>
          </div>
        </div>

        <button className="filters__button" onClick={onSearch}>Search</button>
      </div>
    </section>
  )
}

export default SearchFilters

