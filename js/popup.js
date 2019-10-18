'use strict';
(function () {


  window.popup = {

    pressEscPopupErrorHandler: function (evt) {
      window.util.isEscEvent(evt, window.popup.closeErrorPopup);
    },

    pressEscPopupSuccessHandler: function (evt) {
      window.util.isEscEvent(evt, window.popup.closeSuccessPopup);
    },

    closeErrorPopup: function () {
      document.querySelector('.error').remove();
      document.removeEventListener('keydown', window.popup.pressEscPopupErrorHandler);
      document.removeEventListener('click', window.popup.closeErrorPopup);
    },

    errorHandler: function (errorMessage) {
      var error = document.querySelector('#error').content;
      var errorElement = error.cloneNode(true);
      var main = document.querySelector('main');

      errorElement.querySelector('.error__message').textContent = errorMessage;
      window.util.fragment.appendChild(errorElement);
      main.appendChild(window.util.fragment);

      document.addEventListener('keydown', window.popup.pressEscPopupErrorHandler);
      document.addEventListener('click', window.popup.closeErrorPopup);
    },

    closeSuccessPopup: function () {
      document.querySelector('.success').remove();
      document.removeEventListener('keydown', window.popup.pressEscPopupSuccessHandler);
      document.removeEventListener('click', window.popup.closeSuccessPopup);
    }
  };
})();
