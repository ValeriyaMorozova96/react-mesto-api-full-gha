import SuccessIcon from "../images/success-icon.svg";
import FailIcon from "../images/fail-icon.svg";
import React from "react";

function InfoToolTip(props) {
    const icon = props.isSuccess ? SuccessIcon : FailIcon;
    const message = props.isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'
    const alt = props.isSuccess ? 'Вы успешно зарегистрировались!' : 'Не удалось зарегестрироваться.'
    return (
        <div className={`popup popup_type_tooltip ${props.isOpen ? "popup_opened" : ""}`} >
            <div className="popup__message-container">
                <img
                    className="popup__tooltip-image"
                    src={icon}
                    alt={alt}
                />
                <p className="popup__tooltip-message">{message}</p>
                <button
                    className="popup__close-button"
                    type="button"
                    aria-label="Закрыть всплывающее окно"
                    onClick={props.onClose}>
                </button>
            </div>
        </div>
    )
}

export default InfoToolTip;