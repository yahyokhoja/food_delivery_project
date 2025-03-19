import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, InputGroup, FormControl, Container, Row, Col, ListGroup, Spinner, Alert } from "react-bootstrap";

const Menu = () => {
    const [dishes, setDishes] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchDishes();
    }, [search, category]);

    const fetchDishes = async () => {
        setLoading(true);
        setError(null); // сброс ошибок при каждом запросе
        let url = "http://127.0.0.1:8000/api/dishes/";
        let params = {};
        if (search) params.search = search;
        if (category) params.category = category;

        try {
            const response = await axios.get(url, { params });
            setDishes(response.data);
        } catch (err) {
            setError("Произошла ошибка при загрузке данных.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <h2 className="my-4 text-center">Меню</h2>

            {/* Поле поиска */}
            <Row className="mb-3">
                <Col md={6} className="mx-auto">
                    <InputGroup>
                        <FormControl
                            placeholder="Поиск блюд..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </InputGroup>
                </Col>
            </Row>

            {/* Выпадающий список категорий */}
            <Row className="mb-4">
                <Col md={6} className="mx-auto">
                    <Form.Control as="select" onChange={(e) => setCategory(e.target.value)}>
                        <option value="">Все категории</option>
                        <option value="Итальянская">Итальянская</option>
                        <option value="Японская">Японская</option>
                    </Form.Control>
                </Col>
            </Row>

            {/* Сообщение об ошибке */}
            {error && (
                <Alert variant="danger">
                    {error}
                </Alert>
            )}

            {/* Индикатор загрузки */}
            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" variant="primary" />
                </div>
            ) : (
                <ListGroup>
                    {dishes.length === 0 ? (
                        <ListGroup.Item>Нет блюд, соответствующих запросу.</ListGroup.Item>
                    ) : (
                        dishes.map((dish) => (
                            <ListGroup.Item key={dish.id}>
                                {dish.name} - {dish.price}₽
                            </ListGroup.Item>
                        ))
                    )}
                </ListGroup>
            )}
        </Container>
    );
};

export default Menu;