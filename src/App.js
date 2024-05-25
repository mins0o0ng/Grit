import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Login';
import RegisterPage from './RegisterPage';
import Calendar from './Calendar';
import ToDoList from './ToDoList';
import Focus from './Focus';
import ImageDisplay from './ImageDisplay'; // ImageDisplay 컴포넌트를 import합니다.

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/todolist" element={<ToDoList />} />
            <Route path="/todo/:date" element={<ToDoList />} />
            <Route path="/focus" element={<Focus />} />
            <Route path="/imagedisplay" element={<ImageDisplay />} /> {/* ImageDisplay 페이지 라우트 추가 */}
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
