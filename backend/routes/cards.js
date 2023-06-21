const cardRoutes = require('express').Router();

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const { cardInfoValidation, cardIdValidation } = require('../utils/validation');

cardRoutes.get('/cards', getCards);

cardRoutes.post('/cards', cardInfoValidation, createCard);

cardRoutes.delete('/cards/:cardId', cardIdValidation, deleteCard);

cardRoutes.put('/cards/:cardId/likes', cardIdValidation, likeCard);

cardRoutes.delete('/cards/:cardId/likes', cardIdValidation, dislikeCard);

module.exports = cardRoutes;
