import { getUsersExpressions, favoriteUserExpression, deleteUserExpression, postUserExpression } from '@services/userExpressions';
import api from '@services/api';

jest.mock('@services/guides');
jest.mock('@services/api');

const apiMock = api as jest.Mocked<typeof api>;
const token = "eyJhbGciOiJSUzI1NiIsImtpZCI6Ijg3NTNiYmFiM2U4YzBmZjdjN2ZiNzg0ZWM5MmY5ODk3YjVjZDkwN2QiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiQWxpY2lhIFMiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUVkRlRwNmdDd0l6Q1FPOF9Sci1GYW1PblBJeXFsbkdnVWFHUWl3eDBOcW9PVEk9czk2LWMiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbGVhcm5pbmctZmlyZWJhc2UtMzZkMWIiLCJhdWQiOiJsZWFybmluZy1maXJlYmFzZS0zNmQxYiIsImF1dGhfdGltZSI6MTY3MjE2MDM1OSwidXNlcl9pZCI6IklXM09wRFluZEpkWVViOU8yYUZ5SzdJa2t5djEiLCJzdWIiOiJJVzNPcERZbmRKZFlVYjlPMmFGeUs3SWtreXYxIiwiaWF0IjoxNjcyMTYwMzU5LCJleHAiOjE2NzIxNjM5NTksImVtYWlsIjoiYWxpY2lhLnJzb3V6YUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjEwMTMyODMzOTM1Njg2NTc3MDkzNyJdLCJlbWFpbCI6WyJhbGljaWEucnNvdXphQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifX0.bkuKrT9woY1_u2OxgwFA-RUnxkNkqtrUsF6zBY_33u4q_TL6Nub_DS_MH_of_pB9LHFtgr0xyi-BIEN27U5yZbtGGyLsPQ8dwIv-hCPdXpCzZJk2UuGN54d2Fewe0_D722twclyjQ-70B_z2abFrDSYr2yMiduWbay8L0Q1jXvQuRWsIWzHx18qt95x07y5SqUiaCg82rmTYkkIJu1ygyH88zlDBAHxhKQFiuEsTZ8jBau5Wotu2j_ZMeFNhTwGZkxD9hjbNEqlos02vSAcAnacgInPc-_0PtI4nRJa8lwyMr-4UkWfF9LDuNlM5R6U0UV-3nKreEjFHs2f7KQxpbA"
const emptyToken = ""
const expression = "Teste da expression"
const emptyExpression = ""

describe(`Testando o serviço "${getUsersExpressions.name}"`, () => {
  beforeEach(() => {
    apiMock.get.mockClear();
  });

  it(`${getUsersExpressions.name}: Devolvendo conteúdo "getUsersExpressions" vazio`, async () => {
    apiMock.get.mockResolvedValue([]);
    const result = await getUsersExpressions(token);
    expect(apiMock.get).toBeCalledTimes(1);
    expect(result).toStrictEqual([]);
  });

  it(`${getUsersExpressions.name}: Devolvendo conteúdo "getUsersExpressions" com 1 elemento`, async () => {
    const usersExpressions = [{
      _id: '1',
      expression: expression,
      favorite: false
    }];

    apiMock.get.mockResolvedValue(usersExpressions);
    const result = await getUsersExpressions(token);
    expect(apiMock.get).toBeCalledTimes(1);
    expect(result).toStrictEqual(usersExpressions);
  });

  it(`${getUsersExpressions.name}: Devolvendo conteúdo "getUsersExpressions" com 3 elementos`, async () => {
    const usersExpressions = [
      {
        _id: '1',
        expression: expression,
        favorite: false
      },
      {
        _id: '2',
        expression: expression,
        favorite: true
      },
      {
        _id: '3',
        expression: expression,
        favorite: false
      }
    ];

    apiMock.get.mockResolvedValue(usersExpressions);
    const result = await getUsersExpressions(token);
    expect(apiMock.get).toBeCalledTimes(1);
    expect(result).toStrictEqual(usersExpressions);
  });

  it(`${getUsersExpressions.name}: Tratamento de erro quando o token for inválido`, async () => {
    const errorMessage = 'Token inválido';
    const throwError = new Error(errorMessage);
    apiMock.get.mockImplementation(() => {
      throw throwError;
    });
    try {
      await getUsersExpressions(emptyToken);
    } catch { }
    expect(emptyToken).toStrictEqual("");
    expect(apiMock.get).toBeCalledTimes(1);
    expect(apiMock.get).toThrow(Error);
    expect(apiMock.get).toThrow(errorMessage);
  });

  it(`${getUsersExpressions.name}: Tratamento de erro quando o serviço não estiver disponível`, async () => {
    const errorMessage = 'Serviço não disponível';
    const throwError = new Error(errorMessage);
    apiMock.get.mockImplementation(() => {
      throw throwError;
    });
    try {
      await getUsersExpressions(token);
    } catch { }
    expect(apiMock.get).toBeCalledTimes(1);
    expect(apiMock.get).toThrow(Error);
    expect(apiMock.get).toThrow(errorMessage);
  });
});

