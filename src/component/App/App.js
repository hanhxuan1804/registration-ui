import './App.css';

import { Routes, Route, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from "../../api";
import { Header } from '../common';
import { RegisterForm, LoginForm } from '../authform';
import ProfilePage from '../profilepage';

function App() {
  const history = useNavigate();
  
  const [userToken, setUserToken] = useState(localStorage.getItem('userToken') || '');

  const { mutateAsync: loginUserAsync, isLoading: loginUserIsLoading, isError: loginUserIsError, error: loginUserError } = useMutation(loginUser);
  const Login = async (data) => {
    const user = await loginUserAsync(data);
    setUserToken(user.token);
    localStorage.setItem('userToken', user.token);
    history('/dashboard');
  }

  const Logout = () => {
    console.log('User logged out');
    history('/');
    setUserToken(null);
  };


  return (
    <div className="App">
      <Header user={userToken} logOut={Logout}/>
      <div className="App-main">
      <Routes>
        <Route path="/" element={<div>
          <h1>Home</h1>
          <p>Home page body content</p>
        </div>} />
        <Route path="/login" element={<LoginForm onSubmit={(data)=> Login(data) } isLoading={loginUserIsLoading} isError={loginUserIsError} error={loginUserError}></LoginForm>} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/profile" element={<ProfilePage token={userToken}/>}/>
      </Routes>
      </div>
    </div>
  );
}

export default App;
