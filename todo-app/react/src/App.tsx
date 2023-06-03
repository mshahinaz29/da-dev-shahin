import React, { useState, useEffect } from 'react';
import {AiOutlinePlus} from 'react-icons/ai';
import Todo from './Todo';

const style = {
  container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  form: `flex justify-between`,
  input: `border p-2 w-full text-xl`,
  button: `border p-4 ml-2 bg-purple-500 text-slate-100`,
  count: `text-center p-2`,
};

function App() {

  const [todos, setTodos] = useState<any>([
    {name:'Breakfast', is_completed: 0},
    {name:'Lunch', is_completed: 0},
    {name:'Dinner', is_completed: 0}
  ]);

  const [input, setInput] = useState('');

  useEffect(() => {
    console.log(todos)
  }, [todos]);  


  return (
    <div>
      <div className={style.container}>
        <h3 className={style.heading}>Todo List</h3>
        <form className={style.form}>
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text" 
            className={style.input} 
            placeholder="add task"
          />
          <button className={style.button}><AiOutlinePlus size={30} /></button>
        </form>
        {todos && <ul>
          {todos.map((todo:any, index:number) => (
            <Todo 
              key={index} 
              todo={todo} 
              />
          ))}
          
        </ul>}
      </div>
    </div>
  );
}

export default App;