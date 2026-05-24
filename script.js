const taskInput =
document.getElementById("taskInput");

const taskDate =
document.getElementById("taskDate");

const taskCategory =
document.getElementById("taskCategory");

const taskPriority =
document.getElementById("taskPriority");

const addBtn =
document.getElementById("addBtn");

const taskList =
document.getElementById("taskList");

const taskCount =
document.getElementById("taskCount");

const progressBar =
document.getElementById("progressBar");

const progressText =
document.getElementById("progressText");

const filterBtns =
document.querySelectorAll(".filter-btn");



let tasks = [];

let currentFilter = "all";



/* ======================
   追加
====================== */

addBtn.addEventListener("click",()=>{

  const text =
  taskInput.value.trim();

  if(text === ""){
    return;
  }

  const task = {

    id:Date.now(),

    text:text,

    date:
    taskDate.value || "期限なし",

    category:
    taskCategory.value,

    priority:
    taskPriority.value,

    completed:false

  };

  tasks.push(task);

  taskInput.value = "";

  renderTasks();

});



/* ======================
   描画
====================== */

function renderTasks(){

  taskList.innerHTML = "";



  let filteredTasks = tasks;



  if(currentFilter === "active"){

    filteredTasks =
    tasks.filter(
      task => !task.completed
    );

  }



  if(currentFilter === "completed"){

    filteredTasks =
    tasks.filter(
      task => task.completed
    );

  }



  filteredTasks.forEach(task=>{

    const div =
    document.createElement("div");

    div.className = "task-card";



    div.innerHTML = `

      <div class="task-left">

        <h2 class="${
          task.completed
          ? "completed-text"
          : ""
        }">

          ${task.text}

        </h2>

        <p>
          ${task.category}
          ・
          ${task.priority}
        </p>

        <p>
          📅 ${task.date}
        </p>

      </div>



      <div class="task-buttons">

        <button class="done-btn">

          ${
            task.completed
            ? "戻す"
            : "完了"
          }

        </button>



        <button class="edit-btn">

          編集

        </button>



        <button class="delete-btn">

          削除

        </button>

      </div>
    `;



    /* 完了 */

    div.querySelector(".done-btn")
    .addEventListener("click",()=>{

      task.completed =
      !task.completed;

      renderTasks();

    });



    /* 編集 */

    div.querySelector(".edit-btn")
    .addEventListener("click",()=>{

      const newText =
      prompt(
        "タスク編集",
        task.text
      );

      if(newText !== null){

        task.text = newText;

        renderTasks();

      }

    });



    /* 削除 */

    div.querySelector(".delete-btn")
    .addEventListener("click",()=>{

      tasks =
      tasks.filter(
        t => t.id !== task.id
      );

      renderTasks();

    });



    taskList.appendChild(div);

  });



  updateTaskCount();

  updateProgress();

}



/* ======================
   件数
====================== */

function updateTaskCount(){

  taskCount.textContent =

  `タスク ${tasks.length} 件`;

}



/* ======================
   進捗
====================== */

function updateProgress(){

  if(tasks.length === 0){

    progressBar.style.width =
    "0%";

    progressText.textContent =
    "0% 完了";

    return;

  }



  const completed =

  tasks.filter(
    task => task.completed
  ).length;



  const percent = Math.floor(

    completed /
    tasks.length
    * 100

  );



  progressBar.style.width =

  percent + "%";



  progressText.textContent =

  percent + "% 完了";

}



/* ======================
   フィルター
====================== */

filterBtns.forEach(btn=>{

  btn.addEventListener("click",()=>{

    currentFilter =
    btn.dataset.filter;

    renderTasks();

  });

});
