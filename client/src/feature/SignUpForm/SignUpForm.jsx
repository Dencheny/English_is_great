
import React from "react";
import UserValidate from "../../entities/user/api/UserValidate";
import UserApi from "../../entities/user/api/UserApi";
import axiosInstance, { setAccessToken } from "../../shared/lib/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import './SignUpFrom.css';


function SignUpForm({ setUser }) {

  const navigate = useNavigate();
  const handleNavigate = (path) => {
    navigate(path);
  };


  const signUpHandler = async (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    const { isValid, error } = UserValidate.validateSignUp(formData);
    if (!isValid) return alert(error);

    try {
      const res = await UserApi.signup(formData);
      console.log('1', res)
      // прокидывание проверки , чтобы обезапосить от дублирования маил юзеров
      // юзеро не увидит сообщение об ошибке (400 к примеру)
      // получить алерт окно с предупреждением
      // if (res.data.status !== 200) {
      //   return alert(res.data.message || "Registration failed");
      // }
      //
      console.log('2')
      setUser({ status: "logged", data: res.data.data.user });
      console.log('3')
      setAccessToken(res.data.data.accessToken);
      console.log('4')
      navigate("/theme"); // Вроде должна работать
    } catch (error) {
      console.error("Signup error:", error);
      alert(error.response?.data?.message || "Registration failed");
    }
  };


  // Эта логика уже присутвтует на App.jsx
  // проверка токена, если польщователь был ранне авторизован
  // и перезагрузил страницу
  // useEffect(() => {
  //   axiosInstance.get('auth/refreshTokens')
  //   .then((res) => {
  //     setUser({status: 'logged', data: res.data.data.user})
  //     setAccessToken(res.data.data.accessToken);
  //   })
  //   .catch(() => {
  //     setUser({status: 'guest', data: res.data.data.user})
  //     setAccessToken('');
  //   })
  // }, []) // прокидываем пустой массив зависимостей, чтобы не было вечной отрисовки
  // один раз отработал useEffect и остановился?

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
