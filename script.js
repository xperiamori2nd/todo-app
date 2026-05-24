const taskInput = document.getElementById("taskInput");
const taskDate = document.getElementById("taskDate");
const taskCategory = document.getElementById("taskCategory");
const taskPriority = document.getElementById("taskPriority");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");

const filterAll = document.getElementById("filterAll");
const filterActive = document.getElementById("filterActive");
const filterDone = document.getElementById("filterDone");

const progressText = document.getElementById("progressText");
const progressBar = document.getElementById("progressBar");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

renderTasks();

addBtn.addEventListener("click", addTask);

filterAll.addEventListener("click", () => {
  currentFilter = "all";
  renderTasks();
});

filterActive.addEventListener("click", () => {
  currentFilter = "active";
  renderTasks();
});

filterDone.addEventListener("click", () => {
  currentFilter = "done";
  renderTasks();
});

function addTask() {
  const text = taskInput.value.trim();

  if (text === "") return;

  const task = {
    id: Date.now(),
    text: text,
    date: taskDate.value || "日付なし",
    category: taskCategory.value,
    priority: taskPriority.value || "中",
    completed: false
  };

  tasks.push(task);

  saveTasks();
  renderTasks();

  taskInput.value = "";
}

function renderTasks() {
  taskList.innerHTML = "";

  let filteredTasks = tasks;

  if (currentFilter === "active") {
    filteredTasks = tasks.filter(task => !task.completed);
  }

  if (currentFilter === "done") {
    filteredTasks = tasks.filter(task => task.completed);
  }

  filteredTasks.forEach(task => {
    // 古いデータ対応
    if (!task.priority) {
      task.priority = "中";
    }

    const li = document.createElement("li");
    li.className = "task-item";

    if (task.completed) {
      li.classList.add("completed");
    }

    // 優先度カラー
    if (task.priority === "高") {
      li.classList.add("high");
    } else if (task.priority === "中") {
      li.classList.add("medium");
    } else {
      li.classList.add("low");
    }

    li.innerHTML = `
      <div class="task-info">
        <h3>${task.text}</h3>

        <p>
          ${task.category}
          ・
          ${task.priority}
        </p>

        <span>📅 ${task.date}</span>
      </div>

      <div class="task-buttons">
        <button class="complete-btn">
          ${task.completed ? "戻す" : "完了"}
        </button>

        <button class="edit-btn">
          編集
        </button>

        <button class="delete-btn">
          削除
        </button>
      </div>
    `;

    // 完了ボタン
    li.querySelector(".complete-btn").addEventListener("click", () => {
      task.completed = !task.completed;
      saveTasks();
      renderTasks();
    });

    // 編集ボタン
    li.querySelector(".edit-btn").addEventListener("click", () => {
      const newText = prompt("タスク編集", task.text);

      if (newText !== null && newText.trim() !== "") {
        task.text = newText.trim();
        saveTasks();
        renderTasks();
      }
    });

    // 削除ボタン
    li.querySelector(".delete-btn").addEventListener("click", () => {
      tasks = tasks.filter(t => t.id !== task.id);
      saveTasks();
      renderTasks();
    });

    taskList.appendChild(li);
  });

  taskCount.textContent = tasks.length;

  updateProgress();
}

function updateProgress() {
  const completedTasks = tasks.filter(task => task.completed).length;

  const percent =
    tasks.length === 0
      ? 0
      : Math.round((completedTasks / tasks.length) * 100);

  progressText.textContent = `${percent}% 完了`;

  progressBar.style.width = `${percent}%`;
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
