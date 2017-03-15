let answerkey = [];
let studentAnswer = [];
let points = [];
let allPoints = [];


$.ajax({
    url: "/json/answerkeys.json",
    dataType: 'json',
    type: 'get',
    cache: false,
    xhrFields:{
      withCredentials:true
    },
    success: function(data) {
      let placeHolder = $('.courses');
      $.each(data, function(index, element){
        answerkey.push(element.answer);
        points.push(element.points)
      });
    }
});

$.ajax({
    url: "/json/studentsanswers.json",
    dataType: 'json',
    type: 'get',
    cache: false,
    xhrFields:{
      withCredentials:true
    },
    success: function(data) {
      let placeHolder = $('.courses');
      $.each(data, function(index, element){
          studentAnswer.push(breakAnswers(element))
      });
    }
});

const breakAnswers = function(elem) {
  elem.answers = elem.answers.split('-|-');
  return elem;
}


$(function(){
  let table = $('.table > tbody:last-child');
  studentAnswer.forEach( elem => {
    let row = '<tr>';
    row += '<td>' + elem.student_id + '</td>';
    let studentsPoints = [];
    for(let i = 0; i < answerkey.length; i++) {
        if(answerkey[i] === elem.answers[i]) {
          studentsPoints.push(points[i]);
        } else {
          studentsPoints.push(0);
        }
    }
    let total = studentsPoints.reduce( (first, n) => first + n, 0);
    allPoints.push(studentsPoints);
    row += '<td>' + total + '</td>'
    row += '</tr>'
    table.append(row);
  });
});
