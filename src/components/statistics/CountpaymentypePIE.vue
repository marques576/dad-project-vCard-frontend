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
          backgroundColor: ['rgba(253, 1, 0,0.7)', 
                            'rgba(247, 105, 21,0.7)', 
                            'rgba(238, 222, 4,0.7)', 
                            'rgba(160, 214, 54,0.7)', 
                            'rgba(47, 162, 54,0.7)', 
                            'rgba(51, 62, 212,0.7)'],
          data: this.data,
        }
      ]
    })
 }, 1000)
  }
})
</script>
