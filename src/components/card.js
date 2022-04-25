import {
  cardTemplate,
  photoCard,
  linkPhoto,
  titlePhoto,
  popupSure,
  popupConfirmation,
} from "./utils.js";
import { closePopup, openPopup } from "./modal.js";
import { API_URL_CARDS, token, apiTokenProfile } from "./api.js";

export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

function cardDeleteFunction(cardLitter, cardId) {
  openPopup(popupSure);
  popupConfirmation.addEventListener("click", (e) => {
    e.preventDefault();
    const listItem = cardLitter.closest(".card");
    listItem.remove();
    closePopup(popupSure);
    console.log("CARDA", cardId);
    fetch(`https://nomoreparties.co/v1/plus-cohort-9/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: token,
        "Content-Type": "application/json",
      },
    });
  });
}

function cardLikeFunction(evt, likesRef, cardId) {
  evt.target.classList.toggle("card__like_active");
  let likesCount = parseInt(
    likesRef.innerText
  ); /* parseInt - вытаскиваем число из строки */
  if (!evt.target.classList.contains("card__like_active")) {
    likesRef.innerText = likesCount -= 1;
    fetch(`https://nomoreparties.co/v1/plus-cohort-9/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: token,
        "Content-Type": "application/json",
      },
    });
  } else {
    likesRef.innerText = likesCount += 1;
    fetch(`https://nomoreparties.co/v1/plus-cohort-9/cards/likes/${cardId}`, {
      method: "PUT",
      headers: {
        authorization: token,
        "Content-Type": "application/json",
      },
    });
  }
}

function cardPhotoFunction(name, link) {
  linkPhoto.src = link;
  linkPhoto.alt = name;
  titlePhoto.innerText = name;
  openPopup(photoCard);
  // На медленных устройствах при твоём коде будут моргания - сначала
  //  покажется попап со старыми данными, потом появятся новые. Поэтому
  //   лучше сначала заменить все данные, а потом показать попап
}

export function createCard(name, link, likes, cardId, cardOwner) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.cardId = cardId;

  const cardTitle = cardElement.querySelector(".card__title");
  const cardPhoto = cardElement.querySelector(".card__photo");
  const cardLike = cardElement.querySelector(".card__like");
  const cardDel = cardElement.querySelector(".card__del");
  const cardCountLikes = cardElement.querySelector(".card__like_count");
  cardCountLikes.innerText = likes;
  cardTitle.innerText = name;
  cardPhoto.alt = name;
  cardPhoto.src = link;
  if (cardOwner !== apiTokenProfile._id) {
    cardDel.remove();
  } else {
    cardDel.addEventListener("click", () => {
      cardDeleteFunction(cardDel, cardElement.cardId);
    });
  } 
  cardLike.addEventListener("click", (evt) =>
    cardLikeFunction(evt, cardCountLikes, cardElement.cardId)
  );
  cardPhoto.addEventListener("click", () => cardPhotoFunction(name, link));
  return cardElement;
}
