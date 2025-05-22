import React from 'react';
import { useEffect, useState } from 'react';
// import WordApi from "../../entities/word/api/WordApi";
import { useNavigate } from 'react-router-dom';
// import './MyCardPage.css';
import ThemeCard from '../../widgets/ThemeCard/ThemeCard';

export default function ThemeCardPage({ myCards }) {
  const [theme, setTheme] = useState([
    { id: 1, word: 'Hello', translation: 'Привет' },
    { id: 2, word: 'Goodbye', translation: 'До свидания' },
    { id: 3, word: 'Please', translation: 'Пожалуйста' },
    { id: 4, word: 'Thank you', translation: 'Спасибо' },
    { id: 5, word: 'Yes', translation: 'Да' },
    { id: 6, word: 'No', translation: 'Нет' },
    { id: 7, word: 'Excuse me', translation: 'Извините' },
    { id: 8, word: 'Sorry', translation: 'Извините' },
    { id: 9, word: 'How are you?', translation: 'Как дела?' },
    { id: 10, word: 'I am fine', translation: 'Я в порядке' },
  ]);
  const navigate = useNavigate();
  const [isFlipped, setIsFlipped] = useState(false);
    const [isOpened, setIsOpened] = useState(() => {
      const saved = localStorage.getItem('openedCards');
      const openedIds = saved ? JSON.parse(saved) : [];
      return openedIds.includes(theme.id);
    });
  
    const handleFlip = () => {
      setIsFlipped((prev) => !prev);
  
      if (!isOpened) {
        const saved = localStorage.getItem('openedCards');
        const openedIds = saved ? JSON.parse(saved) : [];
        const updated = [...openedIds, theme.id];
        localStorage.setItem('openedCards', JSON.stringify(updated));
        setIsOpened(true);
      }
    };

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    // try {
    // WordApi.getAllTheme().then((res) => {
    //   setCards(res.data.data);
    //   setIsLoading(false);
    // });
    // } catch (error) {
    // console.log(error);
    setIsLoading(false);
    // }
  }, []);

  const deleteHandler = async (id) => {
    // try {
    // const res = await WordApi.deleteCraft(id);
    // if (res.status === 204) {
    // setMyCards((prev) => prev.filter((el) => el.id !== id));
    // }
    // } catch (error) {
    // console.log(error);
    // alert('Что-то пошло не так');
    // }
  };

  return (
    <div className="my-cards-page">
      <h1>ВЫБЕРИ КАРТОЧКУ</h1>
      <div className="card-grid">
        {isLoading && <h2>Загрузка...</h2>}
        {theme.length === 0 && !isLoading && (
          <h2>
            Нет карточек для показа, создай{' '}
            <button onClick={() => navigate('/createWord')}>
              свою первую карточку
            </button>
          </h2>
        )}
        {theme.map((el) => (
          <ThemeCard key={el.id} theme={el} deleteHandler={deleteHandler} />
        ))}
      </div>
    </div>
  );
}
