const form = document.querySelector('.new-task-form');
const task_input = document.querySelector('#task-input');
const task_submit = document.querySelector('#task-submit');
const task_list = document.querySelector('.task-list');
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];



function main() {

    if (localStorage.getItem('tasks')) {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    
    tasks.forEach(task => {
        const task_el = document.createElement('div');
        
        task_el.setAttribute('id', task.id);
        task_el.classList.add('task');
        
        const task_el_content = `
        <div class="content">
            <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""}/>
            <input type="text" class="text" readonly="readonly"  value="${task.text}"/>
        </div>
        <div class="actions">
            <button class="edit">Edit</button>
            <button class="delete">Delete</button>
        </div>
        `
        task_el.innerHTML = task_el_content;

        task_list.appendChild(task_el);

        const edit = task_el.querySelector('.edit');
        const input = task_el.querySelector('.text');
        const remove = task_el.querySelector('.delete');
        const checkbox = task_el.querySelector('.checkbox');

        checkbox.addEventListener('change', (e) =>{
            console.log(e.target.checked);
            const index = tasks.findIndex(item => item.id === task.id);
            if(index != -1) {
                tasks[index].completed = e.target.checked;
                localStorage.setItem('tasks', JSON.stringify(tasks));
            }
        });

        remove.addEventListener('click', () => {
                task_el.remove();
                
                let index = tasks.indexOf(task);
                
                if (index !== -1) {
                    tasks.splice(index, 1);
                    localStorage.setItem('tasks', JSON.stringify(tasks));
                }
            }
        );

        edit.addEventListener('click', () => {
            if(input.hasAttribute('readonly')) {
                input.removeAttribute('readonly');
                input.focus();
                edit.innerText = 'Save';
            } else {
                input.setAttribute('readonly', 'readonly');
                edit.innerText = 'Edit';
                const index = tasks.findIndex(item => item.id === task.id);
                if(index != -1) {
                    tasks[index].text = input.value;
                    localStorage.setItem('tasks', JSON.stringify(tasks));
                }
            }
        });

        task_list.addEventListener('dragstart', handleDragStart);
        task_list.addEventListener('dragover', handleDragOver);
        task_list.addEventListener('drop', handleDrop);

        function handleDragStart(event) {
            event.target.classList.add('dragging');
            event.dataTransfer.setData('text/plain', event.target.innerText);
        }

        function handleDragOver(event) {
            event.preventDefault();
        }

        function handleDrop(event) {
            event.preventDefault();
            const text = event.dataTransfer.getData('text/plain');
            const draggedItem = document.querySelector('.dragging');

            if (draggedItem !== event.target) {
                const taskItems = Array.from(task_list.children);
                const newIndex = taskItems.indexOf(event.target);

                task_list.removeChild(draggedItem);
                task_list.insertBefore(draggedItem, taskItems[newIndex]);

                saveTasks();
            }

            draggedItem.classList.remove('.dragging');
        }

        function saveTasks() {
            const tsks = Array.from(task_list.children).map(task => task.textContent);
            localStorage.setItem('tsks', JSON.stringify(tsks));
        }
    });
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
    })
    
    task_submit.addEventListener('click', () => {
        if(task_input.value.trim() === '') {
            alert('Добавь задачу');
            return;
        }
        
        const task = {
            text: task_input.value,
            created_at: Date.now(),
            id: `id-${Date.now()}`,
            completed: false,
            position: 1000,
        };
        tasks.push(task);

        console.table(tasks);
        
        localStorage.setItem('tasks', JSON.stringify(tasks));

        console.table(task);
        
        const task_el = document.createElement('div');
        
        task_el.setAttribute('id', task.id);
        task_el.classList.add('task');
        
        const task_el_content = `
        <div class="content">
            <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""}/>
            <input type="text" class="text" readonly="readonly"  value="${task_input.value}"/>
        </div>
        <div class="actions">
            <button class="edit">Edit</button>
            <button class="delete">Delete</button>
        </div>
        `
        task_el.innerHTML = task_el_content;
        
        task_list.appendChild(task_el);



        const edit = task_el.querySelector('.edit');
        const input = task_el.querySelector('.text');
        const remove = task_el.querySelector('.delete');
        const checkbox = task_el.querySelector('.checkbox');


        checkbox.addEventListener('change', (e) =>{
            const index = tasks.findIndex(item => item.id === task.id);
            if(index != -1) {
                tasks[index].completed = e.target.checked;
                localStorage.setItem('tasks', JSON.stringify(tasks));
            }
        });

        remove.addEventListener('click', (e) => {
                task_el.remove();
                
                let index = tasks.indexOf(task);
                
                if (index !== -1) {
                    tasks.splice(index, 1);
                }
            }
        );

        edit.addEventListener('click', () => {
            if(input.hasAttribute('readonly')) {
                input.removeAttribute('readonly');
                input.focus();
                edit.innerText = 'Save';
            } else {
                input.setAttribute('readonly', 'readonly');
                edit.innerText = 'Edit';
            }
        });

        task_list.addEventListener('dragstart', handleDragStart);
        task_list.addEventListener('dragover', handleDragOver);
        task_list.addEventListener('drop', handleDrop);

        function handleDragStart(event) {
            event.target.classList.add('dragging');
            event.dataTransfer.setData('text/plain', event.target.innerText);
        }

        function handleDragOver(event) {
            event.preventDefault();
        }

        function handleDrop(event) {
            event.preventDefault();
            const text = event.dataTransfer.getData('text/plain');
            const draggedItem = document.querySelector('.dragging');

            if (draggedItem !== event.target) {
                const taskItems = Array.from(task_list.children);
                const newIndex = taskItems.indexOf(event.target);

                task_list.removeChild(draggedItem);
                task_list.insertBefore(draggedItem, taskItems[newIndex]);

                saveTasks();
            }

            draggedItem.classList.remove('.dragging');
        }

        function saveTasks() {
            const tsks = Array.from(task_list.children).map(task => task.textContent);
            localStorage.setItem('tsks', JSON.stringify(tsks));
        }


    });

    
}


main();