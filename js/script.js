var default_opacity = 0.2;
var animate_time = 1000;
var default_animate_time = 1000;
var num_images = 150;
var skip_opacity_to_0 = true;
var start = new Date();
var cors_proxy = "https://cors-anywhere.herokuapp.com/";

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
        if (menu.hasClass('active')) {
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
    const img = $('#imgloader').attr('src');
    const back = $('#background');
  
    if(skip_opacity_to_0) {
        skip_opacity_to_0 = false;
    } else {
        back.css('opacity', '0');
    }
  
    setTimeout(() => {
        back.css({
            'background-image': `url(${img})`,
            opacity: default_opacity
        });
        fix_resolutions();
    }, animate_time);
}

function select_random_img() {
  $('#imgloader').attr('src', "/static/imgs/" + (Math.floor(Math.random() * num_images) + 1) + ".jpg");
}

function contact_stuff() {
    $('#contact-send').click(function() {
        if($('#contact-email').val().length > 0) {
            return;
        }
        if(new Date() - start < 1000 * 10) { //minimal 10 seconds
            return;
        }
        
        var url = "http://maker.ifttt.com/trigger/contact/with/key/eOrfK0j7evebgwTmwSt3D-HngdZPB8tBQPblCcR2At4";
        var obj = {
            value1: $('#contact-email-real').val(),
            value2: $('#contact-name').val(),
            value3: $('#contact-message').val(),
        };
        
        $.ajax({
            type: 'POST',
            url: cors_proxy + url,
            data: JSON.stringify (obj),
            success: function(d) { alert("Thank you!"); },
            error: function(d) { alert("error sending :("); },
            contentType: "application/json",
            dataType: 'text'
        });
    });
}

$( document ).ready(function() {  
  $('#imgloader').attr('src', '').on("load", set_random_img);
  $(window).resize(fix_resolutions);
  
  select_random_img();
  menu_inout();
  contact_stuff();
  
  if(window.location.pathname == "/") { // only on index page
    window.setInterval(select_random_img, 10000);
  }
  
  hljs.initHighlightingOnLoad();
});
