import { profileAvatar, profileSubTitle, profileTitle } from "./constants.js";

export const token = "cfb5467c-bf03-4f53-98d0-54d36791533e";
const API_COHORT = "plus-cohort-9";
const API_URL = `https://nomoreparties.co/v1/${API_COHORT}/`;
const API_URL_USER = API_URL + "/users/me";
const API_URL_CARDS = API_URL + "/cards";

const responseCheck = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: code ${res.status}`);
  }
};

export const apiTokenProfile = () => {
  return fetch(API_URL_USER, {
    headers: {
      authorization: token,
    },
  })
    .then(responseCheck)
    .then((res) => {
      console.log('Результат АПИ Профиля - ', res);
      return res;
    })
    .catch(err => console.err(err))
};

const apiTokenCards = () => {
  return fetch(API_URL_CARDS, {
    headers: {
      authorization: token,
    },
  })
  .then(responseCheck)
  .then((res) => {
    console.log('Результат АПИ карточек - ', res);
    return res;
  })
  .catch(err => console.err(err))
}

export const loadApiCards = () => {
  return apiTokenCards();
}

export const loadApiProfile = () => {
  apiTokenProfile()
    .then((res) => {
      profileAvatar.src = res.avatar;
      profileTitle.textContent = res.name;
      profileSubTitle.textContent = res.about;
    })
    .catch((err) => {
      console.error('Ошибка - ', err);
    });
};