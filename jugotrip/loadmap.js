var nullpng = "/jugotrip/null.png";
function draw_gpx(gpx, desc, start, end, map, idx) {    
  var opts =  { startIconUrl: nullpng, endIconUrl: nullpng, shadowUrl: nullpng };

  var gpxlayer = new L.GPX(gpx, 
    {
      async: true,
      polyline_options: {
        color: idx%2==0 ? "#00FFFF" : "#0000FF",
        clickable: true
      },
      marker_options: opts
    }
  ).on('loaded', function(e) {
    roads.push({desc: desc, bound: e.target.getBounds(), start:start, end:end, dist: e.target.get_distance()});
    distance += e.target.get_distance();
  });      
  map.addLayer(gpxlayer);
}

var roads = new Array();
var distance = 0; 

var readyStateCheckInterval = setInterval(function() {
  if (document.readyState === "complete") {
    $('head').append('<link rel="stylesheet" type="text/css" href="https://npmcdn.com/leaflet@1.0.0-rc.2/dist/leaflet.css">');
    L.GPXTrackIcon = L.Icon.extend({  });

    var map = L.map('mapid').setView([51.505, -0.09], 13);
    var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
    var osm = new L.TileLayer(osmUrl, {minZoom: 4, maxZoom: 12, attribution: osmAttrib});
    map.addLayer(osm);

    var gpx_files = [{
      desc: "Dan 1, dopoldan",
      src: "day11.gpx",
      start: "Ljubljana",}, {
      _end: "Ilirska Bistrica",
      desc: "Dan 1, popoldan",
      src: "day12.gpx",
      start: "Ilirska Bistrica",
      _end: "Crikvenica",}, {
      desc: "Dan 2, popoldan",
      src: "day22.gpx",
      start: "Crikvenica",
      _end: "Lovska koča na Velebitu",}, {
      desc: "Dan 3, dopoldan",
      src: "day31.gpx",
      start: "Lovska koča na Velebitu",
      _end: "Otočac",}, {
      desc: "Dan 3, popoldan",
      src: "day32.gpx",
      start: "Otočac",
      _end: "Gračac",}, {
      desc: "Dan 4, dopoldan",
      src: "day41.gpx",
      start: "Gračac",
      _end: "Benkovac",}, {
      desc: "Dan 4, popoldan",
      src: "day42.gpx",
      start: "Benkovac",
      _end: "Vodice",}, {
      desc: "Dan 5, popoldan",
      src: "day52.gpx",
      start: "Vodice",
      _end: "Podorljak, Rogoznica",}, {
      desc: "Dan 6, dopoldan",
      src: "day61.gpx",
      start: "Podorljak, Rogoznica",
      _end: "Omiš",}, {
      desc: "Dan 6, popoldan",
      src: "day62.gpx",
      start: "Omiš",
      _end: "Drvenik",}, {
      desc: "Dan 7, dopoldan",
      src: "day71.gpx",
      start: "Drvenik",
      _end: "Mostar",}, {
      desc: "Dan 7, popoldan",
      src: "day72.gpx",
      start: "Mostar",
      _end: "Stolac",}, {
      desc: "Dan 8, dopoldan",
      src: "day81.gpx",
      start: "Stolac",
      _end: "Trebinje",}, {
      desc: "Dan 8, popoldan",
      src: "day82.gpx",
      start: "Trebinje",
      _end: "Kameno nad Herceg Novim",}, {
      desc: "Dan 9, dopoldan",
      src: "day91.gpx",
      start: "Kameno nad Herceg Novim",
      _end: "Budva",}, {
      desc: "Dan 10, popoldan",
      src: "dayA2.gpx",
      start: "Budva",
      _end: "Podgorica"}
    ];

    var loopidx = 0;
    for (let gpx of gpx_files) {
      var gpx_src = "/jugotrip/gpx/" + gpx.src;
      draw_gpx(gpx_src, gpx.desc, gpx.start, gpx._end, map, loopidx);
      loopidx++;
    }

    var southWest = L.latLng(42.0, 19.5),
      northEast = L.latLng(45.8, 14.5),
      bounds = L.latLngBounds(southWest, northEast);
    map.fitBounds(bounds);

    // control that shows state info on hover
    var info = L.control();
    info.onAdd = function (map) {
      this._div = L.DomUtil.create('div', 'info');
      this.update();
      return this._div;
    };
    info.update = function (road) {
      var txt = "Info:<br>" 
        + (road == null ? "" : road.desc + "<br>" + Math.round(road.dist) / 1000 + "km")
        + (road == null ? "" : "<br>Od: " + road.start + "<br>Do: " + road.end );
      this._div.innerHTML = txt
    };
    info.addTo(map);

    map.on('click', function(e) {
      var x = parseFloat(e.latlng.lat);
      var y = parseFloat(e.latlng.lng);

      for(r in roads) {
        var bnd = roads[r].bound;
        var up = parseFloat(bnd.getNorth()) - x;
        var dn = parseFloat(bnd.getSouth()) - x;
        var lf = parseFloat(bnd.getEast()) - y;
        var ri = parseFloat(bnd.getWest()) - y;

        if (up > 0 && dn < 0 && lf > 0 && ri < 0) {
          info.update(roads[r]);
        }
      }
    });

    var info_cls = $(".info");
    info_cls.css("padding", "6px 8px");
    info_cls.css("font-size", "12px");
    info_cls.css("background", "rgba(255,255,255,0.8)");
    info_cls.css("box-shadow", "0 0 15px rgba(0,0,0,0.2)");
    info_cls.css("border-radius", "5px");
    info_cls.css("color", "grey");

    clearInterval(readyStateCheckInterval);
  }
}, 10);
