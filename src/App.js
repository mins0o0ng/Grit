import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import RegisterPage from './RegisterPage';
import Calendar from './Calendar';
import ToDoList from './ToDoList';
import Focus from './Focus';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/todolist" element={<ToDoList />} />
        <Route path="/todo/:date" element={<ToDoList />} />
        <Route path="/focus" element={<Focus />} /> {/* Focus 페이지 라우트 추가 */}
      </Routes>
    </Router>
  );
}

export default App;
