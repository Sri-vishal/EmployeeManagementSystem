<template>
  <div>
    <!-- Navbar -->
    <b-navbar
      type="dark"
      variant="dark"
      fixed="top"
      class="shadow-sm px-3 bg-black"
    >
      <!-- Brand -->
      <b-navbar-brand
        to="/organizations"
        class="fw-bold text-white"
      >
        🏢 EMS
      </b-navbar-brand>

      <!-- Navigation -->
      <b-navbar-nav class="ms-3">
        <b-nav-item
          to="/organizations"
          exact
          class="text-white"
          active-class="active-nav"
        >
          Organizations
        </b-nav-item>

        <b-nav-item
          to="/employees"
          exact
          class="text-white"
          active-class="active-nav"
        >
          Employees
        </b-nav-item>

        <b-nav-item
          to="/employees/deleted"
          class="text-white"
          active-class="active-nav"
        >
          Deleted
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>

    <!-- Page Content -->
    <b-container fluid="md" class="pt-5 mt-4">
      <router-view />
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style scoped>
.bg-black {
  background-color: #000 !important;
}

.active-nav {
  font-weight: 600;
  border-bottom: 2px solid #fff;
}
</style>
