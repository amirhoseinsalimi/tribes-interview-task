<template>
  <div v-if="items.length">
    <CCard class="py-6">
      <template #header>
        <CCheckbox
          :id="title.id"
          v-model="allSelected"
          :label="title.title"
          @checked="destroy"
        />
      </template>

      <template #default>
        <ul class="list-none pt-4 pl-8">
          <li v-for="item in itemsComputed" :key="item.id">
            <CCheckbox
              :id="item.id"
              v-model="item.computedValue"
              :label="item.title"
              @checked="onItemChecked(item)"
              @unchecked="onItemUnchecked(item)"
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
  computed: {
    itemsComputed() {
      return this.items.map((item) =>
        this.$UtilService.addField(
          item,
          'computedValue',
          this.doesItemExistInStore(item)
        )
      )
    },
  },
  methods: {
    destroy() {
      this.checkAllItems()

      this.$emit('destroy', this.title.id)
    },
    checkAllItems() {
      this.items.forEach((item) => (item.computedValue = true))
    },
    isChecked(item) {
      return item.computedValue
    },
    doesItemExistInStore(item) {
      const foundId = this.$store.state.result.results.findIndex(
        (result) => result.id === item.id && result.title === item.title
      )

      return foundId !== -1
    },
    onItemChecked(item) {
      this.$emit('itemChecked', item)

      this.allSelected = this.items.every(this.isChecked)

      this.allSelected && this.destroy()
    },
    onItemUnchecked(item) {
      this.$emit('itemUnChecked', item)
    },
  },
}
</script>
