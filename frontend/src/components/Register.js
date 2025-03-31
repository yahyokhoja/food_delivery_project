import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState(""); // Добавлено состояние для имени
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    if (!name.trim() || !phoneNumber.trim() || !password.trim() || !confirmPassword.trim()) {
      setError("Пожалуйста, заполните все поля.");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Пароли не совпадают.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/users/register/", {
        name: name, // Отправляем имя на сервер
        phone_number: phoneNumber,
        password: password,
      });

      // Сохранение токенов
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);

      console.log("Успешная регистрация. Токен:", response.data.access);

      // Перенаправление в личный кабинет
      navigate("/dashboard");
    } catch (error) {
      if (error.response) {
        setError(error.response.data.detail || "Ошибка при регистрации.");
        console.error("Ошибка при регистрации:", error.response.data);
      } else if (error.request) {
        setError("Ошибка сети.");
      } else {
        setError("Произошла неизвестная ошибка.");
      }
      console.error("Ошибка при регистрации:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Регистрация</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label htmlFor="name">Имя</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="phone_number">Телефон</label>
          <input
            type="text"
            id="phone_number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="confirm_password">Подтвердите пароль</label>
          <input
            type="password"
            id="confirm_password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Регистрация..." : "Зарегистрироваться"}
        </button>
      </form>
    </div>
  );
};

export default Register;
