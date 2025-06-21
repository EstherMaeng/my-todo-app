import React from 'react';

function TodoItem({ todo, onDelete, onToggle }) { // 나중에 todo라는 데이터를 Props로 받을 예정입니다.

  const handleToggle = () =>{
    onToggle(todo.id);
  }

  const handleDelete = () =>{
    onDelete(todo.id);
  }

  return (
    <li>
      <input 
        type="checkbox" 
        checked={todo.completed} 
        onChange={handleToggle}
        readOnly 
      />
      <span style={{ textDecoration: todo.completed? 'line-through' : 'none'}}>
        {todo.text}</span>
      <button onClick={handleDelete}>삭제</button>
    </li>
  );
}

export default TodoItem;