# Tech Context: IREB ToDo Application

## Technology Stack

### Core Technologies
- **HTML5**: Semantic markup and modern web standards
- **CSS3**: Advanced styling, animations, and responsive design
- **Vanilla JavaScript (ES6+)**: Modern JavaScript without frameworks
- **localStorage API**: Client-side data persistence

### Browser APIs Used
- **DOM API**: Element manipulation and event handling
- **localStorage API**: Data persistence between sessions
- **JSON API**: Data serialization and deserialization
- **Event API**: User interaction handling
- **CSS Animation API**: Smooth transitions and effects

## Development Environment

### File Structure
```
IREB-ToDoApp-Test/
├── todo-app/
│   ├── index.html          # Main application file
│   ├── styles.css          # All styling and animations
│   ├── script.js           # Application logic
│   └── README.md           # Project documentation
├── memory-bank/            # Cline's memory system
└── .git/                   # Version control
```

### Development Setup
- **No Build Process**: Direct file editing and browser refresh
- **No Dependencies**: Pure web technologies only
- **No Server Required**: Runs directly from file system
- **Version Control**: Git repository with GitHub remote

### Browser Compatibility

#### Supported Browsers
- **Chrome 60+** (September 2017)
- **Firefox 55+** (August 2017)
- **Safari 12+** (September 2018)
- **Edge 79+** (January 2020)

#### Key Feature Requirements
- **ES6 Classes**: Core application architecture
- **Template Literals**: HTML generation
- **Arrow Functions**: Event handling
- **const/let**: Variable declarations
- **localStorage**: Data persistence
- **CSS Grid/Flexbox**: Layout system
- **CSS Custom Properties**: Theme variables

## Technical Implementation Details

### JavaScript Features Used

#### ES6+ Features
```javascript
// Classes
class TodoApp {
    constructor() { /* ... */ }
}

// Template literals
createTodoHTML(todo) {
    return `<li class="todo-item">${todo.text}</li>`;
}

// Arrow functions
this.addBtn.addEventListener('click', () => this.addTodo());

// Destructuring (potential)
const { id, text, completed } = todo;

// Array methods
this.todos.filter(t => !t.completed)
```

#### Modern JavaScript Patterns
- **Event Delegation**: Efficient event handling
- **Method Chaining**: Fluent interfaces where applicable
- **Error Handling**: Try-catch blocks for storage operations
- **Type Coercion**: Careful handling of data types

### CSS Features Used

#### Layout Technologies
```css
/* CSS Grid for main layout */
.container {
    display: grid;
    grid-template-rows: auto 1fr auto;
}

/* Flexbox for component layout */
.todo-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
```

#### Modern CSS Features
```css
/* Custom properties (CSS variables) */
:root {
    --primary-color: #4facfe;
    --secondary-color: #00f2fe;
    --accent-color: #667eea;
}

/* Advanced selectors */
.todo-item:hover .todo-actions-btn {
    opacity: 1;
}

/* Animations and transitions */
.todo-item {
    transition: all 0.3s ease;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
}
```

#### Responsive Design
```css
/* Mobile-first approach */
.container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
}

/* Media queries for larger screens */
@media (min-width: 768px) {
    .container {
        padding: 40px;
    }
}
```

### HTML5 Features

#### Semantic Structure
```html
<header>
    <h1>ToDo App</h1>
    <p>Stay organized and get things done!</p>
</header>

<main>
    <section class="todo-input-section">
        <!-- Input controls -->
    </section>
    
    <section class="todo-controls">
        <!-- Filter and stats -->
    </section>
    
    <ul id="todoList" class="todo-list">
        <!-- Dynamic content -->
    </ul>
</main>

<footer>
    <p>Double-click to edit a todo</p>
</footer>
```

#### Modern HTML Features
- **Data attributes**: `data-id`, `data-action`, `data-filter`
- **Input attributes**: `maxlength`, `placeholder`
- **Accessibility**: Semantic elements and structure
- **Meta tags**: Viewport and charset declarations

## Data Management

### Data Structure
```javascript
// User object structure
{
    id: 1,
    name: "Alice Manager",
    role: "manager",            // 'manager' | 'team_member'
    avatar: null                // Optional avatar URL
}

// Extended Task object structure
{
    id: 1642518000000,           // Timestamp-based unique ID
    text: "Complete project",     // User-entered task text
    completed: false,            // Boolean completion status
    createdAt: "2024-01-18T10:00:00.000Z",  // ISO timestamp
    createdBy: 1,               // User ID who created the task
    assignedTo: 2,              // User ID assigned to (null = unassigned)
    parentTaskId: null          // ID of parent task for subtasks
}

// Application state
{
    todos: [],                   // Array of todo objects
    users: [],                   // Array of User objects
    currentUser: null,           // Currently logged in user
    currentFilter: 'all',        // Current filter state
    editingId: null,             // ID of todo being edited
    currentView: 'personal'      // 'personal' | 'team'
}
```

### Storage Strategy
```javascript
// Save to localStorage
saveTodos() {
    try {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    } catch (error) {
        console.error('Failed to save todos to localStorage:', error);
    }
}

// Load from localStorage
loadTodos() {
    try {
        const stored = localStorage.getItem('todos');
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.error('Failed to load todos from localStorage:', error);
        return [];
    }
}
```

### Data Flow
1. **User Action** → Event handler triggered
2. **State Update** → Modify todos array
3. **Persistence** → Save to localStorage
4. **UI Update** → Re-render interface

## Performance Considerations

