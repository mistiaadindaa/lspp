const place = ol.proj.fromLonLat([101.438309, 0.510440]); //untuk manggil koordinat Riau

const riauLayer = new ol.layer.Vector({ //variable untuk menyimpan data baru
  source: new ol.source.Vector({
    format: new ol.format.GeoJSON(),
    url: 'polygon_riau.json'
  }),
});

const banjirLayer = new ol.layer.Vector({ //variable untuk menyimpan data baru
  source: new ol.source.Vector({
    format: new ol.format.GeoJSON(),
    url: 'banjir.json'
  }),
  style: new ol.style.Style({
    image: new ol.style.Icon(({
      anchor: [0.5, 46],
      anchorXUnits: 'fraticon',
      anchorYUnits: 'pixels',
      src: 'Icon/dino.png'
    }))
  })
});

const map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM(),
      }), riauLayer, banjirLayer
    ],
    view: new ol.View({
      center: place,
      zoom: 8,
    }),
  });

  //menampilkan pop up
  var container = document.getElementById('popup'),
  content_element = document.getElementById('popup-content'),
  closer = document.getElementById('popup-closer');

  closer.onclick = function(){
    overlay.setPosition(undefined);
    closer.blur();
    return false;
  };

  var overlay = new ol.Overlay({
    element: container,
    autoPan: true,
    offset: [0, -10]
  });

  map.addOverlay(overlay);
  var FullScreen = new ol.control.FullScreen();
  map.addControl(FullScreen);

  map.on('click', function (evt) {
    var feature = map.forEachFeatureAtPixel(evt.pixel,
      function (feature, layer){
        return feature;
      });
      if (feature){
        var geometry = feature.getGeometry();
        var coord = geometry.getCoordinates();
        var content = 'Nama Daerah : <h3>' + feature.get('Nama_Pemetaan') + '</h3>';
        content += 'Jumlah korban: <b>' + feature.get('Jumlah_Korban')+'</b>';
        content_element.innerHTML = content;

        overlay.setPosition(coord);
        console.info(feature.getProperties());
      }
    });
