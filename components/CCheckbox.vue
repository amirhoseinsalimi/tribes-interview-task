<template>
  <label class="inline-flex flex-row align-middle">
    <input
      v-model="value"
      type="checkbox"
      class="h-5 w-5 mr-3 p-2 text-sm"
      @change="$emit('change', { label, id, value })"
    />
    <span>
      {{ label }}
    </span>
  </label>
</template>

<script>
export default {
  name: 'CCheckbox',
  props: {
    initialValue: {
      type: Boolean,
      required: false,
      default: false,
    },
    label: {
      type: String,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      value: this.initialValue,
    }
  },
}
</script>
