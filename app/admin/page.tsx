'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/admin/projects');
  }, [router]);

  return (
    <div className="admin-loading">Redirigiendo...</div>
  );
}
