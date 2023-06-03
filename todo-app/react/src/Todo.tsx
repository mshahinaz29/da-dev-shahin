import { FaRegTrashAlt } from 'react-icons/fa';

const style = {
  li: `flex justify-between bg-slate-200 p-4 my-2 capitalize`,
  liComplete: `flex justify-between bg-slate-400 p-4 my-2 capitalize`,
  row: `flex`,
  text: `ml-2 cursor-pointer`,
  textComplete: `ml-2 cursor-pointer line-through`,
  button: `cursor-pointer flex items-center`,
};

function Todo({todo}:any) {
  return (
    <li className={todo.is_completed ? style.liComplete : style.li}>
      <div className={style.row}>
        <input  type="checkbox" checked={todo.is_completed}  />
        <p className={todo.is_completed ? style.textComplete : style.text}> {todo.name}</p>
      </div>
      <button>{<FaRegTrashAlt />}</button>

    </li>
  )
}

export default Todo