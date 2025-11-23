const API_URL = 'http://localhost:3002/api/v1';

type QueryValue = string | number | boolean;
type QueryParams = Record<string, QueryValue | QueryValue[] | undefined | null>;

export const api = {
  async get<TResponse>(endpoint: string, params: QueryParams = {}): Promise<TResponse> {
    const url = new URL(`${API_URL}${endpoint}`);

    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined || value === null || value === '') return;

      if (Array.isArray(value)) {
        value.forEach((item) => url.searchParams.append(key, String(item)));
      } else {
        url.searchParams.append(key, String(value));
      }
    });

    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json() as Promise<TResponse>;
  },

  async post<TResponse>(endpoint: string, body: Record<string, unknown> = {}): Promise<TResponse> {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({} as { message?: string }));
      throw new Error(errorData.message || `API Error: ${response.statusText}`);
    }

    return response.json() as Promise<TResponse>;
  },
};

export const endpoints = {
  ads: {
    list: '/ads',
    detail: (id: string | number) => `/ads/${id}`,
    approve: (id: string | number) => `/ads/${id}/approve`,
    reject: (id: string | number) => `/ads/${id}/reject`,
    requestChanges: (id: string | number) => `/ads/${id}/request-changes`,
  },
  stats: {
    summary: '/stats/summary',
    activity: '/stats/chart/activity',
    decisions: '/stats/chart/decisions',
    categories: '/stats/chart/categories',
  },
  categories: '/categories',
  moderators: {
    me: '/moderators/me',
  },
} as const;
