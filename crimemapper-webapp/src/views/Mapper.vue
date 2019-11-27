<template name="Mapper">
  <div id="container" >
    <!--  <v-row
        class="mb-6"
        no-gutters>   
          <v-col
            v-for="n in 2"
            :key="n"
            :lg="cols[n - 1]"
            :md="6"
            :sm="cols[n - 1]"> -->
                <div class="google-map" id="mapName">
                  
                </div>
      <!--    </v-col> -->

    <!--       <v-col
            v-for="n in 3"
            :key="n"
            cols="sm">-->
                <div class="filters" id="filters" style="margin-left: 1095px; margin-right: 10px; padding-top: 8px;">
                  <v-select
                    v-model="subject"
                    :items="subjects"
                    item-text="text"
                    item-value="value"
                    label="--Select Subject--"
                    required></v-select>

                  <v-select
                    v-model="byLocation"
                    :items="locations"
                    item-text="text"
                    item-value="value"
                    label="--Select Location--"
                    required></v-select>
                </div>
       <!--   </v-col>
      </v-row> -->
  </div>
</template>

<script>
import db from "@/firebase/fb";
export default {
  name: "Mapper",
  props: ["Mapper"],
  data: function() {
    //3.svg - Burglary, 7.svg -  Fraud, 10.svg - Robbery Dru = 5.svg
    return {
      mapName: this.name + "-map",
      map: null,
      bounds: null,
      markers: [],
      locations: [{value: "", text: "== SELECT  LOCATION =="}],
      subject: "",
      byLocation: null,
      location: "",
      subjects: [{value: "", text: "== SELECT  SUBJECT =="}],
    };
  },

  

  mounted: function mounted () {
    this.populateMap("","");
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

      db.collection("crimes")
        .get()
        .then(crimes => {        
          crimes.docs.forEach(doc => {
            let coord = doc.data();
          /*  this.locations.push(coord.place);
            this.subjects.push(coord.subject);*/

            this.subjects.push({
              value: coord.subject,
              text: coord.subject
            });

            this.locations.push({
              value: coord.place,
              text: coord.place
            });
            console.log(byLocation + " " + coord.place);
            if (coord.icon.toLowerCase() == filter && byLocation == ""){   
                //const position = new google.maps.LatLng(coord.location.latitude, coord.location.longitude);
                const position = new google.maps.LatLng(
                  coord.latitude,
                  coord.longitude
                );
                const marker = new google.maps.Marker({
                  position,
                  icon: coord.icon.toLowerCase() + ".svg",
                  map: this.map
                  // title: " Murder " + '\n\n' +" Chilanga Area " + '\n\n' + " 20/09/2019 "
                });
                marker.addListener("click", function() {
                  var content =
                    '<div id="iw-container">' +
                    '<div class="iw-title"><strong>DESCRIPTION: </strong>' +
                    coord.particularOfOffence +
                    "</div>" +
                    '<div class="iw-content">' +
                    "<p>" +
                    '<div class="iw-title"><strong>PLACE: </strong>' +
                    coord.place +
                    "</div>" +
                    "<br><strong>Latitude: </strong>" +
                    coord.latitude +
                    "<strong> <br>Longitude: </strong>" +
                    coord.latitude +
                    "</p>" +
                    "<p><strong>Date: </strong>" +
                    coord.date +
                    "</p>" +
                    "</div>" +
                    '<div class="iw-bottom-gradient"></div>' +
                    "</div>";
                  // A new Info Window is created and set content
                  var infowindow = new google.maps.InfoWindow({
                    content: content,
                    // Assign a maximum value for the width of the infowindow allows
                    // greater control over the various content elements
                    maxWidth: 320
                  });
                  infowindow.open(map, marker);
                });
                this.markers.push(marker);
                this.map.fitBounds(this.bounds.extend(position));
            } else if (filter == "" && byLocation == "") {
                //const position = new google.maps.LatLng(coord.location.latitude, coord.location.longitude);
                const position = new google.maps.LatLng(
                  coord.latitude,
                  coord.longitude
                );
                const marker = new google.maps.Marker({
                  position,
                  icon: coord.icon.toLowerCase() + ".svg",
                  map: this.map
                  // title: " Murder " + '\n\n' +" Chilanga Area " + '\n\n' + " 20/09/2019 "
                });
                marker.addListener("click", function() {
                  var content =
                    '<div id="iw-container">' +
                    '<div class="iw-title"><strong>DESCRIPTION: </strong>' +
                    coord.particularOfOffence +
                    "</div>" +
                    '<div class="iw-content">' +
                    "<p>" +
                    '<div class="iw-title"><strong>PLACE: </strong>' +
                    coord.place +
                    "</div>" +
                    "<br><strong>Latitude: </strong>" +
                    coord.latitude +
                    "<strong> <br>Longitude: </strong>" +
                    coord.latitude +
                    "</p>" +
                    "<p><strong>Date: </strong>" +
                    coord.date +
                    "</p>" +
                    "</div>" +
                    '<div class="iw-bottom-gradient"></div>' +
                    "</div>";
                  // A new Info Window is created and set content
                  var infowindow = new google.maps.InfoWindow({
                    content: content,
                    // Assign a maximum value for the width of the infowindow allows
                    // greater control over the various content elements
                    maxWidth: 320
                  });
                  infowindow.open(map, marker);
                });
                this.markers.push(marker);
                this.map.fitBounds(this.bounds.extend(position));
            } else if (coord.place == byLocation && filter == "") {
                //const position = new google.maps.LatLng(coord.location.latitude, coord.location.longitude);
                const position = new google.maps.LatLng(
                  coord.latitude,
                  coord.longitude
                );
                const marker = new google.maps.Marker({
                  position,
                  icon: coord.icon.toLowerCase() + ".svg",
                  map: this.map
                  // title: " Murder " + '\n\n' +" Chilanga Area " + '\n\n' + " 20/09/2019 "
                });
                marker.addListener("click", function() {
                  var content =
                    '<div id="iw-container">' +
                    '<div class="iw-title"><strong>DESCRIPTION: </strong>' +
                    coord.particularOfOffence +
                    "</div>" +
                    '<div class="iw-content">' +
                    "<p>" +
                    '<div class="iw-title"><strong>PLACE: </strong>' +
                    coord.place +
                    "</div>" +
                    "<br><strong>Latitude: </strong>" +
                    coord.latitude +
                    "<strong> <br>Longitude: </strong>" +
                    coord.latitude +
                    "</p>" +
                    "<p><strong>Date: </strong>" +
                    coord.date +
                    "</p>" +
                    "</div>" +
                    '<div class="iw-bottom-gradient"></div>' +
                    "</div>";
                  // A new Info Window is created and set content
                  var infowindow = new google.maps.InfoWindow({
                    content: content,
                    // Assign a maximum value for the width of the infowindow allows
                    // greater control over the various content elements
                    maxWidth: 320
                  });
                  infowindow.open(map, marker);
                });
                this.markers.push(marker);
                this.map.fitBounds(this.bounds.extend(position));
            } else if (coord.place == byLocation && filter == coord.icon.toLowerCase() ) {
                //const position = new google.maps.LatLng(coord.location.latitude, coord.location.longitude);
                const position = new google.maps.LatLng(
                  coord.latitude,
                  coord.longitude
                );
                const marker = new google.maps.Marker({
                  position,
                  icon: coord.icon.toLowerCase() + ".svg",
                  map: this.map
                  // title: " Murder " + '\n\n' +" Chilanga Area " + '\n\n' + " 20/09/2019 "
                });
                marker.addListener("click", function() {
                  var content =
                    '<div id="iw-container">' +
                    '<div class="iw-title"><strong>DESCRIPTION: </strong>' +
                    coord.particularOfOffence +
                    "</div>" +
                    '<div class="iw-content">' +
                    "<p>" +
                    '<div class="iw-title"><strong>PLACE: </strong>' +
                    coord.place +
                    "</div>" +
                    "<br><strong>Latitude: </strong>" +
                    coord.latitude +
                    "<strong> <br>Longitude: </strong>" +
                    coord.latitude +
                    "</p>" +
                    "<p><strong>Date: </strong>" +
                    coord.date +
                    "</p>" +
                    "</div>" +
                    '<div class="iw-bottom-gradient"></div>' +
                    "</div>";
                  // A new Info Window is created and set content
                  var infowindow = new google.maps.InfoWindow({
                    content: content,
                    // Assign a maximum value for the width of the infowindow allows
                    // greater control over the various content elements
                    maxWidth: 320
                  });
                  infowindow.open(map, marker);
                });
                this.markers.push(marker);
                this.map.fitBounds(this.bounds.extend(position));
            }
            
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
    width: 80% !important;
    height: 100%;
    /*margin: auto 80px;*/
    margin-right: 90px !important; /*For filter*/
    margin-left: 0 !important;
    background: gray;
    position: absolute;
     float: left;
  }
</style>
