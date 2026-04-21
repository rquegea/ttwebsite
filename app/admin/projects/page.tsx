'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import type { Project } from '@/lib/supabase/types';

export default function AdminProjectsPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('sort_order', { ascending: true });

    if (!error && data) setProjects(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const togglePublished = async (project: Project) => {
    const { error } = await supabase
      .from('projects')
      .update({ published: !project.published })
      .eq('id', project.id);

    if (!error) {
      setProjects((prev) =>
        prev.map((p) => (p.id === project.id ? { ...p, published: !p.published } : p))
      );
    }
  };

  const handleDelete = async (project: Project) => {
    if (!confirm(`¿Eliminar el proyecto "${project.title}"? Esta acción no se puede deshacer.`)) return;

    const { error } = await supabase.from('projects').delete().eq('id', project.id);
    if (!error) {
      setProjects((prev) => prev.filter((p) => p.id !== project.id));
    }
  };

  if (loading) return <div className="admin-loading">Cargando proyectos...</div>;

  return (
    <div>
      <div className="admin-page-header">
        <h1 className="admin-page-title">Proyectos</h1>
        <button
          onClick={() => router.push('/admin/projects/new')}
          className="admin-btn admin-btn-primary"
        >
          + Nuevo Proyecto
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="admin-empty">No hay proyectos todavía.</div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Cliente</th>
                <th>Título</th>
                <th>Publicado</th>
                <th>Orden</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id}>
                  <td>
                    {project.image_url ? (
                      <img src={project.image_url} alt="" className="admin-table-thumb" />
                    ) : (
                      <div className="admin-table-thumb" />
                    )}
                  </td>
                  <td>{project.client_name}</td>
                  <td>{project.title}</td>
                  <td>
                    <label className="admin-toggle">
                      <input
                        type="checkbox"
                        checked={project.published}
                        onChange={() => togglePublished(project)}
                      />
                      <span className="admin-toggle-slider" />
                    </label>
                  </td>
                  <td>{project.sort_order}</td>
                  <td>
                    <div className="admin-table-actions">
                      <button
                        onClick={() => router.push(`/admin/projects/${project.id}/edit`)}
                        className="admin-btn admin-btn-secondary admin-btn-sm"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(project)}
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
