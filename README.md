# pgats-automacao-web-2026

Projeto de prática de automação de testes web com [Cypress](https://www.cypress.io/) e a biblioteca `cypress-xpath`, desenvolvido como parte dos exercícios da pós-graduação em Automação de Testes de Software.

## Exercícios

1. **Cenários de teste:** implementar os primeiros cenários da página de casos de teste do site utilizado em aula.
2. **Seletores XPath:** experimentar `cypress-xpath` e comparar seletores XPath com seletores CSS.
3. **Fluxos de automação:** testar cadastro, autenticação, contato, catálogo, pesquisa e compra.

Os exercícios são voltados à prática e à fixação dos conceitos vistos em aula.

## Site testado

- [Automation Exercise](https://www.automationexercise.com): cenários de cadastro, autenticação, contato, catálogo, pesquisa, inscrição e compra.

Os testes geram identificadores com data e hora para diferenciar alguns cadastros entre execuções.

## Pré-requisitos

- [Node.js](https://nodejs.org/) 22
- npm

## Instalação

Na pasta do projeto, instale as dependências:

```bash
npm ci
```

## Executar os testes localmente

Abrir o Cypress em modo interativo:

```bash
npx cypress open
```

Executar todos os testes em modo headless:

```bash
npx cypress run
```

Executar um spec específico:

```bash
npx cypress run --spec "cypress/e2e/1-getting-started/automation-exercise-modules-final.cy.js"
```

O spec `automation-exercise-xpath.cy.js` também pode ser executado individualmente:

```bash
npx cypress run --spec "cypress/e2e/1-getting-started/automation-exercise-xpath.cy.js"
```

## Integração contínua

O workflow de CI está em `.github/workflows/ci.yml` e é iniciado somente manualmente pelo evento `workflow_dispatch` na aba **Actions** do GitHub. Ele instala as dependências, executa os testes Cypress e publica os relatórios, screenshots e vídeos gerados como artefatos. Nenhuma execução automática é configurada para `push` ou `pull_request`.

## Estrutura

- `cypress/e2e/1-getting-started/automation-exercise-modules-final.cy.js`: cenários de cadastro, login, contato, casos de teste, produtos, inscrição e compra, organizados com funções reutilizáveis.
- `cypress/e2e/1-getting-started/automation-exercise-xpath.cy.js`: cenários de cadastro e autenticação usando seletores XPath.
- `cypress/support/automation-exercise-final.js`: funções reutilizáveis para os fluxos do Automation Exercise.
- `cypress/support/e2e.js`: carrega os comandos de suporte, `cypress-xpath` e o reporter Mochawesome.
- `cypress.config.js`: configura a URL base e o reporter dos testes.
