import { IuserExpression } from '@interfaces/IuserExpression';
import api, { handleAxiosError } from '@services/api';

export interface ExpressionInterface {
  _id: string;
  expression: string;
  favorite: boolean;
}

export const getUsersExpressions = async (token: string) => {
  try {
    return api.get<{ data: ExpressionInterface[] }>(
      `/usersExpressions/`,
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

export const favoriteUserExpression = async (token: string, id: string) => {
  try {
    return api.patch<{ data: ExpressionInterface }>(
      `/usersExpressions/favorite/${id}`,
      [],
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

export const deleteUserExpression = async (token: string, id: string) => {
  try {
    return api.delete<{ data: ExpressionInterface }>(
      `/usersExpressions/${id}`,
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