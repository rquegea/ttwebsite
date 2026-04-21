'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import type { Project } from '@/lib/supabase/types';

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

type Discipline = { title: string; description: string };

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);

  // New image states
  const [showcasePreview, setShowcasePreview] = useState<string | null>(null);
  const [showcaseFile, setShowcaseFile] = useState<File | null>(null);
  const [splitPreview, setSplitPreview] = useState<string | null>(null);
  const [splitFile, setSplitFile] = useState<File | null>(null);
  const [galleryUploading, setGalleryUploading] = useState(false);

  const [form, setForm] = useState({
    title: '',
    client_name: '',
    category: '',
    description: '',
    slug: '',
    sort_order: 0,
    published: false,
    challenge: '',
    solution: '',
    result: '',
    title_en: '',
    description_en: '',
    challenge_en: '',
    solution_en: '',
    result_en: '',
    showcase_image_url: '',
    split_image_url: '',
    video_url: '',
  });

  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [disciplinesEn, setDisciplinesEn] = useState<Discipline[]>([]);
  const [galleryUrls, setGalleryUrls] = useState<string[]>([]);

  useEffect(() => {
    supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single()
      .then(({ data, error }) => {
        if (error || !data) {
          alert('Proyecto no encontrado');
          router.push('/admin/projects');
          return;
        }
        const project = data as Project;
        setForm({
          title: project.title,
          client_name: project.client_name,
          category: project.category,
          description: project.description || '',
          slug: project.slug,
          sort_order: project.sort_order,
          published: project.published,
          challenge: project.challenge || '',
          solution: project.solution || '',
          result: project.result || '',
          title_en: project.title_en || '',
          description_en: project.description_en || '',
          challenge_en: project.challenge_en || '',
          solution_en: project.solution_en || '',
          result_en: project.result_en || '',
          showcase_image_url: project.showcase_image_url || '',
          split_image_url: project.split_image_url || '',
          video_url: project.video_url || '',
        });
        setDisciplines(project.disciplines || []);
        setDisciplinesEn(project.disciplines_en || []);
        setGalleryUrls(project.gallery_urls || []);
        if (project.image_url) setImagePreview(project.image_url);
        if (project.client_logo_url) setLogoPreview(project.client_logo_url);
        if (project.showcase_image_url) setShowcasePreview(project.showcase_image_url);
        if (project.split_image_url) setSplitPreview(project.split_image_url);
        setLoading(false);
      });
  }, [id, router]);

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

  const handleShowcaseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setShowcaseFile(file);
    setShowcasePreview(URL.createObjectURL(file));
  };

  const handleSplitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSplitFile(file);
    setSplitPreview(URL.createObjectURL(file));
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setGalleryUploading(true);
    try {
      const newUrls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const url = await uploadImage(files[i], `projects/gallery/${form.slug}`);
        newUrls.push(url);
      }
      setGalleryUrls((prev) => [...prev, ...newUrls]);
    } catch (err) {
      alert('Error subiendo imágenes: ' + (err as Error).message);
    }
    setGalleryUploading(false);
    e.target.value = '';
  };

  const removeGalleryImage = (index: number) => {
    setGalleryUrls((prev) => prev.filter((_, i) => i !== index));
  };

  // Disciplines ES
  const addDiscipline = () => {
    if (disciplines.length >= 6) return;
    setDisciplines((prev) => [...prev, { title: '', description: '' }]);
  };

  const updateDiscipline = (index: number, field: keyof Discipline, value: string) => {
    setDisciplines((prev) =>
      prev.map((d, i) => (i === index ? { ...d, [field]: value } : d))
    );
  };

  const removeDiscipline = (index: number) => {
    setDisciplines((prev) => prev.filter((_, i) => i !== index));
  };

  // Disciplines EN
  const addDisciplineEn = () => {
    if (disciplinesEn.length >= 6) return;
    setDisciplinesEn((prev) => [...prev, { title: '', description: '' }]);
  };

  const updateDisciplineEn = (index: number, field: keyof Discipline, value: string) => {
    setDisciplinesEn((prev) =>
      prev.map((d, i) => (i === index ? { ...d, [field]: value } : d))
    );
  };

  const removeDisciplineEn = (index: number) => {
    setDisciplinesEn((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const updates: Record<string, unknown> = {
        ...form,
        disciplines: disciplines.length > 0 ? disciplines : null,
        disciplines_en: disciplinesEn.length > 0 ? disciplinesEn : null,
        gallery_urls: galleryUrls.length > 0 ? galleryUrls : null,
      };

      if (imageFile) {
        updates.image_url = await uploadImage(imageFile, 'projects');
      }
      if (logoFile) {
        updates.client_logo_url = await uploadImage(logoFile, 'logos');
      }
      if (showcaseFile) {
        updates.showcase_image_url = await uploadImage(showcaseFile, 'projects/showcase');
      }
      if (splitFile) {
        updates.split_image_url = await uploadImage(splitFile, 'projects/split');
      }

      const { error } = await supabase
        .from('projects')
        .update(updates)
        .eq('id', id);

      if (error) throw error;
      router.push('/admin/projects');
    } catch (err) {
      alert('Error al guardar: ' + (err as Error).message);
      setSaving(false);
    }
  };

  if (loading) return <div className="admin-loading">Cargando proyecto...</div>;

  return (
    <div>
      <div className="admin-page-header">
        <h1 className="admin-page-title">Editar Proyecto</h1>
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

        {/* ========== CONTENIDO DE LA PÁGINA ========== */}
        <div className="admin-section-divider">
          <h3 className="admin-section-title">Contenido de la Página — ES</h3>

          {/* a) Imagen Showcase */}
          <div className="admin-form-group">
            <label className="admin-form-label">Imagen Showcase (grande debajo del hero)</label>
            <div className="admin-upload-area">
              <input type="file" accept="image/*" onChange={handleShowcaseChange} />
              {showcasePreview ? (
                <div className="admin-image-preview">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={showcasePreview} alt="Showcase preview" />
                </div>
              ) : (
                <p className="admin-upload-text">Haz clic o arrastra la imagen showcase</p>
              )}
            </div>
          </div>

          {/* b) Desafío, Solución, Resultado */}
          <div className="admin-form-group">
            <label className="admin-form-label">El desafío</label>
            <textarea
              value={form.challenge}
              onChange={(e) => setForm((prev) => ({ ...prev, challenge: e.target.value }))}
              className="admin-textarea"
              rows={4}
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">La solución</label>
            <textarea
              value={form.solution}
              onChange={(e) => setForm((prev) => ({ ...prev, solution: e.target.value }))}
              className="admin-textarea"
              rows={4}
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">El resultado</label>
            <textarea
              value={form.result}
              onChange={(e) => setForm((prev) => ({ ...prev, result: e.target.value }))}
              className="admin-textarea"
              rows={4}
            />
          </div>

          {/* c) Imagen lateral */}
          <div className="admin-form-group">
            <label className="admin-form-label">Imagen lateral (junto al texto desafío/solución/resultado)</label>
            <div className="admin-upload-area">
              <input type="file" accept="image/*" onChange={handleSplitChange} />
              {splitPreview ? (
                <div className="admin-image-preview">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={splitPreview} alt="Split preview" />
                </div>
              ) : (
                <p className="admin-upload-text">Haz clic o arrastra la imagen lateral</p>
              )}
            </div>
          </div>

          {/* d) Disciplinas aplicadas */}
          <div className="admin-form-group">
            <label className="admin-form-label">Disciplinas aplicadas</label>
            {disciplines.map((disc, index) => (
              <div key={index} className="admin-discipline-item">
                <button
                  type="button"
                  className="admin-discipline-remove"
                  onClick={() => removeDiscipline(index)}
                >
                  ✕
                </button>
                <div style={{ marginBottom: 8 }}>
                  <input
                    type="text"
                    placeholder="Título de la disciplina"
                    value={disc.title}
                    onChange={(e) => updateDiscipline(index, 'title', e.target.value)}
                    className="admin-form-input"
                  />
                </div>
                <textarea
                  placeholder="Descripción"
                  value={disc.description}
                  onChange={(e) => updateDiscipline(index, 'description', e.target.value)}
                  className="admin-textarea"
                  rows={2}
                />
              </div>
            ))}
            {disciplines.length < 6 && (
              <button type="button" onClick={addDiscipline} className="admin-btn admin-btn-secondary admin-btn-sm">
                + Añadir disciplina
              </button>
            )}
          </div>

          {/* e) Galería de imágenes */}
          <div className="admin-form-group">
            <label className="admin-form-label">Galería de imágenes</label>
            <div className="admin-upload-area">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleGalleryUpload}
                disabled={galleryUploading}
              />
              <p className="admin-upload-text">
                {galleryUploading ? 'Subiendo imágenes...' : 'Haz clic o arrastra imágenes para la galería'}
              </p>
            </div>
            {galleryUrls.length > 0 && (
              <div className="admin-gallery-grid">
                {galleryUrls.map((url, index) => (
                  <div key={index} className="admin-gallery-item">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={url} alt={`Galería ${index + 1}`} />
                    <button
                      type="button"
                      className="admin-gallery-remove"
                      onClick={() => removeGalleryImage(index)}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ========== CONTENIDO EN INGLÉS ========== */}
        <div className="admin-section-divider">
          <h3 className="admin-section-title">Contenido de la Página — EN</h3>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-form-label">Title (EN)</label>
              <input
                type="text"
                value={form.title_en}
                onChange={(e) => setForm((prev) => ({ ...prev, title_en: e.target.value }))}
                className="admin-form-input"
                placeholder="English project title..."
              />
            </div>
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Description (EN)</label>
            <textarea
              value={form.description_en}
              onChange={(e) => setForm((prev) => ({ ...prev, description_en: e.target.value }))}
              className="admin-textarea"
              rows={3}
              placeholder="English meta description..."
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">The challenge (EN)</label>
            <textarea
              value={form.challenge_en}
              onChange={(e) => setForm((prev) => ({ ...prev, challenge_en: e.target.value }))}
              className="admin-textarea"
              rows={4}
              placeholder="English version of the challenge..."
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">The solution (EN)</label>
            <textarea
              value={form.solution_en}
              onChange={(e) => setForm((prev) => ({ ...prev, solution_en: e.target.value }))}
              className="admin-textarea"
              rows={4}
              placeholder="English version of the solution..."
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">The result (EN)</label>
            <textarea
              value={form.result_en}
              onChange={(e) => setForm((prev) => ({ ...prev, result_en: e.target.value }))}
              className="admin-textarea"
              rows={4}
              placeholder="English version of the result..."
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Disciplines (EN)</label>
            {disciplinesEn.map((disc, index) => (
              <div key={index} className="admin-discipline-item">
                <button
                  type="button"
                  className="admin-discipline-remove"
                  onClick={() => removeDisciplineEn(index)}
                >
                  ✕
                </button>
                <div style={{ marginBottom: 8 }}>
                  <input
                    type="text"
                    placeholder="Discipline title (EN)"
                    value={disc.title}
                    onChange={(e) => updateDisciplineEn(index, 'title', e.target.value)}
                    className="admin-form-input"
                  />
                </div>
                <textarea
                  placeholder="Description (EN)"
                  value={disc.description}
                  onChange={(e) => updateDisciplineEn(index, 'description', e.target.value)}
                  className="admin-textarea"
                  rows={2}
                />
              </div>
            ))}
            {disciplinesEn.length < 6 && (
              <button type="button" onClick={addDisciplineEn} className="admin-btn admin-btn-secondary admin-btn-sm">
                + Add discipline (EN)
              </button>
            )}
          </div>
        </div>
        {/* ========== FIN CONTENIDO EN INGLÉS ========== */}

        {/* ========== FIN CONTENIDO DE LA PÁGINA ========== */}

        <div className="admin-form-row">
          <div className="admin-form-group">
            <label className="admin-form-label">Orden</label>
            <input
              type="number"
              value={form.sort_order}
              onChange={(e) => setForm((prev) => ({ ...prev, sort_order: Number(e.target.value) }))}
              className="admin-form-input"
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">&nbsp;</label>
            <div className="admin-form-checkbox">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => setForm((prev) => ({ ...prev, published: e.target.checked }))}
              />
              <span>Publicado</span>
            </div>
          </div>
        </div>

        <div className="admin-form-group">
          <label className="admin-form-label">Imagen principal</label>
          <div className="admin-upload-area">
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {imagePreview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={imagePreview} alt="Preview" className="admin-upload-preview" />
            ) : (
              <p className="admin-upload-text">Haz clic o arrastra una imagen</p>
            )}
          </div>
        </div>

        <div className="admin-form-group">
          <label className="admin-form-label">URL del Video (MP4)</label>
          <input
            type="text"
            value={form.video_url}
            onChange={(e) => setForm((prev) => ({ ...prev, video_url: e.target.value }))}
            className="admin-form-input"
            placeholder="/ruta/al/video.mp4 o URL completa"
          />
        </div>

        <div className="admin-form-group">
          <label className="admin-form-label">Logo del cliente</label>
          <div className="admin-upload-area">
            <input type="file" accept="image/*" onChange={handleLogoChange} />
            {logoPreview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={logoPreview} alt="Preview" className="admin-upload-preview" />
            ) : (
              <p className="admin-upload-text">Haz clic o arrastra el logo</p>
            )}
          </div>
        </div>

        <div className="admin-form-actions">
          <button type="submit" disabled={saving} className="admin-btn admin-btn-primary">
            {saving ? 'Guardando...' : 'Guardar cambios'}
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
