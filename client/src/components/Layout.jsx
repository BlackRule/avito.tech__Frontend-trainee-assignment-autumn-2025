import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, List, BarChart3 } from 'lucide-react';
import '../styles/index.css';

const Layout = () => {
    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            <aside style={{
                width: '250px',
                backgroundColor: 'hsl(var(--color-surface))',
                borderRight: '1px solid hsl(var(--color-border))',
                padding: '2rem 1rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '2rem',
                position: 'sticky',
                top: 0,
                height: '100vh'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingLeft: '0.5rem' }}>
                    <div style={{
                        width: '32px',
                        height: '32px',
                        backgroundColor: 'hsl(var(--color-primary))',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 'bold'
                    }}>
                        A
                    </div>
                    <h1 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'hsl(var(--color-text))' }}>Avito Мод</h1>
                </div>

                <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <NavLink
                        to="/list"
                        className={({ isActive }) => `btn ${isActive ? 'btn-primary' : 'btn-outline'}`}
                        style={{ justifyContent: 'flex-start', border: 'none', background: ({ isActive }) => isActive ? '' : 'transparent' }}
                    >
                        <List size={20} />
                        Список объявлений
                    </NavLink>
                    <NavLink
                        to="/stats"
                        className={({ isActive }) => `btn ${isActive ? 'btn-primary' : 'btn-outline'}`}
                        style={{ justifyContent: 'flex-start', border: 'none', background: ({ isActive }) => isActive ? '' : 'transparent' }}
                    >
                        <BarChart3 size={20} />
                        Статистика
                    </NavLink>
                </nav>

                <div style={{ marginTop: 'auto', padding: '1rem', backgroundColor: 'hsl(var(--color-background))', borderRadius: 'var(--radius-md)' }}>
                    <p style={{ fontSize: '0.875rem', color: 'hsl(var(--color-text-secondary))' }}>Вы вошли как</p>
                    <p style={{ fontWeight: '600' }}>Модератор</p>
                </div>
            </aside>

            <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
                <div className="container">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Layout;
