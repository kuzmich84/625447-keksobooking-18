'use strict';
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var avatarImageChooser = document.querySelector('#avatar');
  var avatarPreview = document.querySelector('.ad-form-header__preview').getElementsByTagName('img')[0];

  avatarImageChooser.addEventListener('change', function () {
    var file = avatarImageChooser.files[0];
    if (file) {
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          avatarPreview.src = reader.result;
        });

        reader.readAsDataURL(file);
      }
    }

  });
})();
