import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { api, endpoints } from '../api/api';
import AdDetail from '../components/AdDetail';
import ModerationPanel from '../components/ModerationPanel';
import { Loader2, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

const ItemPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [ad, setAd] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAd = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await api.get(endpoints.ads.detail(id));
            setAd(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAd();
    }, [id]);

    const handleActionComplete = () => {
        fetchAd();
    };

    const handleNext = () => {
        // In the future next ad will be fetched from API
        navigate(`/item/${parseInt(id) + 1}`);
    };

    const handlePrev = () => {
        if (parseInt(id) > 1) {
            navigate(`/item/${parseInt(id) - 1}`);
        }
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
                <Loader2 className="animate-spin" size={48} color="hsl(var(--color-primary))" />
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ padding: '2rem', textAlign: 'center' }}>
                <div style={{ color: 'hsl(var(--color-danger))', marginBottom: '1rem' }}>Ошибка: {error}</div>
                <Link to="/list" className="btn btn-primary">Вернуться к списку</Link>
            </div>
        );
    }

    if (!ad) return null;

    return (
        <div style={{ paddingBottom: '100px' }}>


            <AdDetail ad={ad} />

            <ModerationPanel adId={ad.id} onActionComplete={handleActionComplete} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <Link to="/list" className="btn btn-outline">
                    <ArrowLeft size={20} />
                    К списку
                </Link>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button onClick={handlePrev} className="btn btn-outline" disabled={parseInt(id) <= 1}>
                        <ChevronLeft size={20} />
                        Предыдущее
                    </button>
                    <button onClick={handleNext} className="btn btn-outline">
                        Следующее
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ItemPage;
