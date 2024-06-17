'use client'
import { useTodos } from '@/store/todos';
import React, { FormEvent, useState } from 'react'

const TodoAdd = () => {
    const [todo, setTodo] = useState("");
    const { handleTodoAdd } = useTodos();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleTodoAdd(todo);
        setTodo("");
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="flex justify-center">
                    <input type='text' placeholder='Write your todo' value={todo} onChange={(e) => setTodo(e.target.value)} className="py-2 px-3 border border-gray-300 rounded-l focus:outline-none focus:border-blue-500" />
                    <button type='submit' className="py-2 px-4 bg-blue-500 text-white rounded-r hover:bg-blue-600 focus:outline-none">Add</button>
                </div>
            </form>
        </>
    )
}

export default TodoAdd
