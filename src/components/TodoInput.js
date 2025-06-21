import React from 'react';
import { useState } from 'react'; // useState 훅을 불러옵니다.

function TodoInput({onAddTodo}) {
    const [newTodoText, setNewTodoText] = useState(''); // 입력필드 상태 씌우기
    const handleInputChange = (e) =>{
        setNewTodoText(e.target.value);
    };
    const handleSubmit = () =>{
        if(newTodoText.trim() === "")return;
        
        onAddTodo(newTodoText);  // 부모한테 보내기
console.log(newTodoText);
        setNewTodoText('');

    };
    const handleKeyPress = (e) =>{
        if (e.key === 'Enter') {
            handleSubmit();
        }
    }


  return (
    <div>
      <input type="text" 
        placeholder="새로운 할 일을 입력하세요" 
        value={newTodoText}      // 입력 필드 값을 상태(newTodoText)와 연결 (제어 컴포넌트)
        onChange={handleInputChange} // 입력 변경 이벤트 처리 함수 연결
        onKeyPress={handleKeyPress}  // 키보드 입력 이벤트 처리 함수 연결

      />
      <button onClick={handleSubmit}>추가</button>
    </div>
  );
}

export default TodoInput;