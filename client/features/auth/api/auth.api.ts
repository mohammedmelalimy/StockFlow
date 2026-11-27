import api from '@/lib/axios';

import type { RegisterRequest, RegisterResponse } from '../types/auth.types';

// Send registration data to the backend
export const registerUser = async (data: RegisterRequest): Promise<RegisterResponse> => {
  const response = await api.post<RegisterResponse>('/auth/register', data);

  return response.data;
};
