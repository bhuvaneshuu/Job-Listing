const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/health', (_req, res) => {
	res.json({ status: 'ok', service: 'backend', timestamp: new Date().toISOString() });
});

// In-memory store for demo
const jobs = [
	{ id: 1, title: 'Frontend Developer', company: 'Acme Corp', location: 'Remote', type: 'fulltime' },
	{ id: 2, title: 'Backend Engineer', company: 'Globex', location: 'Chennai', type: 'fulltime' },
];

// List jobs with basic filtering
app.get('/api/jobs', (req, res) => {
	const { q, location, type, salaryMin, salaryMax } = req.query;
	let result = jobs;
	if (q) {
		const needle = String(q).toLowerCase();
		result = result.filter(j =>
			j.title.toLowerCase().includes(needle) || j.company.toLowerCase().includes(needle)
		);
	}
	if (location) {
		const loc = String(location).toLowerCase();
		result = result.filter(j => (j.location || '').toLowerCase().includes(loc));
	}
	if (type) {
		result = result.filter(j => j.type === type);
	}
	const min = salaryMin !== undefined ? Number(salaryMin) : null;
	const max = salaryMax !== undefined ? Number(salaryMax) : null;
	if (min !== null && !Number.isNaN(min)) {
		result = result.filter(j => (j.minSalary ?? 0) >= min);
	}
	if (max !== null && !Number.isNaN(max)) {
		result = result.filter(j => (j.maxSalary ?? Number.POSITIVE_INFINITY) <= max);
	}
	res.json(result);
});

// Create job
app.post('/api/jobs', (req, res) => {
	const { title, company, location, type, minSalary, maxSalary, deadline, description } = req.body || {};
	if (!title || !company) {
		return res.status(400).json({ message: 'title and company are required' });
	}
	const job = {
		id: jobs.length ? Math.max(...jobs.map(j => j.id)) + 1 : 1,
		title,
		company,
		location: location || '',
		type: type || 'fulltime',
		minSalary: minSalary !== undefined && minSalary !== '' ? Number(minSalary) : null,
		maxSalary: maxSalary !== undefined && maxSalary !== '' ? Number(maxSalary) : null,
		deadline: deadline || null,
		description: description || '',
		createdAt: new Date().toISOString(),
	};
	jobs.push(job);
	res.status(201).json(job);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Backend listening on http://localhost:${PORT}`);
});

