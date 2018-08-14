var default_opacity = 0.2;
var animate_time = 1000;

function fix_resolutions() {
  var img = $('#imgloader').get(0);
  var img_ratio = img.naturalWidth / img.naturalHeight;
  var wnd_ratio = window.innerWidth / window.innerHeight;
  $("#back").css("background-size", img_ratio > wnd_ratio ? "auto 100%" : "100% auto");
}

var imgs = null;
function load_images(data) {
  imgs = data["imgs"];
  $('#imgloader').attr('src', '').load(set_random_img);
  
  select_random_img();
  
  $(window).resize(fix_resolutions);
  window.setInterval(select_random_img, 10000);
}

function set_random_img() {
  var img = $('#imgloader').attr('src');
  var back = $('#back');
  
  back.animate({opacity: 0}, animate_time, 'swing', function() {
    back.css("background-image", "url('" + img + "')");
    back.animate({opacity: default_opacity}, animate_time);
  });
}

function select_random_img() {
  $('#imgloader').attr('src', "static/imgs/" + imgs[Math.floor(Math.random() * imgs.length)]);
}

$( document ).ready(function() {
  $.getJSON("static/imgslist.json", load_images);
  fix_resolutions();
});
