'use strict';

(function () {

  var pin = document.querySelector('#pin').content;
  var widthPin = 50;
  var heightPin = 70;

  window.pin = {

    mapPin: document.querySelector('.map__pins'),
    renderPin: function (advert) {
      var pinElement = pin.cloneNode(true);

      pinElement.querySelector('.map__pin').style.left = (advert.location.x - widthPin / 2) + 'px';
      pinElement.querySelector('.map__pin').style.top = (advert.location.y - heightPin) + 'px';
      pinElement.querySelector('.map__pin').firstChild.src = advert.author.avatar;
      return pinElement;
    },
    deleteButtonMapPin: function () {
      var buttonMapPin = window.pin.mapPin.querySelectorAll('button[type=button]');
      for (var i = 0; i < buttonMapPin.length; i++) {
        buttonMapPin[i].remove();
      }
    },

    addMapPinHandler: function (buttonMapPin, advert) {
      buttonMapPin.addEventListener('click', function () {
        var mapCard = document.querySelector('.map__card');
        var buttonPopupClose = document.querySelector('.popup__close');

        if (buttonPopupClose !== null) {
          mapCard.remove();
        }
        window.util.fragment.appendChild(window.renderAdvert(advert));
        window.pin.mapPin.appendChild(window.util.fragment);
        window.card.closeMapCardHandler();
      });
    },

    getButtonMapPin: function (advert) {
      var buttonMapPin = window.pin.mapPin.querySelectorAll('button[type=button]');
      for (var i = 0; i < buttonMapPin.length; i++) {
        var button = buttonMapPin[i];
        window.pin.addMapPinHandler(button, advert[i]);
      }
    }

  };

})();

