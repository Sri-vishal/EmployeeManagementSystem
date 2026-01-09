<template>
  <b-card class="mb-4 shadow-sm border-0">
    <!-- Header -->
    <template #header>
      <div class="fw-semibold text-primary">
        🔍 Filter Employees
      </div>
    </template>

    <b-row class="g-3 align-items-end">
      <!-- Search -->
      <b-col md="3">
        <label class="fw-bold text-uppercase text-secondary small">
          Search
        </label>
        <b-form-input
          v-model="search"
          placeholder="Search employees"
          class="form-control-lg"
          @input="emitChange"
        />
      </b-col>

      <!-- Organization Filter -->
      <b-col md="3">
        <label class="fw-bold text-uppercase text-secondary small">
          Organization
        </label>
        <b-form-select
          v-model="organization"
          :options="organizationOptions"
          class="form-select-lg"
          @change="emitChange"
        />
      </b-col>

      <!-- Department Filter -->
      <b-col md="3">
        <label class="fw-bold text-uppercase text-secondary small">
          Department
        </label>
        <b-form-input
          v-model="department"
          placeholder="Department"
          class="form-control-lg"
          @input="emitChange"
        />
      </b-col>

      <!-- Status Filter -->
      <b-col md="2">
        <label class="fw-bold text-uppercase text-secondary small">
          Status
        </label>
        <b-form-select
          v-model="status"
          :options="statusOptions"
          class="form-select-lg"
          @change="emitChange"
        />
      </b-col>

      <!-- Reset -->
      <b-col md="1" class="text-end">
        <b-button
          variant="outline-secondary"
          size="lg"
          class="w-100 fw-semibold"
          @click="resetFilters"
        >
          Reset⟳
        </b-button>
      </b-col>
    </b-row>
  </b-card>
</template>


<script>
export default {
  name: 'EmployeeFilterSearch',

  props: {
    organizations: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      search: '',
      organization: '',
      department: '',
      status: ''
    };
  },

  computed: {
    organizationOptions() {
      return [
        { value: '', text: 'All Organizations' },
        ...this.organizations.map(org => ({
          value: org.name,
          text: org.name
        }))
      ];
    },

    statusOptions() {
      return [
        { value: '', text: 'All Status' },
        { value: 'Active', text: 'Active' },
        { value: 'Inactive', text: 'Inactive' }
      ];
    }
  },

  methods: {
    emitChange() {
      this.$emit('change', {
        search: this.search,
        organization: this.organization,
        department: this.department,
        status: this.status
      });
    },

    resetFilters() {
      this.search = '';
      this.organization = '';
      this.department = '';
      this.status = '';
      this.emitChange();
    }
  }
};
</script>
