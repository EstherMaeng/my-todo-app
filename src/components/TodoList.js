import React from 'react';
// TodoItem 컴포넌트를 가져올 예정입니다.
import TodoItem from './TodoItem'; 

function TodoList() {
  // 임시로 몇 가지 할 일을 표시해봅시다.
  const todos = [
    { id: 1, text: '리액트 컴포넌트 만들기', completed: false },
    { id: 2, text: '상태 관리 익히기', completed: false },
    { id: 3, text: 'Git에 코드 올리기', completed: false },
  ];

  return (
    <ul>
      {todos.map(todo => (
         <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}

export default TodoList;