'use client'

import { useTodos } from '@/store/todos'
import { useSearchParams } from 'next/navigation';
import React from 'react'

const Todos = () => {
    const {todos,toggleTodoAsCompleted,handleDelete} = useTodos();

    // Getting the search parameters from the URL
    const searchParams = useSearchParams();
    // Extracting the 'todos' filter parameter from the URL
    const todosFilter = searchParams.get('todos');
    console.log(todos);

    let filterTodos = todos;

    if(todosFilter === 'active'){
      // If filter is 'active', only show not completed
      filterTodos = filterTodos.filter((todo)=> !todo.completed)
    }else if(todosFilter === 'completed'){
      // If filter is 'completed', only show  completed
      filterTodos = filterTodos.filter((todo)=> todo.completed)
    }

    return (
      <>
  <ul className="divide-y divide-gray-200">
    {filterTodos.map((todo) => (
      <li key={todo.id} className="flex items-center py-2">
        {/* Checkbox to toggle todo completion */}
        <input
          type="checkbox"
          id={`todo-${todo.id}`}
          checked={todo.completed}
          onChange={() => toggleTodoAsCompleted(todo.id)}
          className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
        />
        {/* Label for the todo item */}
        <label htmlFor={`todo-${todo.id}`} className={`flex-1 ${todo.completed ? 'line-through text-gray-400' : ''}`}>
          {todo.task}
        </label>
        {/* If the todo is completed, show the delete button */}
        {todo.completed && (
          <button
            type="button"
            onClick={() => handleDelete(todo.id)}
            className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
          >
            Delete
          </button>
        )}
      </li>
    ))}
  </ul>
</>

    )
}

export default Todos
