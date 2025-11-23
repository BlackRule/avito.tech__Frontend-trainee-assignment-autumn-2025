import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, X, Check } from 'lucide-react';

const CategorySelect = ({ value, onChange, categories = [] }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const wrapperRef = useRef(null);

    const selectedCategory = categories.find(c => String(c.id) === String(value));

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const filteredCategories = categories.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleSelect = (id) => {
        onChange(id);
        setIsOpen(false);
        setSearch('');
    };

    const handleClear = (e) => {
        e.stopPropagation();
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
                            onChange={(e) => setSearch(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                width: '100%',
                                padding: '0.25rem 0.5rem',
                                borderRadius: 'var(--radius-sm)',
                                border: '1px solid hsl(var(--color-border))',
                                outline: 'none'
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
                            filteredCategories.map(category => (
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
                                        backgroundColor: String(value) === String(category.id) ? 'hsl(var(--color-secondary))' : 'transparent',
                                        color: String(value) === String(category.id) ? 'hsl(var(--color-secondary-foreground))' : 'hsl(var(--color-text))',
                                        fontSize: '0.875rem'
                                    }}
                                    onMouseEnter={(e) => {
                                        if (String(value) !== String(category.id)) {
                                            e.currentTarget.style.backgroundColor = 'hsl(var(--color-muted))';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (String(value) !== String(category.id)) {
                                            e.currentTarget.style.backgroundColor = 'transparent';
                                        }
                                    }}
                                >
                                    {category.name}
                                    {String(value) === String(category.id) && <Check size={14} />}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CategorySelect;
