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
            $('#ala').hide();
            $('#tof').hide();
            $('#fitb').hide();
            $('.options-select').show();
          // Tips
            $('#multichoice-tips').show();
            $('#allapply-tips').hide();
            $('#true-or-false-tips').hide();
            $('#fill-blanks-tips').hide();
            $('#def-open-tips').hide();
            break;
          case "Select all that apply":
          // Answer Controls
            $('#options').hide();
            $('#ala').show();
            $('#tof').hide();
            $('#fitb').hide();
            $('.options-select').hide();
          // Tips
            $('#multichoice-tips').hide();
            $('#allapply-tips').show();
            $('#true-or-false-tips').hide();
            $('#fill-blanks-tips').hide();
            $('#def-open-tips').hide();
            break;
          case "True or False":
          // Answer Controls
            $('#options').hide();
            $('#ala').hide();
            $('#tof').show();
            $('#fitb').hide();
            $('.options-select').hide();
          // Tips
            $('#multichoice-tips').hide();
            $('#allapply-tips').hide();
            $('#true-or-false-tips').show();
            $('#fill-blanks-tips').hide();
            $('#def-open-tips').hide();
            break;
          case "Fill in the blanks":
          // Answer Controls
            $('#options').hide();
            $('#ala').hide();
            $('#tof').hide();
            $('#fitb').show();
            $('.options-select').hide();
          // Tips
            $('#multichoice-tips').hide();
            $('#allapply-tips').hide();
            $('#true-or-false-tips').hide();
            $('#fill-blanks-tips').show();
            $('#def-open-tips').hide();
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

//Create extra option spaces for select-all-that-apply Questions
$(function(){
  let options = '<div class="input-group">';
  options +=  '<span class="input-group-addon"> <input type="checkbox"></span>';
  options +=  '<input type="text" class="form-control" placeholder="Option">';
  options +=  '</div>';
  $('#option-adder').click(function(){
    $(this).before(options);
  })
})

//Remove last option that was added
$(function(){
  $('#option-remover').click(function(){
    if($(this).parent().children('div').length >= 2){
       $(this).parent().children('div:last').remove();
    }
  })
})

//Create extra answer spaces for fill-in-the blanks Questions
$(function() {
  let answerSpace = '<input type="text" class="form-control" placeholder="Answer">';
  $('#answer-adder').click(function(){
    $(this).before(answerSpace);
  })
})

//Remove last answer that was added
$(function(){
  $('#answer-remover').click(function(){
    if($(this).parent().children('input').length >= 2){
      $(this).parent().children('input:last').remove();
    }
  })
})

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
