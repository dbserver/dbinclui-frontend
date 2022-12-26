import api, { handleAxiosError } from '@services/api';

export const validateUserExists = async (token: string) => {
  try {
    return api.get<Boolean>('/users/verify', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw handleAxiosError(error);
  }
};

export const createUser = async (token: string) => {
  try {
    return api.post('/users/', null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw handleAxiosError(error);
  }
};
