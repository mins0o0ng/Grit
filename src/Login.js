import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [idPlaceholder, setIdPlaceholder] = useState('아이디를 입력하세요');
  const [passwordPlaceholder, setPasswordPlaceholder] = useState('비밀번호를 입력하세요');
  const navigate = useNavigate();

  const handleLogin = async () => {
    // 서버로 로그인 요청 보내기
    try {
      const response = await fetch('http://172.20.7.211:8080/auth/login', { // '서버_로그인_엔드포인트'는 실제 서버의 로그인 엔드포인트로 대체해야 합니다.
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: id,
          password: password,
        }),
      });
      if (!response.ok) {
        throw new Error('로그인 실패'); // 응답이 성공적이지 않을 경우 예외 처리
      }
      const data = await response.json(); // 응답 데이터를 JSON으로 변환
      // 로그인 성공 처리, 예를 들어 사용자 정보를 상태에 저장하거나 캘린더 페이지로 리다이렉트
      navigate('/calendar'); // 로그인 성공 후 캘린더 페이지로 이동
    } catch (error) {
      alert('로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.'); // 로그인 실패 처리
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  const handleSignUp = () => {
    // 회원가입 페이지로 이동 로직 처리
    navigate('/register'); // 회원가입 페이지로 이동
  };

  return (
    <div className="Container">
      <div className="Title">GRIT</div>
      <div className="InputGroup">
        <div className="InputBox">
          <div className="InputLabel">ID</div>
          <input
            type="text"
            className="Input"
            placeholder={idPlaceholder}
            value={id}
            onChange={(e) => setId(e.target.value)}
            onFocus={() => setIdPlaceholder('')}
            onBlur={() => setIdPlaceholder('아이디를 입력하세요')}
            onKeyDown={handleKeyPress} // Enter 키 감지
          />
        </div>
        <div className="InputBox">
          <div className="InputLabel">PW</div>
          <input
            type="password"
            className="Input"
            placeholder={passwordPlaceholder}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setPasswordPlaceholder('')}
            onBlur={() => setPasswordPlaceholder('비밀번호를 입력하세요')}
            onKeyDown={handleKeyPress} // Enter 키 감지
          />
        </div>
      </div>
      <div className="LoginButton" onClick={handleLogin}>로그인</div>
      <div className="SignUpPrompt">
        <span className="SignUpText">회원이 아니신가요? 지금 당장 GRIT에 가입하세요&nbsp;</span>
        <span className="SignUpButton" onClick={handleSignUp}>회원가입</span>
      </div>
    </div>
  );
};

export default Login;
