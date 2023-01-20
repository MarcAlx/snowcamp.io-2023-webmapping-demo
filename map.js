//wait for the page to be loaded
document.addEventListener("DOMContentLoaded", function(event) { 
  // initialize the map
  var map = L.map('map', {
    center: [45.179321065791,5.74204779377817],
    zoom: 12
  });
  
  // add base map : Stamen terrain
  L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg', {
    maxZoom: 19,
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
  }).addTo(map);
  
  // load GEOJSON (raw copyfrom https://entrepot.metropolegrenoble.fr/opendata/38185-GRE/Bibliotheque/json/BIBLIOTHEQUES_SEJOURNEURS_VDG_EPSG4326.json)
  var geojsonFeature = {"name":"SEJOURNEURS_2008_20016_VDG_EPSG4326","type":"FeatureCollection"
  ,"features":[
  {"type":"Feature","geometry":{"type":"Point","coordinates":[5.7320574736168,45.1581340878263]},"properties":{"Bibliothèque":"BPLC","2008":0,"2009":0,"2010":0,"2011":0,"2012":0,"2013":0,"2014":0,"2015":0,"2016":0}}
  ,{"type":"Feature","geometry":{"type":"Point","coordinates":[5.74204779377817,45.179321065791]},"properties":{"Bibliothèque":"ABBA","2008":28426,"2009":29142,"2010":28606,"2011":30306,"2012":30720,"2013":35767,"2014":36555,"2015":39379,"2016":40586}}
  ,{"type":"Feature","geometry":{"type":"Point","coordinates":[5.7245407609497,45.1734260314259]},"properties":{"Bibliothèque":"ALLI","2008":33094,"2009":30753,"2010":26756,"2011":27982,"2012":27776,"2013":26871,"2014":27745,"2015":23140,"2016":21820}}
  ,{"type":"Feature","geometry":{"type":"Point","coordinates":[5.73316403040654,45.1639416910951]},"properties":{"Bibliothèque":"ARLE","2008":56135,"2009":48345,"2010":46236,"2011":53691,"2012":53691,"2013":47091,"2014":45490,"2015":47553,"2016":40354}}
  ,{"type":"Feature","geometry":{"type":"Point","coordinates":[5.71167205473486,45.1952849566199]},"properties":{"Bibliothèque":"BCSI","2008":12807,"2009":13058,"2010":13058,"2011":15006,"2012":14478,"2013":15018,"2014":15611,"2015":15620,"2016":17408}}
  ,{"type":"Feature","geometry":{"type":"Point","coordinates":[5.70933329426306,45.1755426255276]},"properties":{"Bibliothèque":"ECLA","2008":31396,"2009":64269,"2010":70336,"2011":68303,"2012":68273,"2013":69666,"2014":65871,"2015":65465,"2016":65702}}
  ,{"type":"Feature","geometry":{"type":"Point","coordinates":[5.72731160059381,45.1925245083682]},"properties":{"Bibliothèque":"JVEN","2008":15000,"2009":22500,"2010":23400,"2011":23400,"2012":23400,"2013":19050,"2014":26637,"2015":32663,"2016":32636}}
  ,{"type":"Feature","geometry":{"type":"Point","coordinates":[5.72790943993487,45.1635467255704]},"properties":{"Bibliothèque":"PREM","2008":8920,"2009":12329,"2010":12500,"2011":0,"2012":5658,"2013":5092,"2014":4968,"2015":5200,"2016":2600}}
  ,{"type":"Feature","geometry":{"type":"Point","coordinates":[5.74097979646165,45.1707689330315]},"properties":{"Bibliothèque":"TEIS","2008":67726,"2009":42631,"2010":44851,"2011":44930,"2012":42658,"2013":38574,"2014":34522,"2015":28764,"2016":28525}}
  ,{"type":"Feature","geometry":{"type":"Point","coordinates":[5.71324164377146,45.187920087457]},"properties":{"Bibliothèque":"SBRU","2008":62138,"2009":62138,"2010":50551,"2011":46952,"2012":54393,"2013":53784,"2014":51965,"2015":33520,"2016":41559}}
  ,{"type":"Feature","geometry":{"type":"Point","coordinates":[5.7308767712179,45.1853423475203]},"properties":{"Bibliothèque":"BMEI","2008":124404,"2009":120427,"2010":119614,"2011":119550,"2012":126079,"2013":117252,"2014":112585,"2015":119305,"2016":125943}}
  ,{"type":"Feature","geometry":{"type":"Point","coordinates":[5.7292723483717,45.190308693601]},"properties":{"Bibliothèque":"CEVI","2008":188614,"2009":210504,"2010":215503,"2011":208618,"2012":203671,"2013":192912,"2014":199900,"2015":202876,"2016":192572}}
  ,{"type":"Feature","geometry":{"type":"Point","coordinates":[5.73338938395641,45.1572908888929]},"properties":{"Bibliothèque":"GRPL","2008":216818,"2009":203458,"2010":164999,"2011":155766,"2012":184594,"2013":187924,"2014":180147,"2015":175757,"2016":173827}}
  ]};
  
  //create a marker
  let marker = L.AwesomeMarkers.icon({
      icon: 'book',
      iconColor: 'black',
      prefix: 'fa',
      markerColor: 'lightblue'
    });
  
  // load GEOJSON object/array to map
  L.geoJSON(geojsonFeature, {
    // replace default maker with icon
    pointToLayer: function(feature, latlng) {
      return L.marker(latlng, {
        icon:marker
      });
    },
    // bind tooltip to each feature
    onEachFeature: function(feature, layer) {
      // check if specific property is existing
      if(feature.properties.Bibliothèque
      && feature.properties["2016"]) {
        layer.bindTooltip("<b>Bibliothèque :</b> " + feature.properties.Bibliothèque+"<br\><b>Visiteurs en 2016 :</b> "+feature.properties["2016"]); }
      }
  }).addTo(map);
});