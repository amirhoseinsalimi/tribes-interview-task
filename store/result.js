export const state = () => ({
  results: [],
})

export const mutations = {
  addItem(state, item) {
    state.results.push(item)
  },
  removeItem(state, item) {
    const foundId = state.results.findIndex(
      (result) => result.id === item.id && result.title === item.title
    )

    if (foundId === -1) {
      return
    }

    state.results.splice(foundId, 1)
  },
}
