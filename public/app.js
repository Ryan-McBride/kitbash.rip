$(document).ready(function(){
  $('button').on('click', getKits);
  $(".checkbox").click(function(){
    $(this).toggleClass('checked')
  });
  getKits();
});

var replacements = [
  ['âˆž', '∞'],
  ['Î½', 'ν'],
  ['Î²', 'β'],
  ['ddrryyoonn', '煌黒機動']
]

function getKits(){
  $.get("/shuffle", function(data, status){
    data = JSON.parse(data);
    if(!$('#leftLock').hasClass('checked')){
      $('#leftKit').css('background-image', 'url('+ data[0].image+')');
      $('#leftName').text(tupleReplace(data[0].name));
    }
    if(!$('#rightLock').hasClass('checked')){
      $('#rightKit').css('background-image', 'url('+ data[1].image+')');
      $('#rightName').text(tupleReplace(data[1].name));
    }
    if($('#rightLock').hasClass('checked') && $('#leftLock').hasClass('checked')){
      $('button').text('Uh...');
    } else if($('button').text() === 'Uh...'){
      $('button').text('FREEDOM!');
    }
  });
}

function tupleReplace(str){
  replacements.forEach(function(val){
    if(str.indexOf(val[0]) !== -1){
      str = str.replace(val[0], val[1]);
    }
  });
  return str;
}
