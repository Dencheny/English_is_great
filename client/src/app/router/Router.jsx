import React from 'react';
import { Routes, Route } from 'react-router';
import Layout from '../layout/Layout';
import ThemeCardPage from '../../pages/themeCard/ThemeCardPage';
import MyCardPage from '../../pages/myCard/MyCardPage';
import ProgressPage from '../../pages/progress/ProgressPage';
import LoginPage from '../../pages/loginPage/LoginPage';
import SignUpPage from '../../pages/signUpPage/SignUpPage';
import ThemeNamePage from '../../pages/themeName/ThemeNamePage';
import CreateWordPage from '../../pages/createWordPage/CreateWordPage';
import EdditWordPage from '../../pages/edditWord/EdditWordPage';

export default function Router({ setUser, logoutHandler, user }) {
  return (
    <Routes>
      <Route element={<Layout logoutHandler={logoutHandler} user={user} />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage setUser={setUser} />} />
        <Route path="/theme" element={<ThemeNamePage user={user} />} />
        <Route path="/theme/:id" element={<ThemeCardPage user={user} />} />
        <Route path="/progress" element={<ProgressPage user={user} />} />
        <Route path="/myWords" element={<MyCardPage user={user} />} />
        <Route path="/createWord" element={<CreateWordPage user={user} />} />
        <Route path="/edditWord/:id" element={<EdditWordPage user={user} />} />
      {/* <Route element={<Footer logoutHandler={logoutHandler} user={user} />} /> */}
        {/* <Route path="/theme_name" element={<CraftAddPage />} /> */}
        {/* <Route
          element={
            <ProtectedRoute
              isAllowed={user.status !== 'logged'}
              redirectTo="/crafts"
            />
          }
        >
          <Route path="/login" element={<LoginPage setUser={setUser} />} />
        </Route>
        <Route
          path="/jane"
          element={
            <ProtectedRoute
              isAllowed={user.status === 'logged' && user.data.name === 'Jane'}
            >
              {' '}
              <h1>Jane's Page</h1>{' '}
            </ProtectedRoute>
          }
        />
        <Route path="/crafts/:craftId" element={<CraftOnePage />} />
        <Route path="*" element={<h1>No content</h1>} /> */}
      </Route>
    </Routes>
  );
}
