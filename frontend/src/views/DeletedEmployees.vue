<template>
  <b-container fluid="md" class="py-4 bg-light min-vh-100">
    <!-- Header -->
    <b-row class="mb-4">
      <b-col>
        <h3 class="fw-bold text-danger mb-1">
          🗑 Deleted Employees
        </h3>
        <p class="text-muted mb-0">
          Archived employees (read-only view)
        </p>
      </b-col>
    </b-row>

    <!-- Info Banner -->
    <b-alert
      variant="warning"
      show
      class="mb-4 fw-semibold"
    >
      ⚠️ These employees are archived and cannot be edited or deleted.
    </b-alert>

    <!-- Table -->
    <b-card class="shadow-sm border-0">
      <EmployeeTable
        :employees="employees"
        :perPage="10"
        :showActions="false"
      />
    </b-card>
  </b-container>
</template>


<script>
import EmployeeTable from '../components/EmployeeTable.vue';
import { getDeletedEmployees } from '../services/employee.service';

export default {
  name: 'DeletedEmployeesView',

  components: { EmployeeTable },

  data() {
    return {
      employees: []
    };
  },

  async created() {
    const res = await getDeletedEmployees();
    this.employees = res.data;
  }
};
</script>
