import { GlobalAlert } from './components';
import { AppRoutes } from './routes';

export const App = () => {
  return (
    <>
      <AppRoutes />
      <GlobalAlert />
    </>
  );
};
