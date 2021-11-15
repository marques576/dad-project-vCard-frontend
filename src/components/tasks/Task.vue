<template>
  <task-detail
    :operationType="operation"
    :task="task"
    :projects="projects"
    :fixedProject="fixedProject"
    @save="save"
    @cancel="cancel"
  ></task-detail>
</template>

<script>
import TaskDetail from "./TaskDetail.vue"

export default {
  name: 'Task',
  components: {
    TaskDetail
  },
  props: {
    id: {
      type: Number,
      default: null
    },
    fixedProject: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      task: this.newTask(),
      projects: []
    }
  },
  computed: {
    operation () {
      return (!this.id || this.id < 0) ? 'insert' : 'update'
    }
  },
  watch: {
    // beforeRouteUpdate was not fired correctly
    // Used this watcher instead to update the ID
    id: {
      immediate: true,
      handler (newValue) {
        this.loadTask(newValue)
      }
    }
  },
  methods: {
    newTask () {
      return {
        id: null,
        owner_id: this.$userId,
        project_id: null,
        completed: false,
        description: '',
        notes: '',
        total_hours: null
      }
    },
    loadTask (id) {
      if (!id || (id < 0)) {
        this.task = this.newTask()
      } else {
        this.$axios.get('tasks/' + id)
          .then((response) => {
            this.task = response.data.data
          })
          .catch((error) => {
            console.log(error)
          })
      }
    },
    save () {
      if (this.operation == 'insert') {
        this.$axios.post('tasks', this.task)
          .then((response) => {
            this.$toast.success('Task #' + response.data.data.id + ' was created successfully.')
            this.$router.back()
          })
          .catch((error) => {
            if (error.response.status == 422) {
              this.$toast.error('Task was not created due to validation errors!')
            } else {
              this.$toast.error('Task was not created due to unknown server error!')
            }
          })
      } else {
        this.$axios.put('tasks/' + this.id, this.task)
          .then((response) => {
            this.$toast.success('Task #' + response.data.data.id + ' was updated successfully.')
            this.$router.back()
          })
          .catch((error) => {
            if (error.response.status == 422) {
              this.$toast.error('Task #' + this.id + ' was not updated due to validation errors!')
            } else {
              this.$toast.error('Task #' + this.id + ' was not updated due to unknown server error!')
            }
          })
      }
    },
    cancel () {
      // Replace this code to navigate back
      // this.loadTask(this.id)
      this.$router.back()
    }
  },
  mounted () {
    this.projects = []
    this.$axios.get('projects')
      .then((response) => {
        this.projects = response.data.data
        console.log(this.projects)

      })
      .catch((error) => {
        console.log(error)
      })
  }
}
</script>
