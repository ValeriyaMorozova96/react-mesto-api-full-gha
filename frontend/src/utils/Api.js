export class Api {
    constructor({ url, headers }) {
        this._url = url;
        this._headers = headers;
    }
    _getServerReply(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    setToken(token) {
        this._headers.authorization = `Bearer ${token}`;
      }
    getMyInfo() {
        return fetch(`${this._url}/users/me`,
            {
                method: 'GET',
                headers: this._headers
            })
            .then(this._getServerReply)
    }
    getServerCards() {
        return fetch(`${this._url}/cards`,
            {
                method: 'GET',
                headers: this._headers
            })
            .then(this._getServerReply)
    }
    changeProfileData({ name, about }) {
        return fetch(`${this._url}/users/me`,
            {
                method: 'PATCH',
                headers: this._headers,
                body: JSON.stringify({ name, about })
            })
            .then(this._getServerReply)
    }
    changeUserAvatar({ avatar }) {
        return fetch(`${this._url}/users/me/avatar`,
            {
                headers: this._headers,
                method: 'PATCH',
                body: JSON.stringify({ avatar })
            })
            .then(this._getServerReply)
    }
    addNewCard({ name, link }) {
        return fetch(`${this._url}/cards`,
            {
                method: 'POST',
                headers: this._headers,
                body: JSON.stringify({ name, link })
            })
            .then(this._getServerReply)
    }
    deleteCard(id) {
        return fetch(`${this._url}/cards/${id}`,
            {
                method: 'DELETE',
                headers: this._headers
            })
            .then(this._getServerReply)
    }
    changeLikeCardStatus(id, isLiked) {
        if (isLiked) {
            return fetch(`${this._url}/cards/${id}/likes`,
                {
                    method: 'PUT',
                    headers: this._headers
                })
                .then(this._getServerReply)
        } else {
            return fetch(`${this._url}/cards/${id}/likes`,
                {
                    method: 'DELETE',
                    headers: this._headers,
                })
                .then(this._getServerReply)
        }
    }
}

const api = new Api({
    url: "https://api.morozovavs.nomoreparties.sbs",
    headers: {
        "authorization": "",
        "Content-Type": "application/json",
    }
});
export default api;