const taskInput = document.getElementById("taskInput");
const categorySelect = document.getElementById("category");
const dateInput = document.getElementById("date");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks(){
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(filter = "all"){

  taskList.innerHTML = "";

  let filteredTasks = tasks;

  if(filter === "active"){
    filteredTasks = tasks.filter(task => !task.done);
  }

  if(filter === "done"){
    filteredTasks = tasks.filter(task => task.done);
  }

  taskCount.textContent = filteredTasks.length;

  filteredTasks.forEach((task, index) => {

    const div = document.createElement("div");

    div.className = "task-card";

    div.innerHTML = `
      <div class="task-info">

        <h3 style="
          ${task.done ? "text-decoration:line-through;opacity:0.5;" : ""}
        ">
          ${task.text}
        </h3>

        <p>${task.category}</p>

        <small>
          📅 ${task.date || "期限なし"}
        </small>

      </div>

      <div class="task-buttons">

        <button onclick="toggleTask(${index})">
          ${task.done ? "戻す" : "完了"}
        </button>

        <button onclick="deleteTask(${index})">
          削除
        </button>

      </div>
    `;

    taskList.appendChild(div);

  });

  saveTasks();
}

function addTask(){

  const text = taskInput.value.trim();

  if(text === ""){
    return;
  }

  tasks.push({
    text:text,
    category:categorySelect.value,
    date:dateInput.value,
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

  tasks[index].done = !tasks[index].done;

  renderTasks();
}

addBtn.addEventListener("click", addTask);

renderTasks();
