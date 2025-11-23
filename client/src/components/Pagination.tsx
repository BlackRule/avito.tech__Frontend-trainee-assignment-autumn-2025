import React from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, onPageChange, totalItems }) => {
    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5; // Total visible page numbers including first/last

        if (totalPages <= maxVisiblePages + 2) {
            // If total pages is small, show all
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Always show first page
            pages.push(1);

            // Logic for ellipsis and middle pages
            if (currentPage <= 3) {
                // Near start: 1, 2, 3, 4, ..., last
                pages.push(2, 3, 4);
                pages.push('...');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                // Near end: 1, ..., last-3, last-2, last-1, last
                pages.push('...');
                pages.push(totalPages - 3, totalPages - 2, totalPages - 1);
                pages.push(totalPages);
            } else {
                // Middle: 1, ..., current-1, current, current+1, ..., last
                pages.push('...');
                pages.push(currentPage - 1, currentPage, currentPage + 1);
                pages.push('...');
                pages.push(totalPages);
            }
        }
        return pages;
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem', padding: '1rem 0' }}>
            <div style={{ color: 'hsl(var(--color-text-secondary))', fontSize: '0.875rem' }}>
                Всего {totalItems} объявлений
            </div>

            <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }}>
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="btn btn-outline"
                    style={{ padding: '0.5rem' }}
                >
                    <ChevronLeft size={20} />
                </button>

                {getPageNumbers().map((page, index) => (
                    <React.Fragment key={index}>
                        {page === '...' ? (
                            <span style={{ padding: '0.5rem', color: 'hsl(var(--color-text-secondary))', display: 'flex', alignItems: 'center' }}>
                                <MoreHorizontal size={20} />
                            </span>
                        ) : (
                            <button
                                onClick={() => onPageChange(page)}
                                className={`btn ${currentPage === page ? 'btn-primary' : 'btn-outline'}`}
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    padding: 0,
                                    backgroundColor: currentPage === page ? 'hsl(var(--color-primary))' : 'transparent',
                                    color: currentPage === page ? 'white' : 'hsl(var(--color-text))',
                                    borderColor: currentPage === page ? 'transparent' : 'hsl(var(--color-border))'
                                }}
                            >
                                {page}
                            </button>
                        )}
                    </React.Fragment>
                ))}

                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="btn btn-outline"
                    style={{ padding: '0.5rem' }}
                >
                    <ChevronRight size={20} />
                </button>
            </div>
        </div>
    );
};

export default Pagination;
