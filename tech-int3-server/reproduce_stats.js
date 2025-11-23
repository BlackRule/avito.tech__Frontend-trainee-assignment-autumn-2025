const dataStore = require('./src/models/v1/data');

// Copying logic from statsController.js
const calculateSummaryStats = (ads, dateRange) => {
    const filteredAds = ads.filter(ad => {
        if (ad.moderationHistory.length > 0) {
            const lastModeration = ad.moderationHistory[ad.moderationHistory.length - 1];
            const moderationDate = new Date(lastModeration.timestamp);
            return moderationDate >= dateRange.start && moderationDate <= dateRange.end;
        }
        return false;
    });

    if (filteredAds.length === 0) {
        return { averageReviewTime: 0 };
    }

    let totalReviewTime = 0;

    filteredAds.forEach(ad => {
        if (ad.moderationHistory.length > 0) {
            const lastModeration = ad.moderationHistory[ad.moderationHistory.length - 1];
            const reviewTime = new Date(lastModeration.timestamp) - new Date(ad.createdAt);

            totalReviewTime += reviewTime;
        }
    });

    const total = filteredAds.length;

    return {
        totalReviewed: total,
        averageReviewTime: total > 0 ? Math.round(totalReviewTime / total / 1000) : 0 // в секундах
    };
};

const now = new Date();

// Week
const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
const dateRangeWeek = { start: weekAgo, end: now };
console.log('Week Stats:', calculateSummaryStats(dataStore.ads, dateRangeWeek));

// Today
const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
const dateRangeToday = { start: todayStart, end: new Date(todayStart.getTime() + 24 * 60 * 60 * 1000 - 1) };
console.log('Today Stats:', calculateSummaryStats(dataStore.ads, dateRangeToday));

// Month
const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
const dateRangeMonth = { start: monthAgo, end: now };
console.log('Month Stats:', calculateSummaryStats(dataStore.ads, dateRangeMonth));

console.log('Mock Stats in data.js:', dataStore.stats.summary.averageReviewTime);
