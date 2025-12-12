import { poster } from '@/api/queryHelpers';
import { useAlertStore } from '@/store';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

type AddContentPayload = {
  idModule: number;
  title: string;
  file: File | null;
  availability: string;
  examUrl: string;
  cover: File | null;
};

export const useAddContent = (
  idModule: number,
  typeModule: string,
  closeForm: () => void,
) => {
  const { showAlert } = useAlertStore();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: AddContentPayload) => {
      const endpoint =
        typeModule === 'VIDEO'
          ? '/videos'
          : typeModule === 'AUDIO'
            ? '/audios'
            : '/images';

      const formData = new FormData();
      formData.append('idModule', data.idModule.toString());
      formData.append('title', data.title);
      formData.append('availability', data.availability);
      formData.append('examUrl', data.examUrl);

      if (data.file) {
        formData.append('file', data.file);
      }

      if (data.cover) {
        formData.append('cover', data.cover);
      }

      return poster(endpoint, formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['module-content', idModule] });
      showAlert('Contenido agregado con éxito', 'success');
      closeForm();
    },
    onError: (error: AxiosError<{ message: string; error: string }>) => {
      showAlert(error.response?.data.message || 'Ocurrió un error', 'error');
    },
  });
};
