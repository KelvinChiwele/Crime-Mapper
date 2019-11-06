<template>
  <div class="google-map" :id="mapName"></div>
</template>

<script>
  import db from '@/firebase/fb'
  export default {
    name: 'Mapper',
   data: function () {
     //3.svg - Burglary, 7.svg -  Fraud, 10.svg - Robbery Dru = 5.svg  
    return {
      mapName: this.name + "-map",      
      map: null,
      bounds: null,
      markers: []
    }
  },
  mounted: function () {
     // InfoWindow content
    
    this.bounds = new google.maps.LatLngBounds();
    const element = document.getElementById(this.mapName)
    const options = {
      center: new google.maps.LatLng(-15.6026746, 28.3380676)
    }
    this.map = new google.maps.Map(element, options);

    db.collection('crimes').get().then(crimes =>{
      crimes.docs.forEach(doc => {        
        let coord = doc.data();

        //const position = new google.maps.LatLng(coord.location.latitude, coord.location.longitude);
        const position = new google.maps.LatLng(coord.latitude, coord.longitude);
        const marker = new google.maps.Marker({ 
          position,
          icon: coord.icon +".svg",
          map: this.map,
          // title: " Murder " + '\n\n' +" Chilanga Area " + '\n\n' + " 20/09/2019 "
          });
          marker.addListener('click', function() {
            var content = '<div id="iw-container">' +
                          '<div class="iw-title"><strong>DESCRIPTION: </strong>'+coord.particularOfOffence+'</div>' +                     
                          '<div class="iw-content">' +
                            '<p>'+
                            '<div class="iw-title"><strong>PLACE: </strong>'+coord.place+'</div>' +
                            '<br><strong>Latitude: </strong>'+coord.latitude+'<strong> Longitude: </strong>'+coord.latitude+'</p>'+
                            '<p><strong>TIME: </strong>'+coord.date+'</p>'+
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
          
          }) //End for each
    })
    
     var map = new google.maps.Map(document.getElementById("map-canvas"),mapOptions);

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
