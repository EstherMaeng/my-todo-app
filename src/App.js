// src/App.js
import React from 'react';
import TodoInput from './components/TodoInput'; // TodoInput 컴포넌트 불러오기
import TodoList from './components/TodoList';   // TodoList 컴포넌트 불러오기

function App() {
  return (
    <div className="App">
      <h1>나의 할 일 목록</h1>
      <TodoInput /> {/* TodoInput 컴포넌트 사용 */}
      <TodoList />  {/* TodoList 컴포넌트 사용 */}
    </div>
  );
}

export default App;