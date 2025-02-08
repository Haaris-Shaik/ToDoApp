import { useState, useEffect } from 'react'
import Navbar from './Navbar'
import { v4 as uuidv4 } from 'uuid';

function App() {
  // defining todos array containg todo lists
  const [todos, setTodos] = useState([])
  const [todo,setTodo] = useState("")

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])

  useEffect(() => {
    if (todos.length > 0) { 
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);
  
  const handleEdit = (e,id) =>{
    let t = todos.filter(i=>i.id===id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id !== id;
    })
    setTodos(newTodos);
    
  }

  const handleDelete = (e,id) =>{
    let newTodos = todos.filter(item=>{
      return item.id !== id;
    })
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  const handleAdd = () =>{
    setTodos([...todos,{id: uuidv4(),todo, isCompleted : false}])
    setTodo("")
    
  } 

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) =>{
    let id = e.target.name;
    let index = todos.findIndex(item=>{
      return item.id === id;
    })
    let newTodos = [...todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    
  } 

  return (
    <>
      <Navbar/>
      <div className="bg-cyan-100 m-3 rounded-xl min-h-[80vh]">
        <div className="addTodo">
          <h1 className="font-bold text-xl p-3">Add ToDo</h1>
          <input onChange={handleChange} onKeyDown={handleKeyPress} value={todo} type="text" className='w-1/2 mx-2 rounded-lg' placeholder='minimun 4 characters are required' />
          <button onClick={handleAdd} disabled={todo.length<=3} className='bg-slate-500 py-1 px-3 rounded-full font-bold'>Add</button>
        </div>
        <div className='bg-slate-400 h-1 my-3 mx-2'></div>
        <h1 className='font-bold text-xl px-3'>Your Todos</h1>
        <div className="todos">
          {todos.length===0 && <div>You have no TODOs</div>}
          {todos.map(item=>{
            return <div key={item.id} className="todo flex w-1/2 p-3 justify-between text-black">
              <div className='flex gap-5 items-center'>
                <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} />
                <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
              </div>
              <div className="buttons">
                <button onClick={(e)=>{handleEdit(e,item.id)}} className='bg-slate-500 py-1 px-3 rounded-full mx-1 font-bold'>Edit</button>
                <button onClick={(e)=>{handleDelete(e,item.id)}} className='bg-slate-500 py-1 px-3 rounded-full mx-1 font-bold'>Delete</button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
