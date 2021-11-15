<template>
  <form
    class="row g-3 needs-validation"
    novalidate
    @submit.prevent="save"
  >
    <h3 class="mt-5 mb-3">{{ taskTitle }}</h3>
    <hr>

    <div class="d-flex flex-wrap justify-content-between">
      <div class="mb-3 checkCompleted">
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            v-model="editingTask.completed"
            id="inputCompleted"
          >
          <label
            class="form-check-label"
            for="inputCompleted"
          >
            Task is Completed
          </label>
        </div>
      </div>
      <div
        class="row mb-3 total_hours"
        v-show="editingTask.completed"
      >
        <label
          for="inputHours"
          class="col-sm-2 col-form-label"
        >Hours</label>
        <div class="col-sm-10">
          <input
            type="number"
            class="form-control"
            id="inputHours"
            placeholder="Total hours to complete the task"
            v-model="editingTask.total_hours"
          >
        </div>
      </div>
    </div>

    <div class="mb-3">
      <label
        for="inputDescription"
        class="form-label"
      >Description</label>
      <input
        type="text"
        class="form-control"
        id="inputDescription"
        placeholder="Task Description"
        required
        v-model="editingTask.description"
      >
    </div>
    <div class="mb-3">
      <label
        for="inputProject"
        class="form-label"
      >Project</label>
      <select
        class="form-select"
        id="inputProject"
        :disabled="fixedProject"
        v-model="editingTask.project_id"
      >
        <option :value="null">-- No Project --</option>
        <option
          v-for="prj in projects"
          :key="prj.id"
          :value="prj.id"
        >{{prj.name}}</option>
      </select>
    </div>
    <div class="mb-3">
      <label
        for="inputNotes"
        class="form-label"
      >Notes</label>
      <textarea
        class="form-control"
        id="inputNotes"
        rows="4"
        v-model="editingTask.notes"
      ></textarea>
    </div>

    <div class="mb-3 d-flex justify-content-end">
      <button
        type="button"
        class="btn btn-primary px-5"
        @click="save"
      >Save</button>
      <button
        type="button"
        class="btn btn-light px-5"
        @click="cancel"
      >Cancel</button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'TaskDetail',
  components: {
  },
  props: {
    task: {
      type: Object,
      required: true
    },
    operationType: {
      type: String,
      default: 'insert'  // insert / update
    },
    projects: {
      type: Array,
      required: true
    },
    fixedProject: {
      type: Number,
      default: null
    }
  },
  emits: [
    'save',
    'cancel'
  ],
  data () {
    return {
      editingTask: this.task
    }
  },
  watch: {
    task (newTask) {
      this.editingTask = newTask
    },
    fixedProject: {
      immediate: true,
      handler (newFixedProject) {
        if (newFixedProject) {
          this.editingTask.project_id = newFixedProject
        }
      }
    },
  },
  computed: {
    taskTitle () {
      if (!this.editingTask) {
        return ''
      }
      return this.operationType == 'insert' ? 'New Task' : 'Task #' + this.editingTask.id
    }
  },
  methods: {
    save () {
      this.$emit('save', this.editingTask)
    },
    cancel () {
      this.$emit('cancel', this.editingTask)
    },
  }
}
</script>

<style scoped>
.total_hours {
  width: 26rem;
}
.checkCompleted {
  min-height: 2.375rem;
}
</style>
