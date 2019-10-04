'use strict';

(function () {
  var map = document.querySelector('.map');

  var mapFilter = document.querySelectorAll('.map__filter');
  var mapCheckBox = document.querySelectorAll('.map__checkbox ');
  var fragment = document.createDocumentFragment();
  var MAP_PIN_WIDTH = 65;
  var MAP_PIN_HEIGHT = 65;
  var MAP_PIN_SHARP_HEIGHT = 22;
  var mapPinMain = map.querySelector('.map__pin--main');
  var mapPinCoordinateX = parseInt(mapPinMain.style.left, 10) + Math.floor(MAP_PIN_WIDTH / 2);
  var mapPinCoordinateY = parseInt(mapPinMain.style.top, 10) + Math.floor(MAP_PIN_HEIGHT / 2);
  var mapPin = document.querySelector('.map__pins');
  var ESC_KEYCODE = 27;

  // window.noticeAddress.value = mapPinCoordinateX + ', ' + mapPinCoordinateY;

  for (var i = 0; i < window.data.getAdvert().length; i++) {
    fragment.appendChild(window.renderPin(window.data.getAdvert()[i]));
  }

  window.util.setAttributeDisabled(mapFilter);
  window.util.setAttributeDisabled(mapCheckBox);

  var closeMapCardHandler = function () {
    var mapCard = document.querySelector('.map__card');
    var buttonPopupClose = document.querySelector('.popup__close');

    buttonPopupClose.addEventListener('click', function () {
      mapCard.remove();
    });

    window.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        mapCard.remove();
      }
    });
  };


  var addMapPinHandler = function (buttonMapPin, advert) {
    buttonMapPin.addEventListener('click', function () {
      var mapCard = document.querySelector('.map__card');
      var buttonPopupClose = document.querySelector('.popup__close');

      if (buttonPopupClose !== null) {
        mapCard.remove();
      }
      fragment.appendChild(window.renderAdvert(advert));
      mapPin.appendChild(fragment);
      closeMapCardHandler();
    });
  };
  var getButtonMapPin = function () {
    var buttonMapPin = mapPin.querySelectorAll('button[type=button]');

    for (i = 0; i < buttonMapPin.length; i++) {
      var button = buttonMapPin[i];
      addMapPinHandler(button, window.data.adverts[i]);
    }
  };

  var setActivePage = function () {
    map.classList.remove('map--faded');
    window.form.advertForm.classList.remove('ad-form--disabled');
    window.util.setAttributeEnabled(mapFilter);
    window.util.setAttributeEnabled(mapCheckBox);
    window.util.setAttributeEnabled(window.form.advertFormElement);
    window.form.advertFormHeader.removeAttribute('disabled');
    mapPinCoordinateY += MAP_PIN_SHARP_HEIGHT + Math.floor(MAP_PIN_WIDTH / 2);
    window.form.noticeAddress.value = mapPinCoordinateX + ', ' + mapPinCoordinateY;
    mapPin.appendChild(fragment);
    mapPinMain.removeEventListener('click', setActivePage);
    window.form.validateCapacityGuest();
    getButtonMapPin();
  };

  mapPinMain.addEventListener('click', setActivePage);

})();
