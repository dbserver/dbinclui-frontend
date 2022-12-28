import { IuserExpression } from '@interfaces/IuserExpression';
import api, { handleAxiosError } from '@services/api';

export const postDbExpression = async (expression: string, token: string) => {
  try {
    return api.post<{ data: IuserExpression }>(
      `/dbExpressions/`,
      { expression },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  } catch (error) {
    throw handleAxiosError(error);
  }
};
