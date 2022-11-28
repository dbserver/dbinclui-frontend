import {
  getCategories,
  getCategoriesByGuide,
  postCategories,
  getCategoriesById,
  putCategories,
  deleteCategory,
} from '@services/categories';

import api from '@services/api';

jest.mock('@services/api');
jest.mock('@services/guides');

const apiMock = api as jest.Mocked<typeof api>;
describe('Testando o serviço "getCategories"', () => {
  beforeEach(() => {
    apiMock.get.mockClear();
  });

  it(`${getCategories.name}: Devolvendo conteúdo "getCategories"`, async () => {
    apiMock.get.mockResolvedValue([]);
    const result = await getCategories();
    expect(apiMock.get).toBeCalledTimes(1);
    expect(result).toStrictEqual([]);
  });

  it(`${getCategories.name}: Tratamento de erro quando o serviço não estiver disponível`, async () => {
    const errorMessage = 'Serviço não disponível';
    const throwError = new Error(errorMessage);
    apiMock.get.mockImplementation(() => {
      throw throwError;
    });
    try {
      await getCategories();
    } catch {}
    expect(apiMock.get).toBeCalledTimes(1);
    expect(apiMock.get).toThrow(Error);
    expect(apiMock.get).toThrow(errorMessage);
  });
});

describe('Testando o serviço "getCategoriesByGuide', () => {
  beforeEach(() => {
    apiMock.get.mockClear();
  });

  it(`${getCategoriesByGuide.name}: Devolvendo conteúdo getCategoriesByGuide`, async () => {
    const id = '1';
    apiMock.get.mockResolvedValue([]);
    const Expect = `/categories/guide/${id}`;
    const result = await getCategoriesByGuide(id);

    expect(result).toStrictEqual([]);
    expect(apiMock.get).toBeCalledWith(Expect);
  });

  it(`${getCategoriesByGuide.name}: Tratamento de erro quando o serviço não estiver disponível`, async () => {
    const id = '1';
    const errorMessage = 'Serviço não disponível';
    const throwError = new Error(errorMessage);
    apiMock.get.mockImplementation(() => {
      throw throwError;
    });
    try {
      await getCategoriesByGuide(id);
    } catch {}
    expect(apiMock.get).toBeCalledTimes(1);
    expect(apiMock.get).toThrow(Error);
    expect(apiMock.get).toThrow(errorMessage);
  });
});

describe('Testando o serviço "postCategories"', () => {
  beforeEach(() => {
    apiMock.post.mockClear();
  });

  it(`Quando ${postCategories.name} é chamado, o resultado deve retornar true
    `, async () => {
    const postCategoryBody = {
      title: 'title-teste',
      shortDescription: 'shortDescription-teste',
      guide: '1',
    };
    const pathExpect = '/categories/';
    const resultExpect = true;
    apiMock.post.mockResolvedValue(resultExpect);
    const result = await postCategories(postCategoryBody);
    expect(result).toBe(resultExpect);
    expect(apiMock.post).toBeCalledWith(pathExpect, postCategoryBody);
  });

  it(`${postCategories.name}: Tratamento de erro quando o serviço não estiver disponível`, async () => {
    const postCategoryBody = {
      title: 'title-teste',
      shortDescription: 'shortDescription-teste',
      guide: '1',
    };
    const errorMessage = 'Serviço não disponível';
    const throwError = new Error(errorMessage);
    apiMock.post.mockImplementation(() => {
      throw throwError;
    });
    try {
      await postCategories(postCategoryBody);
    } catch {}
    expect(apiMock.post).toBeCalledTimes(1);
    expect(apiMock.post).toThrow(Error);
    expect(apiMock.post).toThrow(errorMessage);
  });
});

describe('Testando o serviço "getCategoriesById"', () => {
  beforeEach(() => {
    apiMock.get.mockClear();
  });

  it(`${getCategoriesById.name}: Devolvendo conteúdo "getCategoriesById"`, async () => {
    const id = '1';
    const pathExpected = `categories/${id}`;
    apiMock.get.mockResolvedValue([]);

    const result = await getCategoriesById(id);

    expect(apiMock.get).toBeCalledTimes(1);
    expect(apiMock.get).toBeCalledWith(pathExpected);
    expect(result).toStrictEqual([]);
  });

  it(`${getCategoriesById.name}: Tratamento de erro quando o serviço não estiver disponível`, async () => {
    const id = '1';
    const pathExpected = `categories/${id}`;
    const errorMessage = 'Serviço não disponível';
    const throwError = new Error(errorMessage);
    apiMock.get.mockImplementation(() => {
      throw throwError;
    });

    try {
      await getCategoriesById(id);
    } catch {}
    expect(apiMock.get).toBeCalledTimes(1);
    expect(apiMock.get).toBeCalledWith(pathExpected);
    expect(apiMock.get).toThrow(Error);
    expect(apiMock.get).toThrow(errorMessage);
  });
});

describe('Testando o serviço "putCategories"', () => {
  beforeEach(() => {
    apiMock.put.mockClear();
  });

  it(`Quando ${putCategories.name} é chamado, o resultado deve retornar true
  `, async () => {
    const id = '1';
    const putCategoryBody = {
      title: 'title-teste',
      shortDescription: 'shortDescription-teste',
      guide: '1',
    };

    const pathExpect = `/categories/${id}`;
    const resultExpect = true;
    apiMock.put.mockResolvedValue(resultExpect);

    const result = await putCategories(id, putCategoryBody);
    expect(result).toBe(resultExpect);
    expect(apiMock.put).toBeCalledWith(pathExpect, putCategoryBody);
  });

  it(`${putCategories.name}: Tratamento de erro quando o serviço não estiver disponível`, async () => {
    const id = '1';
    const putCategoryBody = {
      title: 'title-teste',
      shortDescription: 'shortDescription-teste',
      guide: '1',
    };

    const pathExpect = `/categories/${id}`;
    const errorMessage = 'Serviço não disponível';
    const throwError = new Error(errorMessage);
    apiMock.put.mockImplementation(() => {
      throw throwError;
    });

    try {
      await putCategories(id, putCategoryBody);
    } catch {}
    expect(apiMock.put).toBeCalledTimes(1);
    expect(apiMock.put).toThrow(Error);
    expect(apiMock.put).toThrow(errorMessage);
    expect(apiMock.put).toBeCalledWith(pathExpect, putCategoryBody);
  });
});

describe('Testando o serviço "deleteCategory"', () => {
  beforeEach(() => {
    apiMock.delete.mockClear();
  });

  it(`${deleteCategory.name}: Devolvendo conteúdo "deleteCategory"`, async () => {
    const id = '1';
    apiMock.delete.mockResolvedValue([]);
    const result = await deleteCategory(id);
    expect(apiMock.delete).toBeCalledTimes(1);
    expect(result).toStrictEqual([]);
  });

  it(`${deleteCategory.name}: Tratamento de erro quando o serviço não estiver disponível`, async () => {
    const id = '1';
    const errorMessage = 'Serviço não disponível';
    const throwError = new Error(errorMessage);
    apiMock.delete.mockImplementation(() => {
      throw throwError;
    });
    try {
      await deleteCategory(id);
    } catch {}
    expect(apiMock.delete).toBeCalledTimes(1);
    expect(apiMock.delete).toThrow(Error);
    expect(apiMock.delete).toThrow(errorMessage);
  });
});
