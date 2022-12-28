<h1>DBInclui 💭 </h1> 

<h2>Descrição do Projeto </h2>

Web app que dissemina a cultura de inclusão dentro da DBServer, com foco na cultura surda. É destinado para todas as pessoas que desejam aprender LIBRAS e enteder um pouco mais sobre inclusão de PCD's na sociedade. O web app aproveita o guia de acessibilidade e a apostila de Libras como fonte de informação de inclusão, assim como utiliza a API VLibras para as funcionalidades específicas.

## Mapa de Tecnologias 📰

A Biblioteca/Framework principal utilizada será ReactJS.

| Nome | Documentação | Links dos pacotes |
| :-: | :-: | :-: |
| Typescript | https://www.typescriptlang.org/docs/ | https://www.npmjs.com/package/typescript |
| React | https://reactjs.org/docs/getting-started.html | https://www.npmjs.com/package/react |
| Material UI | https://mui.com/pt/getting-started/usage/ | https://www.npmjs.com/package/@mui/material |
| Axios | https://axios-http.com/docs/intro | https://www.npmjs.com/package/axios |
| Jest | https://jestjs.io/docs/getting-started | https://www.npmjs.com/package/jest |
| Eslint | https://eslint.org/docs/latest/user-guide/getting-started | https://www.npmjs.com/package/eslint |
| Prettier | https://prettier.io | https://www.npmjs.com/package/prettier |
| Babel | https://babeljs.io/docs/en/usage | https://www.npmjs.com/package/babel-install |

## Mapa de Tecnologias - Figma 📰

###  Link para o Figma do projeto: https://www.figma.com/file/gdAo2xO9vQsBA5HRNOuQAW/DB-Inclui-2022?node-id=10%3A2

## Executando o Projeto 💻

### Instalando os módulos

```
$ npm install
```

### Iniciando o Frontend 

```
$ npm start
```

## Fluxo de versionamento 🖥️

### Clone a branch "main" do repositório

```
$ git clone https://github.com/ProjetosParceiros/dbinclui-frontend.git
```
### Acesse a branch remota "develop" e instale o node_modules.

```
$ git checkout develop
$ npm install
```

### Iniciar o uso do Git Flow no projeto na branch "develop"

```
$ git flow init
```

### Certifique-se de que a branch para "production releases" é a main

```
Which branch should be used for bringing forth production releases?
   - develop
   - main
Branch name for production releases: [main]
```

### Certifique-se de que a branch para "next release" (desenvolvimento) é a develop

```
Which branch should be used for integration of the "next release"?
   - develop
Branch name for "next release" development: [develop]  
```

### Aperte "ENTER" em cada input para usar as nomenclaturas padrões das features

```
How to name your supporting branch prefixes?
Feature branches? [feature/]
Bugfix branches? [bugfix/]
Release branches? [release/]
Hotfix branches? [hotfix/]
Support branches? [support/]
Version tag prefix? []
```

### Crie a branch para desenvolvimento baseada no número do seu card no Trello

```
$ git flow feature start DBI-01 <-- Número do card no Trello
```
| Branch | Funcionalidade | 
| :-: | :-: |
| Feature | Branch para desenvolvimento de uma funcionalidade específica. Devem ter o nome iniciado por feature, por exemplo: "feature/sistemacadastral". São criadas sempre a partir da branch "develop".|
| Release | Serve como ponte para fazer o merge da Develop para a Main. Caso haja alguma alteração, também deve ser sincronizada com a Branch "develop".|
| Bugfix | Criada a partir da branch "release" para realizar correções de erros encontrados no sistema em desenvolvimento. Quando concluída, ela é excluída após realizar o merge com a branch "release".|
| Hotfix | Criada a partir da Main para realizar correções encontradas no sistema em produção. Quando concluída, ela é excluída após realizar o merge com a branch "develop" e "main". |

### Seguindo o exemplo de uma branch "feature", publique-a no card do Trello com as mudanças feitas. 💡

```
$ git flow feature publish DBI-01 <- Número do card no Trello.
```

### Para que outros possam acessar a branch referente à tarefa, dentro da branch "develop":

```
$ git pull
$ git checkout feature/DBI-01 <- Número do card da tarefa no Trello.
Switched to a new branch 'feature/DBI-01'
``` 

## ⚠ Após a criação e code review, deve-se passar para o quadro de "Aguardando Merge" e as pessoas responsáveis irão seguir o seguinte passo: 
### Para finalizar a branch referente à tarefa:

```
$ git flow feature finish DBI-01
```
<h3>Logo, a Branch será finalizada e você será redirecionado para a "develop", onde deve usar: </h3>

```
$ git push
```
<p> para atualizar a branch "develop" no repositório. </p>


---

## Desenvolvendo o projeto ⚡

### Criar Componente 

Para que haja uma padronização na criação dos componentes, este deve seguir o seguinte modelo de construção:

- Pasta do componente com letra *maiúscula*.
- Deve ser criado um arquivo _index.tsx_ dentro da pasta.
- Deve ser feita a importação do _React_ no escopo do componente.
- Deve conter uma _interface_ com as propriedades do componente.
  - Nome da _interface_ deve ter o sufixo _Props_.
- Deve criar uma constante com _arrow function_ para o componente.
  - Deve ser tipado como _React.FC(Nome da Interface)_.
  - Deve retornar um elemento _JSX_.
- O componente deve ser exportado na _constante_.

Exemplo:

```tsx
import React from 'react';
export interface FooterProps {}

export const Footer: React.FC<FooterProps> = (): JSX.Element => {
 return (
    <>
      <footer className="footer">
        <a
          href="https://www.facebook.com/DBServerTI/"
          target={'_blank'}
          rel="noopener noreferrer"
        >
          <FacebookIcon color="secondary" style={{ fontSize: '32px' }} />
        </a>
```


