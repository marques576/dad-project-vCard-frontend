<template>
  <div class="mx-2">
    <h3 class="mt-4">Project # {{project.id}} : {{project.name}}</h3>
  </div>
  <hr>
  <div class="d-flex justify-content-between">
    <div class="mx-2">
      <h5 class="mt-4">Project status: {{project.status_name}}</h5>
    </div>
    <div class="mx-2 total-filtro">
      <h5 class="mt-4">Total tasks: {{ totalTasks }}</h5>
    </div>
  </div>
  <div class="mb-4 d-flex flex-wrap justify-content-between">
    <div class="mx-2 mt-2 flex-grow-1">
      <label
        for="selectCompleted"
        class="form-label"
      >Filter by completed:</label>
      <select
        class="form-select"
        id="selectCompleted"
        v-model="filterByCompleted"
      >
        <option value="-1">Any</option>
        <option value="0">Pending Tasks</option>
        <option value="1">Completed Tasks</option>
      </select>
    </div>
    <div class="mx-2 mt-2">
      <button
        type="button"
        class="btn btn-secondary px-4 btn-top"
        @click="editProject"
      ><i class="bi bi-xs bi-pencil"></i>&nbsp; Edit Project</button>
    </div>
    <div class="mx-2 mt-2">
      <button
        type="button"
        class="btn btn-success px-4 btn-top"
        @click="addTask"
      ><i class="bi bi-xs bi-plus-circle"></i>&nbsp; Add Task</button>
    </div>
  </div>

  <task-table
    :tasks="filteredTasks"
    :showId="true"
    :showOwner="true"
    :showProject="false"
    @edit="editTask"
    @deleted="deletedTask"
  ></task-table>
</template>

<script>
import TaskTable from "../tasks/TaskTable.vue"

export default {
  name: 'ProjectTasks',
  components: {
    TaskTable
  },
  props: {
    id: {
      type: Number,
      default: null
    },
  },
  data () {
    return {
      project: this.emptyProject(),
      filterByCompleted: 0
    }
  },
  watch: {
    id: {
      immediate: true,
      handler (newValue) {
        this.loadProject(newValue)
      }
    },
  },
  computed: {
    filteredTasks () {
      return this.project.tasks.filter(t =>
        this.filterByCompleted == -1
        || this.filterByCompleted == 0 && !t.completed
        || this.filterByCompleted == 1 && t.completed
      )
    },
    totalTasks () {
      return this.project.tasks.reduce((c, t) =>
        this.filterByCompleted == -1
          || this.filterByCompleted == 0 && !t.completed
          || this.filterByCompleted == 1 && t.completed
          ? c + 1 : c, 0)
    }
  },

  methods: {
    emptyProject () {
      return {
        id: null,
        name: '',
        status_name: '',
        tasks: []
      }
    },
    loadProject (id) {
      if (!id || (id < 0)) {
        this.project = this.emptyProject()
      } else {
        this.$axios.get('projects/' + id + '/tasks')
          .then((response) => {
            this.project = response.data.data
          })
          .catch((error) => {
            console.log(error)
          })
      }
    },
    editProject () {
      this.$router.push({ name: 'Project', params: { id: this.id } })
    },
    addTask () {
      this.$router.push({ name: 'NewTask', params: { fixedProject: this.id } })
    },
    editTask (task) {
      this.$router.push({ name: 'Task', params: { id: task.id, fixedProject: this.id } })
    },
    deletedTask (deletedTask) {
      console.log(deletedTask)
      let idx = this.project.tasks.findIndex((t) => t.id === deletedTask.id)
      if (idx >= 0) {
        this.project.tasks.splice(idx, 1)
      }
    },
  },
}
</script>

<style scoped>
.btn-top {
  margin-top: 1.85rem;
}
</style>
