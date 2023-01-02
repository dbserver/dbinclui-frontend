import { IuserExpression } from '@interfaces/IuserExpression';
import api, { handleAxiosError } from '@services/api';

export interface ExpressionInterface {
  _id?: string;
  expression: string;
}

export const getUsersExpressions = async () => {
  try {
    return api.get<{ data: ExpressionInterface[] }>(`/usersExpressions/`);
  } catch (error) {
    throw handleAxiosError(error);
  }
};

export const postUserExpression = async (expression: string, token: string) => {
  try {
    return api.post<{ data: IuserExpression }>(
      `/usersExpressions/`,
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