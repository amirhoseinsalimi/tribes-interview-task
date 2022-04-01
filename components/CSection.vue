<template>
  <div style="border: 1px solid red;" class="w-full">
    <div class="font-bold text-xl py-4">
      <slot name="title"></slot>
    </div>

    <div class="px-4">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CSection'
};
</script>
