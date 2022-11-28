import validateInput from '@pages/update-digital-content/validator';

const mockFiles = Object.create(null);
describe('Função de validação de dados', () => {
  test('Deve validar corretamente os dados sem erros', async () => {
    const data = {
      title: 'Categoria do Guia de Acessibilidade',
      guide: 'Guia de Acessibilidade',
      shortDescription: 'Essa é a categoria do guia de acessibilidade',
      file: mockFiles,
    };

    return expect(validateInput(data)).resolves.toEqual(data);
  });

  test('Deve apontar erro na ausência da descrição', async () => {
    const data = {
      title: 'Categoria do Guia de Acessibilidade',
      guide: 'Guia de Acessibilidade',
      shortDescription: '',
      file: mockFiles,
    };

    return expect(validateInput(data)).rejects.toThrow(
      'A descrição é obrigatória',
    );
  });

  test('Deve apontar erro na ausência de título', async () => {
    const data = {
      title: '',
      guide: 'Guia de Acessibilidade',
      shortDescription: 'Essa é a categoria do guia de acessibilidade',
      file: mockFiles,
    };

    return expect(validateInput(data)).rejects.toThrow(
      'O título é obrigatório',
    );
  });

  test('Deve apontar erro na ausência do guia', async () => {
    const data = {
      title: 'Categoria do Guia de Acessibilidade',
      guide: '',
      shortDescription: 'Essa é a categoria do guia de acessibilidade',
      file: mockFiles,
    };

    return expect(validateInput(data)).rejects.toThrow('O guia é obrigatório');
  });

  test('Deve apontar erro na ausência do arquivo', async () => {
    const data = {
      title: 'Categoria do Guia de Acessibilidade',
      guide: 'Guia de Acessibilidade',
      shortDescription: 'Essa é a categoria do guia de acessibilidade',
      file: mockFiles.null,
    };

    return expect(validateInput(data)).rejects.toThrow(
      'O arquivo é obrigatório',
    );
  });
});
