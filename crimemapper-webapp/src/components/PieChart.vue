<script>
import { Pie } from "vue-chartjs";
import db from "@/firebase/fb";

export default {
  extends: Pie,

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
            if (!this.subjects[coord.subject]){
              this.subjects[coord.subject] = 1;
            } else {
              this.subjects[coord.subject] = ++this.subjects[coord.subject];
            }            
          });
          /*Object.entries(this.subjects).forEach(([key, value]) =>{
                console.log(key, value)
              })*/
          this.populateGraph();
        }); //End for each
    },

      methods: { 
            populateGraph() {
              this.gradient = this.$refs.canvas
                  .getContext("2d")
                  .createLinearGradient(0, 0, 0, 450);
                this.gradient2 = this.$refs.canvas
                  .getContext("2d")
                  .createLinearGradient(0, 0, 0, 450);

                this.gradient.addColorStop(0, "rgba(255, 0,0, 0.5)");
                this.gradient.addColorStop(0.5, "rgba(255, 0, 0, 0.25)");
                this.gradient.addColorStop(1, "rgba(255, 0, 0, 0)");

                this.gradient2.addColorStop(0, "rgba(0, 231, 255, 0.9)");
                this.gradient2.addColorStop(0.5, "rgba(0, 231, 255, 0.25)");
                this.gradient2.addColorStop(1, "rgba(0, 231, 255, 0)");
                this.renderChart(
                  {
                    labels: Object.keys(this.subjects),
                    tooltips:{
                      enabled: false
                    },
                    datasets: [
                      {
                        backgroundColor: [this.gradient, this.gradient2, "#00D8FF"],
                        data: Object.values(this.subjects)
                      }
                    ]
                  },
                  { responsive: true, maintainAspectRatio: false }
                );
            }
       }
};
</script>