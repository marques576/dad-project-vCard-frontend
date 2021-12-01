<script>
import { defineComponent } from 'vue'
import { Line } from 'vue3-chart-v2'

export default defineComponent({
  name: 'SumYearChart',
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
    // console.log(this.data)
    // console.log(this.labels)
   setTimeout(()=>{
       this.renderChart({
      labels: this.labels,
      datasets: [
        {
          label: 'Soma por Mês',
          backgroundColor: '#f87979',
          data: this.data
        }
      ]
    })
 }, 2000)
  }
})
</script>
