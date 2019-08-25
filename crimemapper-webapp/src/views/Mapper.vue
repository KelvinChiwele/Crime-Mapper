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
        longitude: 28.326578
      }, {
        latitude: -15.4207469,
        longitude: 28.3248492
      }, {
        latitude: -15.4022046,
        longitude: 28.2975198
      }],
      map: null,
      bounds: null,
      markers: []
    }
  },
  mounted: function () {
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
        map: this.map
      });
    this.markers.push(marker)
      this.map.fitBounds(this.bounds.extend(position))
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
