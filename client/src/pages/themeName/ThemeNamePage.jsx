import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import ThemeName from '../../widgets/themeName/ThemeName';
import ThemeApi from '../../entities/user/api/themeApi';

export default function ThemeNamePage() {
  const [themeNames, setThemeNames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    try {
    ThemeApi.getAllThemes().then((res) => {
      console.log(res.data.data)
      setThemeNames(res.data.data);
      setIsLoading(false);
    });
    } catch (error) {
    console.log(error);
    setIsLoading(false);
    }
  }, []);

  const deleteHandler = async (id) => {
    // try {
    // const res = await WordApi.deleteCraft(id);
    // if (res.status === 204) {
    // setThemeNames((prev) => prev.filter((el) => el.id !== id));
    // }
    // } catch (error) {
    // console.log(error);
    // alert('Что-то пошло не так');
    // }
  };
  return (


    <div className="theme-page">
      <h1 className="theme-page-title">ВЫБЕРИ ТЕМУ</h1>
      <div className="card-grids">

        {isLoading && <h2>Загрузка...</h2>}
        {themeNames.length === 0 && !isLoading && (
          <h2>Тем пока нет для показа</h2>
        )}
        {themeNames.map((el) => (
          <ThemeName
            key={el.id}
            themeNames={el}
            deleteHandler={deleteHandler}
          />
        ))}
      </div>
    </div>
  );
}
