import React, { useState, useEffect } from 'react';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  // Load todos from local storage on component mount
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  // Save todos to local storage whenever the todos state changes
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addTodo = () => {
    if (inputValue.trim() !== '') {
      setTodos([...todos, inputValue]);
      setInputValue('');
    }
  };

  const removeTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  return (
    <div className='text-center max-w-md mx-auto border-2 border-black mt-2 py-3'>
      <h2 className='text-4xl font-bold'>Todo List</h2>
      <input
        className='mt-7 px-7 py-3 border-2 border-black'
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter a new todo"
      />
      <button className='bg-green-400 rounded px-5 py-3 ml-16' onClick={addTodo}>
        Add
      </button>
      <ul className='ml-3'>
        {todos.map((todo, index) => (
          <li key={index} className='mb-5'>
            {todo}
            <br />
            <button
              className='bg-red-600 rounded px-5 mt-5 py-3'
              onClick={() => removeTodo(index)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
