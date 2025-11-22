import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Tag, AlertCircle } from 'lucide-react';

const AdCard = ({ ad }) => {
    const formattedPrice = new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        maximumFractionDigits: 0,
    }).format(ad.price);

    const formattedDate = new Date(ad.createdAt).toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    return (
        <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ position: 'relative', height: '200px', backgroundColor: '#f0f0f0' }}>
                <img
                    src={ad.images[0] || 'https://via.placeholder.com/300x200?text=No+Image'}
                    alt={ad.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', display: 'flex', gap: '0.5rem' }}>
                    <span className={`badge badge-${ad.status}`}>
                        {ad.status}
                    </span>
                    {ad.priority === 'urgent' && (
                        <span className="badge badge-urgent">
                            URGENT
                        </span>
                    )}
                </div>
            </div>

            <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', flex: 1, gap: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: '600', lineHeight: '1.4', marginBottom: '0.25rem' }}>
                        {ad.title}
                    </h3>
                </div>

                <p style={{ fontSize: '1.25rem', fontWeight: '700', color: 'hsl(var(--color-text))' }}>
                    {formattedPrice}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'hsl(var(--color-text-secondary))', fontSize: '0.875rem', marginTop: 'auto' }}>
                    <Tag size={14} />
                    <span>{ad.category}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'hsl(var(--color-text-secondary))', fontSize: '0.875rem' }}>
                    <Calendar size={14} />
                    <span>{formattedDate}</span>
                </div>

                <Link to={`/item/${ad.id}`} className="btn btn-outline" style={{ marginTop: '1rem', width: '100%' }}>
                    Review Ad
                </Link>
            </div>
        </div>
    );
};

export default AdCard;
