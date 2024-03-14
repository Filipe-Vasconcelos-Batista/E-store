<script setup lang="ts">
import { ref } from 'vue';
import Sidebar from './components/sideBar.vue';
import navbar from './components/navBar.vue';
import footerComponent from './components/footerBar.vue';

const expand = ref(false);

const handleExpand = (value: boolean) => {
  expand.value = value;
};
</script>

<template>
  <div class="app">
    <navbar class="nav" />
    <Sidebar
      class="sidebar"
      :class="{ expanded: expand, collapsed: !expand }"
      @expand="handleExpand"
    />
    <main :class="{ expanded: expand, collapsed: !expand }">
      <RouterView />
    </main>
    <div class="footer" :class="{ expanded: expand, collapsed: !expand }">
      <footerComponent />
    </div>
  </div>
</template>

<style scoped>
.footer {
  margin-top: 5px;
}
@media (min-width: 1024px) {
  .nav {
    display: none;
  }

  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    transition: width 0.3s ease;
    z-index: 0;
  }
  .footer {
    transition: margin-left 0.3s ease;
  }
  .footer.expanded {
    margin-left: 240px;
  }
  .footer.collapsed {
    margin-left: 100px;
  }
  main {
    transition: margin-left 0.3s ease;
    height: 100%;
  }
  .sidebar.expanded {
    width: 240px;
  }

  .sidebar.collapsed {
    width: 100px;
  }
  main.expanded {
    margin-left: 240px;
  }
  main.collapsed {
    margin-left: 100px;
  }
}
@media (max-width: 1024px) {
  .nav {
    position: fixed;
    top: 0;
    left: 0;
    height: 40px;
    width: 100vw;
    z-index: 1;
  }
  .sidebar {
    display: none;
  }
  main {
    margin-top: 40px;
    margin-left: 10px;
  }
}
</style>
