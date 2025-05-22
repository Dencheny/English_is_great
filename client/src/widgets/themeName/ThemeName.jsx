import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ThemeName({ themeNames, user }) {

  const navigate = useNavigate();

  return (
    <div>
      <div>
        <h2>{themeNames.themeName}</h2>
      </div>
      <div>
        <button onClick={() => navigate('/theme/:id')}>Начнем обучение ?</button>
      </div>
    </div>
  );
}
