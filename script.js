const taskInput = document.getElementById("taskInput");
const taskDate = document.getElementById("taskDate");
const taskCategory = document.getElementById("taskCategory");
const taskPriority = document.getElementById("taskPriority");

const addBtn = document.getElementById("addBtn");

const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");

const progressText = document.getElementById("progressText");
const progressBar = document.getElementById("progressBar");

const filterButtons = document.querySelectorAll(".filter-btn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";


// 保存
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}


// 追加
function addTask() {

  const text = taskInput.value.trim();

  if (text === "") {
    alert("タスクを入力してください");
    return;
  }

  const newTask = {
    id: Date.now(),
    text: text,
    date: taskDate.value || "",
    category: taskCategory.value,
    priority: taskPriority.value,
    completed: false
  };

  // ← これ超重要
  tasks.push(newTask);

  saveTasks();

  renderTasks();

  taskInput.value = "";
}


// 表示
function renderTasks() {

  taskList.innerHTML = "";

  let filteredTasks = tasks;

  if (currentFilter === "active") {
    filteredTasks = tasks.filter(task => !task.completed);
  }

  if (currentFilter === "completed") {
    filteredTasks = tasks.filter(task => task.completed);
  }

  filteredTasks.forEach(task => {

    const div = document.createElement("div");

    div.className = "task-card";

    // 優先度カラー
    if (task.priority === "高") {
      div.classList.add("high");
    }

    if (task.priority === "中") {
      div.classList.add("medium");
    }

    if (task.priority === "低") {
      div.classList.add("low");
    }

    div.innerHTML = `

      <div class="task-left">

        <h3 class="${task.completed ? "done" : ""}">
          ${task.text}
        </h3>

        <p>
          ${task.category} ・ ${task.priority}
        </p>

        <span>
          📅 ${task.date || "期限なし"}
        </span>

      </div>

      <div class="task-buttons">

        <button class="complete-btn">
          ${task.completed ? "戻す" : "完了"}
        </button>

        <button class="delete-btn">
          削除
        </button>

      </div>
    `;

    // 完了ボタン
    div.querySelector(".complete-btn").addEventListener("click", () => {

      task.completed = !task.completed;

      saveTasks();

      renderTasks();
    });

    // 削除ボタン
    div.querySelector(".delete-btn").addEventListener("click", () => {

      tasks = tasks.filter(t => t.id !== task.id);

      saveTasks();

      renderTasks();
    });

    taskList.appendChild(div);

  });

  updateTaskCount();

  updateProgress();
}


// 件数
function updateTaskCount() {
  taskCount.textContent = tasks.length;
}


// 進捗
function updateProgress() {

  if (tasks.length === 0) {

    progressText.textContent = "0% 完了";
    progressBar.style.width = "0%";

    return;
  }

  const completed = tasks.filter(task => task.completed).length;

  const percent = Math.round((completed / tasks.length) * 100);

  progressText.textContent = `${percent}% 完了`;

  progressBar.style.width = `${percent}%`;
}


// フィルター
filterButtons.forEach(button => {

  button.addEventListener("click", () => {

    currentFilter = button.dataset.filter;

    renderTasks();
  });
});


// ボタン
addBtn.addEventListener("click", addTask);


// 初回表示
renderTasks();
