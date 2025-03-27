import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

const OrderForm = () => {
  const [dish, setDish] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const orderData = { dish, quantity };

    try {
      const response = await axios.post('http://localhost:8000/api/orders/', orderData);
      console.log('Order placed successfully:', response.data);
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  return (
    <div>
      <h2>Оформить заказ</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="dish">
          <Form.Label>Блюдо</Form.Label>
          <Form.Control
            type="text"
            placeholder="Введите название блюда"
            value={dish}
            onChange={(e) => setDish(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="quantity">
          <Form.Label>Количество</Form.Label>
          <Form.Control
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Оформить заказ
        </Button>
      </Form>
    </div>
  );
};

export default OrderForm;
