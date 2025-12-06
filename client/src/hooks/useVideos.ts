import { fetcher } from '@/api/queryHelpers';
import { Module } from '@/types';
import { useQuery } from '@tanstack/react-query';

export const useVideos = (idModule: string) => {
  return useQuery({
    queryKey: ['videos', idModule],
    queryFn: () => fetcher<Module[]>(`/videos?idModule=${idModule}`),
  });
};
