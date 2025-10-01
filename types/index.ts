export interface VideoInput {
  title: string;
  description?: string;
  duration: number;
  genre: string;
  tags: string[];
  thumbnailUrl?: string;
  videoUrl?: string;
}

export interface VideoFilter {
  genre?: string;
  tags?: string[];
  search?: string;
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
