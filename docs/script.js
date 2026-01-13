// ToDo App JavaScript

// ============================================
// DATA MODELS (Extended for Multi-User Support)
// ============================================

// User model for simulated multi-user support
class User {
    constructor(id, name, role, avatar = null) {
        this.id = id;
        this.name = name;
        this.role = role; // 'manager' | 'team_member'
        this.avatar = avatar;
    }
}

// Extended Task model with assignment and subtask support
class Task {
    constructor(id, text, createdBy, assignedTo = null, parentTaskId = null) {
        this.id = id;
        this.text = text;
        this.completed = false;
        this.createdAt = new Date().toISOString();
        this.createdBy = createdBy;  // User ID who created the task
        this.assignedTo = assignedTo; // User ID assigned to (null = unassigned)
        this.parentTaskId = parentTaskId; // For subtasks: ID of parent task
    }
}

// ============================================
// MAIN APPLICATION CLASS
// ============================================

class TodoApp {
    constructor() {
        this.todos = [];
        this.users = [];
        this.currentUser = null;
        this.currentFilter = 'all';
        this.editingId = null;
        this.currentView = 'personal'; // 'personal' | 'team'
        
        // Initialize data stores
        this.initializeData();
        
        this.initializeElements();
        this.bindEvents();
        this.render();
    }

    // Initialize users and load todos
    initializeData() {
        this.loadUsers();
        this.setCurrentUser(this.users[0]); // Default to first user
        this.todos = this.loadTodos();
    }

    // User Management Methods
    loadUsers() {
        try {
            const stored = localStorage.getItem('users');
            if (stored) {
                this.users = JSON.parse(stored);
            } else {
                // Initialize with sample users
                this.users = [
                    new User(1, 'Alice Manager', 'manager'),
                    new User(2, 'Bob Developer', 'team_member'),
                    new User(3, 'Carol Designer', 'team_member'),
                    new User(4, 'Dave Tester', 'team_member')
                ];
                this.saveUsers();
            }
        } catch (error) {
            console.error('Failed to load users:', error);
            // Fallback to default users
            this.users = [
                new User(1, 'Alice Manager', 'manager'),
                new User(2, 'Bob Developer', 'team_member'),
                new User(3, 'Carol Designer', 'team_member'),
                new User(4, 'Dave Tester', 'team_member')
            ];
        }
    }

    saveUsers() {
        try {
            localStorage.setItem('users', JSON.stringify(this.users));
        } catch (error) {
            console.error('Failed to save users:', error);
        }
    }

    setCurrentUser(user) {
        this.currentUser = user;
        try {
            localStorage.setItem('currentUserId', user.id);
        } catch (error) {
            console.error('Failed to save current user:', error);
        }
        this.renderUserIndicator();
    }

    getCurrentUser() {
        return this.currentUser;
    }

    getAllUsers() {
        return this.users;
    }

    getTeamMembers() {
        return this.users.filter(u => u.role === 'team_member');
    }

    getUserById(id) {
        return this.users.find(u => u.id === id);
    }

    renderUserIndicator() {
        const indicator = document.getElementById('currentUserIndicator');
        if (indicator && this.currentUser) {
            indicator.textContent = `Logged in as: ${this.currentUser.name} (${this.currentUser.role})`;
        }
    }

    renderUserSelect() {
        const select = document.getElementById('userSelect');
        if (!select) return;
        
        select.innerHTML = this.users.map(user => 
            `<option value="${user.id}" ${this.currentUser?.id === user.id ? 'selected' : ''}>${this.escapeHtml(user.name)} (${user.role})</option>`
        ).join('');
    }

    renderAssigneeSelect() {
        if (!this.assigneeSelect) return;
        
        // Populate with team members
        this.assigneeSelect.innerHTML = '<option value="">Unassigned</option>' + 
            this.getTeamMembers().map(user => 
                `<option value="${user.id}">${this.escapeHtml(user.name)}</option>`
            ).join('');
    }

