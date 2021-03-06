$.ajax({
    url: "/json/coursetests.json",
    dataType: 'json',
    type: 'get',
    cache: false,
    xhrFields:{
      withCredentials:true
    },
    success: function(data) {
      let placeHolder = $('.tests');
      $.each(data, function(index, element){
          let panel = '<div class="panel panel-default">'
          panel +=  '<div class="panel-body">'
          panel +=   element.title +  '<span  class="pull-right"><a href="/teacherCourse/test/Templates/' + element.id + '"> Edit </a>';
          panel +=  '&emsp; <a href="/teacherCourse/test/preview/' + element.id + '"> Preview </a></span>'
          panel +=  '</div>'
          panel +=  '</div>'
          placeHolder.append(panel);
      });
    }
});
