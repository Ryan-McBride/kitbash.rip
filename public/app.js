$(document).ready(function(){
  $('button').on('click', getKits);
  $(".checkbox").click(function(){
    $(this).toggleClass('checked')
  });
  getKits();
});

function getKits(){
  $.get("/shuffle", function(data, status){
    data = JSON.parse(data);
    if(!$('#leftLock').hasClass('checked')){
      $('#leftKit').css('background-image', 'url('+ data[0].image+')');
      $('#leftName').text(decodeURIComponent(data[0].name));
      $('.leftLink').attr('href', data[0].wiki);
    }
    if(!$('#rightLock').hasClass('checked')){
      $('#rightKit').css('background-image', 'url('+ data[1].image+')');
      $('#rightName').text(decodeURIComponent(data[1].name));
      $('.rightLink').attr('href', data[1].wiki);
    }
    if($('#rightLock').hasClass('checked') && $('#leftLock').hasClass('checked')){
      $('button').text('Uh...');
    } else if($('button').text() === 'Uh...'){
      $('button').text('FREEDOM!');
    }
  });
}


