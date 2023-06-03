import React, { useState, useEffect } from 'react';
import {AiOutlinePlus} from 'react-icons/ai';
import Todo from './Todo';
import axiosClient from "./axios-client.js";
import { Blocks } from 'react-loader-spinner';

const style = {
  container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  form: `flex justify-between`,
  input: `border p-2 w-full text-xl`,
  button: `border p-4 ml-2 bg-purple-500 text-slate-100`,
  count: `text-center p-2`,
  loader: `fixed top-1/4 left-1/2`,
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
        setLoading(false)
        setTodos(data.data);
      })
      .catch(() => {
        setLoading(false)
      })
  }

  const createTodo = async (e:any) => {
    e.preventDefault(e);
    if (input === '') {
      alert('Please enter a valid todo');
      return;
    }
    const newTodo = {
      name: input,
      is_completed: false,
    };

    axiosClient.post('/todo', newTodo)
    .then(({ data }) => {
      if(data.data){
        setTodos([...todos, data.data]);
      }      
    })
    .catch(err => {
      if(err.response.data){
        alert(err.response.data.error)
      }      
    })
     setInput('');
  };

  const toggleComplete = async (todo:any) => {
    axiosClient.put(`/todo/${todo.id}`, {is_completed: !todo.is_completed})
      .then(({ data }) => {
        if(data.data){
          const updatedTodo = data.data;
          const updatedTodos = todos.map((item:any) => (item.id === updatedTodo.id ? {...item, is_completed: updatedTodo.is_completed } : item))
          setTodos(updatedTodos)
        }
      })
      .catch(err => {
        if(err.response.data){
          alert(err.response.data.error)
        }   
      })    
  }

  const deleteTodo = async (todo:any) => {
    axiosClient.delete(`/todo/${todo.id}`)
      .then(({ data }) => {
        if(data.data){
          const deletedTodo = data.data;
          setTodos(todos.filter((item:any) => item.id !== deletedTodo.id));
        }
      })
      .catch(err => {
        if(err.response.data){
          alert(err.response.data.error)
        }   
      })    
    
  };

  return (
    <div>      
      <div className={style.container}>      
        <h3 className={style.heading}>Todo List</h3>

        <Blocks
          visible={loading}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass={style.loader}
        />

        <form onSubmit={createTodo} className={style.form}>
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text" 
            className={style.input} 
            placeholder="add task"
          />
          <button className={style.button}><AiOutlinePlus size={30} /></button>
        </form>
        
        {todos && !loading && <ul>
          {todos.map((todo:any, index:number) => (
            <Todo 
              key={index} 
              todo={todo} 
              toggleComplete={toggleComplete} 
              deleteTodo={deleteTodo}
              />
          ))}
          
        </ul>}
      </div>
    </div>
  );
}

export default App;