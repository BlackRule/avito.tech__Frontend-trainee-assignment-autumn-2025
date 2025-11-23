import { useEffect, useRef, useState } from 'react';
import type { MouseEvent as ReactMouseEvent } from 'react';
import { ChevronDown, X, Check } from 'lucide-react';
import { Category } from '../types';

interface CategorySelectProps {
  value: string;
  onChange: (value: string) => void;
  categories?: Category[];
}

const CategorySelect = ({ value, onChange, categories = [] }: CategorySelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const selectedCategory = categories.find((category) => String(category.id) === String(value));

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (id: number) => {
    onChange(String(id));
    setIsOpen(false);
    setSearch('');
  };

  const handleClear = (event: ReactMouseEvent) => {
    event.stopPropagation();
    onChange('');
  };

  return (
    <div ref={wrapperRef} style={{ position: 'relative', width: '100%' }}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          padding: '0.5rem',
          borderRadius: 'var(--radius-md)',
          border: '1px solid hsl(var(--color-border))',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'hsl(var(--color-background))',
          minHeight: '38px'
        }}
      >
        <span style={{ color: selectedCategory ? 'hsl(var(--color-text))' : 'hsl(var(--color-text-secondary))' }}>
          {selectedCategory ? selectedCategory.name : 'Выберите категорию'}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {value && (
            <div onClick={handleClear} style={{ cursor: 'pointer', display: 'flex' }}>
              <X size={16} className="text-muted-foreground hover:text-foreground" />
            </div>
          )}
          <ChevronDown size={16} style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
        </div>
      </div>

      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          width: '100%',
          marginTop: '0.25rem',
          backgroundColor: 'hsl(var(--color-background))',
          border: '1px solid hsl(var(--color-border))',
          borderRadius: 'var(--radius-md)',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          zIndex: 50,
          maxHeight: '300px',
          overflowY: 'auto'
        }}>
          <div style={{ padding: '0.5rem', position: 'sticky', top: 0, backgroundColor: 'hsl(var(--color-background))', borderBottom: '1px solid hsl(var(--color-border))' }}>
            <input
              type="text"
              placeholder="Поиск..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              onClick={(event) => event.stopPropagation()}
              style={{
                width: '100%',
                padding: '0.25rem 0.5rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid hsl(var(--color-border))',
                outline: 'none',
                backgroundColor: 'hsl(var(--color-surface))',
                color: 'hsl(var(--color-text))'
              }}
              autoFocus
            />
          </div>
          <div style={{ padding: '0.25rem' }}>
            {filteredCategories.length === 0 ? (
              <div style={{ padding: '0.5rem', textAlign: 'center', color: 'hsl(var(--color-text-secondary))', fontSize: '0.875rem' }}>
                Категории не найдены
              </div>
            ) : (
              filteredCategories.map((category) => {
                const isActive = String(value) === String(category.id);
                return (
                  <div
                    key={category.id}
                    onClick={() => handleSelect(category.id)}
                    style={{
                      padding: '0.5rem',
                      cursor: 'pointer',
                      borderRadius: 'var(--radius-sm)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      backgroundColor: isActive ? 'hsl(var(--color-secondary))' : 'transparent',
                      color: isActive ? 'hsl(var(--color-secondary-foreground))' : 'hsl(var(--color-text))',
                      fontSize: '0.875rem'
                    }}
                    onMouseEnter={(event) => {
                      if (!isActive) {
                        event.currentTarget.style.backgroundColor = 'hsl(var(--color-muted))';
                      }
                    }}
                    onMouseLeave={(event) => {
                      if (!isActive) {
                        event.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    {category.name}
                    {isActive && <Check size={14} />}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategorySelect;
