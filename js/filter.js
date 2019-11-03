'use strict';

(function () {


})();
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


var filtrationItem = function (it, item, key) {
  if (it.value === 'any') {
    return true;
  } else {
    return it.value === item[key].toString();
  }
};


var sameOfferType = function (item) {
  return filtrationItem(housingType, item.offer, 'type');
};


var sameOfferPrice = function (item) {
  var selectedPrice = RangePrice[housingPrice.value.toUpperCase()];
  if (selectedPrice) {
    return item.offer.price >= selectedPrice.MIN && item.offer.price <= selectedPrice.MAX;
  } else {
    return true;
  }
};

var sameOfferRooms = function (item) {
  return filtrationItem(housingRooms, item.offer, 'rooms');
};

var sameOfferGuest = function (item) {
  return filtrationItem(housingGuestNumber, item.offer, 'guests');
};

var sameOfferFeatures = function (item) {
  var checkedFeaturesItems = document.querySelectorAll('input:checked');
  return Array.from(checkedFeaturesItems).every(function (element) {
    return item.offer.features.includes(element.value);
  });
};

var renderPins = function (data) {
  var takeNumber = data.length > PINS_LIMIT ? PINS_LIMIT : data.length;
  for (var i = 0; i < takeNumber; i++) {
    window.util.fragment.appendChild(window.pin.renderPin(data[i]));
  }
  window.pin.mapPin.appendChild(window.util.fragment);
};
