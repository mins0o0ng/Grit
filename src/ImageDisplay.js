import React, { useState } from 'react';
import './ImageDisplay.css'; // CSS 파일을 올바르게 임포트합니다.

const ImageDisplay = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 현재 달을 계산하는 함수
  const getCurrentMonth = () => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const currentMonth = new Date().getMonth();
    return months[currentMonth];
  };

  const fetchImage = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://172.20.7.211:8080/badge/badges', {
        method: 'GET', // HTTP 메서드를 GET으로 설정
        headers: {
          'Content-Type': 'application/jpg'
        },
      });
      if (!response.ok) {
        throw new Error('네트워크 응답이 올바르지 않습니다.');
      }
      // 서버로부터 JSON 응답을 받고, 그 안에서 이미지 URL을 추출합니다.
      const data = await response.json(); // 서버 응답을 JSON으로 변환
      // data 객체 구조에 따라 실제 이미지 URL을 추출하는 경로를 조정해야 할 수 있습니다.
      // 예를 들어, 서버가 { imageUrl: "http://example.com/image.png" } 형태로 응답한다고 가정합니다.
      const imageUrl = data.imageUrl; // 서버 응답에서 이미지 URL을 추출
      setImageUrl(imageUrl);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
      {/* 현재 달을 출력하는 헤더 추가 */}
      <div className="header">{getCurrentMonth()}</div>
      {loading ? (
        <div>로딩 중...</div>
      ) : imageUrl ? (
        <img src={imageUrl} alt="서버에서 가져온 이미지" />
      ) : (
        <div>
          {error ? <div>에러 발생: {error}</div> : <div>이미지를 가져올 수 없습니다.</div>}
          <button onClick={fetchImage}>Make Badge</button>
        </div>
      )}
    </div>
  );
};

export default ImageDisplay;
