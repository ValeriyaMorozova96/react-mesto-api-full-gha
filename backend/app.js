const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const { errors } = require('celebrate');
const errorHandler = require('./middlewares/errorHandler');
const auth = require('./middlewares/auth');
const NotFoundError = require('./utils/errors/NotFoundError');
const cardRoutes = require('./routes/cards');
const userRoutes = require('./routes/users');
const { createUser, login } = require('./controllers/users');
const { signinValidation, signupValidation } = require('./utils/validation');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, MONGO_URL = 'mongodb://127.0.0.1/mestodb' } = process.env;
const app = express();
app.use(cors());

mongoose.connect(MONGO_URL);
mongoose.set({ runValidators: true });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(rateLimiter);
app.use(helmet());

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signup', signupValidation, createUser);
app.post('/signin', signinValidation, login);

app.use(auth);

app.use('/', userRoutes);
app.use('/', cardRoutes);

app.use(errorLogger);

app.use('/*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line
  console.log(`Сервер запущен на ${PORT} порту`);
});
