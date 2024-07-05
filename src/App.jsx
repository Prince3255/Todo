import { useState, useEffect } from 'react'
import {TodoProvider} from './context/Todo'
import './App.css'
import TodoForm from './component/TodoForm'
import TodoItem from './component/TodoItem'

function App() {
  const [todos, setTodos] = useState([]) // todos ek array h

  const addTodo = (todo) => {
      setTodos((prev) => [{id: Date.now(), ...todo}, ...prev]) // we can't pass to directly because it will delete the all the other arrays in todos and only single todo so we use call back and then we use spread operator ...prev which will add all other array and as we no todos not only contain msg but id also and add ...todo as it todo is also a object it will add other things
  }

  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)))
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((prevTodo) => prevTodo.id !== id))
  }

  const toggleComplete = (id) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? {...prevTodo, completed: !prevTodo.completed} : prevTodo)))
    // prevTodo.completed = !(prevTodo.completed) // not allowed
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos")) // get item ke andr key likhi h todos ye same key setitem ke vaqt bhi hoti hai Json.parse is liye kiya kyo ki value string me hoti h usko json format me karne ke liye kiya h

    if (todos && todos.length > 0) {
      setTodos(todos)
    }
  }, [])
  
  useEffect(() => {
    localStorage.setItem("todos" , JSON.stringify(todos)) // todos ek array ke form me hota hai usko string me convert karne ke liye Json.stringify()
  }, [todos])

//   Why Use JSON.stringify()
// localStorage Stores Strings Only:

// localStorage is a web storage API that allows you to store key-value pairs in a web browser. However, it only accepts values as strings.
// If you try to store a complex data structure like an object or an array directly, it will be converted to a string using its toString() method, which does not preserve the actual structure or content.
// Preserving Data Structure:

// Using JSON.stringify() converts your JavaScript objects or arrays into a JSON string. This string representation preserves the structure and content of the data, making it possible to store it in localStorage.
// Retrieving Data:

// When you retrieve the data from localStorage, it will be in string format. Using JSON.parse(), you can convert this string back into a JavaScript object or array, restoring its original structure and making it usable in your application.
  

  return (
    <TodoProvider value={{updateTodo, toggleComplete, todos, deleteTodo, addTodo}}>
      <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        {/* Todo form goes here */} 
                        <TodoForm />
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {
                          todos.map((todo) => (
                            <div key={todo.id} className='w-full'>
                              <TodoItem todo={todo}/>
                            </div>
                          ))
                        }
                    </div>
                </div>
            </div>
    </TodoProvider>
  )
}

export default App
