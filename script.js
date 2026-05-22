let state = {
    tasks: [
        { id: 1, text: "Review JavaScript Closure notes", category: "work", completed: false },
        { id: 2, text: "Buy groceries", category: "personal", completed: true }
    ],
    filters: {
        searchQuery: "",
        category: "all"
    }
};

const todoForm = document.getElementById('todoForm');
const taskInput = document.getElementById('taskInput');
const categoryInput = document.getElementById('categoryInput');
const todoList = document.getElementById('todoList');
const searchInput = document.getElementById('searchInput');
const filterCategory = document.getElementById('filterCategory');
const themeToggle = document.getElementById('themeToggle');
const loader = document.getElementById('loader');
const notificationContainer = document.getElementById('notificationContainer');

function showNotification(message) {
    const toast = document.createElement('div');
    toast.className = 'notification';
    toast.textContent = message;
    notificationContainer.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

async function simulateNetworkSync() {
    loader.style.display = 'block';
    try {
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                Math.random() > 0.05 ? resolve() : reject(new Error("Network Error"));
            }, 400);
        });
    } catch (error) {
        showNotification(`Sync Failed: ${error.message}`);
    } finally {
        loader.style.display = 'none';
    }
}

function render() {
    todoList.innerHTML = '';
    
    let filteredTasks = state.tasks.filter(task => {
        const matchesSearch = task.text.toLowerCase().includes(state.filters.searchQuery.toLowerCase());
        const matchesCategory = state.filters.category === 'all' || task.category === state.filters.category;
        return matchesSearch && matchesCategory;
    });

    filteredTasks.forEach(task => {
        const item = document.createElement('div');
        item.className = `todo-item ${task.completed ? 'completed' : ''}`;
        item.dataset.id = task.id;

        item.innerHTML = `
            <span class="category-tag tag-${task.category}">${task.category.toUpperCase()}</span>
            <span class="task-text">${task.text}</span>
            <button class="btn btn-danger btn-delete">Delete</button>
        `;
        todoList.appendChild(item);
    });

    const total = state.tasks.length;
    const completed = state.tasks.filter(t => t.completed).length;
    document.getElementById('statTotal').textContent = total;
    document.getElementById('statCompleted').textContent = completed;
    document.getElementById('statPending').textContent = total - completed;
}

function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

todoForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const text = taskInput.value.trim();
    if (!text) return;

    const newTask = {
        id: Date.now(),
        text: text,
        category: categoryInput.value,
        completed: false
    };

    state.tasks.push(newTask);
    taskInput.value = '';
    
    showNotification("Task added successfully!");
    await simulateNetworkSync();
    render();
});

todoList.addEventListener('click', async (e) => {
    const itemEl = e.target.closest('.todo-item');
    if (!itemEl) return;
    const taskId = parseInt(itemEl.dataset.id);

    if (e.target.classList.contains('btn-delete')) {
        state.tasks = state.tasks.filter(t => t.id !== taskId);
        showNotification("Task deleted.");
        await simulateNetworkSync();
        render();
        return;
    }

    if (e.target.classList.contains('task-text')) {
        const task = state.tasks.find(t => t.id === taskId);
        task.completed = !task.completed;
        showNotification(task.completed ? "Task completed!" : "Task marked pending.");
        await simulateNetworkSync();
        render();
    }
});

todoList.addEventListener('dblclick', (e) => {
    if (!e.target.classList.contains('task-text')) return;
    
    const itemEl = e.target.closest('.todo-item');
    const taskId = parseInt(itemEl.dataset.id);
    const task = state.tasks.find(t => t.id === taskId);

    const input = document.createElement('input');
    input.type = 'text';
    input.value = task.text;
    input.className = 'edit-input';
    
    e.target.replaceWith(input);
    input.focus();

    const saveChanges = async () => {
        const updatedText = input.value.trim();
        if (updatedText && updatedText !== task.text) {
            task.text = updatedText;
            showNotification("Task updated.");
            await simulateNetworkSync();
        }
        render();
    };

    input.addEventListener('blur', saveChanges);
    input.addEventListener('keypress', (keypressEvent) => {
        if (keypressEvent.key === 'Enter') saveChanges();
    });
});

// Search and Filter Listeners
const handleSearch = debounce((e) => {
    state.filters.searchQuery = e.target.value;
    render();
}, 300);

searchInput.addEventListener('input', handleSearch);

filterCategory.addEventListener('change', (e) => {
    state.filters.category = e.target.value;
    render();
});

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    themeToggle.textContent = document.body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
});

render();
