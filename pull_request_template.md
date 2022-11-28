## Descrição

Uma breve descrição do que foi realizado na PR.


____

**Link do card:**
[Título da história]()

____

## Checklist Code Review
Avaliar se todos os itens a seguir foram feitos. Os itens com `*` não são obrigatórios.

- [ ] Foi adicionada a descrição da PR
- [ ] Foi adicionado o link do card
- [ ] A branch segue o padrão com o prefixo DBI
- [ ] Está seguindo os padrões de prefixo do gitflow (feature, bugfix, hotfix, release)
- [ ] O título da PR segue o padrão: ***Nome da branch - Título do card***
- [ ] A PR está sendo enviada para a branch `develop`
- [ ] O Repositório que a PR está sendo enviada é o [**dbinclui-org/dbinclui-frontend**](https://github.com/dbinclui-org/dbinclui-frontend)
- [ ] Foi realizado os testes unitários *
- [ ] Foi realizado os testes de E2E *
- [ ] Foi adicionada as respectivas **labels**
- [ ] A PR foi assinada

Para que haja uma padronização na criação dos componentes, este deve seguir o seguinte modelo de construção:

- [ ] Deve ser feita a importação do _React_ no escopo do componente.
- [ ] Deve conter uma _interface_ com as propriedades do componente.
- [ ] Nome da _interface_ deve ter o sufixo _Props_.
- [ ] Recebe _React.FC_, no qual recebe a _interface_
- [ ] Deve retornar elemento _JSX_
- [ ] O componente de ser exportado ao final como `default`.
 
Exemplo:
```tsx
import React from 'react';

export interface ComponetNameProps {}

export const ComponetName: React.FC<ComponentNameProps> = (): JSX.Element => {
  return <>...</>;
};

export default ComponentName;
```
