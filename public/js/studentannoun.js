$.ajax({
    url: "/json/courseannouncements.json",
    dataType: 'json',
    type: 'get',
    cache: false,
    xhrFields:{
      withCredentials:true
    },
    success: function(data) {
      let placeHolder = $('.announcements');
      $.each(data, function(index, element){
          let panel = '<div class="panel panel-default">'
          panel +=  '<div class="panel-body">'
          panel +=   element.message + '<span class="pull-right text-muted">Posted&mdash;' + formatDate(new Date(element.date)) + '</span>'
          panel +=  '</div>'
          panel +=  '</div>'
          placeHolder.append(panel);
      });
    }
});

function formatDate(date) {
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return day + '-' + monthNames[monthIndex] + '-' + year;
}
