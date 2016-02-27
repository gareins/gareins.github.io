$( document ).ready(function() {
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
  
  $.get("static/imgslist.json", function(data) {
    var imgs = data["imgs"];
    var img = "static/imgs/" + imgs[Math.floor(Math.random() * imgs.length)];
  
    $('<img/>').attr('src', img).load(function() {
      var img_ratio = this.naturalWidth / this.naturalHeight;
      var wnd_ratio = window.innerWidth / window.innerHeight;
      
      $(this).remove();
      $("#back").css("background-image", "url('" + img + "')")
                .css("background-size", img_ratio > wnd_ratio ? "auto 100%" : "100% auto")
                .css("opacity", 0.1);
    });
  });
});
