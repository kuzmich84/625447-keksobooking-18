'use strict';

(function () {
  var RangePrice = {
    LOW: {
      MIN: 0,
      MAX: 10000
    },
    MIDDLE: {
      MIN: 10000,
      MAX: 50000
    },
    HIGH: {
      MIN: 50000,
      MAX: Infinity
    }
  };

  window.filter = {
    mapFilters: document.querySelector('.map__filters'),
    adverts: [],
    changeFilterHandler: function () {
      window.debounce(function () {
        newAdverts = window.filter.adverts;
        newAdverts = newAdverts.filter(sameOfferType).filter(sameOfferPrice).filter(sameOfferRooms).filter(sameOfferGuest).filter(sameOfferFeatures);
        window.pin.deleteButtonMapPin();
        renderPins(newAdverts);
        window.pin.getButtonMapPin(newAdverts);
        window.deleteMapCard();
      });
    }
  };


  var newAdverts = [];


  var housingType = window.filter.mapFilters.querySelector('#housing-type');
  var housingRooms = window.filter.mapFilters.querySelector('#housing-rooms');
  var housingPrice = window.filter.mapFilters.querySelector('#housing-price');
  var housingGuestNumber = window.filter.mapFilters.querySelector('#housing-guests');
  var PINS_LIMIT = 5;


  var filtrationItem = function (it, data, key) {
    if (it.value === 'any') {
      return true;
    } else {
      return it.value === data[key].toString();
    }
  };


  var sameOfferType = function (data) {
    return filtrationItem(housingType, data.offer, 'type');
  };


  var sameOfferPrice = function (data) {
    var selectedPrice = RangePrice[housingPrice.value.toUpperCase()];
    if (selectedPrice) {
      return data.offer.price >= selectedPrice.MIN && data.offer.price <= selectedPrice.MAX;
    } else {
      return true;
    }
  };

  var sameOfferRooms = function (data) {
    return filtrationItem(housingRooms, data.offer, 'rooms');
  };

  var sameOfferGuest = function (data) {
    return filtrationItem(housingGuestNumber, data.offer, 'guests');
  };

  var sameOfferFeatures = function (data) {
    var checkedFeaturesItems = document.querySelectorAll('input:checked');
    return Array.from(checkedFeaturesItems).every(function (element) {
      return data.offer.features.includes(element.value);
    });
  };

  var renderPins = function (data) {
    var takeNumber = data.length > PINS_LIMIT ? PINS_LIMIT : data.length;
    for (var i = 0; i < takeNumber; i++) {
      window.util.fragment.appendChild(window.pin.renderPin(data[i]));
    }
    window.pin.mapPin.appendChild(window.util.fragment);
  };

})();
