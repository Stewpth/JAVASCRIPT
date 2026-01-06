let todoList = JSON.parse(localStorage.getItem('todoList')) || [];

renderTodoList();

function renderTodoList() {
    let addTodo = '';

    for (let i = 0; i < todoList.length; i++) {
        const list = todoList[i];
        const name = list.name;
        const dueDate = list.date;
        const addHTML = `
            <div class="list-align">${name}</div>
            <div class="list-align">${dueDate}</div>
            <button class="delete-button" onclick="
                todoList.splice(${i}, 1);
                renderTodoList();
            ">Delete</button>
        `;
        addTodo += addHTML;
    }

    document.querySelector('.js-todo-container').innerHTML = addTodo;
}

function addTodoList() {
    const nameInput = document.querySelector('.js-todo-input');
    const name = nameInput.value;

    const dueDate = document.querySelector('.js-todo-date');
    const date = dueDate.value;

    todoList.push({
        name, date
    });

    localStorage.setItem('todoList', JSON.stringify(todoList));

    nameInput.value = '';
    dueDate.value = '';

    renderTodoList();
}



