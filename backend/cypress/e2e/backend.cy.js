describe('Testes do Backend API', () => {
  beforeEach(() => {
    cy.request('GET', 'http://localhost:3000/tasks').then((response) => {
      response.body.forEach((task) => {
        cy.request('DELETE', `http://localhost:3000/tasks/${task.id}`);
      });
    });
  });

  it('deve retornar a lista de tarefas vazia inicialmente', () => {
    cy.request('GET', '/tasks').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
      expect(response.body).to.have.length(0);
    });
  });

  it('deve criar uma nova tarefa com sucesso', () => {
    cy.request('POST', '/tasks', {
      title: 'Nova Tarefa API',
      description: 'Descrição da tarefa de API'
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('id');
      expect(response.body.title).to.eq('Nova Tarefa API');
      expect(response.body.description).to.eq('Descrição da tarefa de API');
      expect(response.body.completed).to.eq(false);
    });
  });

  it('deve atualizar uma tarefa existente com sucesso', () => {
    cy.request('POST', '/tasks', {
      title: 'Tarefa Original API',
      description: 'Descrição Original API'
    }).then((postResponse) => {
      const taskId = postResponse.body.id;
      
      cy.request('PUT', `/tasks/${taskId}`, {
        title: 'Tarefa Atualizada API',
        description: 'Descrição Atualizada API',
        completed: true
      }).then((putResponse) => {
        expect(putResponse.status).to.eq(200);
        expect(putResponse.body.title).to.eq('Tarefa Atualizada API');
        expect(putResponse.body.description).to.eq('Descrição Atualizada API');
        expect(putResponse.body.completed).to.eq(true);
      });
    });
  });

  it('deve alternar a conclusão de uma tarefa com sucesso', () => {
    cy.request('POST', '/tasks', {
      title: 'Tarefa para Concluir API'
    }).then((postResponse) => {
      const taskId = postResponse.body.id;
      
      cy.request('PATCH', `/tasks/${taskId}/complete`).then((patchResponse) => {
        expect(patchResponse.status).to.eq(200);
        expect(patchResponse.body.completed).to.eq(true);
      });
    });
  });

  it('deve remover uma tarefa com sucesso', () => {
    cy.request('POST', '/tasks', {
      title: 'Tarefa para Remover API'
    }).then((postResponse) => {
      const taskId = postResponse.body.id;
      
      cy.request('DELETE', `/tasks/${taskId}`).then((deleteResponse) => {
        expect(deleteResponse.status).to.eq(200);
        expect(deleteResponse.body.message).to.eq('Task deleted successfully');
      });
    });
  });
});
