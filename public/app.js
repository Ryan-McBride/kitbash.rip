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
      $('#leftKit').css('background-image', 'url('+ s3Encode(data[0].image)+')');
      $('#leftName').text(decodeURIComponent(data[0].name));
      $('.leftLink').attr('href', data[0].wiki);
    }
    if(!$('#rightLock').hasClass('checked')){
      $('#rightKit').css('background-image', 'url('+ s3Encode(data[1].image)+')');
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

function s3Encode(str){
  str = str.split('/');
  str[str.length-1] = encodeURIComponent(str[str.length-1]);
  return str.join('/');
}
