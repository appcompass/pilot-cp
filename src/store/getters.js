export const getDisks = state => {
  return state.disks.instances.collection.data
}

export const modal = state => state.modal

export const modalVisible = state => state.modal.visible
