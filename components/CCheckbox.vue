<template>
  <label class="inline-flex flex-row align-middle">
    <input
      v-model="initialValue"
      type="checkbox"
      class="h-4 w-4 mr-3 p-2 text-sm"
      @input="emitEvent"
    />
    <span class="leading-4">
      {{ label }}
    </span>
  </label>
</template>

<script>
export default {
  name: 'CCheckbox',
  props: {
    value: {
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
      initialValue: this.value,
    }
  },
  watch: {
    value(newValue) {
      this.initialValue = newValue
    },
  },
  methods: {
    emitEvent() {
      const value = !this.initialValue

      this.$emit('input', value)
      this.$emit('change', value)

      if (value) {
        this.$emit('checked', value)
      } else {
        this.$emit('unchecked', value)
      }
    },
  },
}
</script>
