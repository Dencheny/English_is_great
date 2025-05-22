import { useState } from 'react';
import UserApi from '../../entities/user/api/UserApi';
import UserValidate from '../../entities/user/api/UserValidate';
import { setAccessToken } from '../../shared/lib/axiosInstance';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginForm({ setUser }) {
  const loginHandler = async (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    const { isValid, error } = UserValidate.validateLogin(formData);
    if (!isValid) return alert(error);
    const res = await UserApi.login(formData);
    setUser({ status: 'logged', data: res.data.data.user });
    setAccessToken(res.data.data.accessToken);
  };
  const navigate = useNavigate();

  return (
    <>
      <div className="login-page">
        <h1>АНГЛИЙСКИЙ - ЛЕГКО</h1>
        <div className="login-form-container">
          <h2>Авторизация</h2>
          <form onSubmit={loginHandler}>
            <input name="email" type="email" required placeholder="Логин" />
            <input
              name="password"
              type="password"
              required
              placeholder="Пароль"
            />
            <button type="submit">Вход</button>
          </form>
          <button className="secondary-btn" onClick={() => navigate('/signup')}>
            Вы ещё не зарегистрированы?
          </button>
        </div>
      </div>
    </>
  );
}
