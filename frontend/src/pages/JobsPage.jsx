import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import SearchFilters from '../components/SearchFilters'
import JobCard from '../components/JobCard'
import { fetchJobs } from '../services/api'

function JobsPage() {
  const [filters, setFilters] = useState({ query: '', location: '', jobType: '', salaryMin: 0, salaryMax: 0 })
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    const castValue = name === 'salaryMin' || name === 'salaryMax' ? Number(value) : value
    setFilters((prev) => ({ ...prev, [name]: castValue }))
  }

  const loadJobs = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await fetchJobs(filters)
      setJobs(data)
    } catch (err) {
      setError('Failed to load jobs')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadJobs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="page">
      <Navbar />
      <main className="container">
        <SearchFilters
          query={filters.query}
          location={filters.location}
          jobType={filters.jobType}
          salaryMin={filters.salaryMin}
          salaryMax={filters.salaryMax}
          onChange={handleChange}
          onSearch={loadJobs}
        />

        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}
        <section className="grid">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />)
          )}
        </section>
      </main>
    </div>
  )
}

export default JobsPage