describe(`Testando o serviço "${favoriteUserExpression.name}"`, () => {
  const id = '1';

  beforeEach(() => {
    apiMock.patch.mockClear();
  });

  it(`Quando ${favoriteUserExpression.name} é chamado, o resultado deve retornar true, mostrando que o serviço está funcionando.`, async () => {
    const resultExpect = true;
    apiMock.patch.mockResolvedValue(resultExpect);

    const result = await favoriteUserExpression(token, id);
    expect(result).toBe(resultExpect);
  })

  it(`${favoriteUserExpression.name}: Tratamento de erro quando o id não existir`, async () => {
    const errorMessage = 'ID não encontrado';
    const throwError = new Error(errorMessage);

    apiMock.patch.mockImplementation(() => {
      throw throwError;
    });

    try {
      await favoriteUserExpression(token, id);
    } catch { }

    expect(apiMock.patch).toBeCalledTimes(1);
    expect(apiMock.patch).toThrow(Error);
    expect(apiMock.patch).toThrow(errorMessage);
  });

  it(`${favoriteUserExpression.name}: Tratamento de erro quando o serviço não estiver disponível`, async () => {
    const errorMessage = 'Serviço não disponível';
    const throwError = new Error(errorMessage);

    apiMock.patch.mockImplementation(() => {
      throw throwError;
    });

    try {
      await favoriteUserExpression(token, id);
    } catch { }

    expect(apiMock.patch).toBeCalledTimes(1);
    expect(apiMock.patch).toThrow(Error);
    expect(apiMock.patch).toThrow(errorMessage);
  });
});

describe(`Testando o serviço "${deleteUserExpression.name}"`, () => {
  const id = '1';

  beforeEach(() => {
    apiMock.delete.mockClear();
  });

  it(`${deleteUserExpression.name}: Devolvendo conteúdo "deleteUserExpression"`, async () => {
    apiMock.delete.mockResolvedValue([]);
    const result = await deleteUserExpression(token, id);
    expect(apiMock.delete).toBeCalledTimes(1);
    expect(result).toStrictEqual([]);
  });

  it(`${deleteUserExpression.name}: Tratamento de erro quando o id não existir`, async () => {
    const errorMessage = 'ID não encontrado';
    const throwError = new Error(errorMessage);

    apiMock.delete.mockImplementation(() => {
      throw throwError;
    });

    try {
      await deleteUserExpression(token, id);
    } catch { }

    expect(apiMock.delete).toBeCalledTimes(1);
    expect(apiMock.delete).toThrow(Error);
    expect(apiMock.delete).toThrow(errorMessage);
  });

  it(`${deleteUserExpression.name}: Tratamento de erro quando o serviço não estiver disponível`, async () => {
    const errorMessage = 'Serviço não disponível';
    const throwError = new Error(errorMessage);
    apiMock.delete.mockImplementation(() => {
      throw throwError;
    });
    try {
      await deleteUserExpression(token, id);
    } catch { }
    expect(apiMock.delete).toBeCalledTimes(1);
    expect(apiMock.delete).toThrow(Error);
    expect(apiMock.delete).toThrow(errorMessage);
  });
});

describe(`Testando o serviço "${postUserExpression.name}"`, () => {
  beforeEach(() => {
    apiMock.post.mockClear();
  });

  it(`Quando ${postUserExpression.name} é chamado, o resultado deve retornar true`, async () => {
    const resultExpect = true;
    apiMock.post.mockResolvedValue(resultExpect);

    const result = await postUserExpression(expression, token);
    expect(result).toBe(resultExpect);
  })

  it(`${postUserExpression.name}: Tratamento de erro quando o token for inválido`, async () => {
    const errorMessage = 'Token inválido';
    const throwError = new Error(errorMessage);

    apiMock.post.mockImplementation(() => {
      throw throwError;
    });

    try {
      await postUserExpression(expression, emptyToken);
    } catch { }

    expect(emptyToken).toBe("");
    expect(apiMock.post).toBeCalledTimes(1);
    expect(apiMock.post).toThrow(Error);
    expect(apiMock.post).toThrow(errorMessage);
  });

  it(`${postUserExpression.name}: Tratamento de erro quando a expresão não for informada`, async () => {
    const errorMessage = 'Expressão não informada';
    const throwError = new Error(errorMessage);

    apiMock.post.mockImplementation(() => {
      throw throwError;
    });

    try {
      await postUserExpression(emptyExpression, token);
    } catch { }

    expect(emptyExpression).toBe("");
    expect(apiMock.post).toBeCalledTimes(1);
    expect(apiMock.post).toThrow(Error);
    expect(apiMock.post).toThrow(errorMessage);
  });

  it(`${postUserExpression.name}: Tratamento de erro quando o serviço não estiver disponível`, async () => {
    const errorMessage = 'Serviço não disponível';
    const throwError = new Error(errorMessage);

    apiMock.post.mockImplementation(() => {
      throw throwError;
    });

    try {
      await postUserExpression(expression, token);
    } catch { }

    expect(apiMock.post).toBeCalledTimes(1);
    expect(apiMock.post).toThrow(Error);
    expect(apiMock.post).toThrow(errorMessage);
  });
});

