const form = document.querySelector("#task-form");
const taskInput = document.querySelector("#task");
const taskList = document.querySelector(".list-group");
const clearBtn = document.querySelector("#btn-clear");
const errorForm = document.querySelector(".fill-the-form");
const filterInput = document.querySelector("#filter");

//create empty list warning
const emptyMessage = document.createElement("p");
emptyMessage.className = "empty-list-p m-auto";
emptyMessage.textContent = "Task list is empty!";
taskList.append(emptyMessage);

//submitting a task
form.addEventListener("submit", (e) => {
  //if you dont enter a task
  if (taskInput.value === "") {
    taskInput.classList.add("border-danger");
    errorForm.innerHTML = "please fill the form ...";
    e.preventDefault();
    //after showing error message, when you type a task the error will be gone
    taskInput.addEventListener("keydown", () => {
      if (taskInput.value !== "") {
        taskInput.classList.remove("border-danger");
        errorForm.innerHTML = "";
      }
    });
  } else {
    //create li element
    const li = document.createElement("li");
    li.className = "list-group-item d-flex mt-2";
    li.style.justifyContent = "space-between";

    //import task name into li
    li.appendChild(document.createTextNode(taskInput.value));
    taskList.appendChild(li);
    taskInput.value = "";

    //create button element
    const btn = document.createElement("button");
    btn.className = "btn btn-close close";
    li.appendChild(btn);

    //removes empty message when li element is created
    if (emptyMessage) {
      emptyMessage.remove();
    }

    e.preventDefault();
  }
});

//clear tasks
clearBtn.addEventListener("click", () => {
  if (taskList.children.length > 1) taskList.innerHTML = "";
  else {
    taskList.innerHTML = "";
    taskList.appendChild(emptyMessage);
  }
});

//delete task
taskList.addEventListener("click", (e) => {
  if (e.target.classList.contains("close")) {
    e.target.parentElement.remove();
  }
  if (taskList.children.length == 0) {
    taskList.appendChild(emptyMessage);
  }
});

//Filter task
filterInput.addEventListener("keyup", (e) => {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll(".list-group-item").forEach((task) => {
    const taskText = task.textContent;
    if (taskText.toLowerCase().indexOf(text) != -1) {
      task.classList.add("d-flex");
    } else {
      task.classList.remove("d-flex");
      task.style.display = "none";
    }
  });
});
