# DBInclui 💭

## Descrição do Projeto

Web app que dissemina a cultura de inclusão dentro da DBServer, com foco na cultura surda. O web app é destinado para todas as pessoas que desejam aprender LIBRAS e enteder um pouco mais sobre inclusão de PCD`s na sociedade. O web app aproveita o guia de acessibilidade e a apostila de Libras como fonte de informação de inclusão, assim como utiliza a API Libras para as funcionalidades específicas.

## Mapa de Tecnologias 🖱️

A Lib/Framework principal utilizada será ReactJS.

| Nome | Documentação | Links dos pacotes |
| :-: | :-: | :-: |
| Typescript | https://www.typescriptlang.org/docs/ | https://www.npmjs.com/package/typescript |
| React | https://reactjs.org/docs/getting-started.html | https://www.npmjs.com/package/react |
| Material UI | https://mui.com/pt/getting-started/usage/ | https://www.npmjs.com/package/@mui/material |
| Axios | https://axios-http.com/docs/intro | https://www.npmjs.com/package/axios |
| Jest | https://jestjs.io/docs/getting-started | https://www.npmjs.com/package/jest |

## Executando o Projeto 💻

### Instalando os módulos

```
$ npm install
```

### Iniciando o Frontend

```
$ npm start
```

## Fluxo de versionamento 👨‍💻

### Clone o repositório

```
$ git clone https://github.com/dbinclui-org/dbinclui-frontend.git
```

### Iniciar o uso do Git Flow no projeto

```
$ git flow init
```

### Certifique-se de que a branch para "production releases" é a main

```
Which branch should be used for bringing forth production releases?
   - main
Branch name for production releases: [main]
```

### Certifique-se de que a branch para "next release" é a develop

```
Branch name for "next release" development: [develop]
```

### Aperte "ENTER" em cada input para usar as nomenclaturas padrões das features

```
How to name your supporting branch prefixes?
Feature branches? [feature/]
Release branches? [release/]
Hotfix branches? [hotfix/]
Support branches? [support/]
Version tag prefix? []
```

### Crie a branch baseada no número do seu card no Trello

```
$ git flow feature start DBI-61 <-- número do card do Trello
```

### Adicione e faça o commit das mudanças da branch

```
$ git add -A
$ git commit -m "Update README"
```

### Publique as modificações realizadas

```
$ git push --set-upstream origin feature/DBI-61
```

### Para realizar o _pull request_ é necessário mudar o base repository para o repositório que possui o "dbinclui-org"

<img src="https://i.imgur.com/2D3kkjl.png"/>

### Confirme se a _develop_ está marcada na _base_ e se a sua _feature_ está no _compare_, após isso já é possível clicar no botão para criar o _pull request_

<img src="https://i.imgur.com/kRLdwkc.png"/>

### Mude o título do _pull request_ para o nome da feature + o título do card do Trello, como mostrado abaixo, após isso já é possível clicar no botão para criar o _pull request_

<img src="https://i.imgur.com/AZywbED.png"/>

### Após as mudanças serem aprovadas por duas pessoas e serem passadas no teste, será possível realizar o _merge request_

<img src="https://i.imgur.com/V76w9Bh.png"/>

---

## Desenvolvendo o Projeto

### Criar Componente

Para que haja uma padronização na criação dos componentes, este deve seguir o seguinte modelo de construção:

- Deve ser feita a importação do _React_ no escopo do componente.
- Deve conter uma _interface_ com as propriedades do componente.
  - Nome da _interface_ deve ter o sufixo _Props_.
- Deve criar uma constante
  - Nome deve ter o prefixo _Component_
  - Recebe _React.FC_, no qual recebe a _interface_
  - Deve retornar elemento _JSX_
  - O código a ser feito dentro do _return_ deve está dentro <></> (abreviatura para _React.Fragment_)
- O componente de ser exportado ao final.

Exemplo:

```tsx
import React from 'react';
export interface ComponetNameProps {}

export const ComponetName: React.FC<ComponentNameProps> = (): JSX.Element => {
  return <>...</>;
};

export default ComponentName;
```

<!-- ## Commit Semântico ⚡

Pequenas alterações que não são novas funcionalidades.

```

chore: add Oyster build script

```

Semelhante a uma wiki; documentações etc.

```

docs: explain hat wobble

```

Criação de Nova funcionalidade.

```

feat: add beta sequence

```

Correção de bugs.

```

fix: remove error message

```

Refatoração de um código.

```

refactor: share logic 4d3d3d3

```

Alteração em estilos, formatação de código etc.

```

style: convert tabs to spaces

```

Criação de testes da sua aplicação.

```

test: ensure that increment

```

Para saber mais sobre os commits semânticos, [acesse este artigo](https://blog.geekhunter.com.br/o-que-e-commit-e-como-usar-commits-semanticos/). -->
