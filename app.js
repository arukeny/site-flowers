const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = process.env.PORT || 3000;


const pool = new Pool({
  user: 'postgres',              
  host: 'localhost',             
  database: 'flowers_site',      
  password: '12345',             
  port: 5432,                    
});


app.use(express.json());


app.use(express.static('public'));


app.get('/api/products', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Products');
    res.json(result.rows);
  } catch (err) {
    console.error('Ошибка при получении товаров:', err);
    res.status(500).send('Ошибка сервера');
  }
});


app.post('/api/place-order', async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const {
      customerName,
      customerPhone,
      customerEmail,
      deliveryMethod,
      deliveryAddress,
      comment,
      totalPrice,
      cartItems
    } = req.body;


    if (!customerName || !customerPhone || !deliveryMethod || !totalPrice || !cartItems || cartItems.length === 0) {
      await client.query('ROLLBACK');
      return res.status(400).json({ message: 'Отсутствуют обязательные поля заказа или корзина пуста.' });
    }


    if (deliveryMethod === 'курьер' && !deliveryAddress) {
      await client.query('ROLLBACK');
      return res.status(400).json({ message: 'Для курьерской доставки требуется адрес.' });
    }

    const orderInsertQuery = `
      INSERT INTO Orders (user_id, delivery_method, delivery_address, status, total_price, customer_comment, order_date)
      VALUES ($1, $2, $3, $4, $5, $6, NOW())
      RETURNING id;
    `;

    const orderValues = [1, deliveryMethod, deliveryAddress, 'pending', totalPrice, comment];
    const orderResult = await client.query(orderInsertQuery, orderValues);
    const orderId = orderResult.rows[0].id;


    for (const item of cartItems) {
      const itemInsertQuery = `
        INSERT INTO OrderItems (order_id, product_id, quantity, price)
        VALUES ($1, $2, $3, $4);
      `;
      const itemValues = [orderId, item.id, item.quantity, item.price];
      await client.query(itemInsertQuery, itemValues);

    }

    await client.query('COMMIT');
    res.status(201).json({ message: 'Заказ успешно оформлен', orderId: orderId });

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Ошибка при оформлении заказа:', error);
    res.status(500).json({ message: 'Ошибка сервера при оформлении заказа', error: error.message });
  } finally {
    client.release();
  }
});



app.listen(port, () => {
  console.log(`Сервер работает: http://localhost:${port}`);
});