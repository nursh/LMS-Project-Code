$.ajax({
    url: "/json/findCourse.json",
    dataType: 'json',
    type: 'get',
    cache: false,
    xhrFields:{
      withCredentials:true
    },
    success: function(data) {
      let placeHolder = $('.courses');
      $.each(data, function(index, element){
          let panel = '<div class="panel panel-default">'
          panel +=  '<div class="panel-heading">' + element.code + '<span class="pull-right">' + element.number + '</span></div>'
          panel +=  '<div class="panel-body">'
          panel +=  '<p>' + element.name + '</p>'
          panel +=  '</div>'
          panel +=  '</div>'
          $('.courses').append(panel);
      });
    }
});
