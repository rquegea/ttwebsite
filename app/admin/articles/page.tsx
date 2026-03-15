'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import type { Article } from '@/lib/supabase/types';

export default function AdminArticlesPage() {
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchArticles = async () => {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) setArticles(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const togglePublished = async (article: Article) => {
    const { error } = await supabase
      .from('articles')
      .update({ published: !article.published })
      .eq('id', article.id);

    if (!error) {
      setArticles((prev) =>
        prev.map((a) => (a.id === article.id ? { ...a, published: !a.published } : a))
      );
    }
  };

  const handleDelete = async (article: Article) => {
    if (!confirm(`¿Eliminar el artículo "${article.title}"? Esta acción no se puede deshacer.`)) return;

    const { error } = await supabase.from('articles').delete().eq('id', article.id);
    if (!error) {
      setArticles((prev) => prev.filter((a) => a.id !== article.id));
    }
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  if (loading) return <div className="admin-loading">Cargando artículos...</div>;

  return (
    <div>
      <div className="admin-page-header">
        <h1 className="admin-page-title">Artículos</h1>
        <button
          onClick={() => router.push('/admin/articles/new')}
          className="admin-btn admin-btn-primary"
        >
          + Nuevo Artículo
        </button>
      </div>

      {articles.length === 0 ? (
        <div className="admin-empty">No hay artículos todavía.</div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Título</th>
                <th>Autor</th>
                <th>Fecha</th>
                <th>Publicado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr key={article.id}>
                  <td>
                    {article.image_url ? (
                      <img src={article.image_url} alt="" className="admin-table-thumb" />
                    ) : (
                      <div className="admin-table-thumb" />
                    )}
                  </td>
                  <td>{article.title}</td>
                  <td>{article.author}</td>
                  <td>{formatDate(article.published_at)}</td>
                  <td>
                    <label className="admin-toggle">
                      <input
                        type="checkbox"
                        checked={article.published}
                        onChange={() => togglePublished(article)}
                      />
                      <span className="admin-toggle-slider" />
                    </label>
                  </td>
                  <td>
                    <div className="admin-table-actions">
                      <button
                        onClick={() => router.push(`/admin/articles/${article.id}/edit`)}
                        className="admin-btn admin-btn-secondary admin-btn-sm"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(article)}
                        className="admin-btn admin-btn-danger admin-btn-sm"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
