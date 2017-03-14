let answerkey = [];
let studentAnswer = [];
let points = [];
let studentsPoints = [];

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
    url: "/json/studentanswers.json",
    dataType: 'json',
    type: 'get',
    cache: false,
    xhrFields:{
      withCredentials:true
    },
    success: function(data) {
      let placeHolder = $('.courses');
      $.each(data, function(index, element){
          studentAnswer = breakAnswers(element.answers)
      });
    }
});

const breakAnswers = function(answers) {
  let sanwers = answers.split('-|-');
  return sanwers;
}


$(function(){
  let table = $('.table > tbody:last-child');
  for(let i = 0; i < answerkey.length; i++) {
    let num = i + 1;
    let row = '<tr>';
    row += '<td>' + num + '</td>';
    row += '<td>' + answerkey[i] + '</td>';
    row += '<td>' + studentAnswer[i] + '</td>'
    row += '<td>' + points[i] + '</td>'
    if(answerkey[i] === studentAnswer[i]) {
      studentsPoints.push(points[i]);
    } else {
      studentsPoints.push(0);
    }
    row += '<td>' + studentsPoints[i] + '</td>'
    row += '</tr>';
    table.append(row);
  }
  let total = studentsPoints.reduce( (first, n) => first + n, 0)
  table.append('<tr><th colspan"4">Total Points: </th><td>' + total + '</td></tr>')
});
