let tasks = [];

let currentFilter = "all";

function addTask(){

  const text =
    document.getElementById(
      "task-input"
    ).value;

  const date =
    document.getElementById(
      "task-date"
    ).value;

  const category =
    document.getElementById(
      "task-category"
    ).value;

  const priority =
    document.getElementById(
      "task-priority"
    ).value;

  if(text === ""){
    return;
  }

  tasks.push({
    text,
    date,
    category,
    priority,
    completed:false
  });

  document.getElementById(
    "task-input"
  ).value = "";

  renderTasks();
}

function renderTasks(){

  const taskList =
    document.getElementById(
      "task-list"
    );

  taskList.innerHTML = "";

  let filtered = tasks;

  if(currentFilter === "active"){
    filtered = tasks.filter(
      task => !task.completed
    );
  }

  if(currentFilter === "completed"){
    filtered = tasks.filter(
      task => task.completed
    );
  }

  filtered.forEach((task,index)=>{

    const div =
      document.createElement("div");

    div.className =
      `task-item priority-${task.priority}`;

    if(task.completed){
      div.classList.add("completed");
    }

    let priorityText = "";

    if(task.priority === "high"){
      priorityText = "🔥 高";
    }

    if(task.priority === "medium"){
      priorityText = "⚡ 中";
    }

    if(task.priority === "low"){
      priorityText = "🌱 低";
    }

    div.innerHTML = `
      <div class="task-left">

        <div class="task-text">
          ${task.text}
        </div>

        <div class="task-meta">

          <div>
            ${task.category}
            ・
            ${priorityText}
          </div>

          <div>
            📅
            ${task.date || "期限なし"}
          </div>

        </div>

      </div>

      <div class="task-buttons">

        <button
          class="complete-btn"
          onclick="toggleTask(${index})">

          ${task.completed ? "戻す" : "完了"}

        </button>

        <button
          class="edit-btn"
          onclick="editTask(${index})">

          編集

        </button>

        <button
          class="delete-btn"
          onclick="deleteTask(${index})">

          削除

        </button>

      </div>
    `;

    taskList.appendChild(div);

  });

  updateCount();
  updateProgress();
}

function deleteTask(index){

  tasks.splice(index,1);

  renderTasks();
}

function toggleTask(index){

  tasks[index].completed =
    !tasks[index].completed;

  renderTasks();
}

function editTask(index){

  const newText = prompt(
    "編集",
    tasks[index].text
  );

  if(newText){
    tasks[index].text = newText;
  }

  renderTasks();
}

function updateCount(){

  document.getElementById(
    "task-count"
  ).innerText =
    `タスク ${tasks.length} 件`;
}

function updateProgress(){

  const completed =
    tasks.filter(
      task => task.completed
    ).length;

  const percent =
    tasks.length === 0
      ? 0
      : Math.round(
          completed / tasks.length * 100
        );

  document.getElementById(
    "progress"
  ).style.width =
    percent + "%";

  document.getElementById(
    "progress-text"
  ).innerText =
    `${percent}% 完了`;
}

function filterTasks(type,button){

  currentFilter = type;

  document
    .querySelectorAll(".filter-btn")
    .forEach(btn=>{
      btn.classList.remove("active");
    });

  button.classList.add("active");

  renderTasks();
}
