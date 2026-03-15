'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';

async function uploadImage(file: File, folder: string): Promise<string> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${folder}/${Date.now()}.${fileExt}`;

  const { error } = await supabase.storage.from('media').upload(fileName, file);
  if (error) throw error;

  const { data: { publicUrl } } = supabase.storage.from('media').getPublicUrl(fileName);
  return publicUrl;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export default function NewArticlePage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [form, setForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    author: '',
    published: false,
    published_at: '',
  });

  const handleTitleChange = (value: string) => {
    setForm((prev) => ({ ...prev, title: value, slug: slugify(value) }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      let image_url = '';
      if (imageFile) {
        image_url = await uploadImage(imageFile, 'articles');
      }

      const { error } = await supabase.from('articles').insert({
        ...form,
        image_url,
        excerpt: form.excerpt || null,
        content: form.content || null,
        published_at: form.published_at || null,
      });

      if (error) throw error;
      router.push('/admin/articles');
    } catch (err) {
      alert('Error al guardar: ' + (err as Error).message);
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="admin-page-header">
        <h1 className="admin-page-title">Nuevo Artículo</h1>
      </div>

      <form onSubmit={handleSubmit} className="admin-form">
        <div className="admin-form-row">
          <div className="admin-form-group">
            <label className="admin-form-label">Título</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="admin-form-input"
              required
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Slug</label>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => setForm((prev) => ({ ...prev, slug: e.target.value }))}
              className="admin-form-input"
              required
            />
          </div>
        </div>

        <div className="admin-form-row">
          <div className="admin-form-group">
            <label className="admin-form-label">Autor</label>
            <input
              type="text"
              value={form.author}
              onChange={(e) => setForm((prev) => ({ ...prev, author: e.target.value }))}
              className="admin-form-input"
              required
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Fecha de publicación</label>
            <input
              type="date"
              value={form.published_at}
              onChange={(e) => setForm((prev) => ({ ...prev, published_at: e.target.value }))}
              className="admin-form-input"
            />
          </div>
        </div>

        <div className="admin-form-group">
          <label className="admin-form-label">Extracto</label>
          <input
            type="text"
            value={form.excerpt}
            onChange={(e) => setForm((prev) => ({ ...prev, excerpt: e.target.value }))}
            className="admin-form-input"
            placeholder="Breve descripción del artículo"
          />
        </div>

        <div className="admin-form-group">
          <label className="admin-form-label">Contenido</label>
          <textarea
            value={form.content}
            onChange={(e) => setForm((prev) => ({ ...prev, content: e.target.value }))}
            className="admin-form-textarea"
            placeholder="Escribe el contenido del artículo..."
          />
        </div>

        <div className="admin-form-group">
          <label className="admin-form-label">Imagen</label>
          <div className="admin-upload-area">
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="admin-upload-preview" />
            ) : (
              <p className="admin-upload-text">Haz clic o arrastra una imagen</p>
            )}
          </div>
        </div>

        <div className="admin-form-group">
          <div className="admin-form-checkbox">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) => setForm((prev) => ({ ...prev, published: e.target.checked }))}
            />
            <span>Publicado</span>
          </div>
        </div>

        <div className="admin-form-actions">
          <button type="submit" disabled={saving} className="admin-btn admin-btn-primary">
            {saving ? 'Guardando...' : 'Guardar artículo'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/admin/articles')}
            className="admin-btn admin-btn-secondary"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
