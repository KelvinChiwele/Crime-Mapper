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
        place: "Unknown Location",
        time: "9-24-2019 @ 7:00 PM",
        description: "Robbery",
      },{
        latitude: -15.4074378,
        longitude: 28.3348543,
        time: "9-24-2019 @ 7:00 PM",
        place: "Yalelo Authorized Reseller",
        description: "Robbery",
      },{
        latitude: -15.4074378,
        longitude: 28.3348543,
        time: "9-24-2019 @ 7:00 PM",
        place: "Viigo Collections",
        description: "Drugs / Alcohol Violations",
      },{
        latitude: -15.4080274,
        longitude: 28.3362169,
        time: "9-24-2019 @ 7:00 PM",
        place: "Afrinovations Enterprise Kalingalinga",
        description: "Robbery",
      },{
        latitude: -15.4074378,
        longitude: 28.3348543,
        time: "9-24-2019 @ 7:00 PM",
        place: "Express Credit",
        description: "Fraud",
      },{
        latitude: -15.4181212,
        longitude: 28.3309061,
        time: "9-24-2019 @ 7:00 PM",
        place: "Kalumbila Mine",
        description: "Vehicle Break-In / Theft",
      },{
        latitude: -15.4074378,
        longitude: 28.3348543,
        time: "9-24-2019 @ 7:00 PM",
        place: "Yalelo Authorized Reseller",
        description: "Robbery",
      },  {
       latitude: -15.4299943,
        longitude: 28.3328373,
        time: "9-24-2019 @ 7:00 PM",
        place: "Brentwood Drive SDA Church",
        description: "Robbery",
      }, {
        latitude: -15.6026746,
        longitude: 28.2975198,
        time: "9-24-2019 @ 7:00 PM",
        place: "Unknown Location",
        description: "Robbery",
      }, {
        latitude: -15.7022746,
        longitude: 28.2975198,
        time: "5-06-2019 @ 7:00 PM",
        place: "Unknown Location",
        description: "Robbery",
      }, {
        latitude: -15.4055046,
        longitude: 28.2909198,
        time: "9-09-2019 @ 7:00 PM",
        place: "Unknown Location",
        description: "Robbery",
      }, {
        latitude: -15.4382046,
        longitude: 28.2935498,
        time: "8-09-2019 @ 7:00 PM",
        place: "Unknown Location",
        description: "Robbery",
      }, {
        latitude: -15.4482046,
        longitude: 28.2935498,
        time: "5-12-2018 @ 7:00 PM",
        place: "Unknown Location",
        description: "Robbery",
      }, {
        latitude: -15.4682046,
        longitude: 28.2945498,
        time: "11-04-2016 @ 7:00 PM",
        place: "Unknown Location",
        description: "Robbery",
      }, {
        latitude: -15.4882046,
        longitude: 28.2955498,
         time: "24-02-2018 @ 7:00 PM",
        place: "Unknown Location",
        description: "Robbery",
      }],
      map: null,
      bounds: null,
      markers: []
    }
  },
  mounted: function () {
     // InfoWindow content
    

    

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
       // title: " Murder " + '\n\n' +" Chilanga Area " + '\n\n' + " 20/09/2019 "
      });
       marker.addListener('click', function() {
         var content = '<div id="iw-container">' +
                      '<div class="iw-title"><strong>DESCRIPTION: </strong>'+coord.description+'</div><br>' +                     
                      '<div class="iw-content">' +
                        '<p><strong>COORDINATES</strong>'+
                         '<div class="iw-title"><strong>PLACE: </strong>'+coord.place+'</div><br>' +
                        '<br><strong>Latitude: </strong>'+coord.latitude+'<strong> Longitude: </strong>'+coord.latitude+'</p>'+
                        '<p><strong>TIME</strong>'+
                        '<br>'+coord.time+'</p>'+
                      '</div>' +
                      '<div class="iw-bottom-gradient"></div>' +
                    '</div>';
          // A new Info Window is created and set content
        var infowindow = new google.maps.InfoWindow({
          content: content,

          // Assign a maximum value for the width of the infowindow allows
          // greater control over the various content elements
          maxWidth: 320
        })
          infowindow.open(map, marker);
        });
      this.markers.push(marker)
      this.map.fitBounds(this.bounds.extend(position))

       
    });
     var map = new google.maps.Map(document.getElementById("map-canvas"),mapOptions);

   
    // This event expects a click on a marker
 
    google.maps.event.addListener(map, "rightclick", function(event) {
        var lat = event.latLng.lat();
        var lng = event.latLng.lng();
        // populate yor box/field with lat, lng
        alert("Lat=" + lat + "; Lng=" + lng);
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
