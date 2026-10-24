// Sample initial tasks
let tasks = [
  { id: 1, title: 'Complete COS 106 Term Project Writeup', dueDate: '2025-04-10', completed: false },
  { id: 2, title: 'Coordinate Ideation Hive Meeting Agenda', dueDate: '2025-04-08', completed: false },
  { id: 3, title: 'Review MIVA Lecture 4 Web Design Slides', dueDate: '2025-04-01', completed: true }
];

const plannerForm = document.getElementById('planner-form');
const taskTitleInput = document.getElementById('task-title');
const taskDateInput = document.getElementById('task-date');
const pendingList = document.getElementById('pending-task-list');
const completedList = document.getElementById('completed-task-list');
const statsContainer = document.getElementById('planner-stats');

// Function to render tasks split by Pending and Completed status
function renderTasks() {
  pendingList.innerHTML = '';
  completedList.innerHTML = '';

  const pendingTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);

  // Update Stats Header
  statsContainer.innerHTML = `<strong>${completedTasks.length}</strong> of <strong>${tasks.length}</strong> Completed`;

  // Render Pending Tasks
  if (pendingTasks.length === 0) {
    pendingList.innerHTML = '<li style="color: var(--text-muted); font-size: 0.85rem; padding: 0.5rem 0;">✨ No pending tasks! All caught up.</li>';
  } else {
    pendingTasks.forEach(task => pendingList.appendChild(createTaskElement(task)));
  }

  // Render Completed Tasks
  if (completedTasks.length === 0) {
    completedList.innerHTML = '<li style="color: var(--text-muted); font-size: 0.85rem; padding: 0.5rem 0;">No completed tasks yet. Mark tasks finished above!</li>';
  } else {
    completedTasks.forEach(task => completedList.appendChild(createTaskElement(task)));
  }
}

// Helper function to build list items with inline glass styling
function createTaskElement(task) {
  const li = document.createElement('li');
  li.style.cssText = `
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.85rem 1.1rem;
    background: ${task.completed ? 'rgba(255, 255, 255, 0.015)' : 'rgba(255, 255, 255, 0.035)'};
    border: 1px solid ${task.completed ? 'rgba(192, 132, 252, 0.15)' : 'var(--glass-border)'};
    border-radius: 12px;
    transition: all 0.3s ease;
  `;

  li.innerHTML = `
    <div style="display: flex; align-items: center; gap: 0.85rem;">
      <input 
        type="checkbox" 
        ${task.completed ? 'checked' : ''} 
        onchange="toggleTask(${task.id})" 
        style="width: 18px; height: 18px; accent-color: var(--accent-pink); cursor: pointer;"
      >
      <div>
        <span style="font-size: 0.95rem; font-weight: 500; ${task.completed ? 'text-decoration: line-through; color: var(--text-muted);' : 'color: var(--text-main);'}">
          ${task.title}
        </span>
        <small style="display: block; color: var(--text-muted); font-size: 0.75rem; margin-top: 2px;">Due: ${task.dueDate}</small>
      </div>
    </div>
    <button 
      onclick="deleteTask(${task.id})" 
      style="background: none; border: none; color: var(--danger-color); cursor: pointer; font-size: 0.85rem; opacity: 0.8; transition: opacity 0.2s ease;"
      onmouseover="this.style.opacity='1'"
      onmouseout="this.style.opacity='0.8'"
    >
      Delete
    </button>
  `;

  return li;
}

// Add Task Handler
plannerForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const title = taskTitleInput.value.trim();
  const dueDate = taskDateInput.value;

  if (!title || !dueDate) return;

  tasks.push({
    id: Date.now(),
    title,
    dueDate,
    completed: false
  });

  taskTitleInput.value = '';
  taskDateInput.value = '';
  renderTasks();
});

// Toggle Task Completion
function toggleTask(id) {
  tasks = tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task);
  renderTasks();
}

// Delete Task
function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  renderTasks();
}

// Initial Render on Page Load
renderTasks();