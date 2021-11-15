<template>
  <table class="table">
    <thead>
      <tr>
        <th v-if="showId">#</th>
        <th
          class="text-center"
          v-if="showCompleted"
        >Completed</th>
        <th>Description</th>
        <th v-if="showOwner">Owner</th>
        <th v-if="showProject">Project</th>
        <th v-if="showCompletedButton || showEditButton || showDeleteButton"></th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="task in editingTasks"
        :key="task.id"
      >
        <td v-if="showId">{{ task.id }}</td>
        <td
          class="text-center"
          v-if="showCompleted"
        >{{ task.completed ? 'yes' : '-' }}</td>
        <td><span :class="{'completed': task.completed }">{{ task.description }}</span></td>
        <td v-if="showOwner">{{ task.owner_name}} </td>
        <td v-if="showProject">{{ task.project_name}} </td>
        <td
          class="text-end"
          v-if="showCompletedButton || showEditButton || showDeleteButton"
        >
          <div class="d-flex justify-content-end">
            <button
              class="btn btn-xs btn-light"
              @click="toogleClick(task)"
              v-if="showCompletedButton"
            ><i
                class="bi bi-xs"
                :class="{'bi-square' : !task.completed, 'bi-check2-square' : task.completed}"
              ></i>
            </button>

            <button
              class="btn btn-xs btn-light"
              @click="editClick(task)"
              v-if="showEditButton"
            ><i class="bi bi-xs bi-pencil"></i>
            </button>

            <button
              class="btn btn-xs btn-light"
              @click="deleteClick(task)"
              v-if="showDeleteButton"
            ><i class="bi bi-xs bi-x-square-fill"></i>
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "TaskTable",
  props: {
    tasks: {
      type: Array,
      default: () => [],
    },
    showId: {
      type: Boolean,
      default: true,
    },
    showCompleted: {
      type: Boolean,
      default: true,
    },
    showOwner: {
      type: Boolean,
      default: true,
    },
    showProject: {
      type: Boolean,
      default: true,
    },
    showCompletedButton: {
      type: Boolean,
      default: true,
    },
    showEditButton: {
      type: Boolean,
      default: true,
    },
    showDeleteButton: {
      type: Boolean,
      default: true,
    },
  },
  emits: [
    'completeToggled',
    'edit',
    'deleted',
  ],
  data () {
    return {
      editingTasks: this.tasks
    }
  },
  watch: {
    tasks (newTasks) {
      this.editingTasks = newTasks
    }
  },
  methods: {
    toogleClick (task) {
      this.$axios.patch('tasks/' + task.id + '/completed', { 'completed': !task.completed })
        .then((response) => {
          task.completed = response.data.data.completed
          this.$emit('completeToggled', task)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    editClick (task) {
      this.$emit('edit', task)
    },
    deleteClick (task) {
      this.$axios.delete('tasks/' + task.id)
        .then((response) => {
          let deletedTask = response.data.data
          this.$emit('deleted', deletedTask)
        })
        .catch((error) => {
          console.log(error)
        })
    },
  }
}
</script>

<style scoped>
.completed {
  text-decoration: line-through;
}

button {
  margin-left: 3px;
  margin-right: 3px;
}
</style>
