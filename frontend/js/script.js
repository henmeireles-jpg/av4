const apiBaseUrl = 'http://localhost:3000/tasks';

const taskForm = document.getElementById('task-form');
const taskIdInput = document.getElementById('task-id');
const taskTitleInput = document.getElementById('task-title');
const taskDescInput = document.getElementById('task-description');
const taskSubmitBtn = document.getElementById('task-submit-btn');
const taskCancelBtn = document.getElementById('task-cancel-btn');
const taskList = document.getElementById('task-list');
const taskCounter = document.getElementById('task-counter');
const successMsg = document.getElementById('success-msg');
const errorMsg = document.getElementById('error-msg');

let notificationTimeout;
let allTasks = [];

const showNotification = (message, isSuccess = true) => {
  clearTimeout(notificationTimeout);
  
  if (isSuccess) {
    successMsg.textContent = message;
    successMsg.classList.remove('hidden');
    errorMsg.classList.add('hidden');
  } else {
    errorMsg.textContent = message;
    errorMsg.classList.remove('hidden');
    successMsg.classList.add('hidden');
  }

  notificationTimeout = setTimeout(() => {
    successMsg.classList.add('hidden');
    errorMsg.classList.add('hidden');
  }, 3000);
};

const updateCounter = (count) => {
  taskCounter.textContent = `${count} ${count === 1 ? 'tarefa' : 'tarefas'}`;
};

const fetchTasks = async () => {
  try {
    const response = await fetch(apiBaseUrl);
    if (!response.ok) {
      throw new Error('Erro ao carregar tarefas.');
    }
    allTasks = await response.json();
    renderTasks(allTasks);
  } catch (error) {
    showNotification(error.message, false);
  }
};

const renderTasks = (tasks) => {
  taskList.innerHTML = '';
  updateCounter(tasks.length);

  tasks.forEach(task => {
    const taskItem = document.createElement('div');
    taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;
    taskItem.setAttribute('data-id', task.id);

    taskItem.innerHTML = `
      <div class="task-content">
        <label class="checkbox-container">
          <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleComplete('${task.id}')">
          <span class="checkmark"></span>
        </label>
        <div class="task-text">
          <span class="task-title-text">${task.title}</span>
          ${task.description ? `<span class="task-desc-text">${task.description}</span>` : ''}
        </div>
      </div>
      <div class="task-actions">
        <button class="btn-action btn-edit" onclick="editTask('${task.id}')">
          <svg viewBox="0 0 24 24">
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
          </svg>
        </button>
        <button class="btn-action btn-delete" onclick="deleteTask('${task.id}')">
          <svg viewBox="0 0 24 24">
            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
          </svg>
        </button>
      </div>
    `;
    taskList.appendChild(taskItem);
  });
};

const handleFormSubmit = async (e) => {
  e.preventDefault();
  const id = taskIdInput.value;
  const title = taskTitleInput.value.trim();
  const description = taskDescInput.value.trim();

  if (!title) {
    return;
  }

  const isEditing = !!id;
  const url = isEditing ? `${apiBaseUrl}/${id}` : apiBaseUrl;
  const method = isEditing ? 'PUT' : 'POST';

  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, description })
    });

    if (!response.ok) {
      throw new Error(isEditing ? 'Erro ao atualizar tarefa.' : 'Erro ao adicionar tarefa.');
    }

    showNotification(isEditing ? 'Tarefa atualizada com sucesso!' : 'Tarefa adicionada com sucesso!');
    resetForm();
    await fetchTasks();
  } catch (error) {
    showNotification(error.message, false);
  }
};

window.editTask = (id) => {
  const task = allTasks.find(t => t.id === id);
  if (!task) {
    return;
  }
  taskIdInput.value = task.id;
  taskTitleInput.value = task.title;
  taskDescInput.value = task.description || '';
  taskSubmitBtn.textContent = 'Salvar Alterações';
  taskCancelBtn.classList.remove('hidden');
  taskTitleInput.focus();
};

const resetForm = () => {
  taskIdInput.value = '';
  taskForm.reset();
  taskSubmitBtn.textContent = 'Adicionar Tarefa';
  taskCancelBtn.classList.add('hidden');
};

window.deleteTask = async (id) => {
  try {
    const response = await fetch(`${apiBaseUrl}/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error('Erro ao excluir tarefa.');
    }

    showNotification('Tarefa excluída com sucesso!');
    if (taskIdInput.value === id) {
      resetForm();
    }
    await fetchTasks();
  } catch (error) {
    showNotification(error.message, false);
  }
};

window.toggleComplete = async (id) => {
  try {
    const response = await fetch(`${apiBaseUrl}/${id}/complete`, {
      method: 'PATCH'
    });

    if (!response.ok) {
      throw new Error('Erro ao alterar status da tarefa.');
    }

    await fetchTasks();
  } catch (error) {
    showNotification(error.message, false);
  }
};

taskForm.addEventListener('submit', handleFormSubmit);
taskCancelBtn.addEventListener('click', resetForm);

window.addEventListener('DOMContentLoaded', fetchTasks);
