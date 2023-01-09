import { IDBExpression } from '@interfaces/IDBExpression';
import { IuserExpression } from '@interfaces/IuserExpression';
import api, { handleAxiosError } from '@services/api';

export const getDbExpression = async () => {
  try {
    return api.get<{ data: IDBExpression[] }>(`/dbExpressions/`);
  } catch (error) {
    throw handleAxiosError(error);
  }
};

export const deleteExpression = async (id: string, token: string) => {
  try {
    return api.patch<{ data: IDBExpression }>(
      `dbExpressions/delete/${id}`,
      null,
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
export const favoriteExpression = async (id: string, token: string) => {
  try {
    return api.patch<{ data: IDBExpression }>(
      `dbExpressions/favorite/${id}`,
      null,
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
