// RegisterPage.js
import React from 'react';
import './RegisterPage.css';

class RegisterPage extends React.Component {
    // 서버 주소를 변수로 선언
    serverURL = 'YOUR_SERVER_ADDRESS_HERE';

    handleSubmit = async (event) => {
        event.preventDefault(); // 기본 폼 제출 동작 방지
        const formData = new FormData(event.target);

        try {
            const response = await fetch(`${this.serverURL}/register`, {
                method: 'POST',
                body: formData, // 폼 데이터를 서버로 전송
            });
            if (response.ok) {
                const jsonResponse = await response.json();
                console.log(jsonResponse); // 서버 응답 처리
                alert("회원가입이 완료되었습니다."); // 사용자에게 회원가입 완료 알림
            } else {
                throw new Error('회원가입에 실패했습니다.'); // 실패 처리
            }
        } catch (error) {
            console.error(error);
            alert(error.message); // 사용자에게 오류 메시지 표시
        }
    }

    render() {
        return (
            <div className="registration-container">
                <h1>회원가입</h1>
                <h2>GRIT에 한 발짝 가까워진 여러분을 환영합니다.</h2>
                <form className="registration-form" onSubmit={this.handleSubmit}/>
                <form className="registration-form">
                    <label htmlFor="school">학교</label>
                    <input type="text" id="school" name="school" required />

                    <label htmlFor="name">이름</label>
                    <input type="text" id="name" name="name" required />

                    <label htmlFor="username">아이디</label>
                    <input type="text" id="username" name="username" required />

                    <label htmlFor="password">비밀번호</label>
                    <input type="password" id="password" name="password" required />

                    <label htmlFor="grade">학년</label>
                    <select id="grade" name="grade" required>
                        <option value="1학년">1학년</option>
                        <option value="2학년">2학년</option>
                        <option value="3학년">3학년</option>
                    </select>

                    <label htmlFor="gender">성별</label>
                    <select id="gender" name="gender" required>
                        <option value="남자">남자</option>
                        <option value="여자">여자</option>
                    </select>

                    <label htmlFor="student_id">학생증 인증</label>
                    <input type="file" id="student_id" name="student_id" accept="image/*" required />
                    <button type="submit" className="register-button">회원가입</button>
                </form>
            </div>
        );
    }
}

export default RegisterPage;
