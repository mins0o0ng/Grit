import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function TodoList() {
  const navigate = useNavigate();
  const location = useLocation(); // 위치 정보를 가져옵니다.

  // location.state에서 선택된 날짜 정보를 가져옵니다. 만약 캘린더에서 날짜가 전달되지 않았다면, 현재 날짜를 기본값으로 사용합니다.
  const selectedDate = location.state?.date || new Date();
  
  // 선택된 날짜를 형식으로 변환합니다.
  const getFormattedDate = (date) => {
    const dt = new Date(date);
    const day = dt.getDate().toString().padStart(2, '0'); // 일
    return `${day}`; 
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* 캘린더로 돌아가는 버튼 */}
      <button onClick={() => navigate(-1)} style={{
        cursor: 'pointer',
        backgroundColor: '#4CAF50', // 초록색 배경
        color: 'white', // 텍스트 색상
        borderRadius: '50%', // 원형
        border: 'none',
        width: '80px', // 버튼 크기
        height: '80px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '28px', // 날짜 텍스트 크기
        position: 'absolute',
        top: '20px',
        left: '20px',
      }}>{getFormattedDate(selectedDate)}</button>
      {/* 집중 모드로 이동하는 버튼 */}
      <button onClick={() => navigate('/focus')} style={{
        cursor: 'pointer',
        backgroundColor: '#4CAF50', // 버튼 배경색
        color: 'white', // 텍스트 색상
        padding: '20px 40px', // 버튼 크기 조정
        border: 'none',
        borderRadius: '5px',
        fontSize: '20px', // 텍스트 크기 조정
        position: 'absolute',
        
        top: '30%',
        left: '50%',
        transform: 'translate(-50%, -50%)', // 버튼을 가운데로 이동
      }}>집중 모드로 이동</button>
    </div>
  );
}

export default TodoList;
