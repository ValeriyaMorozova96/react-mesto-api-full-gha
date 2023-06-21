import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
    const { card, onCardClick, onCardLike, onCardDelete } = props;
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardDeleteButtonClassName = (`card__delete-button ${isOwn ? 'card__delete-button_active' : ''}`);
    const cardLikeButtonClassName = (`card__like-button ${isLiked && 'card__like-button_active'}`);

    function handleCardClick() {
        onCardClick(card);
    }
    function handleCardLike() {
        onCardLike(card);
    }
    function handleCardDelete() {
        onCardDelete(card);
    }

    return (
        <article className="card">
            <img className="card__image" src={card.link} alt={card.name} onClick={handleCardClick} />
            <button className={cardDeleteButtonClassName} onClick={handleCardDelete} type="button" aria-label="Удалить фото"></button>
            <div className="card__caption">
                <h2 className="card__caption-text">{card.name}</h2>
                <div className="card__like-box">
                    <button className={cardLikeButtonClassName} onClick={handleCardLike} type="button" aria-label="Поставить лайк" name="like"></button>
                    <span className="card__like-count">{card.likes.length}</span>
                </div>
            </div>
        </article>
    )
}
export default Card;