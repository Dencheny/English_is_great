import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { useNavigate } from 'react-router-dom';

export default function EdditForm() {
  const navigate = useNavigate();
  return (
    <div className="edit-word-page">
      <h1>РЕДАКТИРОВАНИЕ КАРТОЧКИ</h1>
      <form className="edit-word-form">
        <input
          name="english"
          type="text"
          placeholder="Слово на Английском"
          required
        />
        <input
          name="russian"
          type="text"
          placeholder="Слово на Русском"
          required
        />
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel variant="standard" htmlFor="theme">
              Тематика
            </InputLabel>
            <NativeSelect
              defaultValue={1}
              inputProps={{
                name: 'theme',
                id: 'theme',
              }}
            >
              <option value={1}>OneTheme</option>
              <option value={2}>TwoTheme</option>
              <option value={3}>ThreeTheme</option>
            </NativeSelect>
          </FormControl>
        </Box>
        <button type="submit" onClick={() => navigate('/myWords')}>
          Подтвердить
        </button>
      </form>
    </div>
  );
}
