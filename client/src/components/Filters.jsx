import React from 'react';
import { Search, X, Filter } from 'lucide-react';

const Filters = ({ filters, onFilterChange, onReset }) => {
    const handleChange = (key, value) => {
        onFilterChange({ ...filters, [key]: value });
    };

    const handleStatusChange = (status) => {
        const currentStatuses = filters.status || [];
        const newStatuses = currentStatuses.includes(status)
            ? currentStatuses.filter(s => s !== status)
            : [...currentStatuses, status];
        handleChange('status', newStatuses);
    };

    return (
        <div className="card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Filter size={20} />
                    Filters
                </h2>
                <button onClick={onReset} className="btn btn-outline" style={{ fontSize: '0.875rem' }}>
                    <X size={16} />
                    Reset All
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                {/* Search */}
                <div style={{ gridColumn: '1 / -1' }}>
                    <div style={{ position: 'relative' }}>
                        <Search size={20} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'hsl(var(--color-text-secondary))' }} />
                        <input
                            type="text"
                            placeholder="Search by title..."
                            value={filters.search || ''}
                            onChange={(e) => handleChange('search', e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.75rem 0.75rem 0.75rem 2.5rem',
                                borderRadius: 'var(--radius-md)',
                                border: '1px solid hsl(var(--color-border))',
                                fontSize: '1rem',
                                outline: 'none'
                            }}
                        />
                    </div>
                </div>

                {/* Status */}
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.875rem' }}>Status</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {['pending', 'approved', 'rejected', 'draft'].map(status => (
                            <button
                                key={status}
                                onClick={() => handleStatusChange(status)}
                                className={`badge ${filters.status?.includes(status) ? `badge-${status}` : ''}`}
                                style={{
                                    border: '1px solid hsl(var(--color-border))',
                                    cursor: 'pointer',
                                    backgroundColor: filters.status?.includes(status) ? undefined : 'transparent',
                                    opacity: filters.status?.includes(status) ? 1 : 0.7
                                }}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Category */}
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.875rem' }}>Category ID</label>
                    <input
                        type="number"
                        placeholder="e.g. 1"
                        value={filters.categoryId || ''}
                        onChange={(e) => handleChange('categoryId', e.target.value)}
                        style={{
                            width: '100%',
                            padding: '0.5rem',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid hsl(var(--color-border))'
                        }}
                    />
                </div>

                {/* Price Range */}
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.875rem' }}>Price Range</label>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <input
                            type="number"
                            placeholder="Min"
                            value={filters.minPrice || ''}
                            onChange={(e) => handleChange('minPrice', e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.5rem',
                                borderRadius: 'var(--radius-md)',
                                border: '1px solid hsl(var(--color-border))'
                            }}
                        />
                        <input
                            type="number"
                            placeholder="Max"
                            value={filters.maxPrice || ''}
                            onChange={(e) => handleChange('maxPrice', e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.5rem',
                                borderRadius: 'var(--radius-md)',
                                border: '1px solid hsl(var(--color-border))'
                            }}
                        />
                    </div>
                </div>

                {/* Sorting */}
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.875rem' }}>Sort By</label>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <select
                            value={filters.sortBy || 'createdAt'}
                            onChange={(e) => handleChange('sortBy', e.target.value)}
                            style={{
                                flex: 1,
                                padding: '0.5rem',
                                borderRadius: 'var(--radius-md)',
                                border: '1px solid hsl(var(--color-border))'
                            }}
                        >
                            <option value="createdAt">Date</option>
                            <option value="price">Price</option>
                            <option value="priority">Priority</option>
                        </select>
                        <select
                            value={filters.sortOrder || 'desc'}
                            onChange={(e) => handleChange('sortOrder', e.target.value)}
                            style={{
                                width: '80px',
                                padding: '0.5rem',
                                borderRadius: 'var(--radius-md)',
                                border: '1px solid hsl(var(--color-border))'
                            }}
                        >
                            <option value="desc">Desc</option>
                            <option value="asc">Asc</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Filters;
