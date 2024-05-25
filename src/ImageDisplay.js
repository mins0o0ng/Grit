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
      // fetch 함수의 두 번째 인자에 메서드, 헤더, (필요하다면) 본문을 포함시킨다.
      const response = await fetch('http://172.20.7.211:8080/makeBadge/makeBadge', {
        method: 'POST', // HTTP 메서드를 POST로 설정
        headers: {
          // 내용 유형 헤더를 설정하는 것이 좋음. 이 경우 JSON을 예로 들었습니다.
          // 'Content-Type': 'application/json',
          // 만약 서버가 폼 데이터를 받는다면, 아래와 같이 설정할 수 있습니다.
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        // body 데이터를 JSON 문자열로 변환하여 포함시킨다.
        // JSON을 사용하는 경우에는 아래와 같이 설정합니다.
        // body: JSON.stringify({ key: 'value' }),
        // 폼 데이터를 사용하는 경우에는 아래와 같이 FormData 객체를 사용할 수 있습니다.
        // let formData = new FormData();
        // formData.append('key', 'value');
        // body: formData,
      });
      if (!response.ok) {
        throw new Error('네트워크 응답이 올바르지 않습니다.');
      }
      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
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
