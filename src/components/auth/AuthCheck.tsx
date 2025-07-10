'use client';

import { useEffect, useState } from 'react';
import { authService } from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function AuthCheck({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem('allycare_token');
    setToken(storedToken);

    if (!storedToken) {
      router.push('/login');
      setLoading(false);
      return;
    }

    authService.getProfile()
      .then(response => {
        setUser(response.user);
        setLoading(false);
      })
      .catch(() => {
        localStorage.removeItem('allycare_token');
        setToken(null);
        router.push('/login');
        setLoading(false);
      });
  }, [router]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!token) {
    return <div className="min-h-screen flex items-center justify-center">Redirecting to login...</div>;
  }

  return <>{children}</>;
}
