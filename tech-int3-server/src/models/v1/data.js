let seed = 12345;
const random = () => {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
};

const categories = ['Электроника', 'Недвижимость', 'Транспорт', 'Работа', 'Услуги', 'Животные', 'Мода', 'Детское'];

const generateMockAds = (count) => {
  const statuses = ['pending', 'approved', 'rejected'];
  const priorities = ['normal', 'urgent'];
  const rejectionReasons = ['Запрещенный товар', 'Неверная категория', 'Некорректное описание', 'Проблемы с фото', 'Подозрение на мошенничество', 'Другое'];

  const ads = [];

  for (let i = 1; i <= count; i++) {
    const categoryId = Math.floor(random() * categories.length);
    const statusId = Math.floor(random() * statuses.length);
    const priorityId = Math.floor(random() * priorities.length);

    // Создаем объявления за разные периоды для тестирования фильтрации
    const daysAgo = Math.floor(random() * 60); // Объявления за последние 60 дней
    const fixedNow = new Date('2024-01-01T12:00:00Z').getTime();
    const createdAt = new Date(fixedNow - daysAgo * 24 * 60 * 60 * 1000);

    const ad = {
      id: i,
      title: `Объявление ${i}: ${categories[categoryId]} для продажи`,
      description: `Подробное описание товара ${i}. Это отличный товар, который подходит для различных целей. Качество проверено временем и имеет гарантию.`,
      price: Math.floor(random() * 100000) + 1000,
      category: categories[categoryId],
      categoryId: categoryId,
      status: statuses[statusId],
      priority: priorities[priorityId],
      createdAt: createdAt.toISOString(),
      updatedAt: createdAt.toISOString(),
      images: [
        `https://placehold.co/300x200/cccccc/969696?text=Image+${i}-1`,
        `https://placehold.co/300x200/cccccc/969696?text=Image+${i}-2`,
        `https://placehold.co/300x200/cccccc/969696?text=Image+${i}-3`
      ],
      seller: {
        id: Math.floor(random() * 1000) + 1,
        name: `Продавец ${Math.floor(random() * 100) + 1}`,
        rating: (random() * 5).toFixed(1),
        totalAds: Math.floor(random() * 50) + 1,
        registeredAt: new Date(new Date('2024-01-01T12:00:00Z').getTime() - Math.floor(random() * 365) * 24 * 60 * 60 * 1000).toISOString()
      },
      characteristics: {
        'Состояние': ['Новое', 'Б/у', 'Отличное', 'Хорошее', 'Удовлетворительное'][Math.floor(random() * 5)],
        'Гарантия': ['Есть', 'Нет', 'Частичная'][Math.floor(random() * 3)],
        'Производитель': `Бренд ${String.fromCharCode(65 + Math.floor(random() * 26))}`,
        'Модель': `Модель ${Math.floor(random() * 1000)}`,
        'Цвет': ['Черный', 'Белый', 'Серый', 'Синий', 'Красный', 'Зеленый'][Math.floor(random() * 6)]
      },
      moderationHistory: []
    };

    // Добавляем историю модерации с датами
    if (statuses[statusId] !== 'pending') {
      const moderatorId = Math.floor(random() * 5) + 1;
      const moderatorName = `Модератор ${moderatorId}`;
      // Модерация происходит через 5-30 минут после создания
      const moderationTime = new Date(createdAt.getTime() + (5 + Math.floor(random() * 25)) * 60 * 1000);

      ad.moderationHistory.push({
        id: 1,
        moderatorId: moderatorId,
        moderatorName: moderatorName,
        action: statuses[statusId],
        reason: statuses[statusId] === 'rejected' ? rejectionReasons[Math.floor(random() * rejectionReasons.length)] : null,
        comment: statuses[statusId] === 'rejected' ? 'Объявление не соответствует правилам платформы' : 'Объявление прошло модерацию успешно',
        timestamp: moderationTime.toISOString()
      });

      ad.updatedAt = moderationTime.toISOString();
    }

    ads.push(ad);
  }

  return ads;
};

const generateMockStats = () => {
  const stats = {
    summary: {
      totalReviewed: 1247,
      totalReviewedToday: 45,
      totalReviewedThisWeek: 234,
      totalReviewedThisMonth: 892,
      approvedPercentage: 78.5,
      rejectedPercentage: 15.2,
      requestChangesPercentage: 6.3,
      averageReviewTime: 156
    },
    activityChart: [],
    decisionsChart: {
      approved: 78.5,
      rejected: 15.2,
      requestChanges: 6.3
    },
    categoriesChart: {}
  };



  for (let i = 6; i >= 0; i--) {
    const date = new Date('2024-01-01T12:00:00Z');
    date.setDate(date.getDate() - i);

    stats.activityChart.push({
      date: date.toISOString().split('T')[0],
      approved: Math.floor(random() * 20) + 10,
      rejected: Math.floor(random() * 10) + 5,
      requestChanges: Math.floor(random() * 5) + 1
    });
  }

  categories.forEach(category => {
    stats.categoriesChart[category] = Math.floor(random() * 100) + 20;
  });

  return stats;
};

const mockModerator = {
  id: 1,
  name: 'Алексей Петров',
  email: 'alexey.petrov@moderator.avito',
  role: 'Senior Moderator',
  statistics: {
    totalReviewed: 1247,
    todayReviewed: 45,
    thisWeekReviewed: 234,
    thisMonthReviewed: 892,
    averageReviewTime: 156,
    approvalRate: 78.5
  },
  permissions: ['approve_ads', 'reject_ads', 'request_changes', 'view_stats']
};

let dataStore = {
  ads: [],
  stats: {},
  moderator: {},
  categories
};

const resetData = () => {
  seed = 12345;
  dataStore.ads = generateMockAds(150);
  dataStore.stats = generateMockStats();
  dataStore.moderator = mockModerator;
};

resetData();

dataStore.resetData = resetData;

module.exports = dataStore;

