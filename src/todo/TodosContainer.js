import React, { useEffect, useState } from "react";
import { Link } from '@reach/router';
import Todo from "./Todo";

const TodosContainer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = event => {
    setInputValue(event.target.value)
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const newTodo = { todo: inputValue, completed: false };

      const response = await fetch('/todos', {
        method: 'POST', body: JSON.stringify(newTodo), headers: {
          'Content-Type': 'application/json',
        }
      });
      const formatted = await response.json();

      setTodos([...todos, formatted]);
      setInputValue('');
    } catch (err) {
      console.log(err);
      setIsError(true);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/todos");
        const formatted = await response.json();

        setIsLoading(false);
        setTodos(formatted);
      } catch (err) {
        console.log(err);

        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input placeholder="Enter todo" type="text" onChange={handleInputChange} value={inputValue} />
        <button type="submit">Submit</button>
      </form>
      <div>
        {isError ? (
          <p>Something went wrong</p>
        ) : isLoading ? (
          <p>Loading...</p>
        ) : (
              <ul>
                {todos.map(todo => (
                  <li key={todo.id}>
                    <Todo todo={todo} setIsError={setIsError} />
                  </li>
                ))}
              </ul>
            )}
      </div>
      <Link to="/secret" className="secret-link">See the secret!</Link>
    </div>
  );
};

export default TodosContainer;
