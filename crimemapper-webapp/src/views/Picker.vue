<template>
      <div class="google-map" id="mapName"></div>
</template>

<script>
  import $ from 'jquery'
  export default {
    name: 'Picker',
   data: function () {
     //3.svg - Burglary, 7.svg -  Fraud, 10.svg - Robbery Dru = 5.svg  
    return {
      //mapName: this.name + "-map",
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
        icon: "burglary.svg",
        description: "Burglary",
      },],
      map: null,
      bounds: null,
      markers: []
    }
  },
  mounted: function () {
     // InfoWindow content
     var lskCorrdinate = {lat: -15.4284383,lng: 28.326578}
    this.bounds = new google.maps.LatLngBounds();
    const element = document.getElementById("mapName")
    const mapCentre = this.markerCoordinates[0]
    const options = {
      center: lskCorrdinate,
      rotateControl:true,
      mapTypeControl: true,
      zoomControl: true,
      fullscreenControl: true,
      fullscreenControlControlOptions:{
        position: google.maps.ControlPosition.LEFT_CENTER
      }
    }
    this.map = new google.maps.Map(element, options);

    
    this.markerCoordinates.forEach((coord) => {
      const position = new google.maps.LatLng(coord.latitude, coord.longitude);
      const marker = new google.maps.Marker({ 
        position,
        draggable:true,
        icon: coord.icon,
        map: this.map,
      });
       marker.addListener('dragend', this.geocodeLocation)
     
      this.markers.push(marker)
      this.map.fitBounds(this.bounds.extend(position))   
    });
    var map = new google.maps.Map(document.getElementById("map-canvas"));

   
    // This event expects a click on a marker
 
    google.maps.event.addListener(map, "rightclick", function(event) {
        window.lat = event.latLng.lat();
        window.lng = event.latLng.lng();
        // populate yor box/field with lat, lng
       // this.$refs.dialog.show();
        alert("Lat=" + lat +"="+ window.lat+ "; Lng=" + lng +"="+ window.lng);
    });

    // Event that closes the Info Window with a click on the map
    google.maps.event.addListener(map, 'click', function() {
      infowindow.close();
    });
  },
   methods: {
      geocodeLocation (event) {
        //this.$bvModal.show(mod);
       // this.$refs['modal'].show();
        this.map.panTo(event.latLng)
       // var lat = event.latLng.lat();
       // var lng = event.latLng.lng();
        window.lat = event.latLng.lat();
        window.lng = event.latLng.lng();
        
        if (confirm('Would you lik to submit the Coordinates')) {
            //alert('Case added');
        }
      },
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
