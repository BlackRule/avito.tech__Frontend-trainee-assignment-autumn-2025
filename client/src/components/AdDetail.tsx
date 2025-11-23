import { useState } from 'react';
import { User, Calendar, Tag, Clock, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { Ad, AdStatus } from '../types';

const STATUS_LABELS: Record<AdStatus, string> = {
  pending: 'На проверке',
  approved: 'Одобрено',
  rejected: 'Отклонено',
  draft: 'Черновик',
  requestChanges: 'Запрос изменений'
};

interface AdDetailProps {
  ad: Ad;
}

const AdDetail = ({ ad }: AdDetailProps) => {
  const [activeImage, setActiveImage] = useState(0);

  const formattedPrice = new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(ad.price);

  const formattedDate = new Date(ad.createdAt).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const displayedImage = ad.images[activeImage] || 'https://via.placeholder.com/800x600?text=%D0%9D%D0%B5%D1%82+%D1%84%D0%BE%D1%82%D0%BE';

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
      {/* Left Column: Images and Description */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {/* Image Gallery */}
        <div className="card" style={{ padding: '1rem' }}>
          <div style={{ height: '400px', backgroundColor: '#f0f0f0', borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: '1rem' }}>
            <img
              src={displayedImage}
              alt={ad.title}
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </div>
          <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
            {ad.images.map((img, index) => (
              <button
                key={img}
                onClick={() => setActiveImage(index)}
                style={{
                  width: '80px',
                  height: '60px',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  border: activeImage === index ? '2px solid hsl(var(--color-primary))' : '2px solid transparent',
                  padding: 0
                }}
                type="button"
              >
                <img src={img} alt={`Миниатюра ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </button>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="card" style={{ padding: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>Описание</h2>
          <p style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6', color: 'hsl(var(--color-text))' }}>
            {ad.description}
          </p>
        </div>

        {/* Characteristics */}
        <div className="card" style={{ padding: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>Характеристики</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {Object.entries(ad.characteristics || {}).map(([key, value]) => (
              <div key={key} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid hsl(var(--color-border))', paddingBottom: '0.5rem' }}>
                <span style={{ color: 'hsl(var(--color-text-secondary))' }}>{key}</span>
                <span style={{ fontWeight: '500' }}>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column: Info and History */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Main Info */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ marginBottom: '1rem' }}>
            <span className={`badge badge-${ad.status}`} style={{ fontSize: '1rem', padding: '0.5rem 1rem' }}>
              {STATUS_LABELS[ad.status] || ad.status}
            </span>
          </div>

          <h1 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '0.5rem', lineHeight: '1.3' }}>
            {ad.title}
          </h1>

          <div style={{ fontSize: '2rem', fontWeight: '700', color: 'hsl(var(--color-primary))', marginBottom: '1.5rem' }}>
            {formattedPrice}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'hsl(var(--color-text-secondary))' }}>
              <Tag size={18} />
              <span>{ad.category}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'hsl(var(--color-text-secondary))' }}>
              <Calendar size={18} />
              <span>{formattedDate}</span>
            </div>
          </div>
        </div>

        {/* Seller Info */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <User size={20} />
            Информация о продавце
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'hsl(var(--color-text-secondary))' }}>Имя</span>
              <span style={{ fontWeight: '500' }}>{ad.seller.name}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'hsl(var(--color-text-secondary))' }}>Рейтинг</span>
              <span style={{ fontWeight: '500' }}>{ad.seller.rating}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'hsl(var(--color-text-secondary))' }}>Количество объявлений</span>
              <span style={{ fontWeight: '500' }}>{ad.seller.totalAds}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'hsl(var(--color-text-secondary))' }}>На сайте с</span>
              <span style={{ fontWeight: '500' }}>{new Date(ad.seller.registeredAt).toLocaleDateString('ru-RU')}</span>
            </div>
          </div>
        </div>

        {/* Moderation History */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Clock size={20} />
            История модерации
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {ad.moderationHistory.length === 0 ? (
              <p style={{ color: 'hsl(var(--color-text-secondary))', fontSize: '0.875rem' }}>История пока пуста.</p>
            ) : (
              ad.moderationHistory.map((item) => (
                <div key={item.id} style={{ borderLeft: '2px solid hsl(var(--color-border))', paddingLeft: '1rem', position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '-5px', top: '0', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'hsl(var(--color-text-secondary))' }}></div>
                  <div style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.25rem' }}>
                    {item.action === 'approved' && <span style={{ color: 'hsl(var(--color-success))', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><CheckCircle size={14} /> Одобрено</span>}
                    {item.action === 'rejected' && <span style={{ color: 'hsl(var(--color-danger))', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><XCircle size={14} /> Отклонено</span>}
                    {item.action === 'requestChanges' && <span style={{ color: 'hsl(var(--color-warning))', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><AlertTriangle size={14} /> Запрос изменений</span>}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'hsl(var(--color-text-secondary))', marginBottom: '0.25rem' }}>
                    {new Date(item.timestamp).toLocaleString('ru-RU')} — {item.moderatorName}
                  </div>
                  {item.comment && (
                    <div style={{ fontSize: '0.875rem', backgroundColor: 'hsl(var(--color-background))', padding: '0.5rem', borderRadius: 'var(--radius-md)' }}>
                      {item.comment}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdDetail;
