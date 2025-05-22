import React from 'react';
import UserValidate from '../../entities/user/api/UserValidate';
import UserApi from '../../entities/user/api/UserApi';
import { setAccessToken } from '../../shared/lib/axiosInstance';
import { useNavigate } from 'react-router-dom';

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
    const handleNavigate = (path) => {
      navigate(path);
    };

  return (
    <div>
      <h1>АНГЛИЙСКИЙ - ЛЕГКО</h1>
      <div>
        <h2>Регистрация</h2>
        <form onSubmit={signUpHandler}>
          <div>
            <input name="name" type="text" required placeholder="Имя" />
          </div>
          <div>
            <input
              name="email"
              type="email"
              required
              placeholder="Email / Логин"
            />
          </div>
          <div>
            <input
              name="password"
              type="password"
              required
              placeholder="Пароль"
            />
          </div>
          <div>
            <input
              name="repeatPassword"
              type="password"
              required
              placeholder="Подтверждение пароля"
            />
          </div>
          <button type="submit">Зарегистрироваться</button>
        </form>
        <button type="submit" onClick={() => navigate('/login')} >Уже есть аккаунт</button>
      </div>
    </div>
  );
}

export default SignUpForm;
