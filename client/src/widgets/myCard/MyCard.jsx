import React, { useEffect, useState } from 'react';
import './MyCard.css';
import { useNavigate } from 'react-router-dom';

export default function MyCard({ myCards, deleteHandler }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isOpened, setIsOpened] = useState(() => {
    const saved = localStorage.getItem('openedCards');
    const openedIds = saved ? JSON.parse(saved) : [];
    return openedIds.includes(myCards.id);
  });

  const navigate = useNavigate();

  const handleFlip = () => {
    setIsFlipped((prev) => !prev);

    if (!isOpened) {
      const saved = localStorage.getItem('openedCards');
      const openedIds = saved ? JSON.parse(saved) : [];
      const updated = [...openedIds, myCards.id];
      localStorage.setItem('openedCards', JSON.stringify(updated));
      setIsOpened(true);
    }
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    navigate(`/edditWord/${myCards.id}`);
  };

  return (
    <div className="card-container" onClick={handleFlip}>
      <div className={`card ${isFlipped ? 'flipped' : ''} ${isOpened ? 'opened' : ''}`}>
        <div className="card-face card-front">
          {myCards.english}
        </div>
        <div className="card-face card-back">
          <div>{myCards.russian}</div>
          <div className="button-group">
            <button className="button-complete" style={{backgroundColor:"#e37d97da"}} onClick={(e) => {
              e.stopPropagation();
              deleteHandler(myCards.id);
            }}>
              Удалить
            </button>
            <button className="button-complete" onClick={handleEdit}>
              Изменить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
