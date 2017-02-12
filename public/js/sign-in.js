const validateEmail = function(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const alertStart = '<div class="alert alert-danger"><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>  ';
const alertEnd = '</div>';
//Validate email
$('input[name="email"]').blur(function(e) {
  if(!validateEmail($(this).val())) {
    $(this).after(alertStart + 'Email should not be empty or is not valid.' + alertEnd);
  }
});

$('input[name="email"]').focus(function(e) {
    $(this).parent().children('div').remove();
});
