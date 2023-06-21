import React from "react";
import PopupWithForm from "./PopupWithForm";

function ConfirmDeletePopup(props) {
    const { isOpen, onClose, onDeleteCard, renderLoadingOn, renderLoading } = props;

    function handleSubmit(e) {
        e.preventDefault();
        renderLoading();
        onDeleteCard();
    }

    return (
        <PopupWithForm
            name="confirm"
            title="Вы уверены?"
            submitcaption="Да"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            renderLoadingOn={renderLoadingOn}
            renderLoadingCaption="Удаление..."
        />
    );
}

export default ConfirmDeletePopup;
