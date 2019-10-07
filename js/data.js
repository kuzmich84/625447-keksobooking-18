'use strict';

(function () {

  var titles = ['Уютное гнездышко для молодоженов', 'Милая квартирка', 'Шикарная квартира', 'Сдам квартиру с хорошим ремонтом', 'Светлая, просторная квартирка'];
  var prices = [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000];
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var ROOMS = [1, 2, 3, 100];
  var TIMES = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var DESCRIPTION = ['В квартире уютно', 'В квартире тихо, соседи не шумят', 'Квартира находится в пяти минутах от метро', 'В квартире новая мебель'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var mapPin = document.querySelector('.map__pins');
  var widthMap = mapPin.clientWidth;
  var coordinatePinStart = 130;
  var coordinatePinEnd = 630;


  var getRandomElement = function (advertItem) {
    var randomIndex = Math.floor((advertItem.length - 1) * Math.random());
    return advertItem[randomIndex];
  };
  var getRandomNumber = function (minNumber, maxNumber) {
    return Math.floor(Math.random() * (maxNumber - minNumber) + minNumber);
  };

  window.data = {

    adverts: [],

    getAdvert: function () {
      var advertAmount = 8;

      for (var i = 0; i < advertAmount; i++) {
        var coordinateX = getRandomNumber(0, widthMap);
        var coordinateY = getRandomNumber(coordinatePinStart, coordinatePinEnd);
        window.data.adverts[i] =
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
      return window.data.adverts;
    }
  };

})();
