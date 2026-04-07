import { useState } from 'react'
import ToDoItem from './ToDoItem'
import '../styles/ToDoList.css'

function ToDoList({ todos, onAdd, onToggle, onDelete, onEdit }) {
  const [inputText, setInputText] = useState('')
  const [priority, setPriority] = useState('medium')
  const [filter, setFilter] = useState('all')

  const handleAdd = () => {
    const trimmed = inputText.trim()
    if (!trimmed) return
    onAdd(trimmed, priority)
    setInputText('')
    setPriority('medium')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleAdd()
  }

  const handleClearCompleted = () => {
    todos.filter(t => t.completed).forEach(t => onDelete(t.id))
  }

  const filtered = todos.filter(t => {
    if (filter === 'active')    return !t.completed
    if (filter === 'completed') return  t.completed
    return true
  })

  const completedCount = todos.filter(t => t.completed).length

  return (
    <div>
      {/* Add Task */}
      <div className="add-task">
        <div className="add-task__row">
          <input
            className="add-task__input"
            type="text"
            placeholder="What needs to be done?"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="btn btn--primary" onClick={handleAdd}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 3V13M3 8H13" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Add
          </button>
        </div>

        <div className="add-task__priority">
          <span className="add-task__priority-label">Priority</span>
          {['low', 'medium', 'high'].map(p => (
            <button
              key={p}
              data-p={p}
              className={`priority-btn ${priority === p ? 'active' : ''}`}
              onClick={() => setPriority(p)}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Filter Bar */}
      <div className="filter-bar">
        <span className="filter-bar__label">Show</span>
        {['all', 'active', 'completed'].map(f => (
          <button
            key={f}
            className={`filter-btn ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Task List */}
      <div className="todo-list">
        {filtered.length === 0 ? (
          <div className="todo-list__empty">
            <span className="todo-list__empty-icon">
              {filter === 'completed' ? '🏁' : filter === 'active' ? '✨' : '📋'}
            </span>
            <p>
              {filter === 'completed' ? 'No completed tasks yet'
               : filter === 'active' ? 'All tasks done — great work!'
               : 'No tasks yet. Add one above!'}
            </p>
          </div>
        ) : (
          filtered.map(todo => (
            <ToDoItem
              key={todo.id}
              todo={todo}
              onToggle={onToggle}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))
        )}
      </div>

      {/* Clear Completed */}
      {completedCount > 0 && (
        <button className="clear-btn" onClick={handleClearCompleted}>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M2 3H11M4.5 3V1.5H8.5V3M5 5V9.5M8 5V9.5M2.5 3L3 11H10L10.5 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Clear {completedCount} completed
        </button>
      )}
    </div>
  )
}

export default ToDoList
