import ToDoItem from "./ToDoItem";

function ToDoList({ tasks, deleteTask, toggleTask, editTask }) {
  return (
    <div className="todo-list">
      {tasks.length === 0 ? (
        <p className="empty">No tasks yet...!!</p>   // when no task there 
      ) : (
        tasks.map((task) => (
          <ToDoItem
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            toggleTask={toggleTask}
            editTask={editTask}
          />
        ))
      )}
    </div>
  );
}

export default ToDoList;