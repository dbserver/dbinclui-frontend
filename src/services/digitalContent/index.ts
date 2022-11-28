import api, { handleAxiosError } from '@services/api';

import  {GuideInterface, GuideContent } from '@services/guides';
import { CategoryContent } from '@services/categories';

export interface CardCategoryResponse {
  _id?: string;
  title: string;
  shortDescription: string;
  guide: GuideInterface;
  parentCategory?: CardCategoryResponse;
}

export interface DigitalContentInterface {
  _id?: string;
  guide: GuideContent;
  category?: CategoryContent;
  title: string;
  shortDescription: string;
  filePaths:  {
    filePath: string;
    publicId: string;
  }[];
}

export const getCategoriesByGuide = async (id: string) => {
  try {
    return api.get<{ data: CardCategoryResponse[] }>(`/categories/guide/${id}`);
  } catch {
    throw new Error('Serviço não disponível');
  }
};

export const getDigitalContent = async () => {
  try {
    return api.get<{ data: DigitalContentInterface[] }>(
      `/digital-contents/`,
    );
  } catch {
    throw new Error('Serviço não disponível');
  }
};

export const getDigitalContentById = async (id: string) => {
  try {
    return api.get< { data: DigitalContentInterface }> (`/digital-contents/${id}`);
  } catch {
    throw new Error('Serviço não disponível');
  }
};

export const postDigitalContent = async (cardBody: FormData) => {
  try {
    return api.post<{ data: DigitalContentInterface[] }>(
      `/digital-contents/`,
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

export const putDigitalContent  = async (id: string, cardBody: FormData) => {
  try {
    return api.put<{ data: DigitalContentInterface[] }>(
      `/digital-contents/${id}`,
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

export const deleteDigitalContent = async (_id: string) => {
  try {
    return api.delete<{ data: DigitalContentInterface }>(`digital-contents/${_id}`);
  } catch(error){
    throw handleAxiosError(error);
  }
}

