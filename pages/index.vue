<template>
  <div class="justify-center w-11/12 md:w-9/12 lg:w-7/12 mx-auto py-36">
    <CSection>
      <template #title>
        <h2>
          {{ $__('Select Dropdown') }}
        </h2>
      </template>

      <div class="flex flex-wrap justify-between">
        <CDropDown
          :items="dropdownItems"
          class="w-full"
          @select="addItem"
          @deselect="removeItem"
        />
      </div>
    </CSection>

    <CSection v-if="categories.length">
      <template #title>
        <h2>
          {{ $__('Select Categories') }}
        </h2>
      </template>

      <div class="flex flex-wrap">
        <div
          v-for="cat in categories"
          :key="cat.id"
          class="w-full md:w-1/2 lg:w-1/3 px-2 mb-5"
        >
          <CCategory
            :items="cat.items"
            :title="{ title: cat.title, id: cat.id, value: cat.value }"
            class="w-full inline-block"
            @itemChecked="addItem"
            @itemUnChecked="removeItem"
            @destroy="removeCategory"
          />
        </div>
      </div>
    </CSection>

    <CSection>
      <template #title>
        <h2>
          {{ $__('Result') }}
        </h2>
      </template>

      <div class="flex flex-wrap">
        <CChip
          v-for="item in $store.state.result.results"
          :id="item.id"
          :key="`${item.title}-${item.id}`"
          class="mx-2 mb-2"
          :title="item.title"
          :shadow="true"
          :type="item.type"
          @click.native="removeItem(item)"
        />
      </div>
    </CSection>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  async asyncData({ app: { $DropdownService, $CategoryService } }) {
    const [dropdownItems, categories] = await Promise.all([
      $DropdownService.fetch(),
      $CategoryService.fetch(),
    ])

    return {
      dropdownItems,
      categories,
    }
  },
  data() {
    return {
      dropdownItems: [],
      categories: [],
      chipsTypes: [],
    }
  },
  methods: {
    removeCategory(id) {
      const category = this.categories.find((cat) => id === cat.id)

      category.items.forEach(this.removeItem)

      this.categories = this.categories.filter((category) => category.id !== id)
    },
    addItem(item) {
      item.type = this.generateType()

      this.$store.commit('result/addItem', item)
    },
    removeItem(item) {
      this.$store.commit('result/removeItem', item)
    },
    findCategory(categoryId) {
      return this.categories.find((category) => category.id === categoryId)
    },
    generateType() {
      const types = ['primary', 'secondary', 'tertiary', 'flame']

      const randomNumber = this.$UtilService.generateRandomNumber(types.length)

      return types[randomNumber]
    },
  },
}
</script>
