import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditAvatarPopup(props) {
    const { isOpen, onClose, onChangeAvatar, renderLoadingOn, renderLoading } = props;
    const currentUser = React.useContext(CurrentUserContext);
    const refAvatar = React.useRef(currentUser.avatar);

    React.useEffect(() => {
        refAvatar.current.value = ''
    }, [isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        renderLoading();
        onChangeAvatar({
            avatar: refAvatar.current.value
        });
    }

    return (
        <PopupWithForm
            name="avatar"
            title="Обновить аватар"
            submitcaption="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            renderLoadingOn={renderLoadingOn}
            renderLoadingCaption='Обновление...'
            children={
                <fieldset className="form__fieldset">
                    <input id='avatar-field' className="form__field form__field_type_avatar" ref={refAvatar} type="url"
                        placeholder="Ссылка на аватар" name="avatar" required />
                    <span className="form__field-error avatar-field-error"></span>
                </fieldset>
            }
        />
    )
}

export default EditAvatarPopup;