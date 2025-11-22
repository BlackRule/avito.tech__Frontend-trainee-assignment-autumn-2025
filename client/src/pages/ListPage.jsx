import React, { useState, useEffect } from 'react';
import { api, endpoints } from '../api/api';
import AdCard from '../components/AdCard';
import Filters from '../components/Filters';
import Pagination from '../components/Pagination';
import { Loader2 } from 'lucide-react';

const ListPage = () => {
    const [ads, setAds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        page: 1,
        limit: 10,
        status: [],
        categoryId: '',
        minPrice: '',
        maxPrice: '',
        search: '',
        sortBy: 'createdAt',
        sortOrder: 'desc'
    });
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0
    });

    const fetchAds = async () => {
        setLoading(true);
        setError(null);
        try {
            const params = { ...filters };
            // Clean up empty params
            Object.keys(params).forEach(key => {
                if (params[key] === '' || (Array.isArray(params[key]) && params[key].length === 0)) {
                    delete params[key];
                }
            });

            // Handle status array specifically if needed by API, but api.js handles it if we pass it correctly.
            // The API expects multiple 'status' query params if array. api.js implementation:
            // url.searchParams.append(key, params[key]); -> this appends one value.
            // We need to fix api.js to handle arrays or handle it here.
            // Let's check api.js again.
            // api.js: 
            // Object.keys(params).forEach(key => {
            //   if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
            //        url.searchParams.append(key, params[key]);
            //   }
            // });
            // This will append the array as a comma separated string or similar depending on toString implementation.
            // Standard URLSearchParams appends array as comma separated string usually? No, it converts to string.
            // We should probably handle arrays in api.js or here.
            // Let's assume for now we need to pass multiple keys for status if the API expects it, OR the API expects comma separated.
            // The schema says:
            // - name: status
            //   in: query
            //   schema:
            //     type: array
            //     items: type: string
            // Usually this means ?status=pending&status=approved

            // I'll need to fix api.js to handle arrays correctly. 
            // For now, I'll proceed with ListPage and then fix api.js.

            const data = await api.get(endpoints.ads.list, params);
            setAds(data.ads);
            setPagination(data.pagination);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAds();
    }, [filters]);

    const handleFilterChange = (newFilters) => {
        setFilters(prev => ({ ...prev, ...newFilters, page: 1 }));
    };

    const handlePageChange = (page) => {
        setFilters(prev => ({ ...prev, page }));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleReset = () => {
        setFilters({
            page: 1,
            limit: 10,
            status: [],
            categoryId: '',
            minPrice: '',
            maxPrice: '',
            search: '',
            sortBy: 'createdAt',
            sortOrder: 'desc'
        });
    };

    return (
        <div>
            <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '2rem' }}>Advertisements</h1>

            <Filters
                filters={filters}
                onFilterChange={handleFilterChange}
                onReset={handleReset}
            />

            {error && (
                <div style={{ padding: '1rem', backgroundColor: 'hsl(var(--color-danger) / 0.1)', color: 'hsl(var(--color-danger))', borderRadius: 'var(--radius-md)', marginBottom: '1rem' }}>
                    Error: {error}
                </div>
            )}

            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
                    <Loader2 className="animate-spin" size={48} color="hsl(var(--color-primary))" />
                </div>
            ) : (
                <>
                    {ads.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '4rem', color: 'hsl(var(--color-text-secondary))' }}>
                            No advertisements found.
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                            {ads.map(ad => (
                                <AdCard key={ad.id} ad={ad} />
                            ))}
                        </div>
                    )}

                    <Pagination
                        currentPage={pagination.currentPage}
                        totalPages={pagination.totalPages}
                        totalItems={pagination.totalItems}
                        onPageChange={handlePageChange}
                    />
                </>
            )}
        </div>
    );
};

export default ListPage;
