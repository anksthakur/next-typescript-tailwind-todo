'use client'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React from 'react'

const Navbar = () => {
  const searchParams = useSearchParams();
  const todosFilter = searchParams.get('todos');
  console.log('navbar' + todosFilter);
  
  return (
    <>
      <nav className='text-center bg-gray-200 py-4'>
        <Link href="/" className={`mx-4 py-2 px-3 rounded ${todosFilter === null ? "bg-blue-500 text-white" : ""}`}>All</Link>
        <Link href="/?todos=active" className={`mx-4 py-2 px-3 rounded ${todosFilter === "active" ? "bg-blue-500 text-white" : ""}`}>Active</Link>
        <Link href="/?todos=completed" className={`mx-4 py-2 px-3 rounded ${todosFilter === "completed" ? "bg-blue-500 text-white" : ""}`}>Completed</Link>
      </nav>
    </>
  )
}

export default Navbar
