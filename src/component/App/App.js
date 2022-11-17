import './App.css';

import { Routes, Route, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from "../../api";
import { Header } from '../common';
import { RegisterForm, LoginForm } from '../authform';

function App() {
  const history = useNavigate();
  
  const [user, setUser] = useState(null);

  const { mutateAsync: loginUserAsync, isLoading: loginUserIsLoading, isError: loginUserIsError, error: loginUserError } = useMutation(loginUser);
  const Login = async (data) => {
    const user = await loginUserAsync(data);
    setUser(user);
    history('/dashboard');
  }

  const Logout = () => {
    console.log('User logged out');
    history('/');
    setUser(null);
  };


  return (
    <div className="App">
      <Header user={user} logOut={Logout}/>
      <div className="App-main">
      <Routes>
        <Route path="/" element={<div>
          <h1>Home</h1>
          <p>Home page body content</p>
        </div>} />
        <Route path="/login" element={<LoginForm onSubmit={(data)=> Login(data) } isLoading={loginUserIsLoading} isError={loginUserIsError} error={loginUserError}></LoginForm>} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
      </div>
    </div>
  );
}

export default App;
