import {
  getGuides,
  postGuides,
  getGuideWithCategoriesAndContent,
  putGuides,
  getGuideById,
  deleteGuide,
} from '@services/guides';
import api from '@services/api';

jest.mock('@services/api');

const apiMock = api as jest.Mocked<typeof api>;

describe('Testando o serviço "getGuides"', () => {
  beforeEach(() => {
    apiMock.get.mockClear();
  });

  it(`${getGuides.name}: Devolvendo conteúdo "getGuides"`, async () => {
    apiMock.get.mockResolvedValue([]);
    const result = await getGuides();
    expect(apiMock.get).toBeCalledTimes(1);
    expect(result).toStrictEqual([]);
  });

  it(`${getGuides.name}: Tratamento de erro quando o serviço não estiver disponível`, async () => {
    const errorMessage = 'Serviço não disponível';
    const throwError = new Error(errorMessage);
    apiMock.get.mockImplementation(() => {
      throw throwError;
    });
    try {
      await getGuides();
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

  it(`Quando ${postGuides.name} é chamado, o resultado deve retornar true
  `, async () => {
    const guideBody = {
      title: 'Test title',
      content: 'Teste content',
    } as { [key: string]: any };

    const fileFake = new File([''], 'filetest', { type: '/img' });
    const formDataTest = new FormData();

    Object.keys(guideBody).forEach((key) => {
      formDataTest.append(key, guideBody[key]);
    });

    formDataTest.append('file', fileFake);

    const resultExpect = true;
    apiMock.post.mockResolvedValue(resultExpect);
    const result = await postGuides(formDataTest);
    expect(result).toBe(resultExpect);
  });

  it(`${postGuides.name}: Tratamento de erro quando o serviço não estiver disponível`, async () => {
    const guideBody = {
      title: 'Test title',
      content: 'Teste content',
    } as { [key: string]: any };

    const fileFake = new File([''], 'filetest', { type: '/img' });
    const formDataTest = new FormData();

    Object.keys(guideBody).forEach((key) => {
      formDataTest.append(key, guideBody[key]);
    });

    formDataTest.append('file', fileFake);

    const errorMessage = 'Serviço não disponível';
    const throwError = new Error(errorMessage);
    apiMock.post.mockImplementation(() => {
      throw throwError;
    });
    try {
      await postGuides(formDataTest);
    } catch {}
    expect(apiMock.post).toBeCalledTimes(1);
    expect(apiMock.post).toThrow(Error);
    expect(apiMock.post).toThrow(errorMessage);
  });
});

describe('Testando o serviço "putGuides"', () => {
  beforeEach(() => {
    apiMock.put.mockClear();
  });

  it(`Quando ${putGuides.name} é chamado, o resultado deve retornar true
  `, async () => {
    const id = '1';
    const guideBody = {
      title: 'Test title',
      content: 'Teste content',
    } as { [key: string]: any };

    const fileFake = new File([''], 'filetest', { type: '/img' });
    const formDataTest = new FormData();

    Object.keys(guideBody).forEach((key) => {
      formDataTest.append(key, guideBody[key]);
    });

    formDataTest.append('file', fileFake);

    const resultExpect = true;
    apiMock.put.mockResolvedValue(resultExpect);
    const result = await putGuides(id, formDataTest);
    expect(result).toBe(resultExpect);
  });

  it(`${putGuides.name}: Tratamento de erro quando o serviço não estiver disponível`, async () => {
    const id = '1';
    const guideBody = {
      title: 'Test title',
      content: 'Teste content',
    } as { [key: string]: any };

    const fileFake = new File([''], 'filetest', { type: '/img' });
    const formDataTest = new FormData();

    Object.keys(guideBody).forEach((key) => {
      formDataTest.append(key, guideBody[key]);
    });

    formDataTest.append('file', fileFake);

    const errorMessage = 'Serviço não disponível';
    const throwError = new Error(errorMessage);
    apiMock.put.mockImplementation(() => {
      throw throwError;
    });
    try {
      await putGuides(id, formDataTest);
    } catch {}
    expect(apiMock.put).toBeCalledTimes(1);
    expect(apiMock.put).toThrow(Error);
    expect(apiMock.put).toThrow(errorMessage);
  });
});

describe('Testando o serviço "getGuideWithCategoriesAndContent"', () => {
  beforeEach(() => {
    apiMock.get.mockClear();
  });

  it(`${getGuideWithCategoriesAndContent.name}: Devolvendo conteúdo "getGuideWithCategoriesAndContent"`, async () => {
    const id = '1';
    apiMock.get.mockResolvedValue([]);
    const result = await getGuideWithCategoriesAndContent(id);
    expect(apiMock.get).toBeCalledTimes(1);
    expect(result).toStrictEqual([]);
  });

  it(`${getGuideWithCategoriesAndContent.name}: Tratamento de erro quando o serviço não estiver disponível`, async () => {
    const id = '1';
    const errorMessage = 'Serviço não disponível';
    const throwError = new Error(errorMessage);
    apiMock.get.mockImplementation(() => {
      throw throwError;
    });
    try {
      await getGuideWithCategoriesAndContent(id);
    } catch {}
    expect(apiMock.get).toBeCalledTimes(1);
    expect(apiMock.get).toThrow(Error);
    expect(apiMock.get).toThrow(errorMessage);
  });
});

describe('Testando o serviço "getGuideById"', () => {
  beforeEach(() => {
    apiMock.get.mockClear();
  });

  it(`${getGuideById.name}: Devolvendo conteúdo getGuideById`, async () => {
    const id = '1';
    apiMock.get.mockResolvedValue([]);
    const result = await getGuideById(id);
    expect(apiMock.get).toBeCalledTimes(1);
    expect(result).toStrictEqual([]);
  });

  it(`${getGuideById.name}: Tratamento de erro quando o serviço não estiver disponível`, async () => {
    const id = '1';
    const errorMessage = 'Serviço não disponível';
    const throwError = new Error(errorMessage);
    apiMock.get.mockImplementation(() => {
      throw throwError;
    });
    try {
      await getGuideById(id);
    } catch {}
    expect(apiMock.get).toBeCalledTimes(1);
    expect(apiMock.get).toThrow(Error);
    expect(apiMock.get).toThrow(errorMessage);
  });
});

describe('Testando o serviço "deleteGuide', () => {
  beforeEach(() => {
    apiMock.delete.mockClear();
  });

  it(`Quando ${deleteGuide.name} é chamado, o retorno deve ser true`, async () => {
    const id = '1';
    const resultExpect = true;
    const pathExpect = `guides/${id}`;
    apiMock.delete.mockResolvedValue(resultExpect);

    const result = await deleteGuide(id);

    expect(result).toStrictEqual(resultExpect);
    expect(apiMock.delete).toBeCalledWith(pathExpect);
  });

  it(`${deleteGuide.name}: Tratamento de erro quando o serviço não estiver disponível`, async () => {
    const id = '1';
    const errorMessage = 'Serviço não disponível';
    const throwError = new Error(errorMessage);
    apiMock.delete.mockImplementation(() => {
      throw throwError;
    });
    try {
      await deleteGuide(id);
    } catch {}
    expect(apiMock.delete).toBeCalledTimes(1);
    expect(apiMock.delete).toThrow(Error);
    expect(apiMock.delete).toThrow(errorMessage);
  });
});
