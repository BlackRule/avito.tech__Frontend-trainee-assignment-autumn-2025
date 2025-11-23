export type Period = 'today' | 'week' | 'month';
export type SortBy = 'createdAt' | 'price' | 'priority';
export type SortOrder = 'asc' | 'desc';

export type AdStatus = 'pending' | 'approved' | 'rejected' | 'draft' | 'requestChanges';
export type AdPriority = 'normal' | 'urgent';

export interface Seller {
  id: number;
  name: string;
  rating: string;
  totalAds: number;
  registeredAt: string;
}

export interface ModerationHistoryEntry {
  id: number;
  moderatorId: number;
  moderatorName: string;
  action: Exclude<AdStatus, 'pending' | 'draft'>;
  reason: string | null;
  comment: string | null;
  timestamp: string;
}

export interface Ad {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  categoryId: number;
  status: AdStatus;
  priority: AdPriority;
  createdAt: string;
  updatedAt: string;
  images: string[];
  seller: Seller;
  characteristics: Record<string, string>;
  moderationHistory: ModerationHistoryEntry[];
}

export interface Category {
  id: number;
  name: string;
}

export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage?: number;
}

export interface AdsListResponse {
  ads: Ad[];
  pagination: PaginationMeta;
}

export interface StatsSummary {
  totalReviewed: number;
  totalReviewedToday: number;
  totalReviewedThisWeek: number;
  totalReviewedThisMonth: number;
  approvedPercentage: number;
  rejectedPercentage: number;
  requestChangesPercentage: number;
  averageReviewTime: number;
}

export interface ActivityPoint {
  date: string;
  approved: number;
  rejected: number;
  requestChanges: number;
}

export interface DecisionsBreakdown {
  approved: number;
  rejected: number;
  requestChanges: number;
}

export type CategoriesBreakdown = Record<string, number>;

export interface FiltersState {
  page: number;
  limit: number;
  status: AdStatus[];
  categoryId: string;
  minPrice: string;
  maxPrice: string;
  search: string;
  sortBy: SortBy;
  sortOrder: SortOrder;
}
