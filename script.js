const taskInput = document.getElementById("taskInput");
const deadlineInput = document.getElementById("deadlineInput");
const categorySelect = document.getElementById("categorySelect");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let currentFilter = "all";

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateCount() {
  taskCount.textContent = `タスク ${tasks.length} 件`;
}

function renderTasks() {

  taskList.innerHTML = "";

  let filteredTasks = tasks;

  if (currentFilter === "active") {
    filteredTasks = tasks.filter(task => !task.completed);
  }

  if (currentFilter === "completed") {
    filteredTasks = tasks.filter(task => task.completed);
  }

  filteredTasks.forEach((task, index) => {

    const taskElement = document.createElement("div");

    taskElement.classList.add("task");

    if (task.completed) {
      taskElement.classList.add("completed");
    }

    const now = new Date();
    const created = new Date(task.createdAt);

    const diffDays =
      (now - created) / (1000 * 60 * 60 * 24);

    if (diffDays >= 1 && !task.completed) {
      taskElement.classList.add("red");
    }

    taskElement.innerHTML = `
      <div class="task-header">

        <div>
          <div class="task-title">${task.text}</div>

          <div class="task-category">
            ${task.category}
          </div>

          <div class="task-date">
            締切: ${task.deadline || "なし"}
          </div>
        </div>

        <div class="task-buttons">

          <button
            class="complete-btn"
            onclick="toggleComplete(${index})">

            ✓
          </button>

          <button
            class="delete-btn"
            onclick="deleteTask(${index})">

            削除
          </button>

        </div>

      </div>
    `;

    taskList.appendChild(taskElement);

  });

  updateCount();
}

function addTask() {

  const text = taskInput.value.trim();

  if (text === "") return;

  const task = {
    text: text,
    category: categorySelect.value,
    deadline: deadlineInput.value,
    completed: false,
    createdAt: new Date().toISOString()
  };

  tasks.push(task);

  saveTasks();

  renderTasks();

  taskInput.value = "";
  deadlineInput.value = "";
}

function deleteTask(index) {

  tasks.splice(index, 1);

  saveTasks();

  renderTasks();
}

function toggleComplete(index) {

  tasks[index].completed =
    !tasks[index].completed;

  saveTasks();

  renderTasks();
}

function filterTasks(type) {

  currentFilter = type;

  renderTasks();
}

addButton.addEventListener("click", addTask);

renderTasks();
