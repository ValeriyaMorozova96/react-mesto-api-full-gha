import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmDeletePopup from "./ConfirmDeletePopup";
import ImagePopup from './ImagePopup';
import { CurrentUserContext, currentUserInfo } from "../contexts/CurrentUserContext";
import api from "../utils/Api";
import * as auth from '../utils/Auth'
import { Routes, Route, useNavigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register';
import Login from './Login';
import InfoToolTip from './InfoTooltip';


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = useState(false);
  const [isInfoToolTipPopupOpen, setInfoToolTipPopupOpen] = useState(false);
  const [renderLoadingOn, setIsRenderLoadingOn] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState(currentUserInfo);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth
        .checkToken(jwt)
        .then(res => {
          setIsLoggedIn(true);
          setEmail(res.data.email);
          navigate('/');
        })
        .catch(err => {
          if (err.status === 400) {
            console.log('400 — Токен не передан или передан не в том формате');
          } else if (err.status === 401) {
            console.log('401 — Переданный токен некорректен');
          }
        });
    }
  }, []);

  function handleRegisterSubmit(email, password) {
    auth
      .register(email, password)
      .then(() => {
        setInfoToolTipPopupOpen(true);
        setIsSuccess(true);
        navigate('/sign-in');
      })
      .catch(err => {
        if (err.status === 400) {
          console.log('400 - некорректно заполнено одно из полей');
        }
        setInfoToolTipPopupOpen(true);
        setIsSuccess(false);
      });
  }

  function handleLoginSubmit(email, password) {
    auth
      .login(email, password)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        setIsLoggedIn(true);
        setEmail(email);
        navigate('/');
      })
      .catch(err => {
        if (err.status === 400) {
          console.log('400 - не передано одно из полей');
        } else if (err.status === 401) {
          console.log('401 - пользователь с email не найден');
        }
        setInfoToolTipPopupOpen(true);
        setIsSuccess(false);
      });
  }

  function handleSignOut() {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    navigate('/sign-in');
  }

  useEffect(() => {
    if (isLoggedIn) {
      api.getMyInfo()
        .then((data) => {
          setCurrentUser(data)
        })
        .catch((err) => { console.log(err) })
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      api.getServerCards()
        .then((cards) => {
          setCards(cards);
        })
        .catch((err) => { console.log(err) })
    }
  }, [isLoggedIn])

  function renderLoading() {
    setIsRenderLoadingOn((renderLoadingOn) => !renderLoadingOn);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true)
  }

  function handleConfirmDeleteClick(card) {
    setSelectedCard(card);
    setIsConfirmDeletePopupOpen(true)
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => { console.log(err) })
  }

  function handleCardDelete() {
    api.deleteCard(selectedCard._id)
      .then(() => {
        setCards((cards) => cards.filter((item) => item._id !== selectedCard._id))
        closeAllPopups()
      })
      .catch((err) => { console.log(err) })
      .finally(() => renderLoading())
  }

  function handleAddCard(card) {
    api.addNewCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => { console.log(err) })
      .finally(() => renderLoading())
  }

  function handleChangeProfile(userData) {
    api.changeProfileData(userData)
      .then((serverUserData) => {
        setCurrentUser(serverUserData)
        closeAllPopups()
      })
      .catch((err) => { console.log(err) })
      .finally(() => renderLoading())
  }

  function handleChangeAvatar(userAvatar) {
    api.changeUserAvatar(userAvatar)
      .then((serverUserAvatar) => {
        setCurrentUser(serverUserAvatar)
        closeAllPopups()
      })
      .catch((err) => { console.log(err) })
      .finally(() => renderLoading())
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false)
    setIsConfirmDeletePopupOpen(false)
    setSelectedCard({})
    setInfoToolTipPopupOpen(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          email={email}
          onSignOut={handleSignOut}
          isLoggedIn={isLoggedIn}
        />
        <Routes>
          <Route path='/'
            element={<ProtectedRoute
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleConfirmDeleteClick}
              cards={cards}
              loggedIn={isLoggedIn}
              element={Main}
            />}
          />
          <Route path="/sign-in"
            element={<Login onLogin={handleLoginSubmit} />} />
          <Route path="/sign-up"
            element={<Register onRegister={handleRegisterSubmit} />} />
        </Routes>
        {isLoggedIn && <Footer />}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateProfile={handleChangeProfile}
          renderLoadingOn={renderLoadingOn}
          renderLoading={renderLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddCard}
          renderLoadingOn={renderLoadingOn}
          renderLoading={renderLoading}
        />
        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />
        <ConfirmDeletePopup
          isOpen={isConfirmDeletePopupOpen}
          onClose={closeAllPopups}
          onDeleteCard={handleCardDelete}
          renderLoadingOn={renderLoadingOn}
          renderLoading={renderLoading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onChangeAvatar={handleChangeAvatar}
          renderLoadingOn={renderLoadingOn}
          renderLoading={renderLoading}
        />
        <InfoToolTip
          isOpen={isInfoToolTipPopupOpen}
          onClose={closeAllPopups}
          isSuccess={isSuccess}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
