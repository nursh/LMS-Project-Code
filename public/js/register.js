const validateName = function(name) {
  return /^[A-Za-z\s]+$/.test(name);
}

const validateEmail = function(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const alertStart = '<div class="alert alert-danger"><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>  ';
const alertEnd = '</div>';

//Validate name
$('input[name="name"]').blur(function(e) {
  if(!validateName($(this).val())) {
    $(this).after(alertStart +  'Name should not be empty or contain numbers.' + alertEnd);
  }
});

$('input[name="name"]').focus(function(e) {
    $(this).parent().children('div').remove();
});

//Validate email
$('input[name="email"]').blur(function(e) {
  if(!validateEmail($(this).val())) {
    $(this).after(alertStart + 'Email should not be empty or is not valid.' + alertEnd);
  }
});

$('input[name="email"]').focus(function(e) {
    $(this).parent().children('div').remove();
});

//Validate Password
$('input[name="password"]').blur(function(e) {
  if($(this).val().length < 6) {
    $(this).after(alertStart + 'Password should be at least 6 characters long.' + alertEnd);
  }
});

$('input[name="password"]').focus(function(e) {
    $(this).parent().children('div').remove();
});

//Validate confirm Password
$('input[name="confirmPassword"]').blur(function(e) {
  if($(this).val() !== $('input[name="password"]').val()) {
    $(this).after(alertStart + 'The password does not match.' + alertEnd);
  }
});

$('input[name="confirmPassword"]').focus(function(e) {
    $(this).parent().children('div').remove();
});
