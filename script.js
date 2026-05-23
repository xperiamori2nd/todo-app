const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const categorySelect = document.getElementById("categorySelect");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateCount() {
  taskCount.textContent = `タスク ${tasks.length} 件`;
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const taskElement = document.createElement("div");
    taskElement.classList.add("task");

    const now = new Date();
    const created = new Date(task.createdAt);

    const diffDays =
      (now - created) / (1000 * 60 * 60 * 24);

    if (diffDays >= 1) {
      taskElement.classList.add("red");
    }

    taskElement.innerHTML = `
      <div class="task-header">
        <div>
          <div class="task-title">${task.text}</div>
          <div class="task-category">${task.category}</div>
        </div>

        <button class="delete-btn" onclick="deleteTask(${index})">
          削除
        </button>
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
    createdAt: new Date().toISOString()
  };

  tasks.push(task);

  saveTasks();
  renderTasks();

  taskInput.value = "";
}

function deleteTask(index) {
  tasks.splice(index, 1);

  saveTasks();
  renderTasks();
}

addButton.addEventListener("click", addTask);

renderTasks();
