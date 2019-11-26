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
            //console.log("==========================")
          /*  this.locations.push(coord.place);
            this.subjects.push(coord.subject);*/
            if (!this.subjects[coord.place]){
              this.subjects[coord.place] = 1;
            } else {
              this.subjects[coord.place] = ++this.subjects[coord.place];
              //console.log(this.subjects[coord.subject])
            }
            //console.log(coord.subject +" " + this.subjects[coord.subject])
            
            /*this.subjects.push({
              value: coord.subject,
              text: coord.place
            });*/
            
          });
             Object.entries(this.subjects).forEach(([key, value]) =>{
                console.log(key, value)
              })
               this.populateGraph();
        }); //End for each
    },
    methods: { 
      populateGraph(){
         this.renderChart(
          {
            labels:  Object.keys(this.subjects),
            datasets: [
              {
                label: "Crimes By Location",
                backgroundColor: "#f87979",
                data: Object.values(this.subjects)
              }
            ]
          },
          { responsive: true, maintainAspectRatio: false }
        );
      }
      
    },
  mounted() {
    this.renderChart(
      {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December"
        ],
        datasets: [
          {
            label: "Data One",
            backgroundColor: "#f87979",
            data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
          }
        ]
      },
      { responsive: true, maintainAspectRatio: false }
    );
  }
};
</script>
