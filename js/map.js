'use strict';

(function () {
  var map = document.querySelector('.map');

  var mapFilter = document.querySelectorAll('.map__filter');
  var mapCheckBox = document.querySelectorAll('.map__checkbox ');
  var MAP_PIN_WIDTH = 65;
  var MAP_PIN_HEIGHT = 65;
  var MAP_PIN_SHARP_HEIGHT = 22;
  var mapPinMain = map.querySelector('.map__pin--main');
  var mapPin = document.querySelector('.map__pins');
  window.ESC_KEYCODE = 27;
  var MAP_PIN_FIRST_LEFT_COORDINATE = mapPinMain.style.left;
  var MAP_PIN_FIRST_TOP_COORDINATE = mapPinMain.style.top;


  var getNoticeAddress = function () {
    window.form.noticeAddress.value = parseInt(mapPinMain.style.left, 10) + Math.floor(MAP_PIN_WIDTH / 2) + ', ' + (parseInt(mapPinMain.style.top, 10) + MAP_PIN_HEIGHT + MAP_PIN_SHARP_HEIGHT);
  };
  getNoticeAddress();

  var successPinHandler = function (adverts) {
    for (var i = 0; i < adverts.length; i++) {
      window.util.fragment.appendChild(window.renderPin(adverts[i]));
    }
    mapPin.appendChild(window.util.fragment);
  };

  window.util.setAttributeDisabled(mapFilter);
  window.util.setAttributeDisabled(mapCheckBox);

  var closeMapCardHandler = function () {
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


  var addMapPinHandler = function (buttonMapPin, advert) {
    buttonMapPin.addEventListener('click', function () {
      var mapCard = document.querySelector('.map__card');
      var buttonPopupClose = document.querySelector('.popup__close');

      if (buttonPopupClose !== null) {
        mapCard.remove();
      }
      window.util.fragment.appendChild(window.renderAdvert(advert));
      mapPin.appendChild(window.util.fragment);
      closeMapCardHandler();
    });
  };

  var getButtonMapPin = function (adverts) {
    successPinHandler(adverts);
    var buttonMapPin = mapPin.querySelectorAll('button[type=button]');
    for (var i = 0; i < buttonMapPin.length; i++) {
      var button = buttonMapPin[i];
      addMapPinHandler(button, adverts[i]);
    }
  };

  var deleteButtonMapPin = function () {
    var buttonMapPin = mapPin.querySelectorAll('button[type=button]');
    for (var i = 0; i < buttonMapPin.length; i++) {
      buttonMapPin[i].remove();
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
    // window.load(successPinHandler, window.popup.errorHandler);
    window.form.validateCapacityGuest();
    window.load(getButtonMapPin, window.popup.errorHandler);
    mapPinMain.removeEventListener('click', setActivePage);
  };

  window.setNotActivePage = function () {
    map.classList.add('map--faded');
    window.form.advertForm.classList.add('ad-form--disabled');
    window.util.setAttributeDisabled(mapFilter);
    window.util.setAttributeDisabled(mapCheckBox);
    deleteButtonMapPin();
    mapPinMain.style.left = MAP_PIN_FIRST_LEFT_COORDINATE;
    mapPinMain.style.top = MAP_PIN_FIRST_TOP_COORDINATE;
    getNoticeAddress();
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
