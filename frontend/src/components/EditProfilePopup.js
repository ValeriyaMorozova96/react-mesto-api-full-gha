import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
    const { isOpen, onClose, renderLoadingOn, renderLoading } = props;
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState(currentUser.name);
    const [description, setDescription] = React.useState(currentUser.about);

    function handleName(e) {
        setName(e.target.value);
    }
    function handleDescription(e) {
        setDescription(e.target.value);
    }

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        renderLoading();
        props.onUpdateProfile({ name, about: description })
    }

    return (
        <PopupWithForm
            name="edit-profile"
            title="Редактировать профиль"
            submitcaption="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            renderLoadingOn={renderLoadingOn}
            renderLoadingCaption='Сохранение...'
            children={
                <fieldset className="form__fieldset">
                    <input id='name-field' className="form__field form__field_type_name" onChange={handleName} type="text" placeholder="Имя"
                        name="name" value={name} minLength="2" maxLength="40" required />
                    <span className="form__field-error name-field-error"></span>
                    <input id='job-field' className="form__field form__field_type_job" onChange={handleDescription} type="text" placeholder="О себе"
                        name="about" value={description} minLength="2" maxLength="200" required />
                    <span className="form__field-error job-field-error"></span>
                </fieldset>
            }
        />
    )
}

export default EditProfilePopup;