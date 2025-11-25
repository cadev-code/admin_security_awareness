import { Navigate, Route, Routes } from 'react-router';
import { Management, Login } from '@/pages';
import { PublicRoute } from './PublicRoute';
import { ProtectedRoute } from './ProtectedRoute';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="login" element={<Login />} />

        <Route index element={<Navigate to="/login" replace />} />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="management" element={<Management />} />

        <Route index element={<Navigate to="/management" replace />} />

        <Route path="*" element={<Navigate to="/management" replace />} />
      </Route>
    </Routes>
  );
};
