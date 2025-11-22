const API_URL = 'http://localhost:3001/api/v1';

export const api = {
    async get(endpoint, params = {}) {
        const url = new URL(`${API_URL}${endpoint}`);
        Object.keys(params).forEach(key => {
            if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
                if (Array.isArray(params[key])) {
                    params[key].forEach(value => url.searchParams.append(key, value));
                } else {
                    url.searchParams.append(key, params[key]);
                }
            }
        });

        const response = await fetch(url.toString());
        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }
        return response.json();
    },

    async post(endpoint, body = {}) {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `API Error: ${response.statusText}`);
        }
        return response.json();
    }
};

export const endpoints = {
    ads: {
        list: '/ads',
        detail: (id) => `/ads/${id}`,
        approve: (id) => `/ads/${id}/approve`,
        reject: (id) => `/ads/${id}/reject`,
        requestChanges: (id) => `/ads/${id}/request-changes`,
    },
    stats: {
        summary: '/stats/summary',
        activity: '/stats/chart/activity',
        decisions: '/stats/chart/decisions',
        categories: '/stats/chart/categories',
    },
    moderators: {
        me: '/moderators/me',
    }
};