    initializeElements() {
        this.todoInput = document.getElementById('todoInput');
        this.addBtn = document.getElementById('addBtn');
        this.todoList = document.getElementById('todoList');
        this.todoCount = document.getElementById('todoCount');
        this.filterBtns = document.querySelectorAll('.filter-btn');
        this.clearCompletedBtn = document.getElementById('clearCompleted');
        this.userSelect = document.getElementById('userSelect');
        this.viewToggle = document.getElementById('viewToggle');
        this.assigneeSelect = document.getElementById('assigneeSelect');
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

        // User selection event
        if (this.userSelect) {
            this.userSelect.addEventListener('change', (e) => {
                const userId = parseInt(e.target.value);
                const user = this.getUserById(userId);
                if (user) {
                    this.setCurrentUser(user);
                    this.render();
                }
            });
        }

        // View toggle event
        if (this.viewToggle) {
            this.viewToggle.addEventListener('click', () => {
                this.toggleView();
            });
        }

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
                case 'add-subtask':
                    this.addSubtask(id);
                    break;
                case 'expand':
                    this.toggleExpand(id);
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

    // View management
    toggleView() {
        this.currentView = this.currentView === 'personal' ? 'team' : 'personal';
        this.render();
    }

    getCurrentView() {
        return this.currentView;
    }

    // Todo CRUD operations
    addTodo() {
        const text = this.todoInput.value.trim();
        if (!text) return;

        const assigneeId = this.assigneeSelect ? parseInt(this.assigneeSelect.value) || null : null;

        const todo = {
            id: Date.now(),
            text: text,
            completed: false,
            createdAt: new Date().toISOString(),
            createdBy: this.currentUser ? this.currentUser.id : 1,
            assignedTo: assigneeId,
            parentTaskId: null
        };

        this.todos.unshift(todo);
        this.todoInput.value = '';
        if (this.assigneeSelect) {
            this.assigneeSelect.value = '';
        }
        this.saveTodos();
        this.render();
    }

    // Subtask creation
    addSubtask(parentId) {
        const parentTodo = this.todos.find(t => t.id === parentId);
        if (!parentTodo) return;

        // Get parent assignee name for display
        const parentAssignee = parentTodo.assignedTo ? this.getUserById(parentTodo.assignedTo) : null;
        const parentAssigneeName = parentAssignee ? parentAssignee.name : 'Unassigned';

        // Create a modal for subtask creation
        const teamMembers = this.getTeamMembers();
        const assigneeOptions = teamMembers.map(m => 
            `<option value="${m.id}" ${m.id === parentTodo.assignedTo ? 'selected' : ''}>${this.escapeHtml(m.name)}</option>`
        ).join('');

        const subtaskHtml = `
            <div class="modal-overlay" id="subtaskModal">
                <div class="modal-content">
                    <h3>Add Subtask</h3>
                    <div class="modal-body">
                        <label>Title:</label>
                        <input type="text" id="subtaskTitle" maxlength="100" placeholder="Enter subtask title">
                        <label>Assigned To:</label>
                        <select id="subtaskAssignee">
                            <option value="">Unassigned</option>
                            ${assigneeOptions}
                        </select>
                        <p class="hint">Defaults to parent task assignee (${parentAssigneeName})</p>
                    </div>
                    <div class="modal-actions">
                        <button class="cancel-btn" id="cancelSubtask">Cancel</button>
                        <button class="confirm-btn" id="confirmSubtask">Add Subtask</button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', subtaskHtml);
        
        const modal = document.getElementById('subtaskModal');
        const titleInput = document.getElementById('subtaskTitle');
        const assigneeSelect = document.getElementById('subtaskAssignee');
        const cancelBtn = document.getElementById('cancelSubtask');
        const confirmBtn = document.getElementById('confirmSubtask');

        // Focus title input
        setTimeout(() => titleInput.focus(), 100);

        const closeModal = () => {
            modal.remove();
        };

        const confirmSubtask = () => {
            const text = titleInput.value.trim();
            if (!text) {
                titleInput.focus();
                return;
            }

            const assigneeId = assigneeSelect.value ? parseInt(assigneeSelect.value) : null;

            const subtask = {
                id: Date.now(),
                text: text,
                completed: false,
                createdAt: new Date().toISOString(),
                createdBy: this.currentUser ? this.currentUser.id : 1,
                assignedTo: assigneeId,
                parentTaskId: parentId
            };

            this.todos.unshift(subtask);
            this.saveTodos();
            this.render();
            closeModal();
        };

        cancelBtn.addEventListener('click', closeModal);
        confirmBtn.addEventListener('click', confirmSubtask);
        
        titleInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') confirmSubtask();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
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
                // Also delete subtasks
                this.todos = this.todos.filter(t => t.id !== id && t.parentTaskId !== id);
                this.saveTodos();
                this.render();
            }, 300);
        }
    }

    editTodo(id) {
        if (this.editingId) {
            this.cancelEdit();
        }

        const todo = this.todos.find(t => t.id === id);
        if (!todo) return;

        const isSubtask = todo.parentTaskId !== null;
        const currentText = todo.text;
        
        // For subtasks, show a modal with title and assignee
        if (isSubtask) {
            this.openEditSubtaskModal(todo);
            return;
        }

        // For parent tasks, use inline editing
        const todoElement = document.querySelector(`[data-id="${id}"] .todo-text`);
        
        todoElement.innerHTML = `<input type="text" class="todo-text editing" value="${currentText}" maxlength="100">`;
        const input = todoElement.querySelector('input');
        input.focus();
        input.select();

        const saveEdit = () => {
            const newText = input.value.trim();
            if (newText && newText !== currentText) {
                todo.text = newText;
                this.saveTodos();
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

    // Open modal for editing subtask (title + assignee)
    openEditSubtaskModal(todo) {
        const teamMembers = this.getTeamMembers();
        const assigneeOptions = teamMembers.map(m => 
            `<option value="${m.id}" ${m.id === todo.assignedTo ? 'selected' : ''}>${this.escapeHtml(m.name)}</option>`
        ).join('');

        const editHtml = `
            <div class="modal-overlay" id="editSubtaskModal">
                <div class="modal-content">
                    <h3>Edit Subtask</h3>
                    <div class="modal-body">
                        <label>Title:</label>
                        <input type="text" id="editSubtaskTitle" maxlength="100" value="${this.escapeHtml(todo.text)}">
                        <label>Assigned To:</label>
                        <select id="editSubtaskAssignee">
                            <option value="">Unassigned</option>
                            ${assigneeOptions}
                        </select>
                    </div>
                    <div class="modal-actions">
                        <button class="cancel-btn" id="cancelEditSubtask">Cancel</button>
                        <button class="confirm-btn" id="saveEditSubtask">Save Changes</button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', editHtml);
        
        const modal = document.getElementById('editSubtaskModal');
        const titleInput = document.getElementById('editSubtaskTitle');
        const assigneeSelect = document.getElementById('editSubtaskAssignee');
        const cancelBtn = document.getElementById('cancelEditSubtask');
        const saveBtn = document.getElementById('saveEditSubtask');

        setTimeout(() => titleInput.focus(), 100);
        titleInput.select();

        const closeModal = () => {
            modal.remove();
        };

        const saveChanges = () => {
            const newText = titleInput.value.trim();
            if (!newText) {
                titleInput.focus();
                return;
            }

            todo.text = newText;
            todo.assignedTo = assigneeSelect.value ? parseInt(assigneeSelect.value) : null;
            
            this.saveTodos();
            this.render();
            closeModal();
        };

        cancelBtn.addEventListener('click', closeModal);
        saveBtn.addEventListener('click', saveChanges);
        
        titleInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') saveChanges();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
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
        let filtered = this.todos;
        
        // Filter by view
        if (this.currentView === 'personal') {
            // Show tasks created by or assigned to current user
            filtered = filtered.filter(t => 
                t.createdBy === this.currentUser?.id || 
                t.assignedTo === this.currentUser?.id
            );
        }
        
        // Filter by status
        switch (this.currentFilter) {
            case 'active':
                return filtered.filter(t => !t.completed);
            case 'completed':
                return filtered.filter(t => t.completed);
            default:
                return filtered;
        }
    }

    // Get tasks for a specific user (for manager view)
    getTasksForUser(userId) {
        return this.todos.filter(t => t.assignedTo === userId);
    }

    // Get subtasks for a task
    getSubtasks(parentId) {
        return this.todos.filter(t => t.parentTaskId === parentId);
    }

    // Get root tasks (tasks without parent)
    getRootTasks() {
        return this.todos.filter(t => t.parentTaskId === null);
    }

    // Expand/collapse subtasks
    toggleExpand(taskId) {
        const element = document.querySelector(`[data-id="${taskId}"]`);
        if (element) {
            element.classList.toggle('expanded');
        }
    }

    // Get parent task
    getParentTask(subtaskId) {
        const subtask = this.todos.find(t => t.id === subtaskId);
        if (subtask && subtask.parentTaskId) {
            return this.todos.find(t => t.id === subtask.parentTaskId);
        }
        return null;
    }

    // Calculate subtask progress for a parent task
    getSubtaskProgress(parentId) {
        const subtasks = this.getSubtasks(parentId);
        if (subtasks.length === 0) return null;
        const completed = subtasks.filter(t => t.completed).length;
        return { completed, total: subtasks.length, percentage: Math.round((completed / subtasks.length) * 100) };
    }

    // Rendering
    render() {
        this.renderTodos();
        this.updateStats();
        this.updateClearButton();
        this.renderUserIndicator();
        this.renderUserSelect();
        this.renderAssigneeSelect();
        this.renderViewToggle();
    }

    renderViewToggle() {
        const toggle = document.getElementById('viewToggle');
        if (toggle) {
            const isManager = this.currentUser?.role === 'manager';
            toggle.style.display = isManager ? 'block' : 'none';
            toggle.textContent = this.currentView === 'personal' ? 'View Team' : 'View My Tasks';
        }
    }

    renderTodos() {
        const filteredTodos = this.getFilteredTodos();
        
        if (filteredTodos.length === 0) {
            this.renderEmptyState();
            return;
        }

        if (this.currentView === 'team' && this.currentUser?.role === 'manager') {
            this.renderTeamView();
        } else {
            // Render root tasks with their subtasks nested
            const rootTasks = filteredTodos.filter(t => t.parentTaskId === null);
            this.todoList.innerHTML = rootTasks.map(todo => this.createTodoHTML(todo)).join('');
        }
    }

    renderTeamView() {
        // Group tasks by team member
        const teamMembers = this.getTeamMembers();
        let html = '';
        
        teamMembers.forEach(member => {
            const memberTasks = this.getTasksForUser(member.id);
            const activeCount = memberTasks.filter(t => !t.completed).length;
            const completedCount = memberTasks.filter(t => t.completed).length;
            
            html += `
                <li class="team-member-group" data-user-id="${member.id}">
                    <div class="team-member-header">
                        <h3 class="team-member-name">${this.escapeHtml(member.name)}</h3>
                        <span class="team-stats">${activeCount} active, ${completedCount} completed</span>
                    </div>
                    <ul class="team-tasks">
                        ${memberTasks.length > 0 
                            ? memberTasks.map(todo => this.createTodoHTML(todo)).join('')
                            : '<li class="no-tasks">No tasks assigned</li>'
                        }
                    </ul>
                </li>
            `;
        });
        
        this.todoList.innerHTML = html;
    }

    createTodoHTML(todo) {
        const assignee = this.getUserById(todo.assignedTo);
        const creator = this.getUserById(todo.createdBy);
        const isSubtask = todo.parentTaskId !== null;
        const subtasks = this.getSubtasks(todo.id);
        const progress = this.getSubtaskProgress(todo.id);
        
        // Generate subtask HTML if this is a parent task
        let subtasksHtml = '';
        if (subtasks.length > 0) {
            subtasksHtml = `
                <div class="subtask-wrapper">
                    <ul class="subtask-list">
                        ${subtasks.map(subtask => this.createSubtaskHTML(subtask)).join('')}
                    </ul>
                </div>
            `;
        }
        
        // Parent task actions
        let parentActions = '';
        if (!isSubtask) {
            parentActions = `<button class="add-subtask-btn" data-action="add-subtask">+ Subtask</button>`;
        }
        
        // Progress bar
        let progressHtml = '';
        if (progress) {
            progressHtml = `
                <div class="subtask-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${progress.percentage}%"></div>
                    </div>
                    <span class="progress-text">${progress.completed}/${progress.total} (${progress.percentage}%)</span>
                </div>
            `;
        }
        
        return `
            <div class="subtask-container">
                <div class="todo-item parent-task ${todo.completed ? 'completed' : ''}" data-id="${todo.id}" data-parent="${todo.parentTaskId || ''}">
                    <div class="todo-checkbox ${todo.completed ? 'checked' : ''}" data-action="toggle"></div>
                    <div class="todo-content">
                        <div class="todo-main">
                            <span class="todo-text ${todo.completed ? 'completed' : ''}" data-action="edit">${this.escapeHtml(todo.text)}</span>
                            <div class="todo-actions-btn">
                                ${parentActions}
                                <button class="edit-btn" data-action="edit">Edit</button>
                                <button class="delete-btn" data-action="delete">Delete</button>
                            </div>
                        </div>
                        <div class="todo-meta">
                            ${assignee ? `<span class="assigned-to">Assigned to: ${this.escapeHtml(assignee.name)}</span>` : ''}
                            ${creator && creator.id !== todo.assignedTo ? `<span class="created-by">Created by: ${this.escapeHtml(creator.name)}</span>` : ''}
                            ${subtasks.length > 0 ? `<span class="subtask-count">${subtasks.length} subtask${subtasks.length > 1 ? 's' : ''}</span>` : ''}
                        </div>
                        ${progressHtml}
                    </div>
                </div>
                ${subtasksHtml}
            </div>
        `;
    }

    // Create HTML for subtask item (simplified, without nested subtasks)
    createSubtaskHTML(todo) {
        const assignee = this.getUserById(todo.assignedTo);
        const creator = this.getUserById(todo.createdBy);
        
        return `
            <li class="todo-item ${todo.completed ? 'completed' : ''}" data-id="${todo.id}" data-parent="${todo.parentTaskId || ''}">
                <div class="todo-checkbox ${todo.completed ? 'checked' : ''}" data-action="toggle"></div>
                <div class="todo-content">
                    <div class="todo-main">
                        <span class="todo-text ${todo.completed ? 'completed' : ''}" data-action="edit">${this.escapeHtml(todo.text)}</span>
                        <div class="todo-actions-btn">
                            <button class="edit-btn" data-action="edit">Edit</button>
                            <button class="delete-btn" data-action="delete">Delete</button>
                        </div>
                    </div>
                    <div class="todo-meta">
                        ${assignee ? `<span class="assigned-to">Assigned to: ${this.escapeHtml(assignee.name)}</span>` : ''}
                        ${creator && creator.id !== todo.assignedTo ? `<span class="created-by">Created by: ${this.escapeHtml(creator.name)}</span>` : ''}
                    </div>
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
        const filteredTodos = this.getFilteredTodos();
        const activeTodos = filteredTodos.filter(t => !t.completed).length;
        const totalTodos = filteredTodos.length;
        
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
        const filteredTodos = this.getFilteredTodos();
        const completedCount = filteredTodos.filter(t => t.completed).length;
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
    });
}
