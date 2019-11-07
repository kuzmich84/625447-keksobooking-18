'use strict';

(function () {
  var notice = document.querySelector('.notice');

  window.form = {
    advertHeader: notice.querySelector('.ad-form-header'),
    advertElement: notice.querySelectorAll('.ad-form__element'),
    noticeAddress: notice.querySelector('#address'),
    advert: document.querySelector('.ad-form'),

    validateCapacityGuest: function () {
      if (roomNumber.value === '1' && (capacityGuest.value === '0' || capacityGuest.value === '2' || capacityGuest.value === '3')) {
        capacityGuest.setCustomValidity('В однокомнатную квартиру разместить можно только 1 гостя');
      } else if (roomNumber.value === '2' && (capacityGuest.value === '0' || capacityGuest.value === '3')) {
        capacityGuest.setCustomValidity('В 2х комнатную квартиру разместить можно только 1 или 2х гостей');
      } else if (roomNumber.value === '3' && capacityGuest.value === '0') {
        capacityGuest.setCustomValidity('В 3х комнатную квартиру разместить можно только 1, 2х или 3х гостей');
      } else if (roomNumber.value === '100' && !(capacityGuest.value === '0')) {
        capacityGuest.setCustomValidity('В 100 комнатной квартире резмещать гостей нельзя');
      } else {
        capacityGuest.setCustomValidity('');
      }
    },
    setMinPriceOfType: function () {
      if (noticeType.value === 'bungalo') {
        noticePriceInput.placeholder = 0;
        noticePriceInput.min = 0;
      } else if (noticeType.value === 'flat') {
        noticePriceInput.placeholder = 1000;
        noticePriceInput.min = 1000;
      } else if (noticeType.value === 'house') {
        noticePriceInput.placeholder = 5000;
        noticePriceInput.min = 5000;
      } else if (noticeType.value === 'palace') {
        noticePriceInput.placeholder = 10000;
        noticePriceInput.min = 10000;
      }
    }
  };

  var roomNumber = notice.querySelector('#room_number');
  var capacityGuest = notice.querySelector('#capacity');
  var noticePriceInput = window.form.advert.querySelector('#price');
  var noticeType = window.form.advert.querySelector('#type');
  var inputsOfAdvertForm = window.form.advert.querySelectorAll('input');
  var selectsOfAdvertForm = window.form.advert.querySelectorAll('select');
  var advertFormSubmit = document.querySelector('.ad-form__submit');
  var noticeTimeIn = window.form.advert.querySelector('#timein');
  var noticeTimeOut = window.form.advert.querySelector('#timeout');
  var formReset = document.querySelector('.ad-form__reset');
  var noticeTitleInput = window.form.advert.querySelector('#title');


  window.util.setAttributeDisabled(window.form.advertElement);
  window.form.advertHeader.setAttribute('disabled', 'disabled');

  var setCapacityGuestOfRoomNumber = function () {
    if (roomNumber.value === '1') {
      capacityGuest[2].removeAttribute('disabled');
      capacityGuest[0].setAttribute('disabled', 'disabled');
      capacityGuest[1].setAttribute('disabled', 'disabled');
      capacityGuest[3].setAttribute('disabled', 'disabled');

    } else if (roomNumber.value === '2') {
      capacityGuest[0].setAttribute('disabled', 'disabled');
      capacityGuest[3].setAttribute('disabled', 'disabled');
      capacityGuest[2].removeAttribute('disabled');
    } else if (roomNumber.value === '3') {

      capacityGuest[3].setAttribute('disabled', 'disabled');
      capacityGuest[0].removeAttribute('disabled');
      capacityGuest[1].removeAttribute('disabled');
      capacityGuest[2].removeAttribute('disabled');
    } else if (roomNumber.value === '100') {
      capacityGuest[0].setAttribute('disabled', 'disabled');
      capacityGuest[1].setAttribute('disabled', 'disabled');
      capacityGuest[2].setAttribute('disabled', 'disabled');
      capacityGuest[3].removeAttribute('disabled');
    }
  };


  roomNumber.addEventListener('change', function () {
    setCapacityGuestOfRoomNumber();
    window.form.validateCapacityGuest();
  });

  capacityGuest.addEventListener('click', function () {
    setCapacityGuestOfRoomNumber();
  });

  capacityGuest.addEventListener('change', window.form.validateCapacityGuest);

  noticeTitleInput.addEventListener('invalid', function () {
    if (noticeTitleInput.validity.tooShort) {
      noticeTitleInput.setCustomValidity('Заголовок должен состоять минимум из 30 символов');
    } else if (noticeTitleInput.validity.tooLong) {
      noticeTitleInput.setCustomValidity('Заголовок не должен превышать 100 символов');
    } else if (noticeTitleInput.validity.valueMissing) {
      noticeTitleInput.setCustomValidity('Обязательное поле, необходимо его заполнить');
    } else {
      noticeTitleInput.setCustomValidity('');
    }
  });


  noticeType.addEventListener('change', function () {
    window.form.setMinPriceOfType();
  });

  noticePriceInput.addEventListener('click', function () {
    window.form.setMinPriceOfType();
  });


  var setTimeOutOfTimeIn = function () {
    if (noticeTimeIn.value === '12:00') {
      noticeTimeOut.value = '12:00';
    } else if (noticeTimeIn.value === '13:00') {
      noticeTimeOut.value = '13:00';
    } else if (noticeTimeIn.value === '14:00') {
      noticeTimeOut.value = '14:00';
    }
  };

  noticeTimeIn.addEventListener('change', function () {
    setTimeOutOfTimeIn();
  });

  var successUploadHandler = function () {
    window.form.advert.reset();
    noticePriceInput.placeholder = 5000;
    window.setNotActivePage();
    var success = document.querySelector('#success').content;
    var successElement = success.cloneNode(true);
    var main = document.querySelector('main');
    window.util.fragment.appendChild(successElement);
    main.appendChild(window.util.fragment);
    document.addEventListener('keydown', window.popup.pressEscSuccessHandler);
    document.addEventListener('click', window.popup.closeSuccess);
  };

  var setErrorBorderOfValidity = function (element) {
    if (element.checkValidity() === false) {
      element.style.borderColor = 'red';
    } else {
      element.removeAttribute('style');
    }
  };

  var checkElementForm = function (elements) {
    elements.forEach(function (item) {
      setErrorBorderOfValidity(item);
    });
  };

  advertFormSubmit.addEventListener('click', function () {
    checkElementForm(inputsOfAdvertForm);
    checkElementForm(selectsOfAdvertForm);
  });

  window.form.advert.addEventListener('submit', function (evt) {
    window.backend.upload(new FormData(window.form.advert), successUploadHandler, window.popup.errorHandler);
    evt.preventDefault();
  });

  formReset.addEventListener('click', function () {
    window.setNotActivePage();
  });
})();
