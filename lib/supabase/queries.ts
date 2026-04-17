import { supabaseAdmin } from './server';
import type { Project, Article } from './types';

export async function getPublishedProjects(): Promise<Project[]> {
  const { data, error } = await supabaseAdmin
    .from('projects')
    .select('*')
    .eq('published', true)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
  return data || [];
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const { data, error } = await supabaseAdmin
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) return null;
  return data;
}

export async function getPublishedArticles(): Promise<Article[]> {
  const { data, error } = await supabaseAdmin
    .from('articles')
    .select('*')
    .eq('published', true)
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
  return data || [];
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const { data, error } = await supabaseAdmin
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (error || !data) return null;
  return data;
}

export async function getLatestArticles(limit = 3): Promise<Article[]> {
  const { data, error } = await supabaseAdmin
    .from('articles')
    .select('*')
    .eq('published', true)
    .order('published_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching latest articles:', error);
    return [];
  }
  return data || [];
}

export async function getRelatedArticles(excludeSlug: string, limit = 3): Promise<Article[]> {
  const { data, error } = await supabaseAdmin
    .from('articles')
    .select('*')
    .eq('published', true)
    .neq('slug', excludeSlug)
    .order('published_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching related articles:', error);
    return [];
  }
  return data || [];
}
