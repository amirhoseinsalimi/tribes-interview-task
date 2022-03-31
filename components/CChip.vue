<template>
  <div class="inline-block rounded-3xl px-5 py-2" :class="`text-${type} ${backgroundColor}`">
    {{ title }}
  </div>
</template>

<script>
export default {
  name: 'CChip',
  props: {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: false,
      default: 'primary',
      validator(value) {
        return ['primary', 'secondary', 'tertiary', 'flame'].includes(value)
      },
    },
  },
  computed: {
    backgroundColor() {
      if (this.type === 'primary') {
        return 'bg-blue-200'
      } else if (this.type === 'secondary') {
        return 'bg-gray-300'
      } else {
        return 'bg-red-200'
      }
    }
  }
}
</script>
