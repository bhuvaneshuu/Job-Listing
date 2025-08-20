import React, { useState } from 'react'
import { createJob } from '../services/api'
import { useNavigate } from 'react-router-dom'

function JobForm() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    title: '',
    company: '',
    location: '',
    type: 'fulltime',
    minSalary: '',
    maxSalary: '',
    deadline: '',
    description: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setSubmitting(true)
      setError('')
      await createJob(form)
      navigate('/jobs')
    } catch (err) {
      setError('Failed to create job')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className="job-form" onSubmit={handleSubmit}>
      <h2 className="job-form__title">Create Job Opening</h2>
      {error && <p className="error">{error}</p>}
      <div className="form__grid">
        <label className="form__field">
          <span>Job Title</span>
          <input name="title" value={form.title} onChange={handleChange} placeholder="Full Stack Developer" required />
        </label>
        <label className="form__field">
          <span>Company Name</span>
          <input name="company" value={form.company} onChange={handleChange} placeholder="Amazon, Microsoft, Swiggy" required />
        </label>

        <label className="form__field">
          <span>Location</span>
          <input name="location" value={form.location} onChange={handleChange} placeholder="Choose Preferred Location" />
        </label>
        <label className="form__field">
          <span>Job Type</span>
          <select name="type" value={form.type} onChange={handleChange}>
            <option value="fulltime">Full Time</option>
            <option value="parttime">Part Time</option>
            <option value="contract">Contract</option>
            <option value="intern">Internship</option>
          </select>
        </label>

        <label className="form__field">
          <span>Salary Min</span>
          <div className="input-adorned">
            <span className="input-adorned__icon">₹</span>
            <input name="minSalary" value={form.minSalary} onChange={handleChange} type="number" placeholder="0" />
          </div>
        </label>
        <label className="form__field">
          <span>Salary Max</span>
          <div className="input-adorned">
            <span className="input-adorned__icon">₹</span>
            <input name="maxSalary" value={form.maxSalary} onChange={handleChange} type="number" placeholder="12,00,000" />
          </div>
        </label>

        <label className="form__field">
          <span>Application Deadline</span>
          <div className="input-adorned">
            <span className="input-adorned__icon">📅</span>
            <input name="deadline" value={form.deadline} onChange={handleChange} type="date" />
          </div>
        </label>
      </div>

      <label className="form__field">
        <span>Job Description</span>
        <textarea name="description" value={form.description} onChange={handleChange} rows={5} placeholder="Write a concise job description" />
      </label>

      <div className="form__actions">
        <button type="button" className="btn btn--ghost" disabled={submitting}>Save Draft ▾</button>
        <button type="submit" className="btn btn--primary" disabled={submitting}>{submitting ? 'Publishing...' : 'Publish ▸'}</button>
      </div>
    </form>
  )
}

export default JobForm

