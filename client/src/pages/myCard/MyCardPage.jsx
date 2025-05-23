import React, { useCallback } from 'react';
import MyCard from '../../widgets/myCard/MyCard';
import { useEffect, useState } from 'react';
// import WordApi from "../../entities/word/api/WordApi";
import { useLocation, useNavigate } from 'react-router-dom';
import './MyCardPage.css';
import WordApi from '../../entities/user/api/wordApi';

export default function MyCardPage() {
  const [myCards, setMyCards] = useState([]);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (location.state?.showToast) {
      setShowToast(true);
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  const fetchCads = useCallback(async () => {
    setIsLoading(true);
    try {
      WordApi.getAllWordsByUser().then((res) => {
        setMyCards(res.data.data);
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCads();
  }, [fetchCads]);

  const deleteHandler = async (id) => {
    const fetchData = async () => {
      try {
        // console.log('id', id, 'data', word)
        // console.log(id)
        await WordApi.deleteWord(id);
        fetchCads();
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    fetchData();
  };

  const playSound = () => {
    const audio = new Audio('../../../public/music/gitpullo.mp3');
    audio.volume = 1;
    audio.play();
  };

  return (
    <div className="my-cards-page">
       {showToast && <div className="notification">Слово успешно изменено!</div>}
      <h1>МОИ КАРТОЧКИ</h1>
      <button onClick={() => navigate('/createWord')}>Добавить</button>
      <div className="card-grid">
        {isLoading && <h2>Загрузка...</h2>}
        {myCards.length === 0 && !isLoading && (
          <h2>
            Нет карточек для показа, создай{' '}
            <button onClick={() => navigate('/createWord')}>
              свою первую карточку
            </button>
          </h2>
        )}
        {myCards.map((el) => (
          <MyCard key={el.id} myCards={el} deleteHandler={deleteHandler} onClick={() => playSound()} />
        ))}
      </div>
    </div>
  );
}
