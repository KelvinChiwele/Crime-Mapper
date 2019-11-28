<script>
import { Line } from "vue-chartjs";
import db from "@/firebase/fb";

export default {
  extends: Line,


  data: function() {
    return {
      markers: [],
      subject: "",
      byLocation: null,
      crimes: {},
      data:[],
      count: 0
    };
  },

   created() {      
      db.collection("crimes")
        .get()
        .then(crimes => {        
          crimes.docs.forEach(doc => {
            let coord = doc.data();
            for(var i = 1; i < 13; i++){
                if (i < 10){
                  this.crimes["0" + i] = 0;
                } else{
                  this.crimes[i] = 0;
                }            
            }

              console.log(coord.date.split("-")[1])
              this.crimes[coord.date.split("-")[1]] = ++this.crimes[coord.date.split("-")[1]];
         
            console.log(this.crimes)

            
          });
          this.populateGraph();
        }); //End for each
    },
    methods: { 
      populateGraph(){
         this.renderChart(
          {
            labels:  [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",  "August",  "September",  "October",  "November",  "December"
        ],
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
            data: Object.values(this.crimes),
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
