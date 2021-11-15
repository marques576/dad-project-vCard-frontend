<template>
  <project-detail
    :operationType="operation"
    :project="project"
    :users="users"
    @save="save"
    @cancel="cancel"
  ></project-detail>
</template>

<script>
import ProjectDetail from "./ProjectDetail.vue"

export default {
  name: 'Project',
  components: {
    ProjectDetail
  },
  props: {
    id: {
      type: Number,
      default: null
    },
  },
  data () {
    return {
      project: this.newProject(),
      users: []
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
        this.loadProject(newValue)
      }
    },
  },
  methods: {
    newProject () {
      return {
        id: null,
        name: '',
        responsible_id: this.$userId,
        status: 'P',
        preview_start_date: null,
        preview_end_date: null,
        real_start_date: null,
        real_end_date: null,
        total_hours: null,
        billed: false,
        total_price: null,
      }
    },
    loadProject (id) {
      if (!id || (id < 0)) {
        this.project = this.newProject()
      } else {
        this.$axios.get('projects/' + id)
          .then((response) => {
            this.project = response.data.data
          })
          .catch((error) => {
            console.log(error)
          })
      }
    },
    save () {
      if (this.operation == 'insert') {
        this.$axios.post('projects', this.project)
          .then((response) => {
            this.$toast.success('Project #' + response.data.data.id + ' was created successfully.')
            this.$router.back()
          })
          .catch((error) => {
            if (error.response.status == 422) {
              this.$toast.error('Project was not created due to validation errors!')
            } else {
              this.$toast.error('Project was not created due to unknown server error!')
            }
          })
      } else {
        this.$axios.put('projects/' + this.id, this.project)
          .then((response) => {
            this.$toast.success('Project #' + response.data.data.id + ' was updated successfully.')
            this.$router.back()
          })
          .catch((error) => {
            if (error.response.status == 422) {
              this.$toast.error('Project #' + this.id + ' was not updated due to validation errors!')
            } else {
              this.$toast.error('Project #' + this.id + ' was not updated due to unknown server error!')
            }
          })
      }
    },
    cancel () {
      // Replace this code to navigate back
      // this.loadProject(this.id)
      this.$router.back()
    }
  },
  mounted () {
    this.users = []
    this.$axios.get('users')
      .then((response) => {
        this.users = response.data.data
        console.log(this.users)

      })
      .catch((error) => {
        console.log(error)
      })

  }
}
</script>
