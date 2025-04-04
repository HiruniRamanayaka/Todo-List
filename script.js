document.addEventListener("DOMContentLoaded", loadTasks);

const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

addTaskBtn.addEventListener("click", addTask);
taskList.addEventListener("click", modifyTask);

function addTask() {
    const taskText = taskInput.value.trim();
    if (!taskText) return;

    const taskItem = document.createElement("li");
    taskItem.innerHTML = `
        <span>${taskText}</span>
        <button class="delete">X</button>
    `;
    taskList.appendChild(taskItem);
    saveTask(taskText);
    taskInput.value = "";
}

function modifyTask(e) {
    if (e.target.classList.contains("delete")) {
        const taskText = e.target.previousElementSibling.textContent.trim(); 
        e.target.parentElement.remove(); // Remove from DOM
        removeTask(taskText); // Remove from localStorage
    } else {
        e.target.classList.toggle("completed");
    }
}

function saveTask(task){
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks(){
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        const taskItem = document.createElement("li");
        taskItem.innerHTML = `
            <span>${task}</span>
            <button class="delete">X</button>
        `;
        taskList.appendChild(taskItem);
    });
}

function removeTask(task){
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(t => t.trim() !== task.trim());
    localStorage.setItem("tasks", JSON.stringify(tasks));
}