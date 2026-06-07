# Gerenciador de Tarefas

Sistema completo de gerenciamento de tarefas (To-Do List) desenvolvido com uma arquitetura organizada, backend em Node.js com Express.js, frontend com HTML/CSS/JS puro e cobertura completa de testes automatizados com Cypress, integrado com fluxos CI/CD no GitHub Actions.

## Objetivo

Este projeto foi desenvolvido como trabalho acadêmico para a Unidade IV, demonstrando a implementação prática de uma aplicação web completa (Full Stack) com testes automatizados de ponta a ponta e integração contínua.

## Tecnologias Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript (ES6+), Fetch API
- **Backend**: Node.js, Express.js, CORS
- **Testes**: Cypress
- **CI/CD**: GitHub Actions

## Estrutura de Pastas

```txt
projeto/
├── .github/
│   └── workflows/
│       ├── backend-tests.yml
│       └── frontend-tests.yml
├── backend/
│   ├── controllers/
│   │   └── tasksController.js
│   ├── cypress/
│   │   └── e2e/
│   │       └── backend.cy.js
│   ├── cypress.config.js
│   ├── data/
│   │   └── tasks.js
│   ├── routes/
│   │   └── tasks.js
│   └── server.js
├── frontend/
│   ├── css/
│   │   └── style.css
│   ├── cypress/
│   │   └── e2e/
│   │       └── frontend.cy.js
│   ├── cypress.config.js
│   ├── js/
│   │   └── script.js
│   └── index.html
├── .gitignore
├── package.json
└── README.md
```

## Como Instalar Dependências

No diretório raiz do projeto, execute o seguinte comando:

```bash
npm install
```

## Como Executar o Backend

Para iniciar o servidor do backend (que rodará na porta 3000 por padrão):

```bash
npm run start:backend
```

## Como Executar o Frontend

Para servir o frontend usando o servidor embutido (que rodará na porta 8080 por padrão):

```bash
npm run start:frontend
```

Após iniciar, acesse o endereço `http://localhost:8080` no seu navegador.

## Como Executar os Testes

Existem duas maneiras de rodar as suítes de testes automatizados:

### 1. Execução Completa (Backend + Frontend + Cypress Headless)

Estes comandos inicializam os servidores necessários automaticamente, executam os testes do Cypress e encerram os processos em seguida.

Para rodar os testes do Frontend:
```bash
npm run test:frontend
```

Para rodar os testes do Backend:
```bash
npm run test:backend
```

### 2. Interface Interativa do Cypress

Caso queira utilizar o Cypress Test Runner interativo:

1. Certifique-se de que os servidores estão rodando em terminais separados (`npm run start:backend` e `npm run start:frontend`).
2. Abra a interface do Cypress:
   ```bash
   npm run cypress:open
   ```

## Como Funciona a API

A API é estruturada sob a arquitetura REST e opera em formato JSON. Ela utiliza uma lista de tarefas persistida em memória no servidor backend.

### Exemplos de Requisições

#### 1. Listar Tarefas
- **Rota**: `GET /tasks`
- **Exemplo de Resposta (200 OK)**:
  ```json
  [
    {
      "id": "1717332000000",
      "title": "Estudar Cypress",
      "description": "Praticar escrita de testes E2E",
      "completed": false
    }
  ]
  ```

#### 2. Criar Tarefa
- **Rota**: `POST /tasks`
- **Corpo da Requisição**:
  ```json
  {
    "title": "Nova Tarefa",
    "description": "Descrição detalhada da tarefa"
  }
  ```
- **Exemplo de Resposta (201 Created)**:
  ```json
  {
    "id": "1717332015000",
    "title": "Nova Tarefa",
    "description": "Descrição detalhada da tarefa",
    "completed": false
  }
  ```

#### 3. Atualizar Tarefa
- **Rota**: `PUT /tasks/:id`
- **Corpo da Requisição**:
  ```json
  {
    "title": "Tarefa Atualizada",
    "description": "Nova descrição",
    "completed": true
  }
  ```
- **Exemplo de Resposta (200 OK)**:
  ```json
  {
    "id": "1717332015000",
    "title": "Tarefa Atualizada",
    "description": "Nova descrição",
    "completed": true
  }
  ```

#### 4. Alternar Conclusão da Tarefa
- **Rota**: `PATCH /tasks/:id/complete`
- **Exemplo de Resposta (200 OK)**:
  ```json
  {
    "id": "1717332015000",
    "title": "Tarefa Atualizada",
    "description": "Nova descrição",
    "completed": false
  }
  ```

#### 5. Excluir Tarefa
- **Rota**: `DELETE /tasks/:id`
- **Exemplo de Resposta (200 OK)**:
  ```json
  {
    "message": "Task deleted successfully"
  }
  ```

## Capturas de Tela de Exemplo

O projeto apresenta uma interface responsiva baseada em glassmorphism escuro com elementos modernos e brilhantes.

- **Interface Principal**: Exibe o formulário de cadastro e listagem dinâmica com efeitos de desfoque de fundo e degradê.
- **Interatividade**: Feedback visual imediato ao completar uma tarefa (efeito tachado e check animado) ou ao clicar para editar.
- **Notificações**: Janelas de alerta flutuantes no topo da tela indicando sucesso ou falha nas operações.

## Possíveis Melhorias Futuras

- Integração com um banco de dados persistente (como MongoDB ou SQLite) para salvar as tarefas definitivamente.
- Sistema de autenticação de usuários para permitir listas individuais de tarefas.
- Categorização de tarefas com tags coloridas e datas de vencimento.
- Filtros avançados para ordenação por data de criação ou status de conclusão.
