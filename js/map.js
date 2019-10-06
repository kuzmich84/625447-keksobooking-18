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
  var mapPin = document.querySelector('.map__pins');
  var ESC_KEYCODE = 27;


  // window.noticeAddress.value = mapPinCoordinateX + ', ' + mapPinCoordinateY;

  var getNoticeAddress = function () {
    window.form.noticeAddress.value = parseInt(mapPinMain.style.left, 10) + Math.floor(MAP_PIN_WIDTH / 2) + ', ' + (parseInt(mapPinMain.style.top, 10) + MAP_PIN_HEIGHT + MAP_PIN_SHARP_HEIGHT);
  };

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
    getNoticeAddress();
    mapPin.appendChild(fragment);
    mapPinMain.removeEventListener('click', setActivePage);
    window.form.validateCapacityGuest();
    getButtonMapPin();

  };

  mapPinMain.addEventListener('click', function () {
    setActivePage();
  });
  var movePin = function () {
    mapPinMain.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var moveMouseHandler = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };


        mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
        mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';

        var mapPinCoordinateLeft = parseInt(mapPinMain.style.left, 10) + MAP_PIN_WIDTH;
        var mapPinCoordinateTop = parseInt(mapPinMain.style.top, 10);
        var mapPinsWidth = mapPin.getBoundingClientRect().width;
        var mapPinsLimitTop = window.data.coordinatePinStart - MAP_PIN_HEIGHT - MAP_PIN_SHARP_HEIGHT;
        var mapPinsLimitBottom = window.data.coordinatePinEnd - MAP_PIN_HEIGHT - MAP_PIN_SHARP_HEIGHT;


        if (mapPinCoordinateLeft > mapPinsWidth) {
          mapPinMain.style.left = (mapPinsWidth - MAP_PIN_WIDTH) + 'px';
        } else if (mapPinCoordinateLeft < MAP_PIN_WIDTH) {
          mapPinMain.style.left = 0 + 'px';
        }


        if (mapPinCoordinateTop < mapPinsLimitTop) {
          mapPinMain.style.top = mapPinsLimitTop + 'px';
        } else if (mapPinCoordinateTop > mapPinsLimitBottom) {
          mapPinMain.style.top = mapPinsLimitBottom + 'px';
        }

        getNoticeAddress();
      };

      var upMouseHandler = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', moveMouseHandler);
        document.removeEventListener('mouseup', upMouseHandler);

      };

      document.addEventListener('mousemove', moveMouseHandler);
      document.addEventListener('mouseup', upMouseHandler);

    });
  };
  movePin();
})();
