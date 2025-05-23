import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import ThemeApi from '../../entities/user/api/ThemeApi';
import WordApi from '../../entities/user/api/wordApi';


export default function CreateCardForm() {
  const [themes, setThemeNames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    english: '',
    russian: '',
    themeId: '', // id выбранной темы
  });
  // всплывающее окно (зеленое справа)
  const [showToast, setShowToast] = useState(false);
// Состояние ошибки валдиции(для отображение красного и зеленого уведомления)
const [errors, setErrors] = useState({ english: '', russian: '', themeId: '', general: '' })


  const playSound = () => {
    const audio = new Audio('../../../public/music/gitpullo.mp3');
    audio.volume = 0.3
    audio.play();
  };

  useEffect(() => {
    setIsLoading(true);
    try {
      ThemeApi.getAllThemes().then((res) => {
        setThemeNames(res.data.data);
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Добавление: Сбрасываем ошибку при изменении поля
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

      const { english, russian, themeId } = formData;

      // Проверка (можно дополнительно валидировать)
      if (!english || !russian) {
        alert('Заполните все поля');
        return;
      }

          // Добавление: Валидация полей
    let newErrors = { english: '', russian: '', themeId: '', general: '' };
    let isValid = true;

    // Проверка english: латинские буквы, пробелы, дефисы, апострофы
    if (!english) {
      newErrors.english = 'English word is required';
      isValid = false;
    } else if (!/^[a-zA-Z\s'-]+$/.test(english)) {
      newErrors.english =
        'Введите слово на латинице';
      isValid = false;
    }

    // Проверка russian: кириллица, пробелы, дефисы
    if (!russian) {
      newErrors.russian = 'Russian word is required';
      isValid = false;
    } else if (!/^[а-яА-ЯёЁ\s-]+$/u.test(russian)) {
      newErrors.russian =
        'Ведите слово на кириллице';
      isValid = false;
    }

    // // Проверка themeId: должно быть выбрано и существовать
    // if (!themeId || !themes.some((theme) => theme.id === Number(themeId))) {
    //   newErrors.themeId = 'Please select a valid theme';
    //   isValid = false;
    // }

    setErrors(newErrors);

    if (!isValid) {
      return;
    }
try {
      const payload = {
        english,
        russian,
        themeId: themeId || 1, // этот ID нужен для связи с темой
      };

      const res = await WordApi.createWord(payload);
      if (res.data) {
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 1000);
      }

      // console.log('Слово успешно создано:', res.data);

      // Очистить форму после создания
      setFormData({ english: '', russian: '', themeId: '' });
      setErrors({ english: '', russian: '', themeId: '', general: '' });
    } catch (error) {
      console.error(error);
      // ошибка срвак 
       setErrors({ ...newErrors, general: 'Failed to create word' });
    }
  };

  return (
    <div className='create-word-page'>
      {showToast && (
        <div className='notification'>Слово успешно добавлено!</div>

      )}
   
      <h1>ДОБАВИТЬ СВОЁ СЛОВО</h1>
      <form className="create-word-form" onSubmit={handleSubmit}>
      {/* Поле english */}
        <div style={{ marginBottom: '1rem' }}>
          <input
            name="english"
            type="text"
            placeholder="Слово на Английском"
            value={formData.english}
            onChange={handleChange}
            required
            style={{ borderColor: errors.english ? 'red' : '' }}
          />
          {/* Добавление: Ошибка под полем */}
          {errors.english && (
            <p style={{ color: 'red', fontSize: '0.8rem' }}>{errors.english}</p>
          )}
        </div>

        {/* Поле russian */}
        <div style={{ marginBottom: '1rem' }}>
          <input
            name="russian"
            type="text"
            placeholder="Слово на Русском"
            value={formData.russian}
            onChange={handleChange}
            required
            style={{ borderColor: errors.russian ? 'red' : '' }}
          />
          {/* Добавление: Ошибка под полем */}
          {errors.russian && (
            <p style={{ color: 'red', fontSize: '0.8rem' }}>{errors.russian}</p>
          )}
        </div>


        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>

            <InputLabel variant="standard" htmlFor="theme"></InputLabel>

            <NativeSelect
              name="themeId"
              defaultValue={formData.themeId}
              value={formData.themeId}
              onChange={handleChange}
              inputProps={{
                id: 'theme',
              }}
              required
            >
              {themes.map((el) => (
                <option key={el.id} value={el.id}>
                  {el.themeName}
                </option>
              ))}
            </NativeSelect>
          </FormControl>
        </Box>
        <button type="submit">
          Подтвердить
        </button>
      </form>
    </div>
  );
}
