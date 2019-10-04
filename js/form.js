'use strict';

(function () {


  var notice = document.querySelector('.notice');


  window.form = {
    advertFormHeader: notice.querySelector('.ad-form-header'),
    advertFormElement: notice.querySelectorAll('.ad-form__element'),
    noticeAddress: notice.querySelector('#address'),
    advertForm: document.querySelector('.ad-form'),

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
    }
  };

  window.util.setAttributeDisabled(window.form.advertFormElement);
  window.form.advertFormHeader.setAttribute('disabled', 'disabled');


  var roomNumber = notice.querySelector('#room_number');
  var capacityGuest = notice.querySelector('#capacity');

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

  capacityGuest.addEventListener('change', window.form.validateCapacityGuest);

  var noticeTitleInput = window.form.advertForm.querySelector('#title');

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

  var noticePriceInput = window.form.advertForm.querySelector('#price');
  var noticeType = window.form.advertForm.querySelector('#type');

  var setMinPriceOfType = function () {
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
  };

  noticeType.addEventListener('change', function () {
    setMinPriceOfType();
  });

  var noticeTimeIn = window.form.advertForm.querySelector('#timein');
  var noticeTimeOut = window.form.advertForm.querySelector('#timeout');

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

})();
