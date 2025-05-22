import React, { useEffect, useState } from "react";
import Progress from "../../widgets/progress/Progress";
import "./ThemeCardPage.css";
import WordApi from "../../entities/user/api/WordApi";
import LearnWordApi from "../../entities/user/api/LearnWord";

export default function ProgressPage({ user }) {
  // моковые данные для проверки прогресс баров
  // const [themes, setThemes] = useState([
  //   { id: 1, themeName: 'Plane' },
  //   { id: 2, themeName: 'City' },
  //   { id: 3, themeName: 'World' },
  //   { id: 4, themeName: 'News' },
  //   { id: 5, themeName: 'Animals' },
  //   { id: 6, themeName: 'Name' },
  //   { id: 7, themeName: 'Famale' },
  //   { id: 8, themeName: 'Moralle' },
  //   { id: 9, themeName: 'Life' },
  //   { id: 10, themeName: 'Beach' },
  // ]);
  const [themes, setThemes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const readProgressData = async () => {
      setIsLoading(true);

      try {
        console.log("Fetching progress data for user:", user?.data?.id);
        // запрос всех слов в бд
        const allWordsFromDb = await WordApi.getAllWords();
        console.log("All words response:", allWordsFromDb.data);

        // ЩЗапрос изученных слоов юзера
        const allLearnWordsByUser =
          await LearnWordApi.getAllLearnWordsThemeByUser();
        console.log("Learned words response:", allLearnWordsByUser.data);

        if ( allWordsFromDb.data.statusCode !== 200 || allLearnWordsByUser.data.statusCode !== 200) {
          console.error("Failed to fetch data:",allWordsFromDb.data.message, allLearnWordsByUser.data.message);
          setThemes([]);
          setIsLoading(false);
          return;
        }

        // сборка всех данных для формулы расчета процетнов
        const themesData = allWordsFromDb.data.data.map((theme) => {
          const learnedWords = allLearnWordsByUser.data.data.filter(
            (learnWord) => learnWord.themeId === theme.id
          ).length;
          const totalWords = theme.words?.length || 0;
          const progress = totalWords > 0 ? (learnedWords / totalWords) * 100 : 0;

          console.log(`Theme ${theme.name}: ${learnedWords}/${totalWords} (${progress.toFixed(2)}%)`);

          return {
            id: theme.id,
            themeName: theme.themeName || theme.name,
            learnedWords,
            totalWords,
            progress: progress.toFixed(2),
          };

        });
        setThemes(themesData)

      } catch (error) {
      console.error('Error fetching progress data:', error);
      setThemes([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (user?.status === 'logged') {
      readProgressData();
    } else {
      console.log('User not logged in, skipping fetch');
      setThemes([]);
      setIsLoading(false);
    }
  }, [user]);




  // Базовая логика загрузки для медленого инета
  // useEffect(() => {
  //   setIsLoading(true);
  //   // try {
  //   // WordApi.getAllTheme().then((res) => {
  //   //   setThemes(res.data.data);
  //   //   setIsLoading(false);
  //   // });
  //   // } catch (error) {
  //   // console.log(error);
  //   setIsLoading(false);
  //   // }
  // }, []);

  const deleteHandler = async (id) => {
    try {
    const res = await WordApi.deleteCraft(id);
    if (res.status === 204) {
    setThemes((prev) => prev.filter((el) => el.id !== id));
    }
    } catch (error) {
    console.log(error);
    alert('Что-то пошло не так');
    }
  };

  return (
    <div className="progress-page">
      <h1>ПРОГРЕСС</h1>
      <div className="card-grids">
        {isLoading && <h2>Загрузка...</h2>}
        {!isLoading && themes.length === 0 && (
          <h2>Нет пока нет прогресса для показа</h2>
        )}{" "}
        {/*Сообщение, если лоадинг не грузится или прогресс бвар нулевой */}
        {themes.length === 0 && !isLoading && (
          <h2>Нет пока нет прогресса для показа</h2>
        )}
        {themes.map((el) => (
          <Progress
            key={el.id}
            theme={el}
            user={user}
            deleteHandler={deleteHandler}
          />
        ))}
      </div>
    </div>
  );
}
