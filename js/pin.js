'use strict';

(function () {

  var pin = document.querySelector('#pin').content;
  var widthPin = 50;
  var heightPin = 70;

  window.pin = {

    map: document.querySelector('.map__pins'),
    render: function (advert) {
      var pinElement = pin.cloneNode(true);

      pinElement.querySelector('.map__pin').style.left = (advert.location.x - widthPin / 2) + 'px';
      pinElement.querySelector('.map__pin').style.top = (advert.location.y - heightPin) + 'px';
      pinElement.querySelector('.map__pin').firstChild.src = advert.author.avatar;
      return pinElement;
    },
    deleteButton: function () {
      var buttonMapPins = Array.from(window.pin.map.querySelectorAll('button[type=button]'));
      buttonMapPins.forEach(function (buttonItem) {
        buttonItem.remove();
      });
    },

    getButton: function (advert) {
      var buttonMapPin = window.pin.map.querySelectorAll('button[type=button]');
      for (var i = 0; i < buttonMapPin.length; i++) {
        var button = buttonMapPin[i];
        addMapPinHandler(button, advert[i]);
      }
    }
  };

  var addMapPinHandler = function (buttonMapPin, advert) {
    buttonMapPin.addEventListener('click', function () {
      var mapCard = document.querySelector('.map__card');
      var buttonPopupClose = document.querySelector('.popup__close');

      if (buttonPopupClose !== null) {
        mapCard.remove();
      }
      window.util.fragment.appendChild(window.card.renderAdvert(advert));
      window.pin.map.appendChild(window.util.fragment);
      window.card.closeMapCardHandler();
    });
  };

})();

