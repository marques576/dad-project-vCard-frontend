<script>
import { defineComponent } from 'vue'
import { Line } from 'vue3-chart-v2'

export default defineComponent({
  name: 'BalanceOvertTime',
  extends: Line,
  props: {
    labels: {
      type: Array,
      required: true
    },
    data: {
      type: Array,
      required: true
    }
  },
 mounted () {
   setTimeout(()=>{
       this.renderChart({
      labels: this.labels,
      options: {
        scales: {
            xAxes: [{
               gridLines: {
                  display: false
               }
            }],
            yAxes: [{
               gridLines: {
                  display: false
               }
            }]
       }
    },
      datasets: [
        {
          label: 'Balance Over Time Per Month',
          backgroundColor: 'rgba(75, 192, 192,0.4)',
          data: this.data,
          fill: true,
          borderColor: 'rgb(75, 192, 192)',
        }
      ],
    },
    )
 }, 1000)
  }
})
</script>
