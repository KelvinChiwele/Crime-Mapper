<script>
import { Bar } from "vue-chartjs";
import db from "@/firebase/fb";

export default {
  extends: Bar,


  data: function() {
    return {
      markers: [],
      locations: [{value: "", text: "== SELECT  LOCATION =="}],
      subject: "",
      byLocation: null,
      subjects: {},
      points:[],
      count: 0
    };
  },

   created() {      
      db.collection("crimes")
        .get()
        .then(crimes => {        
          crimes.docs.forEach(doc => {
            let coord = doc.data();
            if (!this.subjects[coord.place]){
              this.subjects[coord.place] = 1;
            } else {
              this.subjects[coord.place] = ++this.subjects[coord.place];
            }            
          });
          /*Object.entries(this.subjects).forEach(([key, value]) =>{
              console.log(key, value)
            })*/
            this.points = Object.values(this.subjects);
            this.points.push(0);
            this.populateGraph();
        }); //End for each
    },
    methods: { 
      populateGraph(){
         this.renderChart(
          {
            labels:  Object.keys(this.subjects),
            tooltips:{
              enabled: false
            },

            datasets: [
              {
                label: "Crimes By Location",
                backgroundColor: "#f87979",
                data: this.points.sort() 
              }
            ]
          },
          { responsive: true, maintainAspectRatio: false }
        );
      }      
    }
};
</script>
