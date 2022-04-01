<template>
  <div
    class="inline-block rounded-3xl py-2 relative"
    :class="`text-${type} ${backgroundColor}`"
  >
    <span
      class="absolute text-white rounded-full left-0 h-9 w-9 text-center top-0.5 leading-loose"
      :class="`bg-${type}`"
      >
      {{ id }}
    </span>

    <span class="pr-5 pl-12">{{ title }}</span>
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
    id: {
      type: Number,
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
    },
  },
}
</script>
