import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function Main(props) {
    const { onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardDelete, onCardLike, cards } = props;
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__data">
                    <button className="profile__avatar-change" type="button" onClick={onEditAvatar}>
                        <img className="profile__avatar" src={currentUser.avatar} alt="Аватар" />
                    </button>
                    <div className="profile__information">
                        <div className="profile__info">
                            <h1 className="profile__name">{currentUser.name}</h1>
                            <p className="profile__description">{currentUser.about}</p>
                        </div>
                        <button className="profile__edit-button" onClick={onEditProfile} type="button" aria-label="Редактировать профиль"
                            name="edit"></button>
                    </div>
                </div>
                <button className="profile__add-button" onClick={onAddPlace} type="button" aria-label="Добавить фото" name="add"></button>
            </section>
            <section className="photos">
                {cards.map((card) => (<Card card={card} key={card._id} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />))}
            </section>
        </main>
    )
}

export default Main;