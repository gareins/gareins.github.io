// browser-update stuff...
var $buoop = { c: 2, newwindow: true, url: "https://whatbrowser.org" };

// actual stuff
$( document ).ready(function() {
  var src = ""; //"https://rawgit.com/gareins/gareins.github.io/master/";
  var showinner = function() { $(".inner").css("opacity", 1); };
	  
  fontSpy('icomoon', {
    success: function() {
      fontSpy('Open Sans', { //just wait to load
        success: showinner,
        failure: showinner
      });
    },
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
        $("#back").css("opacity", 0)
                  .delay(2000)
                  .css("background-image", "url('" + img + "')")
                  .css("opacity", 0.15);
        fix_resolutions();
      });
    });
  }
	  
  set_random_img();
  $(window).resize(fix_resolutions);
});

