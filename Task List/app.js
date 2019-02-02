// Global Variables
const taskInput = document.querySelector('#task');
const taskForm = document.querySelector('#task-form');
const taskList = document.querySelector('.collection-table');
const clearBtn = document.querySelector('.clear-tasks');
const filterInput = document.querySelector('#filter');

// Event Listeners
document.addEventListener('DOMContentLoaded', localStorageGetTasks);
taskForm.addEventListener('submit', addTask);
taskList.addEventListener('click', removeTask);
clearBtn.addEventListener('click', clearTasks);
filterInput.addEventListener('keyup', filterTasks);


// List functions
function addTask(event) {
    if(taskInput.value === '') {
        alert('Add a task!');
    } else {
        // Creating HTML Table Rows
        const tr = document.createElement('tr');
        tr.className = 'collection-row';

        const link = document.createElement('td');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<input type="submit" value="Remove" class="btn">';
        tr.appendChild(link);

        const theTask = document.createElement('td');
        theTask.className = 'row-item';
        theTask.appendChild(document.createTextNode(taskInput.value));
        tr.appendChild(theTask);

        taskList.appendChild(tr);

        localStorageStoreTask(taskInput.value);

        taskInput.value = '';
        event.preventDefault();
    }
}


function removeTask(event) {
    if(event.target.parentElement.classList.contains('delete-item')){
        event.target.parentElement.parentElement.remove();
        localStorageRemoveTask(event.target.parentElement.parentElement);
    }
}

function clearTasks(event) {
    if(confirm("Are you sure?")) {
        while(taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
            localStorageClearTasks();
        }
    }
}

function filterTasks(event) {
    const text = filterInput.value.toLowerCase();

    let tableRows = document.querySelectorAll('.collection-row');

    tableRows.forEach(function(task) {
        for (i =0; i < tableRows.length; i++) {
            task = tableRows[i].childNodes[1].firstChild.textContent;
            if(task.toLowerCase().indexOf(text) != -1) {
                tableRows[i].style.display = 'block';
            } else {
                tableRows[i].style.display = 'none';
            }
        }
    });
}


// Functions related to browser Local storage for persisting data
function localStorageGetTasks() {
    let tasks;

    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    
    tasks.forEach(function(task) {
        const tr = document.createElement('tr');
        tr.className = 'collection-row';

        const link = document.createElement('td');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<input type="submit" value="Remove" class="btn">';
        tr.appendChild(link);
        taskList.appendChild(tr);

        const theTask = document.createElement('td');
        theTask.className = 'row-item';
        theTask.appendChild(document.createTextNode(task));
        tr.appendChild(theTask);
    });
}

function localStorageRemoveTask(taskItem) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        task = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index) {
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function localStorageStoreTask(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function localStorageClearTasks() {
    localStorage.clear()
}