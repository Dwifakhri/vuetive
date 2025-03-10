export default {
  data() {
    return {
      showDropdown: null,
      loading: true,
      loadingSubmit: false,
      showModal: false,
      selectedTask: null,
      tasks: [
        {
          id: 1,
          title: "Task 1",
          status: "In Progress",
          date: "10/10/2022",
          description: "Complete the dashboard UI."
        },
        {
          id: 2,
          title: "Task 2",
          status: "Completed",
          date: "12/10/2022",
          description: "Fix bugs in authentication flow."
        },
        {
          id: 3,
          title: "Task 3",
          status: "Pending",
          date: "15/10/2022",
          description: "Write unit tests for API endpoints."
        },
        {
          id: 4,
          title: "Task 4",
          status: "In Progress",
          date: "18/10/2022",
          description: "Implement real-time notifications."
        },
        {
          id: 5,
          title: "Task 5",
          status: "Completed",
          date: "20/10/2022",
          description: "Optimize database queries."
        },
        {
          id: 6,
          title: "Task 6",
          status: "Pending",
          date: "25/10/2022",
          description: "Update project documentation."
        },
        {
          id: 7,
          title: "Task 7",
          status: "In Progress",
          date: "28/10/2022",
          description: "Refactor frontend components."
        },
        {
          id: 8,
          title: "Task 8",
          status: "Pending",
          date: "30/10/2022",
          description: "Research and integrate a payment gateway."
        },
        {
          id: 9,
          title: "Task 9",
          status: "Completed",
          date: "01/11/2022",
          description: "Deploy the app to production."
        },
        {
          id: 10,
          title: "Task 10",
          status: "In Progress",
          date: "05/11/2022",
          description: "Set up automated backups."
        }
      ]
    };
  },
  created() {
    setTimeout(() => {
      this.loading = false;
    }, 800);

    document.addEventListener("click", this.closeDropdown);
  },

  beforeDestroy() {
    document.removeEventListener("click", this.closeDropdown);
  },
  methods: {
    toggleDropdown(index) {
      this.showDropdown = this.showDropdown === index ? null : index;
    },
    openModal(i) {
      this.showModal = true;
      this.selectedTask = this.tasks[i];
    },
    deleteTask() {
      this.showModal = false;
      this.loadingSubmit = true;

      setTimeout(() => {
        this.loadingSubmit = false;
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
        }, 800);
      }, 800);
    },
    closeDropdown(event) {
      if (
        this.$refs.dropdown &&
        !this.$refs.dropdown.some((el) => el.contains(event.target)) &&
        this.$refs.dropdownContainer &&
        !this.$refs.dropdownContainer.some((el) => el.contains(event.target))
      ) {
        this.showDropdown = null;
      }
    }
  },
  template: `<main class="task">
      <div v-if="loading" class="loading"/>
      <section v-else id="task-list">
        <header>
          <h1>Task List</h1>
          <div class="top">
            <h4>All Task List</h4>
            <router-link to="/task/form?type=create">
            <button class="btn btn-secondary">Create Task</button>
            </router-link>
          </div>
        </header>
        <div class="task-row">
          <div 
            v-for="(task, index) in tasks" 
            :key="task.id" 
            class="card" 
          >
            <div class="card-header">
              <div class="card-title">
                <h3>{{ task.title }}</h3>
                <p class="badge" :class="{
                  'badge-warning': task.status === 'In Progress',
                  'badge-success': task.status === 'Completed',
                  'badge-danger': task.status === 'Pending'
                }">{{ task.status }}</p>
              </div>
              <div class="dropdown-container" ref="dropdownContainer">
                <img
                  ref="dropdown"
                  class="pointer"
                  src="../assets/three-dot.svg"
                  alt="three-dot"
                  height="25"
                  @click.stop="toggleDropdown(index)"
                />
                <ul v-if="showDropdown === index" class="dropdown-menu">
                  <li @click.stop="$router.push('/task/form?type=edit&id=' + task.id)">Edit</li>
                  <li id="delete" @click.stop="openModal(index)">Delete</li>
                </ul>
              </div>
            </div>
            <div class="card-body">
              <p class="text-gray">
                {{ task.description }}
              </p>
            </div>
            <div class="card-footer">
              <p class="text-gray-100">{{ task.date }}</p>
            </div>
          </div>
        </div>
      </section>
      <div class="modal-overlay" v-if="showModal">
        <div class="modal">
          <h5>Confirm Deletion</h5>
          <p>Are you sure you want to delete this task ({{ selectedTask.title }})?</p>
          <div class="modal-actions">
            <button class="btn btn-link-black" @click="showModal = false">Cancel</button>
            <button class="btn btn-danger" @click="deleteTask">Delete</button>
          </div>
        </div>
      </div>
    </main>
    `
};
