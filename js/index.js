$(document).ready(function(){
  if($(window).width()<=576){
    $('.most').removeClass('justify-content-around').addClass('flex-column');
  }
});
$("#search-btn").click(function(){
  
  if($('#search-text').val()==''){
    var snackbar = document.querySelector('#toast');
    var data={message:'Please enter words into the searchbar!' };
    snackbar.MaterialSnackbar.showSnackbar(data);
  }
 else{
  console.log("clicked");
  $('.main-text').slideUp();
  $('#main-cont').removeClass('pt-6').addClass('pt-1');
  $('.most').removeClass('pt-6').addClass('pt-1');
  $('.info-cards').remove();
  $('#loading-animation').css('display','block');
  getPgData($("#search-text").val());
 }
});
$('#search-text').keypress(function(e){
  if(e.which==13){
    if($('#search-text').val()==''){
    var snackbar = document.querySelector('#toast');
    var data={message:'Please enter words into the searchbar!' };
    snackbar.MaterialSnackbar.showSnackbar(data);
  }
 else{
  console.log("clicked");
  $('.main-text').slideUp();
  $('#main-cont').removeClass('pt-6').addClass('pt-1');
  $('.most').removeClass('pt-6').addClass('pt-1');
  $('.info-cards').remove();
  $('#loading-animation').css('display','block');
  getPgData($("#search-text").val());
 }
  }
});

function getPgData(search){
  search=search.replace(/ /g,"+");
  $.ajax({    
    url:'https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&exintro&exsentences=2&gsrsearch='+search,
    method:'GET',
    datatype:'json'
  }).done(function(data){
    if(data.query==undefined){
      var snackbar = document.querySelector('#toast');
    var data={message:'No results found!' };
    snackbar.MaterialSnackbar.showSnackbar(data);
    }
   console.log(data);
   $('#loading-animation').css('display','none');
 for (var p in data.query.pages) {
     makeCards(data.query.pages[p].title,data.query.pages[p].extract); 
 }
    $('.info-cards').css('width','100%');

  });
 // $('footer').css('margin-top','3%');
}
function makeCards(title,extract){
  var card = '<div class="d-flex justify-content-center"><div class="mdl-card  mdl-shadow--2dp mt-3 info-cards">'+
'  <div class="mdl-card__title mdl-card--expand">'+
'    <h2 class="mdl-card__title-text">'+title+'</h2>'+
'  </div>'+
'  <div class="mdl-card__supporting-text">'+
extract+
'  </div>'+
'  <div class="mdl-card__actions mdl-card--border">'+
'    <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" target="_blank" href="https://en.wikipedia.org/wiki/'+title.replace(/ /g,"_")+'">View Article</a>'+
'  </div>'+
'</div></div>';
	
  $('.items-column').append(card);
}