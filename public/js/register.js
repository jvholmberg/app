'use strict';

(function () {

  var $registerButton = $('#register_button'),
      $usernameField = $('input[name=username]')[0],
      $passwordField = $('input[name=password]')[0],
      $passwordField2 = $('input[name=password2]')[0];

  $registerButton.on('click', function() {
    $.post( "/user/register",
      {
        username: $usernameField.value,
        password: $passwordField.value,
        password2: $passwordField2.value
      }, function() {

      })
      .fail(function(e) {
        
      })
  });
})();
