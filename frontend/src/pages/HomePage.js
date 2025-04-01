import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, Row, Col, Container, Spinner, Alert } from "react-bootstrap";  // Импортируем компоненты из React-Bootstrap

const HomePage = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);  // Состояние для загрузки данных

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_API_URL || "http://localhost:8000/api/foods/");
        
        if (response.status === 200) {
          setFoodItems(response.data);
        } else {
          setError("Не удалось загрузить блюда.");
        }
      } catch (err) {
        setError("Ошибка загрузки списка блюд.");
        console.error("Ошибка:", err);
      } finally {
        setLoading(false);  // Устанавливаем загрузку как завершенную
      }
    };

    fetchFoodItems();
  }, []);

  return (
    <Container style={{ paddingTop: "20px" }}>
      <h1>Меню</h1>
      {error && <Alert variant="danger">{error}</Alert>} {/* Вывод ошибки, если она есть */}
      
      {loading ? (
        <Spinner animation="border" variant="primary" />  // Спиннер во время загрузки
      ) : (
        <Row>
          {foodItems.length > 0 ? (
            foodItems.map((item) => (
              <Col key={item.id} xs={12} sm={6} md={4} lg={3} style={{ marginBottom: "20px" }}>
                <Card>
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>{item.price} руб.</Card.Text>
                    <Button variant="primary">Подробнее</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col>
              <Alert variant="info">Список блюд пуст.</Alert> {/* Если нет блюд */}
            </Col>
          )}
        </Row>
      )}
    </Container>
  );
};

export default HomePage;
