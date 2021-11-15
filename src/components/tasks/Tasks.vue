<template>
  <div class="d-flex justify-content-between">
    <div class="mx-2">
      <h3 class="mt-4">{{ tasksTitle }}</h3>
    </div>
    <div class="mx-2 total-filtro">
      <h5 class="mt-4">Total: {{ totalTasks }}</h5>
    </div>
  </div>
  <hr>
  <div
    v-if="!onlyCurrentTasks"
    class="mb-3 d-flex justify-content-between flex-wrap"
  >
    <div class="mx-2 mt-2 flex-grow-1 filter-div">
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
    <div class="mx-2 mt-2 flex-grow-1 filter-div">
      <label
        for="selectProject"
        class="form-label"
      >Filter by project:</label>
      <select
        class="form-select"
        id="selectProject"
        v-model="filterByProjectId"
      >
        <option value="-1">Any</option>
        <option :value="null">-- No project --</option>
        <option
          v-for="prj in projects"
          :key="prj.id"
          :value="prj.id"
        >{{prj.name}}</option>
      </select>
    </div>
    <div class="mx-2 mt-2">
      <button
        type="button"
        class="btn btn-success px-4 btn-addtask"
        @click="addTask"
      ><i class="bi bi-xs bi-plus-circle"></i>&nbsp; Add Task</button>
    </div>
  </div>
  <task-table
    :tasks="filteredTasks"
    :showId="true"
    :showOwner="false"
    @edit="editTask"
    @deleted="deletedTask"
  ></task-table>
</template>

<script>
import TaskTable from "./TaskTable.vue"

export default {
  name: 'Tasks',
  components: {
    TaskTable
  },
  props: {
    tasksTitle: {
      type: String,
      default: 'Tasks'
    },
    onlyCurrentTasks: {
      type: Boolean,
      default: false
    },
  },
  data () {
    return {
      tasks: [],
      projects: [],
      filterByProjectId: -1,
      filterByCompleted: -1
    }
  },
  computed: {
    filteredTasks () {
      return this.tasks.filter(t =>
        (this.onlyCurrentTasks && !t.completed)
        ||
        (!this.onlyCurrentTasks && (
          (this.filterByProjectId == -1
            || this.filterByProjectId == t.project_id
          ) &&
          (this.filterByCompleted == -1
            || this.filterByCompleted == 0 && !t.completed
            || this.filterByCompleted == 1 && t.completed
          ))))
    },
    totalTasks () {
      return this.tasks.reduce((c, t) =>
        (this.onlyCurrentTasks && !t.completed)
          ||
          (!this.onlyCurrentTasks && (
            (this.filterByProjectId == -1
              || this.filterByProjectId == t.project_id
            ) &&
            (this.filterByCompleted == -1
              || this.filterByCompleted == 0 && !t.completed
              || this.filterByCompleted == 1 && t.completed
            ))) ? c + 1 : c, 0)
    }
  },
  methods: {
    loadTasks () {
      this.$axios.get('users/' + this.$userId + '/tasks')
        .then((response) => {
          this.tasks = response.data.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
    loadProjects () {
      this.$axios.get('projects')
        .then((response) => {
          this.projects = response.data.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
    addTask () {
      this.$router.push({ name: 'NewTask' })
    },
    editTask (task) {
      this.$router.push({ name: 'Task', params: { id: task.id } })
    },
    deletedTask (deletedTask) {
      let idx = this.tasks.findIndex((t) => t.id === deletedTask.id)
      if (idx >= 0) {
        this.tasks.splice(idx, 1)
      }
    },
  },
  mounted () {
    this.loadProjects()
    this.loadTasks()
  }
}
</script>

<style scoped>
.filter-div {
  min-width: 12rem;
}
.total-filtro {
  margin-top: 0.35rem;
}
.btn-addtask {
  margin-top: 1.85rem;
}
</style>
