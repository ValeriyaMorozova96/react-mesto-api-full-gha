const userRoutes = require('express').Router();

const {
  getUsers,
  getUserById,
  getCurrentUser,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

const {
  userIdValidation,
  userInfoValidation,
  userAvatarValidation,
} = require('../utils/validation');

userRoutes.get('/users', getUsers);

userRoutes.get('/users/me', getCurrentUser);

userRoutes.get('/users/:userId', userIdValidation, getUserById);

userRoutes.patch('/users/me', userInfoValidation, updateUser);

userRoutes.patch('/users/me/avatar', userAvatarValidation, updateAvatar);

module.exports = userRoutes;
