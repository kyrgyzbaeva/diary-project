const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Убедитесь, что путь к модели пользователя правильный

const authController = {
  // Регистрация
  register: async (req, res) => {
    try {
      const { username, email, password } = req.body;

      // Проверяем, существует ли пользователь с таким email
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'Email уже зарегистрирован' });
      }

      // Хэшируем пароль
      const hashedPassword = await bcrypt.hash(password, 10);

      // Создаем нового пользователя
      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
      });

      res.status(201).json({ message: 'Пользователь успешно зарегистрирован', user: newUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка при регистрации', error });
    }
  },

  // Логин
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Проверяем, существует ли пользователь
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({ message: 'Пользователь не найден' });
      }

      // Проверяем пароль
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Неверный пароль' });
      }

      // Генерируем токен
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' } // Срок действия токена
      );

      res.status(200).json({
        message: 'Авторизация успешна',
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка при авторизации', error });
    }
  },

  // Проверка токена
  checkAuth: async (req, res) => {
    try {
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];
      if (!token) {
        return res.status(401).json({ message: 'Токен отсутствует' });
      }

      jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Неверный токен' });
        res.status(200).json({ message: 'Токен валиден', user });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка при проверке токена', error });
    }
  },
};

module.exports = authController;