import api, { handleAxiosError } from '../api';
import { GuideInterface } from '@services/guides';
import { DigitalContentInterface } from '@services/digitalContent';

export interface CategoryInterface {
  _id?: string;
  title: string;
  shortDescription: string;
  guide: GuideInterface | GuideInterface['_id'];
}

export interface CategoryContent extends CategoryInterface {
  digitalContents: DigitalContentInterface[];
}

export const getCategories = async () => {
  try {
    return api.get<{ data: CategoryInterface[] }>(`/categories/`);
  } catch (error) {
    throw handleAxiosError(error);
  }
};

export const getCategoriesByGuide = async (id: string) => {
  try {
    return api.get<{ data: CategoryInterface[] }>(`/categories/guide/${id}`);
  } catch (error) {
    throw handleAxiosError(error);
  }
};

export const getCategoriesById = async (id: string) => {
  try {
    return api.get<{ data: CategoryInterface }>(`categories/${id}`);
  } catch {
    throw new Error('Serviço não disponível');
  }
};

export const postCategories = async (
  cardBody: CategoryInterface,
  token: string
) => {
  try {
    return api.post('/categories/', cardBody, {
      headers: {
        'Authorization' : `Bearer ${token}` 
      }
    });
  } catch (error) {
    throw handleAxiosError(error);
  }
};

export const deleteCategory = async (id: string, token: string) => {
  try {
    return api.delete<{ data: CategoryInterface }>(`categories/${id}`, {
      headers: {
        'Authorization' : `Bearer ${token}` 
      }
    });
  } catch (error) {
    throw handleAxiosError(error);
  }
};
export const putCategories = async (
  id: string,
  cardBody: CategoryInterface,
  token: string
) => {
  try {
    return api.put(`/categories/${id}`, cardBody, {
      headers: {
        'Authorization' : `Bearer ${token}` 
      }
    });
  } catch {
    throw new Error('Serviço não disponível');
  }
};

export const patchCategories = async (
  id: string, token: string
) => {
  try {
    return api.patch(`/categories/delete/${id}`, null, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  } catch {
    throw new Error('Serviço não disponível');
  }  
};