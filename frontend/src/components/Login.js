// src/components/Login.js
import React, { useState } from 'react';

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Логика для отправки номера телефона на сервер
  };

  return (
    <div>
      <h2>Авторизация</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Номер телефона"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <button type="submit">Авторизоваться</button>
      </form>
    </div>
  );
};

export default Login;
