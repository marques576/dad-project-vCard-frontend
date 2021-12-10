<script>
import { defineComponent } from 'vue'
import { Doughnut } from 'vue3-chart-v2'

export default defineComponent({
  name: 'CountpaymentypePIE',
  extends: Doughnut,
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
      datasets: [
        {
          backgroundColor: ['green', 'orange', 'blue', 'brown', 'red', 'purple'],
          data: this.data
        }
      ]
    })
 }, 1000)
  }
})
</script>
