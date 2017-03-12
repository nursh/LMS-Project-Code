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
          panel +=   element.message +  '<span  class="pull-right"><a href="/teacherCourse/"> Remove </a></span>';
          panel +=  '</div>'
          panel +=  '</div>'
          placeHolder.append(panel);
      });
    }
});
