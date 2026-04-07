import { useState } from "react";

function ToDoItem({ task, deleteTask, toggleTask, editTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);

  const handleEdit = () => {
    if (newText.trim() === "") return;
    editTask(task.id, newText);
    setIsEditing(false);
  };

  return (
    <div className="todo-item">
      {isEditing ? (
        <input
          className="edit-input"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          onBlur={handleEdit}
          onKeyDown={(e) => e.key === "Enter" && handleEdit()}
          autoFocus
        />
      ) : (
        <span
          className={`todo-text ${task.completed ? "completed" : ""}`}
          onClick={() => toggleTask(task.id)}
        >
          {task.text}
        </span>
      )}

      <div className="actions">
        <button
          className="edit-btn"
          onClick={() => setIsEditing(!isEditing)}
        >
          ✏️
        </button>

        <button
          className="delete-btn"
          onClick={() => deleteTask(task.id)}   // to delete task
        >
          🗑️
        </button>
      </div>
    </div>
  );
}

export default ToDoItem;