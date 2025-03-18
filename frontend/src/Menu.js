import { useState, useEffect } from "react";
import axios from "axios";

const Menu = () => {
    const [dishes, setDishes] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");

    useEffect(() => {
        fetchDishes();
    }, [search, category]);

    const fetchDishes = async () => {
        let url = "http://127.0.0.1:8000/api/dishes/";
        let params = {};
        if (search) params.search = search;
        if (category) params.category = category;

        const response = await axios.get(url, { params });
        setDishes(response.data);
    };

    return (
        <div>
            <h2>Меню</h2>
            <input
                type="text"
                placeholder="Поиск блюд..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <select onChange={(e) => setCategory(e.target.value)}>
                <option value="">Все категории</option>
                <option value="Итальянская">Итальянская</option>
                <option value="Японская">Японская</option>
            </select>

            <ul>
                {dishes.map((dish) => (
                    <li key={dish.id}>{dish.name} - {dish.price}₽</li>
                ))}
            </ul>
        </div>
    );
};

export default Menu;