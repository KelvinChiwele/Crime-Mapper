<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <v-btn color="red lighten-2" dark v-on="on">Add new case</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <h2>Pick Location</h2>
        </v-card-title>
        <v-card-text>
          <div class="google-map" id="mapName"></div>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn right class="success mx-0 mt-3 mr-4" @click="dialog = false">Add Case</v-btn>
          <v-btn class="danger mx-0 mt-3 mr-3" @click="dialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    name: 'Picker',
   data: function () {
     //3.svg - Burglary, 7.svg -  Fraud, 10.svg - Robbery Dru = 5.svg  
    return {
      mapName: this.name + "-map",
      markerCoordinates: [{
        latitude: -15.4284383,
        longitude: 28.326578,
        place: "Unknown Location",
        time: "9-24-2019 @ 7:00 PM",
        icon: "burglary.svg",
        description: "Fraud",
      },{
        latitude: -15.4074378,
        longitude: 28.3348543,
        time: "9-24-2019 @ 7:00 PM",
        place: "Yalelo Authorized Reseller",
        icon: "robbery.svg",
        description: "Burglary",
      },],
      map: null,
      bounds: null,
      markers: []
    }
  },
  mounted: function () {
     // InfoWindow content
    this.bounds = new google.maps.LatLngBounds();
    const element = document.getElementById("mapName")
    const mapCentre = this.markerCoordinates[0]
    const options = {
      center: new google.maps.LatLng(mapCentre.latitude, mapCentre.longitude)
    }
    this.map = new google.maps.Map(element, options);
    this.markerCoordinates.forEach((coord) => {
      const position = new google.maps.LatLng(coord.latitude, coord.longitude);
      const marker = new google.maps.Marker({ 
        position,
        draggable:true,
        icon: coord.icon,
        map: this.map,
       // title: " Murder " + '\n\n' +" Chilanga Area " + '\n\n' + " 20/09/2019 "
      });
       marker.addListener('dragend', this.geocodeLocation)
       marker.addListener('click', function() {
         var content = '<div id="iw-container">' +
                      '<div class="iw-title"><strong>DESCRIPTION: </strong>'+coord.description+'</div>' +                     
                      '<div class="iw-content">' +
                        '<p>'+
                         '<div class="iw-title"><strong>PLACE: </strong>'+coord.place+'</div>' +
                        '<br><strong>Latitude: </strong>'+coord.latitude+'<strong> Longitude: </strong>'+coord.latitude+'</p>'+
                        '<p><strong>TIME: </strong>'+coord.time+'</p>'+
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
     var map = new google.maps.Map(document.getElementById("map-canvas"));

   
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
  },
   methods: {
      geocodeLocation (event) {
        this.map.panTo(event.latLng)
        var lat = event.latLng.lat();
        var lng = event.latLng.lng();
        if (confirm('Would you lik to submit the Coordinates')) {
            alert('Case added');
        }
      },
      /*
      moveMarker () {
        var place = this.autocomplete.getPlace()
        var location = place.geometry && place.geometry.location
        if (location) {
          this.place = place
          this.map.panTo(location)
          this.marker.setPosition(location)
          this.$refs.info.showAddress(place)
        }
      }*/
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
