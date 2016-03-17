// browser-update stuff...
var $buoop = { c: 2, newwindow: true, url: "https://whatbrowser.org" };
var src = ""; //"https://rawgit.com/gareins/gareins.github.io/master/";

function showinner() { $(".inner").css("opacity", 1); }

function fix_resolutions() {
  var img = $('#imgloader').get(0);
  var img_ratio = img.naturalWidth / img.naturalHeight;
  var wnd_ratio = window.innerWidth / window.innerHeight;
  $("#back").css("background-size", img_ratio > wnd_ratio ? "auto 100%" : "100% auto");
}

function set_random_img() {
  $.get( src + "static/imgslist.json", function(data) {
    var imgs = data["imgs"];
    var img = src + "static/imgs/" + imgs[Math.floor(Math.random() * imgs.length)];
    
    $('#imgloader').attr('src', img).load(function() {
      $("#back").css("background-image", "url('" + img + "')")
      fix_resolutions();
      $("#back").css("opacity", 0.15);
    });
  });
}

function setfont() {
  fontSpy('icomoon', {
    success: showinner,
    failure: function() {
      $(".inner li").map(function() {
        $(this).children()
               .first()
               .removeClass()
               .text($(this).attr("title"));
      });
      showinner();
    }
  });
}

// actual stuff
$( document ).ready(function() {
  $.getScript("https://cdn.rawgit.com/patrickmarabeas/jQuery-FontSpy.js/master/jQuery-FontSpy.js", setfont);
  
  set_random_img();
  $(window).resize(fix_resolutions);
  $.getScript("https://browser-update.org/update.min.js");
});
