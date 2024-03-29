'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapFilter = document.querySelectorAll('.map__filter');
  var mapCheckBox = document.querySelectorAll('.map__checkbox ');
  var MAP_PIN_WIDTH = 65;
  var MAP_PIN_HEIGHT = 65;
  var MAP_PIN_SHARP_HEIGHT = 22;
  var mapPinMain = map.querySelector('.map__pin--main');
  window.ESC_KEYCODE = 27;
  var MAP_PIN_FIRST_LEFT_COORDINATE = mapPinMain.style.left;
  var MAP_PIN_FIRST_TOP_COORDINATE = mapPinMain.style.top;
  var coordinatePinStart = 130;
  var coordinatePinEnd = 630;
  var active = false;
  var getNoticeAddress = function () {
    window.form.noticeAddress.value = parseInt(mapPinMain.style.left, 10) + Math.floor(MAP_PIN_WIDTH / 2) + ', ' + (parseInt(mapPinMain.style.top, 10) + MAP_PIN_HEIGHT + MAP_PIN_SHARP_HEIGHT);
  };
  getNoticeAddress();

  var successPinHandler = function (data) {
    window.filter.adverts = data;
    window.filter.changeFilterHandler();
    window.filter.mapFilters.addEventListener('change', window.filter.changeFilterHandler);
  };

  var successPinCardHandler = function () {
    window.filter.mapFilters.addEventListener('change', window.filter.changeFilterHandler);
  };


  window.util.setAttributeDisabled(mapFilter);
  window.util.setAttributeDisabled(mapCheckBox);

  var setActivePage = function () {
    window.form.validateCapacityGuest();
    window.form.setMinPriceOfType();
    if (active === false) {
      map.classList.remove('map--faded');
      window.form.advert.classList.remove('ad-form--disabled');
      window.util.setAttributeEnabled(mapFilter);
      window.util.setAttributeEnabled(mapCheckBox);
      window.util.setAttributeEnabled(window.form.advertElement);
      window.form.advertHeader.removeAttribute('disabled');
      getNoticeAddress();
      window.backend.load(successPinHandler, window.popup.errorHandler);
      window.backend.load(successPinCardHandler, window.popup.errorHandler);
    }
    mapPinMain.removeEventListener('click', setActivePage);
    active = true;
  };

  window.setNotActivePage = function () {
    map.classList.add('map--faded');
    window.form.advert.classList.add('ad-form--disabled');
    window.util.setAttributeDisabled(mapFilter);
    window.util.setAttributeDisabled(mapCheckBox);
    window.util.setAttributeDisabled(window.form.advertElement);
    window.pin.deleteButton();
    mapPinMain.style.left = MAP_PIN_FIRST_LEFT_COORDINATE;
    mapPinMain.style.top = MAP_PIN_FIRST_TOP_COORDINATE;
    getNoticeAddress();
    window.card.deleteMapCard();
    window.filter.mapFilters.reset();
    window.resetPhotoForm();
    active = false;
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

        var mapPinCoordinateLeft = parseInt(mapPinMain.style.left, 10) + MAP_PIN_WIDTH / 2;
        var mapPinCoordinateTop = parseInt(mapPinMain.style.top, 10);
        var mapPinsLimitTop = coordinatePinStart - MAP_PIN_HEIGHT - MAP_PIN_SHARP_HEIGHT;
        var mapPinsLimitBottom = coordinatePinEnd - MAP_PIN_HEIGHT - MAP_PIN_SHARP_HEIGHT;
        var LIMIT_LEFT = 0;
        var LIMIT_RIGHT = window.pin.map.getBoundingClientRect().width;


        if (mapPinCoordinateLeft > LIMIT_RIGHT) {
          mapPinMain.style.left = (LIMIT_RIGHT - MAP_PIN_WIDTH / 2) + 'px';
        } else if (mapPinCoordinateLeft < LIMIT_LEFT) {
          mapPinMain.style.left = -MAP_PIN_WIDTH / 2 + 'px';
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
