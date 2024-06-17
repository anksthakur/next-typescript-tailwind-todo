'use client'

import { ReactNode, createContext, useContext, useState, useEffect } from "react";

// type define kar rhe hai
export type Todos = {
    id: string;
    task: string;
    completed: boolean;
    createdAt: Date; 
}

// type define kar rhe hai createContext
export type TodosContextType = { 
    todos: Todos[];
    handleTodoAdd: (task: string) => void; // call signature
    toggleTodoAsCompleted: (id: string) => void;
    handleDelete: (id: string) => void;
}

// Creating context
export const todosContext = createContext<TodosContextType | null>(null);

// creating provider
export const TodosProvider = ({ children }: { children: ReactNode }) => {
    const [todos, setTodos] = useState<Todos[]>([]);

    useEffect(() => {
        const newTodos = localStorage.getItem("todos") || "[]";
        setTodos(JSON.parse(newTodos) as Todos[]);
    }, []);

    const handleTodoAdd = (task: string) => {
        setTodos((previousData) => {
            const newTodos: Todos[] = [{
                id: Math.random().toString(),
                task: task,
                completed: false,
                createdAt: new Date()
            },
            ...previousData
            ];
            // adding data to the local storage
            localStorage.setItem("todos", JSON.stringify(newTodos));
            return newTodos;
        });
    };

    // if task is completed
    const toggleTodoAsCompleted = (id: string) => {
        setTodos((previous) => {
            const newTodos = previous.map((task) => {
                if (task.id === id) {
                    return { ...task, completed: !task.completed };
                }
                return task;
            });
            localStorage.setItem("todos", JSON.stringify(newTodos));
            return newTodos;
        });
    };

    // if the task is deleted
    const handleDelete = (id: string) => {
        setTodos((previous) => {
            const newTodos = previous.filter((task) => task.id !== id);
            localStorage.setItem("todos", JSON.stringify(newTodos));
            return newTodos;
        });
    };

    return (
        <todosContext.Provider value={{ todos, handleTodoAdd, toggleTodoAsCompleted, handleDelete }}>
            {children}
        </todosContext.Provider>
    );
};

// creating context API
export function useTodos() {
    const todosContextValue = useContext(todosContext);
    if (!todosContextValue) {
        throw new Error("useTodos used outside of Provider");
    }
    return todosContextValue;
}
