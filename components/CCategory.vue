<template>
  <div v-if="items.length">
    <CCard class="py-6">
      <template #header>
        <CCheckbox
          :id="title.id"
          v-model="allSelected"
          :label="title.title"
          @checked="destroy"
          @unchecked="unCheckAllItems"
        />
      </template>

      <template #default>
        <ul class="list-none pt-4 pl-8">
          <li v-for="item in items" :key="item.id">
            <CCheckbox
              :id="item.id"
              v-model="item.value"
              :label="item.title"
              @checked="$emit('itemChecked', item)"
              @unchecked="$emit('itemUnChecked', item)"
            />
          </li>
        </ul>
      </template>
    </CCard>
  </div>
</template>

<script>
export default {
  name: 'CCategory',
  props: {
    title: {
      type: Object,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      allSelected: this.title.value,
    }
  },
  methods: {
    destroy() {
      this.checkAllItems()

      this.$emit('destroy', this.title.id)
    },
    checkAllItems() {
      this.items.forEach((item) => (item.value = true))
    },
    unCheckAllItems() {
      this.items.forEach((item) => (item.value = false))
    },
  },
}
</script>
