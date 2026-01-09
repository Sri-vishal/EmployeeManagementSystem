<template>
  <div>
    <b-table
      striped
      hover
      small
      :items="pagedEmployees"
      :fields="computedFields"
    >
      <!-- Actions column (only if enabled) -->
<template v-if="showActions" #cell(actions)="row">
  <div class="d-flex align-items-center justify-content-center gap-2">
    <b-button
      size="sm"
      variant="outline-warning"
      class="fw-semibold"
      @click="$emit('edit', row.item.id)"
    >
      ✏️ Edit
    </b-button>

    <b-button
      size="sm"
      variant="outline-danger"
      class="fw-semibold"
      @click="$emit('delete', row.item.id)"
    >
      🗑 Delete
    </b-button>
  </div>
</template>

    </b-table>

    <!-- Pagination -->
    <b-pagination
      v-model="currentPage"
      :total-rows="employees.length"
      :per-page="perPage"
      align="center"
      class="mt-3"
    />
  </div>
</template>

<script>
export default {
  name: 'EmployeeTable',

  props: {
    employees: {
      type: Array,
      required: true
    },
    perPage: {
      type: Number,
      default: 10
    },
    showActions: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      currentPage: 1
    };
  },

  computed: {
    computedFields() {
      const baseFields = [
        { key: 'full_name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'position', label: 'Position' },
        { key: 'department', label: 'Department' },
        { key: 'organization', label: 'Organization' }
      ];

      if (this.showActions) {
        baseFields.push({ key: 'actions', label: 'Actions' });
      }

      return baseFields;
    },

    pagedEmployees() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.employees.slice(start, end);
    }
  }
};
</script>
