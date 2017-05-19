'use strict';

(function () {

  var $loginButton = $('#login_button'),
      $usernameField = $('input[name=username]')[0],
      $passwordField = $('input[name=password]')[0];

  $loginButton.on('click', function() {
    $.post( "/user/login",
      {
        username: $usernameField.value,
        password: $passwordField.value
      }, function(e) {
        window.location.replace('/profile');
      })
      .fail(function(e) {
        
      })
  });
})();
