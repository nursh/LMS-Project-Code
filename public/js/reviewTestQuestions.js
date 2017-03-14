$.ajax({
    url: "/json/testQuestions.json",
    dataType: 'json',
    type: 'get',
    cache: false,
    xhrFields:{
      withCredentials:true
    },
    success: function(data) {
      let placeHolder = $('.questions');
      let qTemplate = '';
      let num = 1;
      $.each(data, function(index, element){
        switch (element.type) {
          case 'MultiChoice':
            qTemplate = multi(element, num, placeHolder);
            break;
          case 'TrueFalse':
            qTemplate = tof(element, num, placeHolder);
            break;
          case 'Blanks':
            qTemplate = fib(element, num, placeHolder);
            break;
          default:
        }
        qTemplate += '<button class="btn btn-primary btn-sm info">Feedback</button>';
        qTemplate += '<h5 class="hidden text-success"> Answer: ' + element.answer +  '</h5>';
        if(element.feedback){
          qTemplate += '<h5 class="hidden text-info"> Feedback: ' + element.feedback +  '</h5>';
        } else {
          qTemplate += '<h5 class="hidden text-info"> Feedback: None </h5>';
        }
        placeHolder.append(qTemplate);
        num += 1;
      });
    }
});


const multi = function(question, num) {
  let quest = '<div class="form-group">';
  quest += '<h4>' + num + '). ' + question.question + '</h4>';
  let qOptions = question.options.split(',-');
  qOptions = qOptions.filter( v => v !== '');
  qOptions.map( val => {
      quest += '<div class="radio">';
      quest += '<label>'
      quest += '<input type="radio" name="options' + num + '" value="' + val + '">';
      quest +=  val ;
      quest += '</label>';
      quest += '</div>';
    }
  )
  quest += '</div>';
  return quest;
}

const tof = function(question, num) {
  let quest = '<div class="form-group">';
  quest += '<h4>' + num + '). ' + question.question + '</h4>';
  quest += '<div class="radio">';
  quest += '<label>'
  quest += '<input type="radio" name="options' + num + '" value="True">';
  quest +=  'True' ;
  quest += '</label>';
  quest += '</div>';
  quest += '<div class="radio">';
  quest += '<label>'
  quest += '<input type="radio" name="options' + num + '" value="False">';
  quest +=  'False' ;
  quest += '</label>';
  quest += '</div>';
  quest += '</div>';
  return quest;
}

const fib = function(question, num) {
  let quest = '<div class="form-group">';
  quest += '<h4>' + num + '). ' + question.question + '</h4>';
  quest += '<input type="text" name="options' + num + '">';
  quest += '</div>';
  return quest;
}

$('.questions').on('click', '.info', function(e) {
  e.preventDefault();
  $(this).nextAll(':lt(2)').toggleClass('hidden');
})
