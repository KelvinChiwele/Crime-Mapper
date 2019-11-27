<script>
import { Line } from "vue-chartjs";
import db from "@/firebase/fb";

export default {
  extends: Line,


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
              this.subjects[coord.date.split("-")[1]] = 1;
            } else {
              this.subjects[coord.date.split("-")[1]] = ++this.subjects[coord.place];
              //console.log(this.subjects[coord.subject])
            }
            console.log(coord.date.split("-")[1])
            
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
            data: Object.values(this.subjects),
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
  mounted() {
    /*
    this.renderChart(
       {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July"
        ],
        datasets: [
          {
            label: "Crimes Reported Monthly 2019",
            data: [2, 10, 5, 9, 0, 6, 20],
            backgroundColor: "transparent",
            borderColor: "rgba(1, 116, 188, 0.50)",
            pointBackgroundColor: "rgba(171, 71, 188, 1)"
          }
        ]
      },
      {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: "My Data"
        }
      }
    );*/
  }
};
</script>
