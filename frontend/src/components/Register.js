import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const countryCodes = [
  { label: 'Выберите страну', value: '' },
  { label: '+998 (Узбекистан)', value: '+998' },
  { label: '+7 (Россия)', value: '+7' },
  { label: '+992 (Таджикистан)', value: '+992' },
];

const operatorCodes = {
  '+998': ['90', '91', '93', '94'],       // Операторы Узбекистана
  '+7': ['900', '901', '902', '903', '904'], // Операторы России
  '+992': ['88', '90', '91', '92', '93', '98'], // Операторы Таджикистана
};

const Register = () => {
  const [username, setUsername] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [operatorCode, setOperatorCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    setError('');

    if (!username.trim() || !countryCode.trim() || !operatorCode.trim() || !phoneNumber.trim() || !password.trim()) {
      setError('Пожалуйста, заполните все поля.');
      return;
    }

    if (phoneNumber.length !== 7 || !/^\d{7}$/.test(phoneNumber)) {
      setError('Номер должен содержать ровно 7 цифр.');
      return;
    }

    if (password.length < 6) {
      setError('Пароль должен содержать минимум 6 символов.');
      return;
    }

    setLoading(true);

    try {
      const fullPhoneNumber = `${countryCode}${operatorCode}${phoneNumber}`;
      const response = await axios.post('http://localhost:8000/users/register/', {
        username,
        phone_number: fullPhoneNumber,
        password,
      });

      console.log('Регистрация успешна:', response.data);
      localStorage.setItem('user_id', response.data.user_id);
      navigate('/dashboard');
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || 'Ошибка регистрации.');
      } else {
        setError('Ошибка сети. Проверьте подключение.');
      }
      console.error('Ошибка при регистрации:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', textAlign: 'center' }}>
      <h2>Регистрация</h2>
      <form onSubmit={handleRegister}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="username">Имя пользователя</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Введите имя"
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="country_code">Страна</label>
          <select
            id="country_code"
            value={countryCode}
            onChange={(e) => {
              setCountryCode(e.target.value);
              setOperatorCode(''); // Сброс оператора при смене страны
            }}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          >
            {countryCodes.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {countryCode && (
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="operator_code">Код оператора</label>
            <select
              id="operator_code"
              value={operatorCode}
              onChange={(e) => setOperatorCode(e.target.value)}
              required
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            >
              <option value="">Выберите код</option>
              {operatorCodes[countryCode]?.map((code) => (
                <option key={code} value={code}>
                  {code}
                </option>
              ))}
            </select>
          </div>
        )}

        {operatorCode && (
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="phone_number">Номер (7 цифр)</label>
            <input
              type="text"
              id="phone_number"
              value={phoneNumber}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                if (value.length <= 7) setPhoneNumber(value);
              }}
              placeholder="1234567"
              required
              maxLength="7"
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </div>
        )}

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Минимум 6 символов"
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}

        <button type="submit" disabled={loading} style={{ width: '100%', padding: '10px' }}>
          {loading ? 'Регистрация...' : 'Зарегистрироваться'}
        </button>
      </form>
    </div>
  );
};

export default Register;
