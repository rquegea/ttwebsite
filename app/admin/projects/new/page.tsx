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

export default function NewProjectPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);

  const [form, setForm] = useState({
    title: '',
    client_name: '',
    category: '',
    description: '',
    slug: '',
    sort_order: 0,
    published: false,
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

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      let image_url = '';
      let client_logo_url: string | null = null;

      if (imageFile) {
        image_url = await uploadImage(imageFile, 'projects');
      }
      if (logoFile) {
        client_logo_url = await uploadImage(logoFile, 'logos');
      }

      // Incrementar sort_order de todos los proyectos existentes
      const { data: existing } = await supabase
        .from('projects')
        .select('id, sort_order')
        .order('sort_order', { ascending: false });

      if (existing && existing.length > 0) {
        for (const p of existing) {
          await supabase
            .from('projects')
            .update({ sort_order: p.sort_order + 1 })
            .eq('id', p.id);
        }
      }

      // Insertar el nuevo proyecto con sort_order = 0 (primero)
      const { sort_order: _ignored, ...formWithoutOrder } = form;
      const { error } = await supabase.from('projects').insert({
        ...formWithoutOrder,
        sort_order: 0,
        image_url,
        client_logo_url,
      });

      if (error) throw error;
      router.push('/admin/projects');
    } catch (err) {
      alert('Error al guardar: ' + (err as Error).message);
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="admin-page-header">
        <h1 className="admin-page-title">Nuevo Proyecto</h1>
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
            <label className="admin-form-label">Cliente</label>
            <input
              type="text"
              value={form.client_name}
              onChange={(e) => setForm((prev) => ({ ...prev, client_name: e.target.value }))}
              className="admin-form-input"
              required
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Categoría</label>
            <input
              type="text"
              value={form.category}
              onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
              className="admin-form-input"
              required
            />
          </div>
        </div>

        <div className="admin-form-group">
          <label className="admin-form-label">Descripción</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
            className="admin-textarea"
            rows={4}
          />
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

        <div className="admin-form-group">
          <label className="admin-form-label">Imagen principal</label>
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
          <label className="admin-form-label">Logo del cliente</label>
          <div className="admin-upload-area">
            <input type="file" accept="image/*" onChange={handleLogoChange} />
            {logoPreview ? (
              <img src={logoPreview} alt="Preview" className="admin-upload-preview" />
            ) : (
              <p className="admin-upload-text">Haz clic o arrastra el logo</p>
            )}
          </div>
        </div>

        <div className="admin-form-actions">
          <button type="submit" disabled={saving} className="admin-btn admin-btn-primary">
            {saving ? 'Guardando...' : 'Guardar proyecto'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/admin/projects')}
            className="admin-btn admin-btn-secondary"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
