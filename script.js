const taskInput =
document.getElementById("taskInput");

const categorySelect =
document.getElementById("category");

const dateInput =
document.getElementById("date");

const prioritySelect =
document.getElementById("priority");

const addBtn =
document.getElementById("addBtn");

const taskList =
document.getElementById("taskList");

const taskCount =
document.getElementById("taskCount");

let tasks =
JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks(){

  localStorage.setItem(
    "tasks",
    JSON.stringify(tasks)
  );
}

function renderTasks(filter = "all"){

  taskList.innerHTML = "";

  let filteredTasks = tasks;

  if(filter === "active"){

    filteredTasks =
    tasks.filter(task => !task.done);
  }

  if(filter === "done"){

    filteredTasks =
    tasks.filter(task => task.done);
  }

  taskCount.textContent =
  filteredTasks.length;

  filteredTasks.forEach((task, index) => {

    const div =
    document.createElement("div");

    let priorityClass = "";

    if(task.priority === "高"){
      priorityClass = "high";
    }

    if(task.priority === "中"){
      priorityClass = "middle";
    }

    if(task.priority === "低"){
      priorityClass = "low";
    }

    div.className =
    `task-card ${priorityClass}`;

    div.innerHTML = `

      <div class="task-info">

        <h3 class="
          ${task.done ? "done" : ""}
        ">
          ${task.text}
        </h3>

        <p>
          ${task.category}
          ・
          ${task.priority}
        </p>

        <small>
          📅
          ${task.date || "期限なし"}
        </small>

      </div>

      <div class="task-buttons">

        <button
          class="complete-btn"
          onclick="toggleTask(${index})"
        >
          ${task.done ? "戻す" : "完了"}
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
    `;

    taskList.appendChild(div);

  });

  const doneTasks =
  tasks.filter(task => task.done).length;

  const percent =
  tasks.length === 0
  ? 0
  : Math.floor(
      (doneTasks / tasks.length) * 100
    );

  document.getElementById("progress")
  .style.width = percent + "%";

  document.getElementById("progressText")
  .textContent = percent + "% 完了";

  saveTasks();
}

function addTask(){

  const text =
  taskInput.value.trim();

  if(text === ""){
    return;
  }

  tasks.push({

    text:text,

    category:
    categorySelect.value,

    date:
    dateInput.value,

    priority:
    prioritySelect.value,

    done:false
  });

  taskInput.value = "";

  renderTasks();
}

function deleteTask(index){

  tasks.splice(index, 1);

  renderTasks();
}

function toggleTask(index){

  tasks[index].done =
  !tasks[index].done;

  renderTasks();
}

function editTask(index){

  const newText = prompt(
    "タスク編集",
    tasks[index].text
  );

  if(newText !== null){

    tasks[index].text =
    newText;

    renderTasks();
  }
}

addBtn.addEventListener(
  "click",
  addTask
);

renderTasks();
