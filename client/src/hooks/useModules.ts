import { fetcher } from '@/api/queryHelpers';
import { ModulesResponse } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useModules = () => {
  return useQuery<
    ModulesResponse,
    AxiosError & { response: { data: { error: string; message: string } } }
  >({
    queryKey: ['modules'],
    queryFn: () => fetcher<ModulesResponse>('/modules'),
    retry: 2, // Reintenta 2 veces en caso de fallo
    retryDelay: 1000, // Espera 1 segundo entre reintentos
    staleTime: 1000 * 60, // 1 minuto en cache
  });
};
