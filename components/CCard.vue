<template>
  <div class="shadow px-3 rounded-xl">
    <div class="border-b border-gray-400 pb-2 mx-3">
      <slot name="header"></slot>
    </div>

    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'CCard'
};
</script>
