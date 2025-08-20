export async function fetchJobs(filters = {}) {
  const params = new URLSearchParams()
  if (filters.query) params.set('q', filters.query)
  if (filters.location) params.set('location', filters.location)
  if (filters.jobType) params.set('type', filters.jobType)
  if (filters.salaryMin) params.set('salaryMin', String(filters.salaryMin))
  if (filters.salaryMax) params.set('salaryMax', String(filters.salaryMax))

  const res = await fetch(`/api/jobs?${params.toString()}`)
  if (!res.ok) {
    throw new Error('Failed to fetch jobs')
  }
  return res.json()
}

export async function createJob(payload) {
  const res = await fetch('/api/jobs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) {
    throw new Error('Failed to create job')
  }
  return res.json()
}

