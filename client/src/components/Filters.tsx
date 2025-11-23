import { Filter, Search, X } from 'lucide-react';
import CategorySelect from './CategorySelect';
import { type AdStatus, type Category, type FiltersState, type SortBy, type SortOrder } from '../types';

interface FiltersProps {
  filters: FiltersState;
  onFilterChange: (next: Partial<FiltersState>) => void;
  onReset: () => void;
  categories?: Category[];
}

const STATUS_LABELS: Record<AdStatus, string> = {
  pending: 'На проверке',
  approved: 'Одобрено',
  rejected: 'Отклонено',
  draft: 'Черновик',
  requestChanges: 'Запрос изменений'
};

const STATUS_OPTIONS: AdStatus[] = ['pending', 'approved', 'rejected', 'draft'];

const Filters = ({ filters, onFilterChange, onReset, categories = [] }: FiltersProps) => {
  const handleChange = <K extends keyof FiltersState>(key: K, value: FiltersState[K]) => {
    onFilterChange({ [key]: value });
  };

  const handleStatusChange = (status: AdStatus) => {
    const currentStatuses = filters.status || [];
    const newStatuses = currentStatuses.includes(status)
      ? currentStatuses.filter((item) => item !== status)
      : [...currentStatuses, status];
    handleChange('status', newStatuses);
  };

  return (
    <div className="card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Filter size={20} />
          Фильтры
        </h2>
        <button onClick={onReset} className="btn btn-outline" style={{ fontSize: '0.875rem' }} type="button">
          <X size={16} />
          Сбросить
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
        <div style={{ gridColumn: '1 / -1' }}>
          <div style={{ position: 'relative' }}>
            <Search size={20} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'hsl(var(--color-text-secondary))' }} />
            <input
              type="text"
              placeholder="Поиск объявлений..."
              value={filters.search || ''}
              onChange={(event) => handleChange('search', event.target.value)}
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

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.875rem' }}>Статус</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {STATUS_OPTIONS.map((status) => {
              const active = filters.status?.includes(status);
              return (
                <button
                  key={status}
                  onClick={() => handleStatusChange(status)}
                  className={`badge ${active ? `badge-${status}` : ''}`}
                  type="button"
                  style={{
                    border: '1px solid hsl(var(--color-border))',
                    cursor: 'pointer',
                    backgroundColor: active ? undefined : 'transparent',
                    opacity: active ? 1 : 0.7
                  }}
                >
                  {STATUS_LABELS[status]}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.875rem' }}>Категория</label>
          <CategorySelect
            value={filters.categoryId}
            onChange={(value) => handleChange('categoryId', value)}
            categories={categories}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.875rem' }}>Цена</label>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input
              type="number"
              placeholder="От"
              value={filters.minPrice || ''}
              onChange={(event) => handleChange('minPrice', event.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid hsl(var(--color-border))'
              }}
            />
            <input
              type="number"
              placeholder="До"
              value={filters.maxPrice || ''}
              onChange={(event) => handleChange('maxPrice', event.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid hsl(var(--color-border))'
              }}
            />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.875rem' }}>Сортировка</label>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <select
              value={filters.sortBy}
              onChange={(event) => handleChange('sortBy', event.target.value as SortBy)}
              style={{
                flex: 1,
                padding: '0.5rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid hsl(var(--color-border))'
              }}
            >
              <option value="createdAt">Дата</option>
              <option value="price">Цена</option>
              <option value="priority">Приоритет</option>
            </select>
            <select
              value={filters.sortOrder}
              onChange={(event) => handleChange('sortOrder', event.target.value as SortOrder)}
              style={{
                padding: '0.5rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid hsl(var(--color-border))'
              }}
            >
              <option value="desc">По убыв.</option>
              <option value="asc">По возр.</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
