import { useState } from 'react'
import '../styles/ToDoItem.css'

function ToDoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)

  const handleSave = () => {
    const trimmed = editText.trim()
    if (trimmed && trimmed !== todo.text) {
      onEdit(todo.id, trimmed)
    }
    setIsEditing(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSave()
    if (e.key === 'Escape') {
      setEditText(todo.text)
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setEditText(todo.text)
    setIsEditing(false)
  }

  return (
    <div
      className={`todo-item ${todo.completed ? 'todo-item--completed' : ''} ${isEditing ? 'todo-item--editing' : ''}`}
      data-priority={todo.priority}
    >
      {/* Checkbox */}
      <button
        className={`todo-item__checkbox ${todo.completed ? 'todo-item__checkbox--checked' : ''}`}
        onClick={() => onToggle(todo.id)}
        aria-label={todo.completed ? 'Mark incomplete' : 'Mark complete'}
      >
        {todo.completed && (
          <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
            <path d="M1 5L4.5 8.5L11 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </button>

      {/* Content */}
      <div className="todo-item__content">
        {isEditing ? (
          <input
            className="todo-item__edit-input"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        ) : (
          <>
            <span className="todo-item__text">{todo.text}</span>
            <div className="todo-item__meta">
              <span className={`todo-item__priority-badge priority-badge--${todo.priority}`}>
                {todo.priority}
              </span>
            </div>
          </>
        )}
      </div>

      {/* Actions */}
      <div className="todo-item__actions">
        {isEditing ? (
          <>
            <button className="icon-btn icon-btn--save" onClick={handleSave} title="Save">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7L5.5 10.5L12 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="icon-btn icon-btn--cancel" onClick={handleCancel} title="Cancel">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 3L11 11M11 3L3 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </button>
          </>
        ) : (
          <>
            <button className="icon-btn icon-btn--edit" onClick={() => setIsEditing(true)} title="Edit">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M9.5 2.5L11.5 4.5L5 11H3V9L9.5 2.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="icon-btn icon-btn--delete" onClick={() => onDelete(todo.id)} title="Delete">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 4H12M5 4V2.5H9V4M5.5 6.5V10.5M8.5 6.5V10.5M3 4L3.5 11.5H10.5L11 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default ToDoItem
