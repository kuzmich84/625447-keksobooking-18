'use strict';

(function () {

  var card = document.querySelector('#card').content;

  var getDescriptionOfType = function (type) {
    var typeOfFlat = '';
    switch (type) {
      case 'palace':
        typeOfFlat = 'Дворец';
        break;
      case 'flat':
        typeOfFlat = 'Квартира';
        break;
      case 'house':
        typeOfFlat = 'Дом';
        break;
      default:
        typeOfFlat = 'Бунгало';
        break;
    }
    return typeOfFlat;
  };


  window.renderAdvert = function (advert) {
    var cardElement = card.cloneNode(true);

    cardElement.querySelector('.popup__title').textContent = advert.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = advert.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = advert.offer.price + '\u20BD/ночь';
    cardElement.querySelector('.popup__type').textContent = getDescriptionOfType(advert.offer.type);
    cardElement.querySelector('.popup__text--capacity').textContent = window.util.getDeclensionWord(advert.offer.rooms, [' комната', ' комнаты', ' комнат']) +
      ' для ' + window.util.getDeclensionWord(advert.offer.guests, [' гостя', ' гостей', ' гостей']);
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = advert.offer.description;

    var popupFeatures = cardElement.querySelector('.popup__features').children;
    for (var i = 0; i < popupFeatures.length; i++) {
      popupFeatures[i].style.display = 'none';
    }
    for (i = 0; i < advert.offer.features.length; i++) {
      for (var j = 0; j < popupFeatures.length; j++) {
        if (popupFeatures[j].classList.contains('popup__feature--' + advert.offer.features[i])) {
          popupFeatures[j].style.display = 'inline-block';
        }
      }
    }

    for (i = 0; i < advert.offer.photos.length; i++) {
      cardElement.querySelector('.popup__photo').src = advert.offer.photos[i];
      cardElement.querySelector('.popup__photos').appendChild(cardElement.querySelector('.popup__photo').cloneNode(true));
    }
    cardElement.querySelectorAll('.popup__photo')[0].remove();

    cardElement.querySelector('.popup__avatar').src = advert.author.avatar;

    return cardElement;
  };

  window.closeMapCardHandler = function () {
    var mapCard = document.querySelector('.map__card');
    var buttonPopupClose = document.querySelector('.popup__close');

    buttonPopupClose.addEventListener('click', function () {
      mapCard.remove();
    });

    window.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.ESC_KEYCODE) {
        mapCard.remove();
      }
    });
  };

  window.deleteMapCard = function () {
    var mapCard = document.querySelector('.map__card');
    if (mapCard !== null) {
      mapCard.remove();
    }
  };


})();
