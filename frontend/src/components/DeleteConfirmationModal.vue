<template>
  <b-modal
    visible
    title="Confirm Delete"
    hide-footer
    @hidden="handleClose"
  >
    <p>Are you sure you want to delete this employee?</p>

    <div class="text-right">
      <b-button variant="secondary" @click="cancel">
        Cancel
      </b-button>

      <b-button variant="danger" class="ml-2" @click="confirm">
        Yes
      </b-button>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: 'DeleteConfirmationModal',

  methods: {
    confirm() {
      this.$emit('confirm');
    },

    cancel() {
      this.$emit('cancel');
    },

    handleClose() {
      this.$emit('cancel');
    }
  }
};
</script>
