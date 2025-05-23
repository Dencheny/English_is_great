import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Error404.css';

export default function Error404() {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <h1 className="not-found-code">404</h1>
      <p className="not-found-message">Ой! Страница не найдена</p>
      <p className="not-found-subtext">
        Возможно, вы ввели неправильный адрес или страница была удалена.
      </p>
      <button className="not-found-button" onClick={() => navigate('/login')}>
        Вернуться на главную
      </button>
    </div>
  );
}
