'use strict';
(function () {

  window.popup = {

    pressEscSuccessHandler: function (evt) {
      window.util.isEscEvent(evt, window.popup.closeSuccess);
    },

    errorHandler: function (errorMessage) {
      var error = document.querySelector('#error').content;
      var errorElement = error.cloneNode(true);
      var main = document.querySelector('main');

      errorElement.querySelector('.error__message').textContent = errorMessage;
      window.util.fragment.appendChild(errorElement);
      main.appendChild(window.util.fragment);

      document.addEventListener('keydown', pressEscPopupErrorHandler);
      document.addEventListener('click', window.popup.closeErrorPopup);
    },

    closeSuccess: function () {
      document.querySelector('.success').remove();
      document.removeEventListener('keydown', window.popup.pressEscSuccessHandler);
      document.removeEventListener('click', window.popup.closeSuccess);
    }
  };

  var pressEscPopupErrorHandler = function (evt) {
    window.util.isEscEvent(evt, closeErrorPopup);
  };

  var closeErrorPopup = function () {
    document.querySelector('.error').remove();
    document.removeEventListener('keydown', pressEscPopupErrorHandler);
    document.removeEventListener('click', closeErrorPopup);
  };
})();
