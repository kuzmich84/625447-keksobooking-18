'use strict';

(function () {

  var pin = document.querySelector('#pin').content;
  var widthPin = 50;
  var heightPin = 70;

  window.renderPin = function (advert) {
    var pinElement = pin.cloneNode(true);

    pinElement.querySelector('.map__pin').style.left = (advert.location.x - widthPin / 2) + 'px';
    pinElement.querySelector('.map__pin').style.top = (advert.location.y - heightPin) + 'px';
    pinElement.querySelector('.map__pin').firstChild.src = advert.author.avatar;
    return pinElement;
  };

})();

