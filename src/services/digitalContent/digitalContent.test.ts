import {
  getCategoriesByGuide,
  getDigitalContent,
  postDigitalContent,
  putDigitalContent,
  getDigitalContentById,
} from '@services/digitalContent';

import api from '@services/api';

jest.mock('@services/guides');
jest.mock('@services/api');

const apiMock = api as jest.Mocked<typeof api>;

describe('Testando o serviço "getGuides"', () => {
  beforeEach(() => {
    apiMock.get.mockClear();
  });

  it(`${getDigitalContent.name}: Devolvendo conteúdo "getDigitalContent"`, async () => {
    apiMock.get.mockResolvedValue([]);
    const result = await getDigitalContent();
    expect(apiMock.get).toBeCalledTimes(1);
    expect(result).toStrictEqual([]);
  });

  it(`${getDigitalContent.name}: Tratamento de erro quando o serviço não estiver disponível`, async () => {
    const errorMessage = 'Serviço não disponível';
    const throwError = new Error(errorMessage);
    apiMock.get.mockImplementation(() => {
      throw throwError;
    });
    try {
      await getDigitalContent();
    } catch {}
    expect(apiMock.get).toBeCalledTimes(1);
    expect(apiMock.get).toThrow(Error);
    expect(apiMock.get).toThrow(errorMessage);
  });
});

describe('Testando o serviço "postGuides"', () => {
  beforeEach(() => {
    apiMock.post.mockClear();
  });

  it(`Quando ${postDigitalContent.name} é chamado, o resultado deve retornar true`, async () => {
    const digitalContentBody = {
      title: 'title-teste',
      shortDescription: 'shortDescription-teste',
      guide: '1',
      category: '2',
    } as { [key: string]: any };

    const fileTest = new File([''], 'fileTest', { type: '/img' });
    const formDataTest = new FormData();

    Object.keys(digitalContentBody).forEach((key) => {
      formDataTest.append(key, digitalContentBody[key]);
    });
    formDataTest.append('files', fileTest);

    const pathExpect = '/digital-contents/';
    const resultExpect = true;
    apiMock.post.mockResolvedValue(resultExpect);
    const result = await postDigitalContent(formDataTest);
    expect(result).toBe(resultExpect);
    expect(apiMock.post).toBeCalledWith(pathExpect, formDataTest, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  });

  it(`${postDigitalContent.name}: Tratamento de erro quando o serviço não estiver disponível`, async () => {
    const digitalContentBody = {
      title: 'title-teste',
      shortDescription: 'shortDescription-teste',
      guide: '1',
      category: '2',
    } as { [key: string]: any };

    const fileTest = new File([''], 'fileTest', { type: '/img' });
    const formDataTest = new FormData();

    Object.keys(digitalContentBody).forEach((key) => {
      formDataTest.append(key, digitalContentBody[key]);
    });
    formDataTest.append('files', fileTest);

    const errorMessage = 'Serviço não disponível';
    const throwError = new Error(errorMessage);
    apiMock.post.mockImplementation(() => {
      throw throwError;
    });
    try {
      await postDigitalContent(formDataTest);
    } catch {}
    expect(apiMock.post).toBeCalledTimes(1);
    expect(apiMock.post).toThrow(Error);
    expect(apiMock.post).toThrow(errorMessage);
  });
});

describe('Testando o serviço "getCategoriesByGuide"', () => {
  beforeEach(() => {
    apiMock.get.mockClear();
  });

  it(`${getCategoriesByGuide.name}: Devolvendo conteúdo "getCategoriesByGuide"`, async () => {
    const id = '1';
    apiMock.get.mockResolvedValue([]);
    const result = await getCategoriesByGuide(id);
    expect(apiMock.get).toBeCalledTimes(1);
    expect(result).toStrictEqual([]);
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

describe('Testando o serviço "getDigitalContentById"', () => {
  beforeEach(() => {
    apiMock.get.mockClear();
  });

  it(`${getDigitalContentById.name}: Devolvendo conteúdo "getDigitalContentById"`, async () => {
    const id = '1';
    apiMock.get.mockResolvedValue([]);
    const result = await getDigitalContentById(id);
    expect(apiMock.get).toBeCalledTimes(1);
    expect(result).toStrictEqual([]);
  });

  it(`${getDigitalContentById.name}: Tratamento de erro quando o serviço não estiver disponível`, async () => {
    const id = '1';
    const errorMessage = 'Serviço não disponível';
    const throwError = new Error(errorMessage);
    apiMock.get.mockImplementation(() => {
      throw throwError;
    });
    try {
      await getDigitalContentById(id);
    } catch {}
    expect(apiMock.get).toBeCalledTimes(1);
    expect(apiMock.get).toThrow(Error);
    expect(apiMock.get).toThrow(errorMessage);
  });
});

describe('Testando o serviço "putDigitalContent"', () => {
  beforeEach(() => {
    apiMock.put.mockClear();
  });

  it(`Quando ${putDigitalContent.name} é chamado, o resultado deve retornar true
  `, async () => {
    const id = '1';
    const digitalContentBody = {
      title: 'title-teste',
      shortDescription: 'shortDescription-teste',
      guide: '1',
      category: '2',
    } as { [key: string]: any };

    const fileTest = new File([''], 'fileTest', { type: '/img' });
    const formDataTest = new FormData();

    Object.keys(digitalContentBody).forEach((key) => {
      formDataTest.append(key, digitalContentBody[key]);
    });
    formDataTest.append('files', fileTest);

    const pathExpect = `/digital-contents/${id}`;
    const resultExpect = true;

    apiMock.put.mockResolvedValue(resultExpect);
    const result = await putDigitalContent(id, formDataTest);
    expect(result).toBe(resultExpect);
    expect(apiMock.put).toBeCalledWith(pathExpect, formDataTest, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  });

  it(`${putDigitalContent.name}: Tratamento de erro quando o serviço não estiver disponível`, async () => {
    const id = '1';
    const digitalContentBody = {
      title: 'title-teste',
      shortDescription: 'shortDescription-teste',
      guide: '1',
      category: '2',
    } as { [key: string]: any };

    const fileTest = new File([''], 'fileTest', { type: '/img' });
    const formDataTest = new FormData();

    Object.keys(digitalContentBody).forEach((key) => {
      formDataTest.append(key, digitalContentBody[key]);
    });
    formDataTest.append('files', fileTest);

    const errorMessage = 'Serviço não disponível';
    const throwError = new Error(errorMessage);
    apiMock.put.mockImplementation(() => {
      throw throwError;
    });
    try {
      await putDigitalContent(id, formDataTest);
    } catch {}
    expect(apiMock.put).toBeCalledTimes(1);
    expect(apiMock.put).toThrow(Error);
    expect(apiMock.put).toThrow(errorMessage);
  });
});


