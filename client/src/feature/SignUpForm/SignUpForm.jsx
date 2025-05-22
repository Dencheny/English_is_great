import React from 'react';
import UserValidate from '../../entities/user/api/UserValidate';
import UserApi from '../../entities/user/api/UserApi';
import { setAccessToken } from '../../shared/lib/axiosInstance';
import { useNavigate } from 'react-router-dom';
import './SignUpFrom.css';

function SignUpForm({ setUser }) {
  const signUpHandler = async (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    const { isValid, error } = UserValidate.validateSignUp(formData);
    if (!isValid) return alert(error);
    const res = await UserApi.signup(formData);
    setUser({ status: 'logged', data: res.data.data.user });
    setAccessToken(res.data.data.accessToken);
  };

  const navigate = useNavigate();

  return (
    <div className="signup-container">
      <h1 className="signup-title">АНГЛИЙСКИЙ — ЛЕГКО</h1>
      <div className="signup-box">
        <h2>Регистрация</h2>
        <form onSubmit={signUpHandler} className="signup-form">
          <input name="name" type="text" required placeholder="Имя" />
          <input name="email" type="email" required placeholder="Email / Логин" />
          <input name="password" type="password" required placeholder="Пароль" />
          <input name="repeatPassword" type="password" required placeholder="Подтверждение пароля" />
          <button type="submit" className="signup-button">Зарегистрироваться</button>
        </form>
        <button className="login-button" onClick={() => navigate('/login')}>
          Уже есть аккаунт
        </button>
      </div>
    </div>
  );
}

export default SignUpForm;
