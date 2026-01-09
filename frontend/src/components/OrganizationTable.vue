<template>
  <div>
    <!-- Organization Table -->
    <b-card class="shadow-sm border-0">
      <template #header>
        <div class="fw-semibold text-primary">
          📊 Organization Details
        </div>
      </template>

      <b-table
        striped
        hover
        bordered
        small
        responsive
        head-variant="light"
        table-class="align-middle"
        :items="pagedOrganizations"
        :fields="fields"
        empty-text="No organizations found"
      />
    </b-card>

    <!-- Pagination -->
    <b-pagination
      v-model="currentPage"
      :total-rows="organizations.length"
      :per-page="perPage"
      align="center"
      pills
      class="mt-4"
    />
  </div>
</template>

<script>
export default {
  name: 'OrganizationTable',

  props: {
    organizations: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      currentPage: 1,
      perPage: 5,
      fields: [
        { key: 'name', label: 'Name' },
        { key: 'industry', label: 'Industry' },
        { key: 'description', label: 'Description' },
        { key: 'created_at', label: 'Created Date' }
      ]
    };
  },

  computed: {
    pagedOrganizations() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;

      return this.organizations.slice(start, end).map(org => ({
        ...org,
        created_at: new Date(org.created_at).toLocaleDateString()
      }));
    }
  }
};
</script>
