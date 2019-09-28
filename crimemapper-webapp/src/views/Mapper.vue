<template>
  <div class="google-map" :id="mapName"></div>
</template>

<script>
  export default {
    name: 'Mapper',
   data: function () {
    return {
      mapName: this.name + "-map",
      markerCoordinates: [{
        latitude: -15.4284383,
        longitude: 28.326578,
      }, {
        latitude: -15.5207469,
        longitude: 28.3248492,
      }, {
        latitude: -15.6026746,
        longitude: 28.2975198,
      }, {
        latitude: -15.7022746,
        longitude: 28.2975198,
      }, {
        latitude: -15.4055046,
        longitude: 28.2909198,
      }, {
        latitude: -15.4382046,
        longitude: 28.2935498,
      }, {
        latitude: -15.4482046,
        longitude: 28.2935498,
      }, {
        latitude: -15.4682046,
        longitude: 28.2945498,
      }, {
        latitude: -15.4882046,
        longitude: 28.2955498,
      }, {
        latitude: -15.4982046,
        longitude: 28.2985498,
      }],
      map: null,
      bounds: null,
      markers: []
    }
  },
  mounted: function () {
     // InfoWindow content
    var content = '<div id="iw-container">' +
                      '<div class="iw-title">Kalingalinga</div><br>' +
                      '<div class="iw-content">' +
                        '<p>Founded in 1824, the Porcelain Factory of Vista Alegre was the first </p>' +
                        '<div class="iw-subTitle">Contacts</div>' +
                        '<p>VISTA ALEGRE ATLANTIS, SA<br>3830-292 Ílhavo - Portugal<br>'+
                        '<br>Location: </p>'+
                      '</div>' +
                      '<div class="iw-bottom-gradient"></div>' +
                    '</div>';

    // A new Info Window is created and set content
    var infowindow = new google.maps.InfoWindow({
      content: content,

      // Assign a maximum value for the width of the infowindow allows
      // greater control over the various content elements
      maxWidth: 300
    });

    this.bounds = new google.maps.LatLngBounds();
    const element = document.getElementById(this.mapName)
    const mapCentre = this.markerCoordinates[0]
    const options = {
      center: new google.maps.LatLng(mapCentre.latitude, mapCentre.longitude)
    }
    this.map = new google.maps.Map(element, options);
    this.markerCoordinates.forEach((coord) => {
      const position = new google.maps.LatLng(coord.latitude, coord.longitude);
      const marker = new google.maps.Marker({ 
        position,
        map: this.map,
        title: " Murder " + '\n\n' +" Chilanga Area " + '\n\n' + " 20/09/2019 "
      });
       marker.addListener('click', function() {
          infowindow.open(map, marker);
        });
      this.markers.push(marker)
      this.map.fitBounds(this.bounds.extend(position))

       
    });
     var map = new google.maps.Map(document.getElementById("map-canvas"),mapOptions);

   
    // This event expects a click on a marker
    // When this event is fired the Info Window is opened.
    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(map,marker);
    });

    // Event that closes the Info Window with a click on the map
    google.maps.event.addListener(map, 'click', function() {
      infowindow.close();
    });
  }
};
</script>

<style>
   .google-map {
      width: 100%;
      height: 100%;
      margin: 0 auto;
      background: gray;
  }
</style>
