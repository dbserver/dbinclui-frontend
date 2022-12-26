import { validateUserExists, createUser } from '@services/users';
import api from '@services/api';

jest.mock('@services/api');

const apiMock = api as jest.Mocked<typeof api>;

describe('Testando o serviço "validateUserExists"', () => {
  beforeEach(() => {
    apiMock.get.mockClear();
  });

  test('Deve retornar "true" se o usuario ja consta no banco', async () => {
    apiMock.get.mockResolvedValue(true);

    const token = 'fa1yt23fdy12f';
    const result = await validateUserExists(token);

    expect(apiMock.get).toBeCalledTimes(1);
    expect(result).toBeTruthy();
  });

  test('Deve retornar "false" se o usuario não consta no banco', async () => {
    apiMock.get.mockResolvedValue(false);

    const token = 'fa1yt23fdy12f';
    const result = await validateUserExists(token);

    expect(apiMock.get).toBeCalledTimes(1);
    expect(result).toBeFalsy();
  });
});

describe('Testando o serviço "createUser"', () => {
  beforeEach(() => {
    apiMock.post.mockClear();
  });

  test('Deve retornar o usuário criado', async () => {
    apiMock.post.mockResolvedValue({
      data: {
        _id: '7365248273647134',
        uid: 'gbj12h3g4u1khjg23',
        name: 'Usuário',
        email: 'email@email.com',
        admin: false,
      },
      status: 200,
    });

    const token = 'fa1yt23fdy12f';

    const result = await createUser(token);

    expect(apiMock.post).toBeCalledTimes(1);
    expect(result.status).toEqual(200);
    expect(result.data._id).toBe('7365248273647134');
    expect(result.data.uid).toBe('gbj12h3g4u1khjg23');
    expect(result.data.name).toBe('Usuário');
    expect(result.data.email).toBe('email@email.com');
    expect(result.data.admin).toBeFalsy();
  });

  test('Deve retornar uma mensagem de erro caso o token esteja expirado', async () => {
    apiMock.post.mockResolvedValue({
      data: {
        message: 'Este token já foi expirado, acesso negado',
      },
      status: 403,
    });

    const token = 'tokenExpirado';

    const result = await createUser(token);

    expect(api.post).toBeCalledTimes(1);
    expect(result.status).toEqual(403);
    expect(result.data.message).toBe(
      'Este token já foi expirado, acesso negado',
    );
  });
});
