import api from '@/services/api/'

export const getBlockData = async ({dispatch, commit}, id) => {
  console.log('getBlockData id', id)
  try {
    const blockData = await api.getBlockById(id)
    commit('set', { key: 'lastFetchedBlockId', value: blockData.data.id })
    commit('set', { key: 'previousBlockId', value: blockData.data.previousBlockID })
    await dispatch('updateTransactionsList', blockData.data.payload )
  } catch (e) {
    console.error(e)
  }
}

export const updateLastBlockId = async ({ dispatch, commit }, id) => {
  commit('set', { key: 'lastBlockId', value: id })
  await dispatch('getBlockData', id)
}

export const updateTransactionsList = async (store, list) => {
  console.log('list', list)
  // if (state.transactionsList < 10) {

  // }
}
