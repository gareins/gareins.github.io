var default_opacity = 0.2;
var animate_time = 1000;
var default_animate_time = 1000;
var num_images = 152;
var skip_opacity_to_0 = true;

function menu_inout() {
    var layout   = $('#layout'),
        menu     = $('#menu'),
        menuLink = $('#menuLink'),
        content  = $('#main');

    function toggleAll(e) {
        var active = 'active';

        e.preventDefault();
        layout.toggleClass(active);
        menu.toggleClass(active);
        menuLink.toggleClass(active);
    }

    menuLink.click(function (e) {
        toggleAll(e);
    });

    content.click(function(e) {
        if (menu.className.indexOf('active') !== -1) {
            toggleAll(e);
        }
    });
}

function fix_resolutions() {
  var img = $('#imgloader').get(0);
  var img_ratio = img.naturalWidth / img.naturalHeight;
  var wnd_ratio = window.innerWidth / window.innerHeight;
  $("#background").css("background-size", img_ratio > wnd_ratio ? "auto 100%" : "100% auto");
}

function set_random_img() {
  var img = $('#imgloader').attr('src');
  var back = $('#background');
  var current_animate_time = animate_time;
  
  if(skip_opacity_to_0) {
    skip_opacity_to_0 = false;
    animate_time = 0;
  }
  else {
    back.css('opacity', 0);
  }
  
  setTimeout(function() {
      back.css("background-image", "url('" + img + "')");
      back.css('opacity', default_opacity);
      fix_resolutions();
  }, animate_time);
}

function select_random_img() {
  $('#imgloader').attr('src', "/static/imgs/" + (Math.floor(Math.random() * num_images) + 1) + ".jpg");
}

function load_chess() {    
    var request = new XMLHttpRequest();
    request.open('GET', 'https://chesspuzzle.net/Daily/Api', true);
    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            var result = JSON.parse(request.responseText);
            document.getElementById("puzzleText").textContent = result.Text;
            document.getElementById("puzzleLink").href = result.Link;
            
            var img = $("#puzzleImage");
            img.attr('src', result.Image);
            img.on('load', function() {
                $('#chesspuzzle').css('opacity', 1);
            });
        }
    };
    request.send();
}

$( document ).ready(function() {  
  $('#imgloader').attr('src', '').on("load", set_random_img);
  $(window).resize(fix_resolutions);
  
  select_random_img();
  menu_inout();
  
  if(window.location.pathname == "/") { // only on index page
    window.setInterval(select_random_img, 10000);
  }
  
  load_chess();
  hljs.initHighlightingOnLoad();
});
