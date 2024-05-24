import React from 'react';
import { useNavigate } from 'react-router-dom';

function TodoList() {
  const navigate = useNavigate();

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <button onClick={() => navigate(-1)} style={{
        cursor: 'pointer',
        borderRight: '10px solid black', // 삼각형 모양을 왼쪽으로 향하게
        borderTop: '5px solid transparent',
        borderBottom: '5px solid transparent',
        backgroundColor: 'transparent',
        padding: '0',
        outline: 'none',
        position: 'absolute',
        top: '20px',
        right: '20px',
      }}>{" "}</button>
      <button onClick={() => navigate('/focus')} style={{
        cursor: 'pointer',
        backgroundColor: '#4CAF50', // 버튼 배경색
        color: 'white', // 텍스트 색상
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)', // 버튼을 가운데로 이동
      }}>Focus 페이지로 이동</button>
      <h1>To Do List</h1>
    </div>
  );
}

export default TodoList;
