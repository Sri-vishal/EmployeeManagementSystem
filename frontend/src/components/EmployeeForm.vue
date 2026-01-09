<template>
  <b-form @submit.prevent="handleSubmit" novalidate>
    <!-- Personal Details -->
    <b-card class="mb-4 shadow-sm border-0">
      <template #header>
        <div class="fw-semibold text-primary">
          👤 Personal Details
        </div>
      </template>

      <b-row class="g-3">
        <b-col md="6">
          <b-form-group
            label="Full Name *"
            label-class="fw-bold text-uppercase text-secondary small"
          >
            <b-form-input
              v-model="form.full_name"
              placeholder = "Enter Name"
              class="form-control-lg"
              @input="clearError"
            />
          </b-form-group>
        </b-col>

        <b-col md="6">
          <b-form-group
            label="Email *"
            label-class="fw-bold text-uppercase text-secondary small"
          >
            <b-form-input
              v-model.trim="form.email"
              placeholder="Enter email address"
              class="form-control-lg"
              @input="error = ''"
            />
          </b-form-group>
        </b-col>

        <b-col md="6">
          <b-form-group
            label="Phone Number *"
            label-class="fw-bold text-uppercase text-secondary small"
          >
            <b-form-input
              v-model="form.phone"
              placeholder = "Enter Mobile Number"
              class="form-control-lg"
              @input="clearError"
            />
          </b-form-group>
        </b-col>
      </b-row>
    </b-card>

    <!-- Job Details -->
    <b-card class="mb-4 shadow-sm border-0">
      <template #header>
        <div class="fw-semibold text-primary">
          💼 Job Details
        </div>
      </template>

      <b-row class="g-3">
        <b-col md="6">
          <b-form-group
            label="Position *"
            label-class="fw-bold text-uppercase text-secondary small"
          >
            <b-form-input
              v-model="form.position"
              placeholder = "Enter Position"
              class="form-control-lg"
              @input="clearError"
            />
          </b-form-group>
        </b-col>

        <b-col md="6">
          <b-form-group
            label="Department *"
            label-class="fw-bold text-uppercase text-secondary small"
          >
            <b-form-input
              v-model="form.department"
              placeholder = "Enter Department"
              class="form-control-lg"
              @input="clearError"
            />
          </b-form-group>
        </b-col>

        <b-col md="6">
          <b-form-group
            label="Organization *"
            label-class="fw-bold text-uppercase text-secondary small"
          >
            <b-form-select
              v-model="form.organization_id"
              :options="organizationOptions"
              class="form-select-lg"
              @change="clearError"
            />
          </b-form-group>
        </b-col>

        <b-col md="6">
          <b-form-group
            label="Joining Date *"
            label-class="fw-bold text-uppercase text-secondary small"
          >
            <b-form-input
              type="date"
              v-model="form.joining_date"
              class="form-control-lg"
              @change="clearError"
            />
          </b-form-group>
        </b-col>
      </b-row>
    </b-card>

    <!-- Additional Info -->
    <b-card class="mb-4 shadow-sm border-0">
      <template #header>
        <div class="fw-semibold text-primary">
          📄 Additional Information
        </div>
      </template>

      <b-row class="g-3">
        <b-col md="6">
          <b-form-group
            label="Salary"
            label-class="fw-bold text-uppercase text-secondary small"
          >
            <b-form-input
              type="number"
              v-model="form.salary"
              placeholder="Enter Salary"
              class="form-control-lg"
              @input="clearError"
            />
          </b-form-group>
        </b-col>

        <b-col md="6">
          <b-form-group
            label="Status *"
            label-class="fw-bold text-uppercase text-secondary small"
          >
            <b-form-select
              v-model="form.status"
              :options="['Active','Inactive']"
              class="form-select-lg"
            />
          </b-form-group>
        </b-col>
      </b-row>
    </b-card>

    <!-- Error Message -->
    <b-alert
      variant="danger"
      show
      v-if="error"
      class="mt-3 fw-semibold"
    >
      ⚠️ {{ error }}
    </b-alert>

    <!-- Actions -->
    <div class="d-flex justify-content-end gap-3 mt-4">
      <b-button
        type="submit"
        variant="primary"
        size="lg"
        class="fw-bold"
      >
        💾 Save Employee
      </b-button>

      <b-button
        type="button"
        variant="outline-secondary"
        size="lg"
        class="fw-semibold"
        @click="goBack"
      >
        ⬅ Back
      </b-button>
    </div>
  </b-form>
</template>


<script>
import { getOrganizations } from '../services/organization.service';

export default {
  name: 'EmployeeForm',

  props: {
    employee: { type: Object, default: () => ({}) }
  },

  data() {
    return {
      form: {
        full_name: '',
        email: '',
        phone: '',
        position: '',
        department: '',
        organization_id: '',
        joining_date: '',
        salary: '',
        status: 'Active'
      },
      organizationOptions: [],
      error: ''
    };
  },

  async created() {
    const res = await getOrganizations();
    this.organizationOptions = [
      { value: '', text: 'Select Organization' },
      ...res.data.map(o => ({ value: o.id, text: o.name }))
    ];
    Object.assign(this.form, this.employee);
  },

  methods: {
    clearError() {
      this.error = '';
    },

    handleSubmit() {
      if (!this.form.full_name || this.form.full_name.length < 2) {
        this.error = 'Name must have at least 2 characters';
        return;
      }
      if (!/^[A-Za-z ]+$/.test(this.form.full_name)) {
        this.error = 'Name should contain only letters and spaces';
        return;
      }
      if (!this.form.email) {
        this.error = 'Email is required';
        return;
      }
      // Email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.form.email)) {
        this.error = 'Invalid email format';
        return;
      }
      if (!/^\d{10}$/.test(this.form.phone)) {
        this.error = 'Phone number must be 10 digits';
        return;
      }
      if (!this.form.position || !this.form.department) {
        this.error = 'Position and Department are required';
        return;
      }
      if (!this.form.organization_id) {
        this.error = 'Organization must be selected';
        return;
      }
      if (!this.form.joining_date) {
        this.error = 'Joining date is required';
        return;
      }
      if (this.form.salary && this.form.salary <= 0) {
        this.error = 'Salary must be greater than 0';
        return;
      }

      this.error = '';
      this.$emit('submit', this.form);
    },

    goBack() {
    this.$router.push('/employees');
  }
  }
};
</script>
