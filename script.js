
const input   = document.getElementById('taskInput');
const addBtn  = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    if (task.completed) li.classList.add('completed');

    li.innerHTML = `
      <input type="checkbox" ${task.completed ? 'checked' : ''}>
      <span>${task.text}</span>
      <button class="delete-btn">×</button>
    `;
    li.querySelector('input').addEventListener('change', () => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    });
    li.querySelector('.delete-btn').addEventListener('click', () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    taskList.appendChild(li);
  });
}

function addTask() {
  const text = input.value.trim();
  if (!text) return;

  tasks.push({ text, completed: false });
  saveTasks();
  renderTasks();

  input.value = '';
  input.focus();
}

addBtn.addEventListener('click', addTask);
input.addEventListener('keypress', e => {
  if (e.key === 'Enter') addTask();
});
renderTasks();