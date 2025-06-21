// src/App.js
import React, { useState, useEffect } from 'react'; 
import TodoInput from './components/TodoInput'; // TodoInput 컴포넌트 불러오기
import TodoList from './components/TodoList';   // TodoList 컴포넌트 불러오기

function App() {

  // 1. 할 일 목록 상태 정의: todos는 현재 상태 값, setTodos는 상태를 업데이트하는 함수
  const [todos, setTodos] = useState(()=>{
  //    - useState에 함수를 전달하면, 이 함수는 컴포넌트가 처음 렌더링될 때만 실행
    const savedTodos = localStorage.getItem('todos');
    try {
      // savedTodos가 존재하고, 유효한 JSON 배열 문자열이면 파싱하여 사용합니다.
      // 그렇지 않으면 빈 배열([])을 반환합니다.
      // console.log('초기 todos 값:', savedTodos, JSON.parse(savedTodos));
      return savedTodos ? JSON.parse(savedTodos) : [];
    } catch (e) {
      // JSON 파싱 과정에서 오류가 발생했을 경우 (예: 로컬 스토리지에 유효하지 않은 JSON이 저장된 경우)
      // console.error("로컬 스토리지 'todos' 데이터 파싱 오류:", e);
      // 잘못된 데이터를 로컬 스토리지에서 제거하여 다음 로딩 시 올바르게 초기화되도록 합니다.
      localStorage.removeItem('todos'); 
      return []; // 오류가 발생했으므로 빈 배열로 초기화하여 앱이 작동하도록 합니다.
    }
  });

  const [loading, setLoading] = useState(true);


  useEffect(()=>{
    localStorage.setItem('todos',JSON.stringify(todos));
  },[todos]); //[todos]는 '의존성 배열'입니다. todos 값이 바뀔 때마다 이 useEffect 안의 코드를 실행하라는 의미입니다.

  // 2. useEffect 훅을 사용하여 todos 상태 변화 감지 및 로컬 스토리지에 저장
  useEffect(()=>{

    if (todos.length === 0) {
      setLoading(true);// 데이터 로딩 시작을 알립니다.
      fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then(response =>{
        if(!response.ok){
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data =>{
        const fechedTodos = data.map(todo=>({
          id: todo.id,
          text: todo.title, 
          completed: todo.completed,
        }));
        setTodos(fechedTodos);
      })
      .catch(error =>{
        console.error("할 일 목록을 불러오는 중 오류 발생:", error);
      })
      .finally(()=>{
        setLoading(false); // 데이터 로딩이 성공했든 실패했든 로딩 상태를 종료합니다
      })

    }else {
      setLoading(false); // 로컬 스토리지에 데이터가 이미 있으면 API 호출 없이 바로 로딩 종료
  }
  },[todos.length]);

const addTodo = (text) =>{
  console.log(text);
  const newTodo = {
    id: Date.now(),
    text: text,
    completed: false,
  }
  setTodos([...todos, newTodo]);


}
const deleteTodo = (id) =>{
  setTodos(todos.filter(todo=> todo.id !== id))
}
const toggleComplete = (id) =>{
  setTodos(
    todos.map(todo => 
      todo.id === id ? {...todo, completed: !todo.completed}: todo))
}
// console.log('App 렌더링 시 todos:', todos);
  return (
    <div className="App">
      <h1>나의 할 일 목록</h1>
      { loading? (
      <p>할 일 목록을 불러오는 중입니다...</p> 
      ):(
        <>{/* Fragment: 여러 요소를 묶을 때 사용하며, 불필요한 DOM 노드를 생성하지 않습니다. */}
        <TodoInput onAddTodo={addTodo} /> {/* TodoInput 컴포넌트 사용 */}
        <TodoList 
          todos = {todos}
          onDeleteTodo = {deleteTodo}
          onToggleComplete = {toggleComplete}
        
        />  {/* TodoList 컴포넌트 사용 */}
      </>
      )}
    </div>
  );
}

export default App;