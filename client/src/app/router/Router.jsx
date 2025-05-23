import React from 'react';
import { Routes, Route, Navigate } from 'react-router';
import Layout from '../layout/Layout';
import ThemeCardPage from '../../pages/themeCard/ThemeCardPage';
import MyCardPage from '../../pages/myCard/MyCardPage';
import ProgressPage from '../../pages/progress/ProgressPage';
import LoginPage from '../../pages/loginPage/LoginPage';
import SignUpPage from '../../pages/signUpPage/SignUpPage';
import ThemeNamePage from '../../pages/themeName/ThemeNamePage';
import CreateWordPage from '../../pages/createWordPage/CreateWordPage';
import EdditWordPage from '../../pages/edditWord/EdditWordPage';

import ProtectedRoute from '../../shared/hocs/ProtectedRoute'
import EdditForm from '../../feature/edditForm/EdditForm';
import ChatBot from '../../feature/chatBot/ChatBot';


export default function Router({ setUser, logoutHandler, user }) {
  return (
    <Routes>
      <Route element={<Layout logoutHandler={logoutHandler} user={user} />}>
      {/*Доп защита для не авторизованного юзера*/}
        <Route
          element={
            <ProtectedRoute
            isAllowed={user.status !== 'logged'}
            redirectTo='/theme'
            />
          }
        >
         <Route path="/login" element={<LoginPage setUser={setUser}/>} /> {/*Работает*/}
         <Route path="/signup" element={<SignUpPage setUser={setUser} />} />{/*Работает*/}
        </Route>
       

{/*Роуты под этой строкой будут защищеныыми!*/}


<Route
element={
  <ProtectedRoute 
    isAllowed={user.status === 'logged'}
    redirectTo='/signup'
  />
}>

        <Route path="/theme" element={<ThemeNamePage user={user} />} />{/*Работает*/}
        <Route path="/theme/:id" element={<ThemeCardPage user={user} />} />{/*Работает*/}
        <Route path="/progress" element={<ProgressPage user={user} />} />{/*Работает*/}
        <Route path="/myWords" element={<MyCardPage user={user} />} />{/*Работает*/}
        <Route path="/createWord" element={<CreateWordPage user={user} />} />{/*Работает*/}
        <Route path="/edditWord/:id" element={<EdditWordPage user={user} />} />{/*Добавил setUser()*/}
        <Route path="/chatGPT" element={<ChatBot user={user} />} />
</Route>
       

{/*Роут по умолчанию*/}
        <Route path="*" element={
          <Navigate to ={user.status === 'logged' ? '/theme' : "/signup"} replace />
          } 
          />
      </Route>
    </Routes>
  );
}
