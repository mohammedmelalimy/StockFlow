import { useMutation } from '@tanstack/react-query';
import { registerUser } from '../api/auth.api';

// Manage the registration request lifecycle
export const useRegister = () => {
  return useMutation({
    mutationFn: registerUser,
    retry: false
  });
};
