import React from 'react';
import './RegisterPage.css';

class RegisterPage extends React.Component {
    serverURL = 'http://172.20.7.211:8080';

    handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        try {
            const response = await fetch(`${this.serverURL}/auth/join`, {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                const jsonResponse = await response.json();
                console.log(jsonResponse);
                alert("회원가입이 완료되었습니다.");
            } else {
                const errorText = await response.text();
                throw new Error(`회원가입에 실패했습니다. 상태 코드: ${response.status}, 메시지: ${errorText}`);
            }
            
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    }

    render() {
        return (
            <div className="registration-container">
                <h1>회원가입</h1>
                <h2>GRIT에 한 발짝 가까워진 여러분을 환영합니다.</h2>
                <form className="registration-form" onSubmit={this.handleSubmit}>
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
