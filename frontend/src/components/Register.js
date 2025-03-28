import { useState } from "react";
import axios from "axios";

const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        phone_number: "",
        password: "",
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        try {
            await axios.post("http://localhost:8000/api/register/", formData);
            setSuccess("Регистрация успешна! Теперь войдите.");
            setFormData({ username: "", phone_number: "", password: "" }); // Очищаем форму
        } catch (err) {
            setError(
                err.response?.data?.message || err.response?.data?.detail || "Ошибка регистрации"
            );
        }
    };

    return (
        <div>
            <h2>Регистрация</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Имя"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="phone_number"
                    placeholder="Телефон"
                    value={formData.phone_number}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Пароль"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Зарегистрироваться</button>
            </form>
        </div>
    );
};

export default Register;

