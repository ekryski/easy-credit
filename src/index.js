$(document).ready(function(){
  $('input.card-number').payment('formatCardNumber');
  $('input.card-expiry').payment('formatCardExpiry');
  $('input.card-cvc').payment('formatCardCVC');

  $('input.card-number').on('focus', function(ev){
    $(ev.target).parent().addClass('focus');
    $(ev.target).removeClass('slid-away');
  });

  $('input.card-number').on('blur', function(ev){
    var $input = $(ev.target);
    var value = $input.val();

    var valid = $.payment.validateCardNumber(value);

    if (valid) {
      $input.addClass('slid-away');
    }
    else {
      $input.focus();
    }
  });

  $('input.card-number').on('input', function(ev){
    var $input = $(ev.target);
    var value = $input.val();
    var length = value.split(' ').join('').length;

    var valid = $.payment.validateCardNumber(value);

    var type = $.payment.cardType(value);

    $('.card-image.active').removeClass('active').addClass('hidden');

    if (type) {
      $('.card-image.' + type).removeClass('hidden').addClass('active');
    }
    else {
      $('.card-image.unknown').removeClass('hidden').addClass('active');
    }

    if (valid) {
      $input.parent().removeClass('invalid').addClass('valid');
    }
    else {
      $input.parent().removeClass('valid').addClass('invalid');
    }

    if (valid && length === 16){
      $input.addClass('slid-away');
      $input.next().focus();
    }
  });

  $('input.card-expiry').on('blur', function(ev){
    var $input = $(ev.target);
    var value = $input.val();

    var expiry = $.payment.cardExpiryVal(value);
    var valid = $.payment.validateCardExpiry(expiry);

    if (!valid) {
      $input.focus();
    }
  });

  $('input.card-expiry').on('input', function(ev){
    var $input = $(ev.target);
    var value = $input.val();
    var length = value.split(' ').join('').length;

    var expiry = $.payment.cardExpiryVal(value);
    var valid = $.payment.validateCardExpiry(expiry);

    if (valid) {
      $input.parent().removeClass('invalid').addClass('valid');
    }
    else {
      $input.parent().removeClass('valid').addClass('invalid');
    }

    if (valid && length === 5){
      $input.next().focus();
    }
  });

  $('input.card-ccv').on('focus', function(ev){
    $('.card-image.active, .card-image.back').addClass('flip');
  });

  $('input.card-ccv').on('blur', function(ev){
    var $input = $(ev.target);
    var value = $input.val();

    var valid = $.payment.validateCardCVC(value);

    if (valid) {
      $('.card-image.active, .card-image.back').removeClass('flip');
    }
    else {
      $input.focus();
    }
  });

  $('input.card-ccv').on('input', function(ev){
    var $input = $(ev.target);
    var value = $input.val();

    var valid = $.payment.validateCardCVC(value);

    if (valid) {
      $input.parent().removeClass('invalid').addClass('valid');
    }
    else {
      $input.parent().removeClass('valid').addClass('invalid');
    }

    if (valid && value.length >= 3){
      $input.blur();
      $('button.disabled').removeClass('disabled');
    }
  });

  $('input.card-number').focus();
});
  