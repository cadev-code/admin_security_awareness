import { Layout } from '@/components';
import { useCurrentUser } from '@/hooks';
import { Loader2 } from 'lucide-react';
import { Navigate, Outlet } from 'react-router';

export const ProtectedRoute = () => {
  const { data: user, isLoading, isError } = useCurrentUser();

  if (isLoading) {
    return (
      <div className="w-[100vw] h-[100vh] flex items-center justify-center text-gray-600">
        <Loader2 className="h-12 w-12 animate-spin" />
      </div>
    );
  }

  if (isError || !user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};
