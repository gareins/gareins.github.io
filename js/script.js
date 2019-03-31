var default_opacity = 0.2;
var animate_time = 200;
var default_animate_time = 1000;
var num_images = 152;

function menu_inout() {
    var layout   = $('#layout'),
        menu     = $('#menu'),
        menuLink = $('#menuLink'),
        content  = $('#main');

    function toggleClass(element, className) {
        var classes = element.className.split(/\s+/),
            length = classes.length,
            i = 0;

        for(; i < length; i++) {
          if (classes[i] === className) {
            classes.splice(i, 1);
            break;
          }
        }
        // The className is not found
        if (length === classes.length) {
            classes.push(className);
        }

        element.className = classes.join(' ');
    }

    function toggleAll(e) {
        var active = 'active';

        e.preventDefault();
        toggleClass(layout, active);
        toggleClass(menu, active);
        toggleClass(menuLink, active);
    }

    menuLink.onclick = function (e) {
        toggleAll(e);
    };

    content.onclick = function(e) {
        if (menu.className.indexOf('active') !== -1) {
            toggleAll(e);
        }
    };
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
  
  back.animate({opacity: 0}, animate_time, 'swing', function() {
    back.css("background-image", "url('" + img + "')");
    fix_resolutions();
    back.animate({opacity: default_opacity}, animate_time, 'swing');

    if(animate_time != default_animate_time) { animate_time = default_animate_time; }
  });
}

function select_random_img() {
  $('#imgloader').attr('src', "/static/imgs/" + (Math.floor(Math.random() * num_images) + 1) + ".jpg");
}

$( document ).ready(function() {  
  $('#imgloader').attr('src', '').on("load", set_random_img);
  select_random_img();
  $.fx.interval = 120;
  
  menu_inout();
  
  $(window).resize(fix_resolutions);
  if(window.location.pathname == "/") {
    window.setInterval(select_random_img, 10000);
  }
  
  hljs.initHighlightingOnLoad();
});
