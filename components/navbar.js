const { ref, onMounted, onUnmounted } = Vue;
const { useRouter } = VueRouter;
export default {
  setup() {
    const route = useRouter().currentRoute.value.path;
    const menuOpen = ref(false);
    const isScrolled = ref(false);

    const toggleMenu = () => {
      menuOpen.value = !menuOpen.value;
    };

    const handleScroll = () => {
      isScrolled.value = window.scrollY > 75;
    };

    onMounted(() => {
      window.addEventListener("scroll", handleScroll);
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll);
    });

    return { route, menuOpen, toggleMenu, isScrolled };
  },
  template: `<nav :class="{ 'scrolled': isScrolled }">
        <router-link to="/">
          <img v-if="!isScrolled" src="../assets/logo.svg" alt="logo" height="45" width="110" />
          <img v-else src="../assets/logo-black.svg" alt="logo" height="45" width="110" />
        </router-link>
        <div class="btn-toggle" @click="toggleMenu">
         <img v-if="!menuOpen" src="../assets/menu.svg" alt="menu"  />
         <img v-else src="../assets/cross.svg" alt="cross"  />
        </div>
        <ul :class="{ 'nav-links': true, 'open': menuOpen }">
          <li @click="menuOpen = false"><router-link :class="{ active: route === '/' }" to="/"><span>Home</span></router-link></li>
          <li @click="menuOpen = false"><router-link :class="{ active: route === '/task' }" to="/task"><span>Task</span></router-link></li>
          <li @click="menuOpen = false"><router-link :class="{ active: route === '/task/form' }" to="/task/form?type=create"><span>Create</span></router-link></li>
        </ul>
    </nav>`
};