### Optimization Strategies
- **Event Delegation**: Single listener for multiple elements
- **Efficient Rendering**: Full re-render on state changes
- **CSS Animations**: Hardware-accelerated transitions
- **Minimal DOM Queries**: Cache element references
- **Lazy Loading**: No unnecessary resource loading

### Memory Management
- **No Memory Leaks**: Proper event listener cleanup
- **Efficient Data Structures**: Simple arrays and objects
- **Garbage Collection**: No circular references
- **Storage Limits**: Graceful handling of localStorage limits

### Loading Performance
- **Small File Sizes**: Minimal code footprint
- **No External Dependencies**: No network requests
- **Inline Styles**: Single CSS file
- **Optimized Images**: No images used

## Security Considerations

### XSS Prevention
```javascript
// HTML escaping for user input
escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Safe template usage
createTodoHTML(todo) {
    return `<span>${this.escapeHtml(todo.text)}</span>`;
}
```

### Data Validation
- **Input Sanitization**: Trim whitespace, prevent empty todos
- **Length Limits**: HTML maxlength attribute (100 characters)
- **Type Checking**: Ensure data integrity in storage operations
- **Error Boundaries**: Try-catch blocks for critical operations

### Client-Side Security
- **No Sensitive Data**: All data is user-generated todos
- **Local Storage Only**: No network transmission
- **No Authentication**: Single-user application
- **Safe DOM Manipulation**: No innerHTML with user data

## Development Workflow

### Local Development
1. **Edit Files**: Direct file modification
2. **Test Changes**: Refresh browser
3. **Debug Issues**: Browser developer tools
4. **Version Control**: Git commits and pushes

### Testing Strategy
- **Manual Testing**: Browser-based functional testing
- **Cross-Browser**: Test in multiple browsers
- **Device Testing**: Mobile and desktop verification
- **Edge Cases**: Empty states, storage limits, error conditions

### Deployment
- **Static Hosting**: Any web server or CDN
- **File Upload**: Direct file transfer
- **No Build Step**: Files ready for production
- **Version Control**: Git-based deployment workflows

## Multi-User Support Extension

### New Classes Added
```javascript
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
```

### New Storage Keys
- **`users`**: Array of User objects stored in localStorage
- **`currentUserId`**: ID of currently logged in user

### New UI Elements
- **`#currentUserIndicator`**: Displays current user name and role
- **`#userSelect`**: Dropdown to switch between users
- **`#viewToggle`**: Button for managers to toggle team view
- **`#assigneeSelect`**: Dropdown to assign tasks to team members

### New CSS Classes
- **`.user-section`**: Container for user selection UI
- **`.user-info`**: Current user indicator styling
- **`.user-selector`**: User dropdown container
- **`.assignee-select`**: Task assignment dropdown
- **`.view-toggle-btn`**: Team view toggle button
- **`.team-member-group`**: Container for team member's tasks
- **`.team-member-header`**: Team member name and stats
- **`.team-tasks`**: List of tasks for a team member
- **`.todo-meta`**: Task metadata (assignee, creator, subtask count)
- **`.todo-item.subtask`**: Subtask visual styling

### New JavaScript Methods
- `loadUsers()`, `saveUsers()`: User data management
- `setCurrentUser(user)`, `getCurrentUser()`: User session
- `getTeamMembers()`: Get all team members
- `getUserById(id)`: Lookup user by ID
- `renderUserIndicator()`, `renderUserSelect()`: User UI rendering
- `renderAssigneeSelect()`: Task assignment dropdown
- `toggleView()`, `getCurrentView()`: View management
- `getTasksForUser(userId)`: Get tasks assigned to user
- `getSubtasks(parentId)`: Get subtasks of a task
- `renderTeamView()`: Render manager dashboard view

### Sample Users (Initialized)
1. Alice Manager (role: manager)
2. Bob Developer (role: team_member)
3. Carol Designer (role: team_member)
4. Dave Tester (role: team_member)

## Subtask Management Extension

### New Methods Added
- `addSubtask(parentId)`: Opens modal to create subtask with custom assignment
- `openEditSubtaskModal(todo)`: Opens modal to edit subtask title and assignee
- `getSubtaskProgress(parentId)`: Calculates completion progress for subtasks
- `createSubtaskHTML(todo)`: Renders simplified subtask HTML without nested subtasks

### Subtask Data Flow
1. **Creation**: User clicks "+ Subtask" button → Modal appears → User enters title and selects assignee → Subtask created with parentTaskId
2. **Editing**: User clicks "Edit" on subtask → Modal appears with current title/assignee → Changes saved to subtask
3. **Display**: Parent tasks render with nested `.subtask-list` containing subtasks with light gray background
4. **Deletion**: Deleting parent task cascades to delete all associated subtasks

### Modal System
- `addSubtask()` creates `#subtaskModal` for new subtask creation
- `openEditSubtaskModal()` creates `#editSubtaskModal` for editing subtasks
- Both modals include title input and assignee dropdown
- Click outside modal or Cancel button closes modal
- Enter key confirms submission

### CSS Extensions for Subtasks
- `.subtask-container`: Wraps parent task and its subtasks
- `.parent-task`: Parent task styling with border and rounded corners
- `.subtask-wrapper`: Indented container (40px left margin) for subtask list
- `.subtask-list`: Light gray background (#f0f4f8) with blue left border
- `.modal-overlay`, `.modal-content`: Modal styling for subtask creation/editing

This technical foundation provides a robust, maintainable, and performant todo application using modern web standards.
