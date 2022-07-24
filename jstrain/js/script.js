"use strict"

let taskWindow = document.querySelector('.task-window__body');
let button = document.querySelector('.creator-task__create');
let tasks = [];
let deleteButtons = [];
let counterTasks = tasks.length;

function TaskItem (name, inner, id) {
	this.name = name,
	this.inner = inner,
	this.id = id
};

function clearInput(elem) {
	elem.value = '';
}

function createTask() {   //Функция создания задачи
	//задаем переменные для блока задачи
	let task = document.createElement('div');
	let taskName = document.createElement('div');
	let taskInner = document.createElement('div');
	let taskDelete = document.createElement('button');
	let createName = document.querySelector('.creator-task__name');
	let createInner = document.querySelector('.creator-task__inner');
	//присваиваем классы элементам внутри блока
	task.classList.add('task-window__item');
	taskName.classList.add('task-window__name');
	taskInner.classList.add('task-window__inner');
	taskDelete.classList.add('task-window__delete');
	taskDelete.setAttribute('type', 'button');
	//присваиваем значения из формы создания задачи внутрь блока
	if (createName.value && createInner.value) {
		taskName.innerHTML = createName.value;
		taskInner.innerHTML = createInner.value;
		taskDelete.innerHTML = 'Удалить';
		//чистим значения
		clearInput(createName);
		clearInput(createInner);
		//добавляем элементы внутрь блока и сам блок в боди
		task.append(taskName);
		task.append(taskInner);
		task.append(taskDelete);
		//создаём объект через конструктор в массив объектов
		tasks.push(new TaskItem(taskName.innerHTML, taskInner.innerHTML, counterTasks));
		taskDelete.setAttribute('id', `${counterTasks}`);
		taskWindow.append(task);
		console.log(`Ид этой задачи: ${counterTasks}`);
		deleteButtons.push(taskDelete);
		console.log(`Количество кнопок для удаления: ${deleteButtons.length}`);
		console.log(tasks);
		counterTasks++;
	} else {
		alert('Заполни все поля!');
	}
}

function deleteTask(el) {
	let elemId = el.getAttribute('id');
	let elemPred = el.closest('.task-window__item');
	elemPred.remove();
	deleteButtons.splice(elemId, 1);
	tasks.splice(elemId, 1);
	console.log(`Количество кнопок для удаления: ${deleteButtons.length}`);
	console.log(`Количество объектов в массиве: ${tasks.length}`);
	console.log(tasks);
	counterTasks--;
}

window.addEventListener('click', function(event) {
	let elem = event.target;
	if (elem.classList.contains('task-window__delete')){
		deleteTask(elem);
	}
})


button.addEventListener('click', createTask);
window.addEventListener('keypress', function(event) {
	if (event.key == 'Enter') {
		createTask();
	}
})