'use strict';

(function () {

  var ESC_KEYCODE = 27;

  window.util = {
    getDeclensionWord: function (number, word) {
      var cases = [2, 0, 1, 1, 1, 2];
      return number + word[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
    },

    setAttributeDisabled: function (formFields) {
      for (var i = 0; i < formFields.length; i++) {
        formFields[i].setAttribute('disabled', 'disabled');
      }
    },

    setAttributeEnabled: function (formFields) {
      for (var i = 0; i < formFields.length; i++) {
        formFields[i].removeAttribute('disabled');
      }
    },
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    fragment: document.createDocumentFragment(),
  };
})();
