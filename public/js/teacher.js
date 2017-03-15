$('.toggle').click(function(e){
  $('.sidebar').toggleClass('jumper');
  $('.content').toggleClass('shrink');
  $('.sidebar span').toggleClass('hidden');
});


//Make nav stacked after 650px width of screen
$(function(){
    if($('.content').height() > $('.sidebar').height()) {
      $('.sidebar').height($('.content').height());
    }
})
