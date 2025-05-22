import React from 'react';
import { useState, useEffect } from 'react';
import axiosInstance, { setAccessToken } from './shared/lib/axiosInstance';
import Router from './app/router/Router';

function App() {
  const [user, setUser] = useState({ status: 'logging', data: null });
  const logoutHandler = () => {
    axiosInstance
      .get('/auth/logout')
      .then(() => {
        setUser({ status: 'guest', data: null });
        setAccessToken('');
      })
      .catch((error) => {
        console.log(error);
        setUser({ status: 'guest', data: null });
        setAccessToken('');
      });
  };
  useEffect(() => {
    axiosInstance('/auth/refreshTokens')
      .then((res) => {
        setUser({ status: 'logged', data: res.data.data.user });
        setAccessToken(res.data.data.accessToken);
      })
      .catch(() => {
        setUser({ status: 'guest', data: null });
        setAccessToken('');
      });
  }, []);

  return (
    <>
      <div>
        <div>
          <Router setUser={setUser} logoutHandler={logoutHandler} user={user} />
        </div>
      </div>
    </>
  );
}

export default App;
