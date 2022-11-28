import api, { handleAxiosError } from '../api';
import { DigitalContentInterface } from '@services/digitalContent';
import { CategoryContent } from '@services/categories';

export interface GuideInterface {
  _id?: string;
  title: string;
  content: string;
  filePaths:  {
    filePath: string;
    publicId: string;
  };
}

export interface GuideContent extends GuideInterface {
  categories: CategoryContent[];
  digitalContents: DigitalContentInterface[];
}

export const getGuides = async () => {
  try {
    return api.get<{ data: GuideInterface[] }>(`/guides/`);
  } catch (error) {
    throw handleAxiosError(error);
  }
};

export const postGuides = async (cardBody: FormData) => {
  try {
    return api.post<{ data: GuideInterface }>('/guides/', 
      cardBody,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
  } catch (error) {
    throw handleAxiosError(error);
  }
};

export const putGuides = async (id: string, cardBody: FormData) => {
  try {
    return api.put(`/guides/${id}`,
      cardBody,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
  } catch {
    throw new Error('Serviço não disponível');
  }
};

export const getGuideById = async (id: string) => {
  try {
    return api.get<{ data: GuideInterface }>(`guides/${id}`);
  } catch {
    throw new Error('Serviço não disponível');
  }
};

export const getGuideWithCategoriesAndContent = async (id: string) => {
  try {
    return api.get<{ data: GuideContent }>(`guides/categoriesAndContent/${id}`);
  } catch (error) {
    throw handleAxiosError(error);
  }
};

export const deleteGuide = async (id: string) => {
  try {
    return api.delete<{ data: GuideContent }>(`guides/${id}`);
  } catch (error) {
    throw handleAxiosError(error);
  }
};
