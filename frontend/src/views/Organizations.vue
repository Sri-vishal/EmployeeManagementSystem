<template>
  <b-container fluid="md" class="py-4">
    <!-- Page Header -->
    <b-row class="mb-4">
      <b-col>
        <h3 class="fw-bold mb-1">Organizations</h3>
        <p class="text-muted mb-0">
          Add and view all registered organizations
        </p>
      </b-col>
    </b-row>

    <!-- Organization Form -->
    <b-card class="mb-4 shadow-sm">
      <template #header>
        <strong>Add Organization</strong>
      </template>

      <OrganizationForm @submit="createOrganization" />
    </b-card>

    <!-- Loading Spinner -->
    <div v-if="loading" class="text-center my-5">
      <b-spinner
        label="Loading organizations..."
        variant="primary"
        class="mb-3"
      />
      <div class="text-muted">Loading organizations...</div>
    </div>

    <!-- Organization Table -->
    <b-card v-else class="shadow-sm">
      <template #header>
        <strong>Organization List</strong>
      </template>

      <OrganizationTable :organizations="organizations" />
    </b-card>
  </b-container>
</template>

<script>
import OrganizationForm from '../components/OrganizationForm.vue';
import OrganizationTable from '../components/OrganizationTable.vue';
import {
  getOrganizations,
  createOrganization
} from '../services/organization.service';

export default {
  name: 'OrganizationsView',

  components: {
    OrganizationForm,
    OrganizationTable
  },

  data() {
    return {
      organizations: [],
      loading: false
    };
  },

  async created() {
    this.loading = true;
    try {
      const res = await getOrganizations();
      this.organizations = res.data;
    } finally {
      this.loading = false;
    }
  },

  methods: {
    async createOrganization(data) {
      this.loading = true;
      try {
        await createOrganization(data);
        const res = await getOrganizations();
        this.organizations = res.data;
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>
