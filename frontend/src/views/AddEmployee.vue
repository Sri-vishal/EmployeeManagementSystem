<template>
  <div>
    <EmployeeForm @submit="saveEmployee" />

    <!-- Error message only -->
    <b-alert
      variant="danger"
      show
      v-if="errorMessage"
      class="mt-3"
    >
      {{ errorMessage }}
    </b-alert>
  </div>
</template>

<script>
import EmployeeForm from '../components/EmployeeForm.vue';
import { createEmployee } from '../services/employee.service';

export default {
  name: 'AddEmployeeView',

  components: { EmployeeForm },

  data() {
    return {
      errorMessage: ''
    };
  },

  methods: {
    async saveEmployee(data) {
      this.errorMessage = '';

      try {
        await createEmployee(data);

        // ✅ Redirect immediately with success message
        this.$router.push({
          path: '/employees',
          query: { success: 'Employee added successfully' }
        });
      } catch (err) {
        this.errorMessage =
          err.response?.data?.message || 'Failed to add employee';
      }
    }
  }
};
</script>
