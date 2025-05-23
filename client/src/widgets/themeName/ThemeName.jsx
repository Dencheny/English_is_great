import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ThemeName.css';

export default function ThemeName({ themeNames }) {
  const navigate = useNavigate();

  return (
    <div className="card-title-containersy">
      <h2 className="cardsTitle">{themeNames.themeName}</h2>
      <button
        className="start-button"
        onClick={() => navigate(`/theme/${themeNames.id}`)}
      >
        Начнем обучение ?
      </button>
    </div>
  );
}
