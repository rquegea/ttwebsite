export interface Project {
  id: string;
  title: string;
  client_name: string;
  client_logo_url: string | null;
  category: string;
  description: string | null;
  image_url: string;
  slug: string;
  published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  image_url: string;
  author: string;
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}
