import React from 'react';

function TodoItem({ todo }) { // 나중에 todo라는 데이터를 Props로 받을 예정입니다.
  return (
    <li>
      <input type="checkbox" checked={todo.completed} readOnly />
      <span>{todo.text}</span>
      <button>삭제</button>
    </li>
  );
}

export default TodoItem;