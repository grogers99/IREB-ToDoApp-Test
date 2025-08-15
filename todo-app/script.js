// ToDo App JavaScript
class TodoApp {
    constructor() {
        this.todos = this.loadTodos();
        this.currentFilter = 'all';
        this.editingId = null;
        
        this.initializeElements();
        this.bindEvents();
        this.render();
    }

    initializeElements() {
        this.todoInput = document.getElementById('todoInput');
        this.addBtn = document.getElementById('addBtn');
        this.todoList = document.getElementById('todoList');
        this.todoCount = document.getElementById('todoCount');
        this.filterBtns = document.querySelectorAll('.filter-btn');
        this.clearCompletedBtn = document.getElementById('clearCompleted');
    }

    bindEvents() {
        // Add todo events
        this.addBtn.addEventListener('click', () => this.addTodo());
        this.todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTodo();
        });

        // Filter events
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setFilter(e.target.dataset.filter);
            });
        });

        // Clear completed event
        this.clearCompletedBtn.addEventListener('click', () => this.clearCompleted());

        // Todo list events (using event delegation)
        this.todoList.addEventListener('click', (e) => {
            const todoItem = e.target.closest('.todo-item');
            if (!todoItem) return;

            const id = parseInt(todoItem.dataset.id);
            const action = e.target.dataset.action;

            switch (action) {
                case 'toggle':
                    this.toggleTodo(id);
                    break;
                case 'edit':
                    this.editTodo(id);
                    break;
                case 'delete':
                    this.deleteTodo(id);
                    break;
            }
        });

        // Double-click to edit
        this.todoList.addEventListener('dblclick', (e) => {
            const todoItem = e.target.closest('.todo-item');
            if (todoItem && !this.editingId) {
                const id = parseInt(todoItem.dataset.id);
                this.editTodo(id);
            }
        });

        // Global keyboard events
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.editingId) {
                this.cancelEdit();
            }
        });
    }

    // Todo CRUD operations
    addTodo() {
        const text = this.todoInput.value.trim();
        if (!text) return;

        const todo = {
            id: Date.now(),
            text: text,
            completed: false,
            createdAt: new Date().toISOString()
        };

        this.todos.unshift(todo);
        this.todoInput.value = '';
        this.saveTodos();
        this.render();
    }

    toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.saveTodos();
            this.render();
        }
    }

    deleteTodo(id) {
        const todoElement = document.querySelector(`[data-id="${id}"]`);
        if (todoElement) {
            todoElement.classList.add('removing');
            setTimeout(() => {
                this.todos = this.todos.filter(t => t.id !== id);
                this.saveTodos();
                this.render();
            }, 300);
        }
    }

    editTodo(id) {
        if (this.editingId) {
            this.cancelEdit();
        }

        this.editingId = id;
        const todoElement = document.querySelector(`[data-id="${id}"] .todo-text`);
        const currentText = todoElement.textContent;
        
        todoElement.innerHTML = `<input type="text" class="todo-text editing" value="${currentText}" maxlength="100">`;
        const input = todoElement.querySelector('input');
        input.focus();
        input.select();

        const saveEdit = () => {
            const newText = input.value.trim();
            if (newText && newText !== currentText) {
                const todo = this.todos.find(t => t.id === id);
                if (todo) {
                    todo.text = newText;
                    this.saveTodos();
                }
            }
            this.editingId = null;
            this.render();
        };

        const cancelEdit = () => {
            this.editingId = null;
            this.render();
        };

        input.addEventListener('blur', saveEdit);
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') saveEdit();
        });
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                e.preventDefault();
                cancelEdit();
            }
        });
    }

    cancelEdit() {
        this.editingId = null;
        this.render();
    }

    clearCompleted() {
        const completedTodos = this.todos.filter(t => t.completed);
        if (completedTodos.length === 0) return;

        // Add removing animation to completed todos
        completedTodos.forEach(todo => {
            const todoElement = document.querySelector(`[data-id="${todo.id}"]`);
            if (todoElement) {
                todoElement.classList.add('removing');
            }
        });

        setTimeout(() => {
            this.todos = this.todos.filter(t => !t.completed);
            this.saveTodos();
            this.render();
        }, 300);
    }

    // Filter functionality
    setFilter(filter) {
        this.currentFilter = filter;
        
        // Update active filter button
        this.filterBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });

        this.render();
    }

    getFilteredTodos() {
        switch (this.currentFilter) {
            case 'active':
                return this.todos.filter(t => !t.completed);
            case 'completed':
                return this.todos.filter(t => t.completed);
            default:
                return this.todos;
        }
    }

    // Rendering
    render() {
        this.renderTodos();
        this.updateStats();
        this.updateClearButton();
    }

    renderTodos() {
        const filteredTodos = this.getFilteredTodos();
        
        if (filteredTodos.length === 0) {
            this.renderEmptyState();
            return;
        }

        this.todoList.innerHTML = filteredTodos.map(todo => this.createTodoHTML(todo)).join('');
    }

    createTodoHTML(todo) {
        return `
            <li class="todo-item ${todo.completed ? 'completed' : ''}" data-id="${todo.id}">
                <div class="todo-checkbox ${todo.completed ? 'checked' : ''}" data-action="toggle"></div>
                <span class="todo-text ${todo.completed ? 'completed' : ''}" data-action="edit">${this.escapeHtml(todo.text)}</span>
                <div class="todo-actions-btn">
                    <button class="edit-btn" data-action="edit">Edit</button>
                    <button class="delete-btn" data-action="delete">Delete</button>
                </div>
            </li>
        `;
    }

    renderEmptyState() {
        let message = '';
        switch (this.currentFilter) {
            case 'active':
                message = this.todos.length === 0 ? 
                    '<h3>No todos yet</h3><p>Add your first todo above!</p>' :
                    '<h3>All done! 🎉</h3><p>No active todos remaining.</p>';
                break;
            case 'completed':
                message = '<h3>No completed todos</h3><p>Complete some todos to see them here.</p>';
                break;
            default:
                message = '<h3>No todos yet</h3><p>Add your first todo above to get started!</p>';
        }
        
        this.todoList.innerHTML = `<div class="empty-state">${message}</div>`;
    }


    updateStats() {
        const activeTodos = this.todos.filter(t => !t.completed).length;
        const totalTodos = this.todos.length;
        
        let statsText = '';
        if (totalTodos === 0) {
            statsText = 'No items';
        } else if (activeTodos === 0) {
            statsText = 'All done!';
        } else if (activeTodos === 1) {
            statsText = '1 item left';
        } else {
            statsText = `${activeTodos} items left`;
        }
        
        this.todoCount.textContent = statsText;
    }

    updateClearButton() {
        const completedCount = this.todos.filter(t => t.completed).length;
        this.clearCompletedBtn.disabled = completedCount === 0;
        this.clearCompletedBtn.textContent = completedCount > 0 ? 
            `Clear Completed (${completedCount})` : 
            'Clear Completed';
    }

    // Local Storage
    saveTodos() {
        try {
            localStorage.setItem('todos', JSON.stringify(this.todos));
        } catch (error) {
            console.error('Failed to save todos to localStorage:', error);
        }
    }

    loadTodos() {
        try {
            const stored = localStorage.getItem('todos');
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Failed to load todos from localStorage:', error);
            return [];
        }
    }

    // Utility functions
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Clear all todos from localStorage
    clearAllTodos() {
        this.todos = [];
        this.saveTodos();
        this.render();
        console.log('All todos cleared from localStorage');
    }

}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.todoApp = new TodoApp();
    
    // Add some helpful console messages
    console.log('🎉 ToDo App loaded successfully!');
});

// Service Worker registration for offline support (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment the following lines if you want to add a service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });
}
