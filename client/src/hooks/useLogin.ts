import { poster } from '@/api/queryHelpers';
import { LoginBody, User } from '@/types/auth.types';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router';

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation<
    User,
    AxiosError<{ message: string; error: string }>,
    LoginBody
  >({
    mutationFn: (body: LoginBody) => poster<User>('/auth/login', body),
    onError: (error) => {
      console.error(error);
      // TODO: show alert error
    },
    onSuccess: () => {
      navigate('/approved');
    },
  });
};
