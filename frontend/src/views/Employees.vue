<template>
  <b-container fluid="md" class="py-4 bg-light min-vh-100">
    <!-- Header -->
    <b-row class="align-items-center mb-4">
      <b-col>
        <h3 class="fw-bold text-primary mb-0">
          👥 Employees
        </h3>
        <small class="text-secondary">
          Manage employee records and details
        </small>
      </b-col>

      <b-col cols="auto">
        <b-button
          variant="primary"
          size="lg"
          class="fw-semibold shadow-sm"
          @click="$router.push('/employees/add')"
        >
          ➕ Add Employee
        </b-button>
      </b-col>
    </b-row>

    <!-- Search & Filter -->
    <b-card class="mb-3 shadow-sm border-0">
      <EmployeeFilterSearch
        :organizations="organizations"
        @change="onFilterChange"
      />
    </b-card>

    <!-- Success Message (Add / Edit / Delete) -->
    <b-alert
      variant="success"
      show
      v-if="successMessage"
      class="mt-3 fw-semibold text-center shadow-sm"
    >
      ✅ {{ successMessage }}
    </b-alert>

    <!-- Loading -->
    <div v-if="loading" class="text-center my-5">
      <b-spinner
        label="Loading employees..."
        variant="primary"
        class="mb-2"
      />
      <div class="text-muted">Loading employees...</div>
    </div>

    <!-- Employees Table -->
    <EmployeeTable
      v-else
      :employees="filteredEmployees"
      @edit="editEmployee"
      @delete="openDeleteModal"
    />

    <!-- Delete Confirmation -->
    <DeleteConfirmationModal
      v-if="showDeleteModal"
      @confirm="confirmDelete"
      @cancel="showDeleteModal = false"
    />
  </b-container>
</template>


<script>
import EmployeeTable from '../components/EmployeeTable.vue';
import EmployeeFilterSearch from '../components/EmployeeFilterSearch.vue';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal.vue';

import {
  getEmployees,
  deleteEmployee,
  applyEmployeeFilters
} from '../services/employee.service';

import { getOrganizations } from '../services/organization.service';

export default {
  name: 'EmployeesView',

  components: {
    EmployeeTable,
    EmployeeFilterSearch,
    DeleteConfirmationModal
  },

  data() {
    return {
      employees: [],
      organizations: [],
      loading: false,

      filters: {
        search: '',
        organization: '',
        department: '',
        status: ''
      },

      showDeleteModal: false,
      selectedEmployeeId: null,

      successMessage: ''
    };
  },

  computed: {
    filteredEmployees() {
      return applyEmployeeFilters(this.employees, this.filters);
    }
  },

  created() {
    this.fetchEmployees();
    this.fetchOrganizations();

    // ✅ Success from Add / Edit redirect
    if (this.$route.query.success) {
      this.showSuccess(this.$route.query.success);
    }
  },

  methods: {
    showSuccess(message) {
      this.successMessage = message;

      setTimeout(() => {
        this.successMessage = '';
      }, 3000);
    },

    async fetchEmployees() {
      this.loading = true;
      try {
        const res = await getEmployees();
        this.employees = res.data;
      } finally {
        this.loading = false;
      }
    },

    async fetchOrganizations() {
      const res = await getOrganizations();
      this.organizations = res.data;
    },

    onFilterChange(filters) {
      this.filters = filters;
    },

    editEmployee(id) {
      this.$router.push(`/employees/edit/${id}`);
    },

    openDeleteModal(id) {
      this.selectedEmployeeId = id;
      this.showDeleteModal = true;
    },

    async confirmDelete() {
      this.loading = true;
      try {
        await deleteEmployee(this.selectedEmployeeId);
        this.showDeleteModal = false;

        // ✅ Delete success handled locally
        this.showSuccess('Employee deleted successfully');

        await this.fetchEmployees();
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>
