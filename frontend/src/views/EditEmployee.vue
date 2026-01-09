<template>
  <div>
    <EmployeeForm
      :employee="employee"
      @submit="updateEmployee"
    />

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
import axios from 'axios';

export default {
  name: 'EditEmployeeView',

  components: { EmployeeForm },

  data() {
    return {
      employee: {},
      errorMessage: ''
    };
  },

  async created() {
    const id = this.$route.params.id;

    try {
      const res = await axios.get('http://localhost:5000/api/employees');
      const emp = res.data.find(e => e.id == id);

      if (emp) {
        this.employee = {
          ...emp,
          joining_date: emp.joining_date
            ? emp.joining_date.split('T')[0]
            : ''
        };
      }
    } catch (err) {
      this.errorMessage = 'Failed to load employee details';
    }
  },

  methods: {
    async updateEmployee(data) {
      const id = this.$route.params.id;
      const payload = { ...data };

      delete payload.organization;

      this.errorMessage = '';

      try {
        await axios.put(
          `http://localhost:5000/api/employees/${id}`,
          payload
        );

        // ✅ Redirect immediately with success message
        this.$router.push({
          path: '/employees',
          query: { success: 'Employee updated successfully' }
        });
      } catch (err) {
        this.errorMessage =
          err.response?.data?.message || 'Failed to update employee';
      }
    }
  }
};
</script>
