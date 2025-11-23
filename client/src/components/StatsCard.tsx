import React from 'react';

const StatsCard = ({ title, value, subtext, icon: Icon, color }) => {
    return (
        <div className="card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div>
                <p style={{ color: 'hsl(var(--color-text-secondary))', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                    {title}
                </p>
                <h3 style={{ fontSize: '2rem', fontWeight: '700', lineHeight: '1.2' }}>
                    {value}
                </h3>
                {subtext && (
                    <p style={{ fontSize: '0.875rem', color: 'hsl(var(--color-text-secondary))', marginTop: '0.5rem' }}>
                        {subtext}
                    </p>
                )}
            </div>
            {Icon && (
                <div style={{
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: `hsl(${color} / 0.1)`,
                    color: `hsl(${color})`
                }}>
                    <Icon size={24} />
                </div>
            )}
        </div>
    );
};

export default StatsCard;
