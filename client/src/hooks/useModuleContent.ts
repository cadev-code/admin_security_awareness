import { fetcher } from '@/api/queryHelpers';
import { ContentsResponse } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useModuleContent = (type: string, idModule: string) => {
  return useQuery<
    ContentsResponse,
    AxiosError & { response: { data: { error: string; message: string } } }
  >({
    queryKey: ['module-content', idModule],
    queryFn: () => {
      const endpoint =
        type === 'VIDEO' ? '/videos' : type === 'AUDIO' ? '/audios' : '/images';

      return fetcher<ContentsResponse>(`${endpoint}?idModule=${idModule}`);
    },
    retry: 2, // Reintenta 2 veces en caso de fallo
    retryDelay: 1000, // Espera 1 segundo entre reintentos
    staleTime: 1000 * 60, // 1 minuto en cache
  });
};
