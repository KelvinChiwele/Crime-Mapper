<template>
      <div class="google-map" id="mapName"></div>
</template>

<script>
  import $ from 'jquery'
  export default {
    name: 'Picker',
   data: function () {
    return {
      map: null,
      bounds: null
    }
  },
  mounted: function () {
     var lskCorrdinate = {lat: -15.4284383,lng: 28.326578}
    this.bounds = new google.maps.LatLngBounds();
    const element = document.getElementById("mapName")
    const mapCentre = this.lskCorrdinate
    const options = {
      center: lskCorrdinate,
      rotateControl:true,
      mapTypeControl: true,
      zoomControl: true,
    }

    this.map = new google.maps.Map(element, options);

    const position = new google.maps.LatLng(lskCorrdinate.lat, lskCorrdinate.lng);
    this.bounds.extend(position);
    if(this.bounds.getNorthEast().equals(this.bounds.getSouthWest())){
        const bound1 = new google.maps.LatLng(this.bounds.getNorthEast().lat() + 0.01, this.bounds.getNorthEast().lng() + 0.01);
        const bound2 = new google.maps.LatLng(this.bounds.getNorthEast().lat() - 0.01, this.bounds.getNorthEast().lng() - 0.01);
        this.bounds.extend(bound1);
        this.bounds.extend(bound2)
    }
    
    const marker = new google.maps.Marker({ 
        position,
        draggable:true,
        map: this.map,
    });

    marker.addListener('dragend', this.geocodeLocation);
    this.map.fitBounds(this.bounds);
    this.map.panTo(position)
  },

   methods: {
      geocodeLocation (event) {
        this.map.panTo(event.latLng)
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
