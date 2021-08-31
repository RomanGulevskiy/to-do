'use strict';

const todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed');

const todoData = JSON.parse(localStorage.todo);

const render = function() {
    todoList.textContent = '';
    todoCompleted.textContent = '';
    
    todoData.forEach(function(item, index) {
        const li = document.createElement('li');
        li.classList.add('todo-item');
    
        li.innerHTML = '<span class="text-todo">' + item.name + '</span>' +
            '<div class="todo-buttons">' +
                '<button class="todo-remove"></button>' +
                '<button class="todo-complete"></button>' +
            '</div>';
        
        if (item.completed) {
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        }

        const btnTodoComplete = li.querySelector('.todo-complete');

        btnTodoComplete.addEventListener('click', function() {
            item.completed = !item.completed;
            render();
        });

        const btnTodoRemove = li.querySelector('.todo-remove');

        btnTodoRemove.addEventListener('click', function() {
            todoData.splice(index, 1);
            localStorage.todo = JSON.stringify(todoData);
            render();
        });
    });
};

todoControl.addEventListener('submit', function(e) {
    event.preventDefault();

    const newTodo = {
        name: headerInput.value,
        completed: false
    };

    if (newTodo.name.trim() === '') {
        return;
    }

    todoData.push(newTodo);
    localStorage.todo = JSON.stringify(todoData);

    render();
    headerInput.value = '';
});

render();