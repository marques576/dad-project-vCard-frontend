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
   setTimeout(()=>{
       this.renderChart({
      labels: this.labels,
      datasets: [
        {
          label: 'Soma por Mês',
          backgroundColor: 'rgb(75, 192, 192)',
          data: this.data,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
        }
      ]
    })
 }, 1000)
  }
})
</script>
