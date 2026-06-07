const tasks = require('../data/tasks');

const getAllTasks = (req, res) => {
  res.status(200).json(tasks);
};

const createTask = (req, res) => {
  const { title, description } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }
  const task = {
    id: Date.now().toString(),
    title,
    description: description || '',
    completed: false
  };
  tasks.push(task);
  res.status(201).json(task);
};

const updateTask = (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  const task = tasks.find(t => t.id === id);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  if (title !== undefined) {
    task.title = title;
  }
  if (description !== undefined) {
    task.description = description;
  }
  if (completed !== undefined) {
    task.completed = completed;
  }
  res.status(200).json(task);
};

const deleteTask = (req, res) => {
  const { id } = req.params;
  const taskIndex = tasks.findIndex(t => t.id === id);
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }
  tasks.splice(taskIndex, 1);
  res.status(200).json({ message: 'Task deleted successfully' });
};

const completeTask = (req, res) => {
  const { id } = req.params;
  const task = tasks.find(t => t.id === id);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  task.completed = !task.completed;
  res.status(200).json(task);
};

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  completeTask
};
