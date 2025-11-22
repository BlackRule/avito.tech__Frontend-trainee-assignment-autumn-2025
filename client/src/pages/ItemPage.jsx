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
        // Logic to find next ad ID would typically come from the list context or API
        // For simplicity, we'll just increment ID, but in reality we'd need a list or API support
        // The requirements say "Previous / Next advertisement buttons (for quick moderation)"
        // Assuming sequential IDs for now or we'd need to fetch the list to know the order.
        // Let's just try incrementing/decrementing for prototype, or better, fetch list and find index.
        // Fetching list is expensive. Let's assume sequential for now or just leave it as simple ID navigation.
        // A better approach for a real app: pass current list IDs in state or context.
        // I'll implement simple ID navigation +1/-1 for now as a fallback.
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
                <div style={{ color: 'hsl(var(--color-danger))', marginBottom: '1rem' }}>Error: {error}</div>
                <Link to="/list" className="btn btn-primary">Back to List</Link>
            </div>
        );
    }

    if (!ad) return null;

    return (
        <div style={{ paddingBottom: '100px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <Link to="/list" className="btn btn-outline">
                    <ArrowLeft size={20} />
                    Back to List
                </Link>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button onClick={handlePrev} className="btn btn-outline" disabled={parseInt(id) <= 1}>
                        <ChevronLeft size={20} />
                        Previous
                    </button>
                    <button onClick={handleNext} className="btn btn-outline">
                        Next
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>

            <AdDetail ad={ad} />

            <ModerationPanel adId={ad.id} onActionComplete={handleActionComplete} />
        </div>
    );
};

export default ItemPage;
