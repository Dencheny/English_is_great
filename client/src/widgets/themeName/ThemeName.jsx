import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ThemeName.css';

export default function ThemeName({ themeNames }) {
  const navigate = useNavigate();

  return (
    <div className="theme-card">
      <h2 className="theme-title">{themeNames.themeName}</h2>
      <button
        className="theme-button"
        onClick={() => navigate(`/theme/${themeNames.id}`)}
      >
        Начнем обучение ?
      </button>
    </div>
  );
}
