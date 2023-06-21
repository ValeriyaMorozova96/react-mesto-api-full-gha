import React from "react";

function PopupWithForm(props) {
    const { name, title, children, submitcaption, isOpen, onClose, onSubmit, renderLoadingOn, renderLoadingCaption } = props;
    return (
        <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ""}`}>
            <div className="popup__container">
                <h2 className="popup__title">{title}</h2>
                <form className='form' onSubmit={onSubmit}>
                    {children}
                    <button className="form__submit-button" aria-label="Отправить форму" type="submit">{renderLoadingOn ? renderLoadingCaption : submitcaption}</button>
                </form>
                <button className="popup__close-button" aria-label="Закрыть всплывающее окно" onClick={onClose}></button>
            </div>
        </div>
    )
}

export default PopupWithForm;