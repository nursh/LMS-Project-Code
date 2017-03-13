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
      let num = 1;
      $.each(data, function(index, element){
        switch (element.type) {
          case 'MultiChoice':
            multi(element, num, placeHolder);
            break;
          case 'TrueFalse':
            tof(element, num, placeHolder);
            break;
          case 'Blanks':
            fib(element, num, placeHolder);
            break;
          default:
        }
        num += 1;
      });
    }
});


const multi = function(question, num, parent) {
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
  parent.append(quest);
}

const tof = function(question, num, parent) {
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
  quest += '</div>'
  parent.append(quest);
}

const fib = function(question, num, parent) {
  let quest = '<div class="form-group">';
  quest += '<h4>' + num + '). ' + question.question + '</h4>';
  quest += '<input type="text" name="options' + num + '">';
  quest += '</div>'
  parent.append(quest);
}
