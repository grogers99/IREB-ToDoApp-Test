# System Patterns: IREB ToDo Application

## Architecture Overview

### Application Structure
The todo application follows a **Single-Class Architecture** pattern with clear separation of concerns:

```
TodoApp Class
├── Constructor & Initialization
├── DOM Element Management
├── Event Handling System
├── CRUD Operations
├── Filtering & Display Logic
├── Local Storage Management
└── Utility Functions
```

### Core Design Patterns

#### 1. Module Pattern (ES6 Class)
```javascript
class TodoApp {
    constructor() {
        this.todos = this.loadTodos();
        this.currentFilter = 'all';
        this.editingId = null;
        
        this.initializeElements();
        this.bindEvents();
        this.render();
    }
}
```

**Benefits:**
- Encapsulation of state and methods
- Clear initialization sequence
- Namespace protection
- Easy testing and maintenance

#### 2. Event Delegation Pattern
```javascript
this.todoList.addEventListener('click', (e) => {
    const todoItem = e.target.closest('.todo-item');
    if (!todoItem) return;

    const id = parseInt(todoItem.dataset.id);
    const action = e.target.dataset.action;

    switch (action) {
        case 'toggle': this.toggleTodo(id); break;
        case 'edit': this.editTodo(id); break;
        case 'delete': this.deleteTodo(id); break;
    }
});
```

**Benefits:**
- Handles dynamic content efficiently
- Reduces memory usage
- Simplifies event management
- Works with added/removed elements

#### 3. State Management Pattern
```javascript
// Centralized state updates
addTodo() {
    // 1. Update data
    this.todos.unshift(todo);
    // 2. Persist data
    this.saveTodos();
    // 3. Update UI
    this.render();
}
```

**Benefits:**
- Consistent update flow
- Predictable state changes
- Easy debugging
- Reliable data persistence

#### 4. Template Pattern (HTML Generation)
```javascript
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
```

**Benefits:**
- Consistent HTML structure
- Dynamic content generation
- XSS protection via escapeHtml
- Maintainable templates

## Component Relationships

### Data Flow Architecture
```
User Input → Event Handler → State Update → Data Persistence → UI Render
     ↑                                                              ↓
     └─────────────── Visual Feedback ←─────────────────────────────┘
```

### Key Components

#### 1. State Management
- **Primary State**: `this.todos` array
- **UI State**: `this.currentFilter`, `this.editingId`
- **Persistence**: localStorage integration
- **Updates**: Immutable-style updates where possible

#### 2. Event System
- **Input Events**: Add todo, keyboard shortcuts
- **List Events**: Toggle, edit, delete via delegation
- **Filter Events**: Change view state
- **Global Events**: Escape key handling

#### 3. Rendering System
- **Full Render**: Complete UI update after state changes
- **Conditional Rendering**: Empty states based on filter
- **Animation Integration**: CSS classes for smooth transitions

## Critical Implementation Paths

### 1. Todo Creation Path
```javascript
User Input → addTodo() → Data Validation → State Update → saveTodos() → render()
```

**Key Considerations:**
- Input sanitization and validation
- Unique ID generation using timestamp
- Immediate UI feedback
- Error handling for storage failures

### 2. Todo Editing Path
```javascript
Double-click → editTodo() → Inline Editor → Save/Cancel → State Update → render()
```

**Key Considerations:**
- Single edit mode enforcement
- Input focus and selection
- Escape key cancellation
- Blur event handling

### 3. Filtering Path
```javascript
Filter Button → setFilter() → Update Active Button → getFilteredTodos() → render()
```

**Key Considerations:**
- Filter state persistence
- Empty state handling
- Button state management
- Performance with large lists

### 4. Data Persistence Path
```javascript
State Change → saveTodos() → JSON.stringify → localStorage.setItem → Error Handling
```

**Key Considerations:**
- Storage quota limits
- JSON serialization errors
- Browser compatibility
- Graceful degradation

## Error Handling Patterns

### 1. Storage Error Handling
```javascript
saveTodos() {
    try {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    } catch (error) {
        console.error('Failed to save todos to localStorage:', error);
        // Graceful degradation - app continues to work
    }
}
```

### 2. Input Validation
```javascript
addTodo() {
    const text = this.todoInput.value.trim();
    if (!text) return; // Prevent empty todos
    
    // Additional validation could be added here
}
```

### 3. DOM Safety
```javascript
escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
```

## Performance Patterns

### 1. Efficient DOM Updates
- **Event Delegation**: Single listener for multiple elements
- **Batch Updates**: Full render after state changes
- **CSS Animations**: Hardware-accelerated transitions

### 2. Memory Management
- **No Memory Leaks**: Proper event listener management
- **Efficient Storage**: Minimal data structure
- **Garbage Collection**: No circular references

### 3. Rendering Optimization
- **Template Reuse**: Consistent HTML generation
- **Conditional Rendering**: Only render when needed
- **Animation Timing**: CSS transitions over JavaScript

## Extensibility Patterns

### 1. Feature Addition Points
- **New Todo Properties**: Extend todo object structure
- **Additional Filters**: Add to filter system
- **New Actions**: Extend event delegation
- **Storage Backends**: Abstract storage interface

### 2. Customization Points
- **CSS Variables**: Theme customization
- **Configuration Object**: Runtime settings
- **Plugin System**: Extensible functionality
- **Event Hooks**: Custom behavior injection

### 3. Integration Patterns
- **API Integration**: Replace localStorage methods
- **Framework Wrapping**: Expose as component
- **Service Worker**: Add offline capabilities
- **Testing Hooks**: Expose internal state

## Security Patterns

### 1. XSS Prevention
- **HTML Escaping**: All user input escaped
- **Template Safety**: No innerHTML with user data
- **Attribute Safety**: Data attributes for IDs only

### 2. Data Validation
- **Input Sanitization**: Trim and validate input
- **Length Limits**: Prevent excessive data
- **Type Checking**: Ensure data integrity

This system architecture provides a solid foundation for maintenance, testing, and future enhancements while maintaining simplicity and performance.
