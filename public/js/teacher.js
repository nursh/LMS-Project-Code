$('.toggle').click(function(e){
  $('.sidebar').toggleClass('jumper');
  $('.content').toggleClass('shrink');
  $('.sidebar span').toggleClass('hidden');
});

$('.navig li').on('click',function(event){
  $('.act').removeClass('act');
  $(this).addClass('act');
});
