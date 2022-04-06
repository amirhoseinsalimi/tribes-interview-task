<template>
  <div class="space-y-1">
    <label class="block text-sm leading-5 font-medium text-gray-700"> </label>

    <div v-click-outside="closeDropdown" class="relative z-20">
      <span class="inline-block w-full rounded-md shadow-sm">
        <button
          type="button"
          class="cursor-pointer relative w-full rounded-md border border-gray-300 bg-white pl-3 pr-10 py-2 text-left focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
          @click="openDropdown"
        >
          <template v-if="!selectedItemsComputed.length">
            <span class="flex items-center space-x-3 text-gray-400">
              {{ $__('No Item Selected') }}
            </span>
          </template>

          <span v-else class="flex items-center space-x-3 wrap">
            <span>
              <CChip
                v-for="item in selectedItemsComputed"
                :id="item.id"
                :key="`${item.id}-${item.title}`"
                class="block truncate text-sm mr-1"
                :title="item.title"
              />
            </span>
          </span>
          <span
            class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
          >
            <svg
              class="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
        </button>
      </span>

      <div
        v-show="isOpen"
        class="absolute mt-1 w-full rounded-md bg-white shadow-lg"
      >
        <ul
          tabindex="-1"
          role="listbox"
          aria-labelledby="listbox-label"
          class="max-h-56 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5"
        >
          <li
            v-for="item in itemsComputed"
            id="listbox-item-0"
            :key="item.id"
            tabindex="0"
            :class="isSelected(item) && 'line-through text-gray-400'"
            role="option"
            class="cursor-default select-none relative py-2 pl-3 pr-9 cursor-pointer hover:text-white hover:bg-indigo-600 focus:outline-none focus:text-white focus:bg-indigo-600"
            @click="toggleSelect(item)"
          >
            <div class="flex items-center space-x-3">
              <span class="block">
                {{ item.title }} {{ item.computedValue }}
              </span>
            </div>

            <span
              v-show="isSelected(item)"
              class="absolute inset-y-0 right-0 flex items-center pr-4"
            >
              <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside'

export default {
  name: 'CDropDown',
  directives: {
    ClickOutside,
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isOpen: false,
      selectedItems: [],
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
    selectedItemsComputed() {
      return this.itemsComputed.filter((item) => item.computedValue)
    },
  },
  methods: {
    isSelected(item) {
      return item.computedValue
    },
    doesItemExistInStore(item) {
      const foundId = this.$store.state.result.results.findIndex(
        (result) => result.id === item.id && result.title === item.title
      )

      return foundId !== -1
    },
    closeDropdown() {
      this.isOpen = false
    },
    openDropdown() {
      this.isOpen = true
    },
    addItem(item) {
      this.selectedItems.push(item)
    },
    removeItem(item) {
      const foundId = this.selectedItems.findIndex(
        (i) => i.id === item.id && i.title === item.title
      )

      if (foundId === -1) {
        return
      }

      this.selectedItems.splice(foundId, 1)
    },
    toggleSelect(item) {
      if (this.isSelected(item)) {
        this.$emit('deselect', item)
        this.removeItem({ ...item, computedValue: false })
      } else {
        this.$emit('select', item)
        this.addItem({
          ...item,
          computedValue: this.doesItemExistInStore(item),
        })
      }
    },
  },
}
</script>
