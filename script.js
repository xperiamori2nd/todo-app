const taskInput = document.getElementById("taskInput");
const taskDate = document.getElementById("taskDate");
const taskCategory = document.getElementById("taskCategory");
const taskPriority = document.getElementById("taskPriority");

const addBtn = document.getElementById("addBtn");

const taskList = document.getElementById("taskList");

const taskCount = document.getElementById("taskCount");

const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");

const filterButtons = document.querySelectorAll(".filter-btn");

let tasks = [];

let currentFilter = "all";



/* =========================
   タスク追加
========================= */

addBtn.addEventListener("click", () => {

  const text = taskInput.value.trim();

  if (text === "") {
    alert("タスクを入力してください");
    return;
  }

  const task = {
    text: text,
    date: taskDate.value,
    category: taskCategory.value,
    priority: taskPriority.value,
    completed: false
  };

  tasks.push(task);

  taskInput.value = "";

  renderTasks();
});



/* =========================
   表示
========================= */

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

    const taskItem = document.createElement("div");

    taskItem.innerHTML = `
      <div class="task-card ${task.completed ? "completed" : ""}">

        <div class="task-left">

          <h2>${task.text}</h2>

          <p>
            ${task.category} ・ ${task.priority}
          </p>

          <p>
            📅 ${task.date}
          </p>

        </div>

        <div class="task-buttons">

          <button
            class="complete-btn"
            onclick="toggleTask(${index})"
          >
            ${task.completed ? "戻す" : "完了"}
          </button>

          <button
            class="edit-btn"
            onclick="editTask(${index})"
          >
            編集
          </button>

          <button
            class="delete-btn"
            onclick="deleteTask(${index})"
          >
            削除
          </button>

        </div>

      </div>
    `;

    taskList.appendChild(taskItem);

  });

  updateTaskCount();

  updateProgress();

}



/* =========================
   完了切替
========================= */

function toggleTask(index) {

  tasks[index].completed = !tasks[index].completed;

  renderTasks();
}



/* =========================
   削除
========================= */

function deleteTask(index) {

  tasks.splice(index, 1);

  renderTasks();
}



/* =========================
   編集
========================= */

function editTask(index) {

  const newText = prompt(
    "タスク編集",
    tasks[index].text
  );

  if (newText !== null && newText.trim() !== "") {

    tasks[index].text = newText;

    renderTasks();
  }
}



/* =========================
   件数
========================= */

function updateTaskCount() {

  taskCount.textContent =
    `タスク ${tasks.length} 件`;
}



/* =========================
   進捗
========================= */

function updateProgress() {

  if (tasks.length === 0) {

    progressBar.style.width = "0%";

    progressText.textContent = "0% 完了";

    return;
  }

  const completedTasks =
    tasks.filter(task => task.completed).length;

  const percent =
    Math.round(
      (completedTasks / tasks.length) * 100
    );

  progressBar.style.width = percent + "%";

  progressText.textContent =
    `${percent}% 完了`;
}



/* =========================
   フィルター
========================= */

filterButtons.forEach(button => {

  button.addEventListener("click", () => {

    currentFilter = button.dataset.filter;

    renderTasks();
  });

});
