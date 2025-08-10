# Todo Manager Command

Comprehensive todo management system that operates on a `todos.md` file in the project root, featuring task organization, due dates, and priority sorting.

## Usage Examples:
```
/todo add "Fix navigation bug"
/todo add "Fix navigation bug" tomorrow
/todo add "Fix navigation bug" "next week" 
/todo add "Fix navigation bug" "June 9"
/todo complete 1
/todo remove 2
/todo list
/todo list 5
/todo undo 1
/todo due 3 "tomorrow"
/todo past due
/todo next
```

## Features:
- **Task Management**: Add, complete, remove, and undo tasks
- **Due Dates**: Support for flexible date formats and natural language
- **Prioritization**: Sort by due dates with overdue tasks highlighted
- **Status Tracking**: Separate active and completed sections
- **Progress Monitoring**: Show next task and past due items

## Commands:

### Basic Operations
- `add "description"` - Add new todo
- `add "description" [date]` - Add todo with due date
- `complete N` - Mark todo N as completed
- `remove N` - Remove todo N entirely
- `undo N` - Mark completed todo N as incomplete

### Due Date Management  
- `due N [date]` - Set due date for todo N
- `past due` - Show overdue active tasks
- `next` - Show next active task (respects due dates)

### Listing and Display
- `list` - Show all todos with numbers
- `list N` - Show N number of todos
- Default (no args) - Show all todos

## Todo File Format:
```markdown
# Project Todos

## Active
- [ ] Task description here | Due: MM-DD-YYYY
- [ ] Another task

## Completed
- [x] Finished task | Done: MM-DD-YYYY
- [x] Task with due date | Due: MM-DD-YYYY | Done: MM-DD-YYYY
```

## Behavior:
- **Auto-detection**: Finds project root via .git, package.json, etc.
- **File Creation**: Creates todos.md if it doesn't exist
- **Smart Sorting**: Active tasks sorted by due date (due dates first)
- **Date Formats**: Supports MM/DD/YYYY and natural language dates
- **Time Support**: Optional time inclusion when specified
- **Feedback**: Helpful messages after each action
- **Error Handling**: Graceful handling of invalid inputs

## Author Information:
- **Author**: chrisleyva
- **Source**: https://github.com/chrisleyva/todo-slash-command/blob/main/todo.md
- **License**: MIT