import React from 'react';

function ImagePopup(props) {
    const { card, isOpen, onClose } = props;
    return (
        <div className={isOpen ? 'popup popup_more-dark popup_opened' : 'popup'}>
            <div className="popup__photo-container">
                <button className="popup__close-button" type="button" onClick={onClose} aria-label="Закрыть всплывающее окно"></button>
                <img className="popup__photo" src={card ? card.link : "#"} alt={card ? card.name : ""} />
                <p className="popup__photo-caption">{card ? card.name : ""}</p>
            </div>
        </div>
    )
}

export default ImagePopup;