import { poster } from '@/api/queryHelpers';
import { useAlertStore } from '@/store';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

type CreateModulePayload = {
  title: string;
  type: string;
  url: string;
  bgColor: string;
  bgImage: File | null;
  logo: File | null;
};

export const useCreateModule = (closeForm: () => void) => {
  const { showAlert } = useAlertStore();

  return useMutation({
    mutationFn: async (data: CreateModulePayload) => {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('type', data.type);
      formData.append('url', data.url);
      formData.append('bgColor', data.bgColor);

      if (data.bgImage) {
        formData.append('bgImage', data.bgImage);
      }

      if (data.logo) {
        formData.append('logo', data.logo);
      }

      return poster('/modules', formData);
    },
    onSuccess: () => {
      // TODO: agregar invalidateQueries de módulos
      showAlert('Modulo creado con éxito', 'success');
      closeForm();
    },
    onError: (error: AxiosError<{ message: string; error: string }>) => {
      showAlert(error.response?.data.message || 'Ocurrió un error', 'error');
    },
  });
};
