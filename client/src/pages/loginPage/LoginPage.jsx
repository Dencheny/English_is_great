import React from 'react'
import LoginForm from '../../feature/LoginForm/LoginForm'
import './LoginPage.css';


export default function LoginPage({setUser}) {
  return (
    <LoginForm setUser={setUser}/>
  )
}
