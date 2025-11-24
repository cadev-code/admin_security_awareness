import { Navigate, Route, Routes } from 'react-router';
import { Approved, Login } from '@/pages';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="approved" element={<Approved />} />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};
