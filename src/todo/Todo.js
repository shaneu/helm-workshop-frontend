import React, { useState } from "react";

const Todo = ({ todo, setIsError }) => {
  const [status, setStatus] = useState(todo.completed);

  const handleChange = async event => {
    try {
      const updatedTodo = { ...todo, completed: event.target.checked };

      const response = await fetch(`/todos/${todo.id}`, {
        method: 'PUT', body: JSON.stringify(updatedTodo), headers: {
          'Content-Type': 'application/json',
        }
      });
      const formatted = await response.json();

      setStatus(formatted.completed);
    } catch (err) {
      console.error(err);
      setIsError(true);
    }
  };

  return (
    <div>
      <input
        type="checkbox"
        id={todo.id}
        checked={status}
        onChange={event => handleChange(event)}
      />
      <label htmlFor={todo.id}>{todo.todo}</label>
    </div>
  );
};

export default Todo;
