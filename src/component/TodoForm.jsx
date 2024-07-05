import React, { useState } from 'react'
import { useTodo } from '../context/Todo';

function TodoForm() {

    const [todo, setTodo] = useState("")
    const {addTodo} = useTodo()
    const add = (e) => {
        e.preventDefault()

        if (!todo) return

        addTodo({ todo, completed: false}) // {} ye use kiye kyo ki app.jsx ke andr addTodo ke andr apan sirf todo ka msg nhi chahiye pal ham udhar ek spread operator use kar rhe h matlb hme dusri value bhi chahiye is lie hamne complete bhi add kiya h
        setTodo("")
    }

    return (
        <form onSubmit={add} className="flex">
            <input
                type="text"
                placeholder="Write Todo..."
                className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
                value={todo} // isko wiring bolte hai input ka state ke sath wiring ho jaye
                onChange={(e) => setTodo(e.target.value)}
            />

            <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">
                Add
            </button>
        </form>
    );
}

export default TodoForm;

