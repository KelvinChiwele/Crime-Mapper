<script>
import { Line } from "vue-chartjs";
import db from "@/firebase/fb";

export default {
  extends: Line,


  data: function() {
    return {
      crimes: {},
      points:[],
    };
  },

   created() {      
      db.collection("crimes")
        .get()
        .then(crimes => {     
          
            for(var i = 1; i < 13; i++){
                if (i < 10){
                  this.crimes["0" + i] = 0;
                } else{
                  this.crimes[i] = 0;
                }            
            }   
          crimes.docs.forEach(doc => {
            let coord = doc.data();
              this.crimes[coord.date.split("-")[1]] = ++this.crimes[coord.date.split("-")[1]];
          });

          for(var i = 0; i < 12; i++){
            this.points[i] = this.crimes[Object.keys(this.crimes).sort()[i]];         
          }  
          this.populateGraph();
        }); //End for each
    },
    methods: { 
      populateGraph(){
         this.renderChart(
          {
            //labels:  Object.keys(this.crimes).sort(),
            labels: [
                    "January", "February", "March",
                    "April", "May", "June", "July",  
                    "August",  "September",  "October", 
                    "November",  "December"],
            tooltips:{
              enabled: false
            },
            /*
            datasets: [
              {
                label: "Crimes By Location",
                backgroundColor: "#f87979",
                data: Object.values(this.subjects)
              }
            ]*/

            datasets: [
          {
            label: "Crimes Reported Monthly 2019",
            data: this.points,
            backgroundColor: "transparent",
            borderColor: "rgba(1, 116, 188, 0.50)",
            pointBackgroundColor: "rgba(171, 71, 188, 1)"
          }
        ]
          },
          { responsive: true, maintainAspectRatio: false }
        );
      }
      
    },
};
</script>
