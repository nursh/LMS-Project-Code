//make each question type active and enable tips
$(function(){
    $('.qtype li').click(function(event){
        $('.active').removeClass('active');
        $(this).addClass('active');

        //switching tips for different question formats
        let questionFormat = $('.active').text();
        switch (questionFormat) {
          case "Multiple choice":
          // Answer Controls
            $('#options').show();
            $('#tof').hide();
            $('#fitb').hide();
            $('.options-select').show();
          // Tips
            $('#multichoice-tips').show();
            $('#true-or-false-tips').hide();
            $('#fill-blanks-tips').hide();
            $('.qtype').val('Multichoice');
            break;
          case "True or False":
          // Answer Controls
            $('#options').hide();
            $('#tof').show();
            $('#fitb').hide();
            $('.options-select').hide();
          // Tips
            $('#multichoice-tips').hide();
            $('#true-or-false-tips').show();
            $('#fill-blanks-tips').hide();
            $('.qtype').val('TrueFalse');
            break;
          case "Fill in the blank space":
          // Answer Controls
            $('#options').hide();
            $('#tof').hide();
            $('#fitb').show();
            $('.options-select').hide();
          // Tips
            $('#multichoice-tips').hide();
            $('#true-or-false-tips').hide();
            $('#fill-blanks-tips').show();
            $('.qtype').val('Blanks');
            break;
          default:

        }
        event.preventDefault();
    });
});

// Hide the unused choices input.
$(function(){
  $('#choices_num').change(function(){
    let activeChoices = $(this).val();
    $('.choices').show();
    if(activeChoices < 5){
      let choiceInputs = $('.choices').slice(activeChoices);
      choiceInputs.hide();
    }
  })
})

$(function(){
  $('input[name=choices]').on('change', function(){
    $('input[name=choices]:checked').val($(this).parent().next().val());
  });
})


$(function(){
  $('form').submit(function(e){
    let form = this;
    e.preventDefault();
    //Set the value of selected multiple choice
    let options = [];
    $(".opmc").each(function() {
        options.push($(this).val());
    });
    $('#allmc').val(options.join(',-'));
    setTimeout(function(){form.submit()}, 10);
  })

});




//Make nav stacked after 650px width of screen
$(function(){
  $(window).resize(function(){
    if ($(window).width() < 700){
      $('ul').addClass('nav-stacked');
    } else {
      $('ul').removeClass('nav-stacked');
    }
  })
})
