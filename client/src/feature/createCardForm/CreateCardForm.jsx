import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

export default function CreateCardForm() {
  return (
    <div className="create-word-page">
      <h1>ДОБАВИТЬ СВОЁ СЛОВО</h1>
      <form className="create-word-form">
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
        <button type="submit">Подтвердить</button>
      </form>
    </div>
  );
}
