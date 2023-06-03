import React, { useState, useEffect } from 'react';
import {AiOutlinePlus} from 'react-icons/ai';
import Todo from './Todo';
import axiosClient from "./axios-client.js";

const style = {
  container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  form: `flex justify-between`,
  input: `border p-2 w-full text-xl`,
  button: `border p-4 ml-2 bg-purple-500 text-slate-100`,
  count: `text-center p-2`,
};

function App() {

  const [todos, setTodos] = useState<any>([]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getTodos();
  }, [])

  const getTodos = () => {
    setLoading(true)
    axiosClient.get('/todo')
      .then(({ data }) => {
        console.log(data);
        setLoading(false)
        setTodos(data.data);
      })
      .catch(() => {
        setLoading(false)
      })
  }


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