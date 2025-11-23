import React, { useState } from 'react';
import { CheckCircle, XCircle, AlertTriangle, X } from 'lucide-react';
import { api, endpoints } from '../api/api';

const REASONS = [
    'Нарушение правил площадки',
    'Недостаточно информации о товаре',
    'Неверно указана категория',
    'Нарушение авторских прав',
    'Подозрение на мошенничество',
    'Другое'
];

const ModerationPanel = ({ adId, onActionComplete }) => {
    const [showModal, setShowModal] = useState(false);
    const [actionType, setActionType] = useState(null); // 'reject' or 'request-changes'
    const [reason, setReason] = useState('');
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleApprove = async () => {
        if (!window.confirm('Вы уверены, что хотите одобрить это объявление?')) return;
        setLoading(true);
        setError(null);
        try {
            await api.post(endpoints.ads.approve(adId));
            onActionComplete();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const openModal = (type) => {
        setActionType(type);
        setReason(REASONS[0]);
        setComment('');
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const endpoint = actionType === 'reject'
                ? endpoints.ads.reject(adId)
                : endpoints.ads.requestChanges(adId);

            await api.post(endpoint, { reason, comment });
            setShowModal(false);
            onActionComplete();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="card" style={{ padding: '1.5rem', position: 'sticky', bottom: '2rem', zIndex: 10, border: '2px solid hsl(var(--color-primary))' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: '600' }}>Действия модератора</h3>
                    {error && <span style={{ color: 'hsl(var(--color-danger))', fontSize: '0.875rem' }}>{error}</span>}
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                    <button
                        onClick={handleApprove}
                        disabled={loading}
                        className="btn"
                        style={{ backgroundColor: 'hsl(var(--color-success))', color: 'white', flex: 1 }}
                    >
                        <CheckCircle size={20} />
                        Одобрить
                    </button>

                    <button
                        onClick={() => openModal('request-changes')}
                        disabled={loading}
                        className="btn"
                        style={{ backgroundColor: 'hsl(var(--color-warning))', color: 'white', flex: 1 }}
                    >
                        <AlertTriangle size={20} />
                        Вернуть на доработку
                    </button>

                    <button
                        onClick={() => openModal('reject')}
                        disabled={loading}
                        className="btn"
                        style={{ backgroundColor: 'hsl(var(--color-danger))', color: 'white', flex: 1 }}
                    >
                        <XCircle size={20} />
                        Отклонить
                    </button>
                </div>
            </div>

            {showModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 100
                }}>
                    <div className="card" style={{ width: '500px', padding: '2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: '600' }}>
                                {actionType === 'reject' ? 'Отклонить объявление' : 'Вернуть на доработку'}
                            </h2>
                            <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none' }}>
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Причина</label>
                                <select
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid hsl(var(--color-border))' }}
                                >
                                    {REASONS.map(r => <option key={r} value={r}>{r}</option>)}
                                </select>
                            </div>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Комментарий (необязательно)</label>
                                <textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    rows={4}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid hsl(var(--color-border))', resize: 'vertical' }}
                                />
                            </div>

                            {error && (
                                <div style={{ color: 'hsl(var(--color-danger))', marginBottom: '1rem' }}>{error}</div>
                            )}

                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="btn btn-outline"
                                >
                                    Отмена
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="btn"
                                    style={{
                                        backgroundColor: actionType === 'reject' ? 'hsl(var(--color-danger))' : 'hsl(var(--color-warning))',
                                        color: 'white'
                                    }}
                                >
                                    {loading ? 'Обработка...' : 'Подтвердить'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default ModerationPanel;
