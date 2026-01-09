<template>
  <b-form @submit.prevent="handleSubmit" novalidate>
    <!-- Organization Name -->
    <b-form-group
      label="Organization Name *"
      label-class="fw-bold text-primary fs-6 text-uppercase"
    >
      <b-form-input
        v-model="form.name"
        placeholder="Enter organization name"
        class="form-control-lg"
        @input="clearNameError"
      />
      <small class="text-danger fw-semibold" v-if="errors.name">
        {{ errors.name }}
      </small>
    </b-form-group>

    <!-- Industry -->
    <b-form-group
      label="Industry"
      label-class="fw-bold text-primary fs-6 text-uppercase"
    >
      <b-form-input
        v-model="form.industry"
        placeholder="Enter industry type"
        class="form-control-lg"
      />
    </b-form-group>

    <!-- Description -->
    <b-form-group
      label="Description"
      label-class="fw-bold text-primary fs-6 text-uppercase"
    >
      <b-form-textarea
        v-model="form.description"
        placeholder="Describe about the organization"
        rows="3"
        class="form-control-lg"
      />
    </b-form-group>

    <!-- Success Message -->
    <b-alert
      variant="success"
      show
      v-if="successMessage"
      class="mt-4 text-center fw-semibold shadow-sm"
    >
      ✅ {{ successMessage }}
    </b-alert>

    <!-- Submit Button -->
    <div class="d-grid mt-4">
      <b-button
        type="submit"
        variant="primary"
        size="lg"
        class="fw-bold"
      >
        ➕ Add Organization
      </b-button>
    </div>
  </b-form>
</template>


<script>
export default {
  name: 'OrganizationForm',

  data() {
    return {
      form: {
        name: '',
        industry: '',
        description: ''
      },
      errors: {
        name: ''
      },
      successMessage: ''
    };
  },

  methods: {
    clearNameError() {
      if (this.errors.name) {
        this.errors.name = '';
      }
    },

    handleSubmit() {
      this.errors.name = '';
      this.successMessage = '';

      if (!this.form.name.trim()) {
        this.errors.name = 'Organization name required';
        return;
      }

      this.$emit('submit', this.form);

      this.successMessage = 'Organization successfully added';

      this.form = {
        name: '',
        industry: '',
        description: ''
      };

      setTimeout(() => {
        this.successMessage = '';
      }, 3000);
    }
  }
};
</script>
