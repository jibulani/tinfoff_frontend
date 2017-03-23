"use strict";

var listElement = document.querySelector('.list');
var itemElementList = listElement.children;

var filterElements = document.querySelectorAll('.filters__item');

var templateElement = document.getElementById('todoTemplate');
var templateContainer = 'content' in templateElement ? templateElement.content : templateElement;

var doneTodos = 0;
var undoneTodos = 0;
var filterStatus = "all";
// сформируем задачки
var todoList = [
    {
        name: 'Позвонить в сервис',
        status: 'todo'
    },
    {
        name: 'Купить хлеб',
        status: 'done'
    },
    {
        name: 'Захватить мир',
        status: 'todo'
    },
    {
        name: 'Добавить тудушку в список',
        status: 'todo'
    }
];

// функция по генерации элементов
function addTodoFromTemplate(todo) {
    var newElement = templateContainer.querySelector('.task').cloneNode(true);
    newElement.querySelector('.task__name').textContent = todo.name;
    if (todo.status === 'todo') {
        undoneTodos++;
    }
    else {
        doneTodos++;
    }
    setTodoStatusClassName(newElement, todo.status === 'todo');
    //changeStat();
    if (filterStatus == 'done') {
        newElement.style.display = 'none';
    }
    return newElement;
}

function setTodoStatusClassName(todo, flag) {
    todo.classList.toggle('task_todo', flag);
    todo.classList.toggle('task_done', !flag);
    changeStat();
}

function onListClick(event) {
    var target = event.target;
    var element;

    if (isStatusBtn(target)) {
        element = target.parentNode;
        changeTodoStatus(element);
    }

    if (isDeleteBtn(target)) {
        element = target.parentNode;
        deleteTodo(element);
    }
}

function onFilterClick(event) {
    var target = event.target;
    for (var i = 0; i < filterElements.length; i++){
        filterElements[i].classList.remove('filters__item_selected');
    }
    target.classList.add('filters__item_selected');
    var attrs = target.attributes;
    for(var i = attrs.length - 1; i >= 0; i--) {
        if (attrs[i].name == "data-filter" && attrs[i].value == "done") {
            filterStatus = 'done';
            showDoneTodos();
        }
        else if (attrs[i].name == "data-filter" && attrs[i].value == "todo") {
            filterStatus = 'todo';
            showUndoneTodos();
        }
        else if (attrs[i].name == "data-filter" && attrs[i].value == "all"){
            filterStatus = 'all';
            showAllTodos();
        }
    }
}

function showDoneTodos() {
    [].forEach.call(listElement.children, function(elem) {
        if (elem.classList.contains('task_todo')) {
            elem.style.display = 'none';
        }
        else {
            elem.style.display = '';
        }
    });
}

function showUndoneTodos() {
    [].forEach.call(listElement.children, function(elem) {
        if (elem.classList.contains('task_todo')) {
            elem.style.display = '';
        }
        else {
            elem.style.display = 'none';
        }
    });
}

function showAllTodos() {
    [].forEach.call(listElement.children, function(elem) {
        elem.style.display = '';
    });
}

function isStatusBtn(target) {
    return target.classList.contains('task__status');
}

function isDeleteBtn(target) {
    return target.classList.contains('task__delete-button');
}

function changeTodoStatus(element) {
    var isTodo = element.classList.contains('task_todo');
    if (isTodo) {
        undoneTodos--;
        doneTodos++;
    }
    else {
        undoneTodos++;
        doneTodos--;
    }
    setTodoStatusClassName(element, !isTodo);
    if (filterStatus == 'done') {
        showDoneTodos();
    }
    else if (filterStatus == 'todo') {
        showUndoneTodos();
    }
    else {
        showAllTodos();
    }
}

function deleteTodo(element) {
    if (element.classList.contains('task_todo')){
        undoneTodos--;
    }
    else {
        doneTodos--;
    }
    changeStat();
    listElement.removeChild(element);
}

function onInputKeydown(event) {
    if (event.keyCode !== 13) {
        return;
    }

    var ENTER_KEYCODE = 13;
    if (event.keyCode !== ENTER_KEYCODE) {
        return;
    }

    var todoName = inputElement.value.trim();

    if (todoName.length === 0 || checkIfTodoAlreadyExists(todoName)) {
        return;
    }

    var todo = createNewTodo(todoName);
    insertTodoElement(addTodoFromTemplate(todo));
    inputElement.value = '';
}

function checkIfTodoAlreadyExists(todoName) {
    var todoElements = listElement.querySelectorAll('.task__name');
    var namesList = Array.prototype.map.call(todoElements, function(element) {
        return element.textContent;
    });
    return namesList.indexOf(todoName) > -1;
}

function createNewTodo(name) {
    return {
        name: name,
        status: 'todo'
    }
}

function changeStat() {
    var totalStat = document.querySelector('.statistic__total');
    totalStat.innerHTML = doneTodos + undoneTodos;

    var doneStat = document.querySelector('.statistic__done');
    doneStat.innerHTML = doneTodos;

    var leftStat = document.querySelector('.statistic__left');
    leftStat.innerHTML = undoneTodos;
}

todoList
    .map(addTodoFromTemplate)
    .forEach(insertTodoElement);


listElement.addEventListener('click', onListClick);

var filters = [].map.call(filterElements, function(obj) {
    obj.addEventListener('click', onFilterClick);
});
//[].map.call(filterElements, addEventListener('click', onFilterClick));

var inputElement = document.querySelector('.add-task__input');
inputElement.addEventListener('keydown', onInputKeydown);

// Задача:
// исправьте багу с добавлением insertBefore в пустой массив
// создайте статистику
//
function insertTodoElement(elem) {
    if (listElement.children) {
        listElement.insertBefore(elem, listElement.firstElementChild);
    } else {
        listElement.appendChild(elem);
    }
}
