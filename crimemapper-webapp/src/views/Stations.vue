<template name="Mapper">
  <div id="container" >
      <div class="google-map" id="mapName">                  
      </div>
  </div>
</template>

<script>
import db from "@/firebase/fb";
export default {
  name: "Stations",
  data: function() {
    //3.svg - Burglary, 7.svg -  Fraud, 10.svg - Robbery Dru = 5.svg
    return {
      mapName: this.name + "-map",
      map: null,
      bounds: null,
      markers: [],
      subject: "",
      byLocation: null,
      location: "",
    };
  },

  

  mounted: function mounted () {
    this.populateMap();
  },

   watch: {
     subject: function(){
        this.populateMap(this.subject, this.byLocation);
     },   
     byLocation: function(){
        this.populateMap(this.subject, this.byLocation);
     }     
  },

  methods: {  
      populateMap(filter, byLocation) {
          this.bounds = new google.maps.LatLngBounds();
    // const element = document.querySelector("#" + this.mapName);
      const element = document.querySelector("#mapName");
      //const element = document.getElementById(this.mapName);
      const lat = new google.maps.LatLng(-15.6026746, 28.3380676);
      const options = {
        center: lat
      };

      this.map = new google.maps.Map(element, options);

      db.collection("stations")
        .get()
        .then(crimes => {        
          crimes.docs.forEach(doc => {
            let coord = doc.data();    
                //const position = new google.maps.LatLng(coord.location.latitude, coord.location.longitude);
                const position = new google.maps.LatLng(
                  coord.latitude,
                  coord.longitude
                );
                const marker = new google.maps.Marker({
                  position,
                  map: this.map,
                  title: coord.station + " Police"
                });
                this.markers.push(marker);
                this.map.fitBounds(this.bounds.extend(position));
            
          }); //End for each
        });

      //var map = new google.maps.Map(document.getElementById("map-canvas"),options);

      // Event that closes the Info Window with a click on the map
      google.maps.event.addListener(this.map, "click", function() {
        infowindow.close();
      });
    }
  }

  
};
</script>

<style>
  .google-map {
    width: 100% !important;
    height: 100%;
    /*margin: auto 80px;*/
   /* margin-right: 90px !important; For filter*/
    margin-left: 0 !important;
    background: gray;
    position: absolute;
     float: left;
  }
</style>
