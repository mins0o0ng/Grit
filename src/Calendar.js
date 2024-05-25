import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Calendar.css';

function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(4); // 현재 월을 상태로 관리합니다.
  const navigate = useNavigate(); // useNavigate 훅을 사용합니다.

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]; // 요일 배열
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]; // 월 이름 배열

  const firstDayOfMonth = new Date(2024, currentMonth, 1).getDay(); // 현재 월의 첫 번째 날의 요일을 구합니다.
  const daysInMonth = new Date(2024, currentMonth + 1, 0).getDate(); // 현재 월의 일 수를 구합니다.

  // 이전 달로 이동하는 함수
  const prevMonth = () => {
    setCurrentMonth(currentMonth => (currentMonth > 0 ? currentMonth - 1 : 11));
  };

  // 다음 달로 이동하는 함수
  const nextMonth = () => {
    setCurrentMonth(currentMonth => (currentMonth < 11 ? currentMonth + 1 : 0));
  };

  // ImageDisplay 페이지로 이동하는 함수
  const goToImageDisplay = () => {
    navigate('/imagedisplay'); // ImageDisplay 페이지의 경로로 이동합니다.
  };

  // 요일 헤더를 렌더링하는 함수
  const renderDaysOfWeek = () => {
    return days.map(day => (
      <th key={day}>{day}</th>
    ));
  };

  // 날짜를 렌더링하는 함수
  const renderDates = () => {
    const dates = [];
    let date = 1;

    for (let row = 0; row < 6; row++) {
      const week = [];

      for (let col = 0; col < 7; col++) {
        if (row === 0 && col < firstDayOfMonth) {
          week.push(<td key={`empty-${col}`}></td>);
        } else if (date > daysInMonth) {
          break;
        } else {
          week.push(
            <td key={date}>
              <button className="date-button" onClick={() => goToTodo(date)}>{date}</button>
              <div className="todo-list"> {/* To-Do 리스트를 표시할 공간 */}
                {/* 여기에 To-Do 리스트의 내용을 추가할 수 있습니다. */}
              </div>
            </td>
          );
          date++;
        }
      }

      if (week.length > 0) {
        dates.push(<tr key={`week-${row}`}>{week}</tr>);
      }
    }

    return dates;
  };

  return (
    <div className="calendar-container">
      <div className="month-navigation">
        <button onClick={prevMonth} className="month-button">&#9664;</button>
        <span className="month-label">{monthNames[currentMonth]} Month</span>
        <button onClick={nextMonth} className="month-button">&#9654;</button>
        <button onClick={goToImageDisplay} className="image-display-button">Image Display 페이지로 이동</button> {/* ImageDisplay 페이지로 이동하는 버튼을 추가 */}
      </div>
      <table className="calendar-table">
        <thead>
          <tr>{renderDaysOfWeek()}</tr>
        </thead>
        <tbody>{renderDates()}</tbody>
      </table>
    </div>
  );
}

export default Calendar;
