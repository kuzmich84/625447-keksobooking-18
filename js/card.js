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


  var renderCard = function (advert) {
    var cardElement = card.cloneNode(true);

    cardElement.querySelector('.popup__title').textContent = advert.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = advert.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = advert.offer.price + '\u20BD/ночь';
    cardElement.querySelector('.popup__type').textContent = getDescriptionOfType(advert.offer.type);
    cardElement.querySelector('.popup__text--capacity').textContent = window.util.getDeclensionWord(advert.offer.rooms, [' комната', ' комнаты', ' комнат']) +
      ' для ' + window.util.getDeclensionWord(advert.offer.guests, [' гостя', ' гостей', ' гостей']);
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = advert.offer.description;

    var popupFeatures = Array.from(cardElement.querySelector('.popup__features').children);

    popupFeatures.forEach(function (element) {
      element.style.display = 'none';
    });

    advert.offer.features.forEach(function (featuresItem) {
      popupFeatures.forEach(function (element) {
        if (element.classList.contains('popup__feature--' + featuresItem)) {
          element.style.display = 'inline-block';
        }
      });
    });

    advert.offer.photos.forEach(function (photosItem) {
      cardElement.querySelector('.popup__photo').src = photosItem;
      cardElement.querySelector('.popup__photos').appendChild(cardElement.querySelector('.popup__photo').cloneNode(true));
    });
    cardElement.querySelectorAll('.popup__photo')[0].remove();
    cardElement.querySelector('.popup__avatar').src = advert.author.avatar;

    return cardElement;
  };

  window.card = {
    closeMapCardHandler: function () {
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
    },
    deleteMapCard: function () {
      var mapCard = document.querySelector('.map__card');
      if (mapCard !== null) {
        mapCard.remove();
      }
    },
    renderAdvert: renderCard
  };
})();
