'use strict';

var adverts = [];
var titles = ['Уютное гнездышко для молодоженов', 'Милая квартирка', 'Шикарная квартира', 'Сдам квартиру с хорошим ремонтом', 'Светлая, просторная квартирка'];
var prices = [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var ROOMS = [1, 2, 3, 100];
var TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCRIPTION = ['В квартире уютно', 'В квартире тихо, соседи не шумят', 'Квартира находится в пяти минутах от метро', 'В квартире новая мебель'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var widthPin = 50;
var heightPin = 70;
var coordinatePinStart = 130;
var coordinatePinEnd = 630;
var pin = document.querySelector('#pin').content;
var mapPin = document.querySelector('.map__pins');
var widthMap = mapPin.clientWidth - widthPin;

var map = document.querySelector('.map');


var mapFilterContainer = map.querySelector('.map__filters-container');

var getRandomElement = function (advertItem) {
  var randomIndex = Math.floor((advertItem.length - 1) * Math.random());
  return advertItem[randomIndex];
};

var getRandomNumber = function (minNumber, maxNumber) {
  return Math.floor(Math.random() * (maxNumber - minNumber) + minNumber);
};

var getAdvert = function () {

  var advertAmount = 8;

  for (var i = 0; i < advertAmount; i++) {

    var coordinateX = getRandomNumber(0, widthMap);
    var coordinateY = getRandomNumber(coordinatePinStart, coordinatePinEnd);

    adverts[i] =
      {
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png'
        },

        offer: {
          title: getRandomElement(titles),
          address: coordinateX + ', ' + coordinateY,
          price: getRandomElement(prices),
          type: getRandomElement(TYPES),
          rooms: getRandomElement(ROOMS),
          guests: getRandomNumber(0, 4),
          checkin: getRandomElement(TIMES),
          checkout: getRandomElement(TIMES),
          features: FEATURES.slice(getRandomNumber(0, FEATURES.length), getRandomElement(0, FEATURES.length)),
          description: getRandomElement(DESCRIPTION),
          photos: PHOTOS.slice(getRandomNumber(0, PHOTOS.length), getRandomElement(0, PHOTOS.length))
        },

        location: {
          x: coordinateX,
          y: coordinateY
        }
      };
  }
  return adverts;
};

var renderPin = function (advert) {
  var pinElement = pin.cloneNode(true);

  pinElement.querySelector('.map__pin').style.left = (advert.location.x - widthPin / 2) + 'px';
  pinElement.querySelector('.map__pin').style.top = (advert.location.y - heightPin) + 'px';
  pinElement.querySelector('.map__pin').firstChild.src = advert.author.avatar;
  pinElement.querySelector('.map__pin').firstChild.alt = advert.offer.title;

  return pinElement;

};

var fragment = document.createDocumentFragment();
for (var i = 0; i < getAdvert().length; i++) {
  fragment.appendChild(renderPin(getAdvert()[i]));
}
// mapPin.appendChild(fragment);

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

var getDeclensionWord = function (number, word) {
  var cases = [2, 0, 1, 1, 1, 2];
  return number + word[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
};

var renderAdvert = function (advert) {
  var cardElement = card.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = advert.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = advert.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = advert.offer.price + '\u20BD/ночь';
  cardElement.querySelector('.popup__type').textContent = getDescriptionOfType(advert.offer.type);
  cardElement.querySelector('.popup__text--capacity').textContent = getDeclensionWord(advert.offer.rooms, [' комната', ' комнаты', ' комнат']) +
    ' для ' + getDeclensionWord(advert.offer.rooms, [' гостя', ' гостей', ' гостей']);
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;
  cardElement.querySelector('.popup__description').textContent = advert.offer.description;

  var popupFeatures = cardElement.querySelector('.popup__features').children;
  for (i = 0; i < popupFeatures.length; i++) {
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

fragment.appendChild(renderAdvert(adverts[0]));

// map.insertBefore(fragment, mapFilterContainer);

var setAttributeDisabled = function (formFields) {
  for (i = 0; i < formFields.length; i++) {
    formFields[i].setAttribute('disabled', 'disabled');
  }
};

var setAttributeEnabled = function (formFields) {
  for (i = 0; i < formFields.length; i++) {
    formFields[i].removeAttribute('disabled');
  }
};

var mapFilter = document.querySelectorAll('.map__filter');
var mapCheckBox = document.querySelectorAll('.map__checkbox ');
var notice = document.querySelector('.notice');
var advertFormElement = notice.querySelectorAll('.ad-form__element');
var advertFormHeader = notice.querySelector('.ad-form-header');
var mapPinMain = map.querySelector('.map__pin--main');
var advertForm = notice.querySelector('.ad-form');
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var MAP_PIN_WIDTH = 65;
var MAP_PIN_HEIGHT = 65;
var MAP_PIN_SHARP_HEIGHT = 22;
var mapPinCoordinateX = parseInt(mapPinMain.style.left, 10) + Math.floor(MAP_PIN_WIDTH / 2);
var mapPinCoordinateY = parseInt(mapPinMain.style.top, 10) + Math.floor(MAP_PIN_HEIGHT / 2);

var noticeAddress = notice.querySelector('#address');
noticeAddress.value = mapPinCoordinateX + ', ' + mapPinCoordinateY;


setAttributeDisabled(mapFilter);
setAttributeDisabled(mapCheckBox);
setAttributeDisabled(advertFormElement);
advertFormHeader.setAttribute('disabled', 'disabled');


var setActivePage = function () {
  map.classList.remove('map--faded');
  advertForm.classList.remove('ad-form--disabled');
  setAttributeEnabled(mapFilter);
  setAttributeEnabled(mapCheckBox);
  setAttributeEnabled(advertFormElement);
  advertFormHeader.removeAttribute('disabled');
  mapPinCoordinateY += MAP_PIN_SHARP_HEIGHT + Math.floor(MAP_PIN_WIDTH / 2);
  noticeAddress.value = mapPinCoordinateX + ', ' + mapPinCoordinateY;
};

mapPinMain.addEventListener('click', function () {
  setActivePage();
});




