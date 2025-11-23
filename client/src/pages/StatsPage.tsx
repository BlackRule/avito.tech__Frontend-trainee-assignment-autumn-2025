import React, { useState, useEffect } from 'react';
import { api, endpoints } from '../api/api';
import StatsCard from '../components/StatsCard';
import { ActivityChart, DecisionsChart } from '../components/Charts';
import { Loader2, CheckCircle, XCircle, AlertTriangle, Clock, BarChart3 } from 'lucide-react';
import { Period } from '../types';

const PERIOD_LABELS = {
    today: 'Сегодня',
    week: 'Неделя',
    month: 'Месяц'
};

const StatsPage = () => {
    const [summary, setSummary] = useState(null);
    const [activity, setActivity] = useState([]);
    const [decisions, setDecisions] = useState(null);
    const [categories, setCategories] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [period, setPeriod] = useState<Period>('week');

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const params = { period };

            const [summaryData, activityData, decisionsData, categoriesData] = await Promise.all([
                api.get(endpoints.stats.summary, params),
                api.get(endpoints.stats.activity, params),
                api.get(endpoints.stats.decisions, params),
                api.get(endpoints.stats.categories, params)
            ]);

            setSummary(summaryData);
            setActivity(activityData);
            setDecisions(decisionsData);
            setCategories(categoriesData);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [period]);

    if (loading && !summary) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
                <Loader2 className="animate-spin" size={48} color="hsl(var(--color-primary))" />
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ padding: '2rem', color: 'hsl(var(--color-danger))' }}>
                Ошибка: {error}
            </div>
        );
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: '700' }}>Статистика</h1>

                <div style={{ display: 'flex', backgroundColor: 'hsl(var(--color-surface))', padding: '0.25rem', borderRadius: 'var(--radius-md)', border: '1px solid hsl(var(--color-border))' }}>
                    {['today', 'week', 'month'].map(p => (
                        <button
                            key={p}
                            onClick={() => setPeriod(p)}
                            style={{
                                padding: '0.5rem 1rem',
                                borderRadius: 'var(--radius-md)',
                                border: 'none',
                                backgroundColor: period === p ? 'hsl(var(--color-primary))' : 'transparent',
                                color: period === p ? 'white' : 'hsl(var(--color-text))',
                                textTransform: 'capitalize',
                                fontWeight: '500'
                            }}
                        >
                            {PERIOD_LABELS[p]}
                        </button>
                    ))}
                </div>
            </div>

            {/* Summary Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <StatsCard
                    title="Всего проверено"
                    value={summary.totalReviewed}
                    subtext="За выбранный период"
                    icon={BarChart3}
                    color="250 60% 60%"
                />
                <StatsCard
                    title="Доля одобрений"
                    value={`${Math.round(summary.approvedPercentage)}%`}
                    subtext="От всех решений"
                    icon={CheckCircle}
                    color="150 60% 40%"
                />
                <StatsCard
                    title="Доля отклонений"
                    value={`${Math.round(summary.rejectedPercentage)}%`}
                    subtext="От всех решений"
                    icon={XCircle}
                    color="0 70% 60%"
                />
                <StatsCard
                    title="Среднее время проверки"
                    value={`${Math.round(summary.averageReviewTime / 1000 / 60)} мин`}
                    subtext="На объявление"
                    icon={Clock}
                    color="220 10% 50%"
                />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
                {/* Activity Chart */}
                <div className="card" style={{ padding: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1.5rem' }}>Активность модерации</h3>
                    <ActivityChart data={activity} />
                </div>

                {/* Decisions Chart */}
                <div className="card" style={{ padding: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1.5rem' }}>Распределение решений</h3>
                    <DecisionsChart data={decisions} />
                </div>
            </div>
        </div>
    );
};

export default StatsPage;
