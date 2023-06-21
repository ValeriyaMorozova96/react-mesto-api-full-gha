import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
    const { isOpen, onClose, onAddPlace, renderLoadingOn, renderLoading } = props;
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    function handlePlaceName(e) {
        setName(e.target.value);
    }

    function handleLink(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        renderLoading();
        onAddPlace({ name, link })
    }

    React.useEffect(() => {
        setName('');
        setLink('');
    }, [isOpen])

    return (
        <PopupWithForm
            name="add-new-card"
            title="Новое место"
            submitcaption="Создать"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            renderLoadingOn={renderLoadingOn}
            renderLoadingCaption='Создание...'
            children={
                <fieldset className="form__fieldset">
                    <input id='place-field' className="form__field form__field_type_place" onChange={handlePlaceName} type="text"
                        placeholder="Название" name="name" value={name} minLength="2" maxLength="30" required />
                    <span className="form__field-error place-field-error"></span>
                    <input id='link-field' className="form__field form__field_type_image-link" onChange={handleLink} type="url"
                        placeholder="Ссылка на картинку" name="link" value={link} required />
                    <span className="form__field-error link-field-error"></span>
                </fieldset>
            }
        />
    )
}

export default AddPlacePopup;