import React from 'react';
import ThemeCard from '../../widgets/ThemeCard.jsx/ThemeCard';
import { useEffect, useState } from 'react';
// import WordApi from "../../entities/word/api/WordApi";
import './ThemeCardPage.css';

export default function ThemeCardPage() {
  // themes = [
  //   { id: 1, word: 'Hello', translation: 'Привет' },
  //   { id: 2, word: 'Goodbye', translation: 'До свидания' },
  //   { id: 3, word: 'Please', translation: 'Пожалуйста' },
  //   { id: 4, word: 'Thank you', translation: 'Спасибо' },
  //   { id: 5, word: 'Yes', translation: 'Да' },
  //   { id: 6, word: 'No', translation: 'Нет' },
  //   { id: 7, word: 'Excuse me', translation: 'Извините' },
  //   { id: 8, word: 'Sorry', translation: 'Извините' },
  //   { id: 9, word: 'How are you?', translation: 'Как дела?' },
  //   { id: 10, word: 'I am fine', translation: 'Я в порядке' }
  // ]

  const [themes, setThemes] = useState([
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
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    // try {
      // WordApi.getAllTheme().then((res) => {
      //   setThemes(res.data.data);
      //   setIsLoading(false);
      // });
    // } catch (error) {
      // console.log(error);
      setIsLoading(false);
    // }
  }, [])

  const deleteHandler = async (id) => {
    // try {
      // const res = await WordApi.deleteCraft(id);
      // if (res.status === 204) {
        // setThemes((prev) => prev.filter((el) => el.id !== id));
      // }
    // } catch (error) {
      // console.log(error);
      // alert('Что-то пошло не так');
    // }
  };

  return (
    <div>
      <div className='card-grid'>
        {isLoading && <h2>Загрузка...</h2>}
        {themes.length === 0 && !isLoading && <h2>Нет слов для показа</h2>}
        {themes.map((el) => (
          <ThemeCard key={el.id} theme={el} deleteHandler={deleteHandler} />
        ))}
      </div>
    </div>
  );
}
