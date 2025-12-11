import { putter } from '@/api/queryHelpers';
import { useAlertStore } from '@/store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

type UpdateModulePayload = {
  title: string;
  url: string;
  bgColor: string;
};

export const useUpdateModule = (idModule: number, closeForm: () => void) => {
  const queryClient = useQueryClient();
  const { showAlert } = useAlertStore();

  return useMutation({
    mutationFn: (data: UpdateModulePayload) =>
      putter(`/modules/${idModule}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['modules'] });
      showAlert('Módulo actualizado con éxito', 'success');
      closeForm();
    },
    onError: (error: AxiosError<{ message: string; error: string }>) => {
      showAlert(error.response?.data.message || 'Ocurrió un error', 'error');
    },
  });
};
