import validateInput from '@pages/update-category/validator';

describe('Função de validação de dados de categoria', () => {
  test('Deve validar corretamente os dados sem erros', async () => {
    const data = {
      title: 'Guia de Acessibilidade',
      shortDescription: 'Essa é a guia de acessibilidade',
      guide: 'id-teste',
    };

    return expect(validateInput(data)).resolves.toEqual(data);
  });

  test('Deve apontar erro na ausência do título', async () => {
    const data = {
      title: '',
      shortDescription: 'Essa é a guia de acessibilidade',
      guide: 'id-teste',
    };

    return expect(validateInput(data)).rejects.toThrow(
      'O título da categoria é obrigatório',
    );
  });

  test('Deve apontar erro na ausência da descrição', async () => {
    const data = {
      title: 'Guia de Acessibilidade',
      shortDescription: '',
      guide: 'id-teste',
    };

    return expect(validateInput(data)).rejects.toThrow(
      'A descrição é obrigatória',
    );
  });

  test('Deve apontar erro na ausência do guia', async () => {
    const data = {
      title: 'Guia de Acessibilidade',
      shortDescription: 'Essa é a guia de acessibilidade',
      guide: '',
    };

    return expect(validateInput(data)).rejects.toThrow('O guia é obrigatório');
  });
});
