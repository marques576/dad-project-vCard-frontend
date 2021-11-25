<template>
  <div class="d-flex justify-content-between">
    <div class="mx-2">
      <h3 class="mt-4">Projects</h3>
    </div>
    <div class="mx-2 total-filtro">
      <h5 class="mt-4">Total: {{ totalProjects }}</h5>
    </div>
  </div>
  <hr />
  <div class="mb-3 d-flex justify-content-between flex-wrap">
    <div class="mx-2 mt-2 flex-grow-1 filter-div">
      <label for="selectStatus" class="form-label">Filter by status:</label>
      <select class="form-select" id="selectStatus" v-model="filterByStatus">
        <option :value="null"></option>
        <option value="P">Pending</option>
        <option value="W">Work In Progress</option>
        <option value="C">Completed</option>
        <option value="I">Interrupted</option>
        <option value="D">Discarded</option>
      </select>
    </div>
    <div class="mx-2 mt-2 flex-grow-1 filter-div">
      <label for="selectOwner" class="form-label">Filter by owner:</label>
      <select
        class="form-select"
        id="selectOwner"
        v-model="filterByResponsibleId"
      >
        <option :value="null"></option>
        <option v-for="user in users" :key="user.id" :value="user.id">
          {{ user.name }}
        </option>
      </select>
    </div>
    <div class="mx-2 mt-2">
      <button
        type="button"
        class="btn btn-success px-4 btn-addprj"
        @click="addProject"
      >
        <i class="bi bi-xs bi-plus-circle"></i>&nbsp; Add Project
      </button>
    </div>
  </div>
  <project-table
    :projects="filteredProjects"
    :showId="true"
    :showDates="true"
    @edit="editProject"
    @delete="deleteProject"
  ></project-table>
</template>

<script>
import ProjectTable from "./ProjectTable.vue"

export default {
  name: "Projects",
  components: {
    ProjectTable,
  },
  data() {
    return {
      projects: [],
      users: [],
      filterByResponsibleId: null,
      filterByStatus: "W",
    }
  },
  computed: {
    filteredProjects() {
      return this.projects.filter(
        (p) =>
          (!this.filterByResponsibleId ||
            this.filterByResponsibleId == p.responsible_id) &&
          (!this.filterByStatus || this.filterByStatus == p.status)
      )
    },
    totalProjects() {
      return this.projects.reduce(
        (c, p) =>
          (!this.filterByResponsibleId ||
            this.filterByResponsibleId == p.responsible_id) &&
          (!this.filterByStatus || this.filterByStatus == p.status)
            ? c + 1
            : c,
        0
      )
    },
  },
  methods: {
    loadProjects() {
      this.$axios
        .get("projects")
        .then((response) => {
          this.projects = response.data.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
    loadUsers() {
      this.$axios
        .get("users")
        .then((response) => {
          this.users = response.data.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
    addProject() {
      this.$router.push({ name: "NewProject" })
    },
    editProject(project) {
      this.$router.push({ name: "Project", params: { id: project.id } })
    },
    deleteProject(project) {
      this.$axios
        .delete("projects/" + project.id)
        .then((response) => {
          let deletedProject = response.data.data
          let idx = this.projects.findIndex((t) => t.id === deletedProject.id)
          if (idx >= 0) {
            this.projects.splice(idx, 1)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
  mounted() {
    this.loadUsers()
    this.loadProjects()
  },
}
</script>

<style scoped>
.filter-div {
  min-width: 12rem;
}
.total-filtro {
  margin-top: 0.35rem;
}
.btn-addprj {
  margin-top: 1.85rem;
}
</style>
