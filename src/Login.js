import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [idPlaceholder, setIdPlaceholder] = useState('아이디를 입력하세요');
  const [passwordPlaceholder, setPasswordPlaceholder] = useState('비밀번호를 입력하세요');
  const navigate = useNavigate();

  const handleLogin = () => {
    // 로그인 로직 처리
    navigate('/calendar'); // 로그인 성공 후 캘린더 페이지로 이동
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
