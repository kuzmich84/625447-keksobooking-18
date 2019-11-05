'use strict';
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var chooseFile = function (fileChooser, action) {
    fileChooser.addEventListener('change', function () {
      var file = fileChooser.files[0];
      if (file) {
        var fileName = file.name.toLowerCase();

        var matches = FILE_TYPES.some(function (it) {
          return fileName.endsWith(it);
        });

        if (matches) {
          var reader = new FileReader();
          reader.addEventListener('load', function () {
            action(reader.result);
          });
          reader.readAsDataURL(file);
        }
      }
    });
  };

  var avatarImageChooser = document.querySelector('#avatar');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var avatarDefault = avatarPreview.src;

  var addAvatar = function (readerResult) {
    avatarPreview.src = readerResult;
  };

  chooseFile(avatarImageChooser, addAvatar);

  var flatImageChooser = document.querySelector('#images');
  var adventPhotoContainer = document.querySelector('.ad-form__photo-container');

  var renderPhotoFlat = function (readerResult) {
    var flatPhoto = document.querySelector('#flat-photo').content;
    var photoElement = flatPhoto.cloneNode(true);
    photoElement.querySelector('#flat-image').src = readerResult;
    window.util.fragment.appendChild(photoElement);
    adventPhotoContainer.appendChild(window.util.fragment);
  };

  chooseFile(flatImageChooser, renderPhotoFlat);

  window.resetPhotoForm = function () {
    avatarPreview.src = avatarDefault;
    var uploadedPhotos = adventPhotoContainer.querySelectorAll('.ad-form__photo');
    if (uploadedPhotos) {
      uploadedPhotos.forEach(function (photo, index) {
        if (index !== 0) {
          photo.parentNode.removeChild(photo);
        }
      });
    }
  };
})();
