describe('Testes do Frontend', () => {
  beforeEach(() => {
    cy.request('GET', 'http://localhost:3000/tasks').then((response) => {
      response.body.forEach((task) => {
        cy.request('DELETE', `http://localhost:3000/tasks/${task.id}`);
      });
    });
    cy.visit('http://localhost:8080');
  });

  it('deve verificar elementos da interface no carregamento inicial', () => {
    cy.get('h1').should('contain', 'Minhas Tarefas');
    cy.get('#task-title').should('be.visible');
    cy.get('#task-description').should('be.visible');
    cy.get('#task-submit-btn').should('be.visible');
    cy.get('#task-counter').should('contain', '0 tarefas');
  });

  it('deve adicionar uma tarefa com sucesso', () => {
    cy.get('#task-title').type('Tarefa de E2E');
    cy.get('#task-description').type('Descrição do teste de E2E');
    cy.get('#task-form').submit();

    cy.get('#success-msg')
      .should('be.visible')
      .and('contain', 'Tarefa adicionada com sucesso!');
    
    cy.get('.task-item').should('have.length', 1);
    cy.get('.task-title-text').should('contain', 'Tarefa de E2E');
    cy.get('.task-desc-text').should('contain', 'Descrição do teste de E2E');
    cy.get('#task-counter').should('contain', '1 tarefa');
  });

  it('deve editar uma tarefa existente com sucesso', () => {
    cy.get('#task-title').type('Tarefa Original');
    cy.get('#task-description').type('Descrição Original');
    cy.get('#task-form').submit();
    cy.get('.task-item').should('have.length', 1);

    cy.get('.btn-edit').click();
    cy.get('#task-title').should('have.value', 'Tarefa Original');
    cy.get('#task-description').should('have.value', 'Descrição Original');
    cy.get('#task-submit-btn').should('contain', 'Salvar Alterações');
    cy.get('#task-cancel-btn').should('be.visible');

    cy.get('#task-title').clear().type('Tarefa Editada');
    cy.get('#task-description').clear().type('Descrição Editada');
    cy.get('#task-form').submit();

    cy.get('#success-msg')
      .should('be.visible')
      .and('contain', 'Tarefa atualizada com sucesso!');
    
    cy.get('.task-title-text').should('contain', 'Tarefa Editada');
    cy.get('.task-desc-text').should('contain', 'Descrição Editada');
  });

  it('deve marcar uma tarefa como concluída com sucesso', () => {
    cy.get('#task-title').type('Tarefa para Concluir');
    cy.get('#task-form').submit();
    cy.get('.task-item').should('have.length', 1);

    cy.get('.checkbox-container input').click({ force: true });
    cy.get('.task-item').should('have.class', 'completed');
    
    cy.get('.checkbox-container input').click({ force: true });
    cy.get('.task-item').should('not.have.class', 'completed');
  });

  it('deve excluir uma tarefa com sucesso', () => {
    cy.get('#task-title').type('Tarefa para Excluir');
    cy.get('#task-form').submit();
    cy.get('.task-item').should('have.length', 1);

    cy.get('.btn-delete').click();
    cy.get('#success-msg')
      .should('be.visible')
      .and('contain', 'Tarefa excluída com sucesso!');
    
    cy.get('.task-item').should('have.length', 0);
    cy.get('#task-counter').should('contain', '0 tarefas');
  });
});
