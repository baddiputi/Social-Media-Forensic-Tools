// Batch sentiment analysis for a list of posts
export async function fetchBatchSentimentAnalysis(posts) {
	try {
		const response = await fetch(`${API_URL}/analysis/sentiment/batch`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(posts)
		});
		if (!response.ok) throw new Error('Failed to fetch batch sentiment analysis');
		return await response.json();
	} catch (error) {
		console.error('API error:', error);
		throw error;
	}
}
// Create a new user
export async function createUser(username) {
	try {
		const response = await fetch(`${API_URL}/users`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username })
		});
		if (!response.ok) throw new Error('Failed to create user');
		return await response.json();
	} catch (error) {
		console.error('API error:', error);
		throw error;
	}
}

// Fetch all users
export async function fetchUsers() {
	try {
		const response = await fetch(`${API_URL}/users`);
		if (!response.ok) throw new Error('Failed to fetch users');
		return await response.json();
	} catch (error) {
		console.error('API error:', error);
		throw error;
	}
}

// Create a new post
export async function createPost(content, user_id) {
	try {
		const response = await fetch(`${API_URL}/posts`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ content, user_id })
		});
		if (!response.ok) throw new Error('Failed to create post');
		return await response.json();
	} catch (error) {
		console.error('API error:', error);
		throw error;
	}
}

// Fetch all posts
export async function fetchAllPosts() {
	try {
		const response = await fetch(`${API_URL}/posts`);
		if (!response.ok) throw new Error('Failed to fetch posts');
		return await response.json();
	} catch (error) {
		console.error('API error:', error);
		throw error;
	}
}

// src/services/api.js
// Example: Fetch posts from backend
const API_URL = process.env.REACT_APP_API_URL;

// Collect posts from backend
export async function collectPosts({ query, platform, limit, from, to }) {
	try {
		if (platform === "reddit") {
			const response = await fetch(`${API_URL}/collector/reddit/collect`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ subreddit: query, limit: limit || 5 })
			});
			if (!response.ok) throw new Error('Failed to collect Reddit posts');
			const result = await response.json();
			return result.data || [];
		}
		// ...existing code for other platforms or fallback...
		throw new Error('Platform not supported yet');
	} catch (error) {
		console.error('API error:', error);
		throw error;
	}
}

// Fetch sentiment analysis results
export async function fetchSentimentAnalysis() {
	try {
		const response = await fetch(`${API_URL}/analysis/sentiment`);
		if (!response.ok) throw new Error('Failed to fetch sentiment analysis');
		return await response.json();
	} catch (error) {
		console.error('API error:', error);
		throw error;
	}
}

// Fetch timeline analysis data
export async function fetchTimelineAnalysis() {
	try {
		const response = await fetch(`${API_URL}/analysis/timeline`);
		if (!response.ok) throw new Error('Failed to fetch timeline analysis');
		return await response.json();
	} catch (error) {
		console.error('API error:', error);
		throw error;
	}
}

// Fetch network analysis data
export async function fetchNetworkAnalysis() {
	try {
		const response = await fetch(`${API_URL}/analysis/network`);
		if (!response.ok) throw new Error('Failed to fetch network analysis');
		return await response.json();
	} catch (error) {
		console.error('API error:', error);
		throw error;
	}
}

// Fetch analytics dashboard data
export async function fetchAnalyticsData() {
	try {
		const response = await fetch(`${API_URL}/analysis/analytics`);
		if (!response.ok) throw new Error('Failed to fetch analytics data');
		return await response.json();
	} catch (error) {
		console.error('API error:', error);
		throw error;
	}
}

// Fetch geolocation data
export async function fetchGeolocationData() {
	try {
		const response = await fetch(`${API_URL}/analysis/geolocation`);
		if (!response.ok) throw new Error('Failed to fetch geolocation data');
		return await response.json();
	} catch (error) {
		console.error('API error:', error);
		throw error;
	}
}

// Fetch word cloud data
export async function fetchWordCloudData() {
	try {
		const response = await fetch(`${API_URL}/analysis/wordcloud`);
		if (!response.ok) throw new Error('Failed to fetch word cloud data');
		return await response.json();
	} catch (error) {
		console.error('API error:', error);
		throw error;
	}
}

// Fetch report summary data
export async function fetchReportSummary() {
	try {
		const response = await fetch(`${API_URL}/reports/summary`);
		if (!response.ok) throw new Error('Failed to fetch report summary');
		return await response.json();
	} catch (error) {
		console.error('API error:', error);
		throw error;
	}
}



export async function fetchPosts() {
	try {
		const response = await fetch(`${API_URL}/posts`);
		if (!response.ok) throw new Error('Failed to fetch posts');
		return await response.json();
	} catch (error) {
		console.error('API error:', error);
		throw error;
	}
}
