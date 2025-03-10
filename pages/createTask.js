export default {
  data() {
    return {
      task: {
        title: "",
        description: "",
        status: "Pending",
        date: new Date().toISOString().slice(0, 10)
      },
      loading: false,
      loadingSubmit: false,
      statuses: ["Pending", "In Progress", "Completed"],
      type: this.$route.query.type || "",
      id: +this.$route.query.id || ""
    };
  },
  created() {
    if (this.$route.query.type === "edit") {
      this.loading = true;
      this.task.title = `Task ${this.$route.query.id}`;
      this.task.description = `Description for task ${this.$route.query.id}`;
      setTimeout(() => {
        this.loading = false;
      }, 800);
    }
  },
  methods: {
    submitTask() {
      this.loadingSubmit = true;
      setTimeout(() => {
        this.loadingSubmit = false;
        this.$router.push("/task");
      }, 2000);
    }
  },
  template: `
    <main class="task-form">
    <div v-if="loading" class="loading"/>
      <section v-else>
        <header>
          <h1>{{ type }} Task</h1>
        </header>
        <form @submit.prevent="submitTask">
          <div class="form-group">
            <label>Title</label>
            <input v-model="task.title" type="text" placeholder="Enter task title" required />
          </div>
          <div class="form-group">
            <label>Description</label>
            <textarea v-model="task.description" placeholder="Enter task description" required></textarea>
          </div>
          <div class="form-group">
            <label>Status</label>
            <select v-model="task.status">
              <option v-for="status in statuses" :key="status" :value="status">{{ status }}</option>
            </select>
          </div>
          <div class="form-group">
            <label>Date</label>
            <input v-model="task.date" type="date" required />
          </div>
          <button type="submit" class="btn btn-secondary btn-with-loading" :disabled="loading">
            <div class="loading loading-btn" v-if="loadingSubmit"/>
            <span>{{ loadingSubmit ? "Saving" :(type === "edit" ? "Update" : "Create") }}</span>
          </button>
        </form>
      </section>
    </main>
  `
};
