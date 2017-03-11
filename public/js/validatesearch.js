$('#search').on('change', function(e) {
  let searchType = $('#search option:selected');
  if(searchType.val() === 'code'){
    //do input checking for code value
    alert('code')
  } else {
    alert('number')
    //do input checking for number
  }
})


const checkCode = function() {

}

const checkNumber = function() {

}
