<template>
  <div>
    <div class="container">
      <el-row  :gutter="20">
        <el-col class="el-col__bottom-margin" :xs="24" :sm="8">
          <el-card shadow="never" class="counters-card">
            <el-row  type="flex" align="middle" justify="space-between" :gutter="20">
              <el-col class="counters-card__title">
                <h3>Blocks</h3>
              </el-col>
              <el-col class="text-right">
                <i class="counters-card__icon el-icon-box"></i>
                <span class="counters-card__number">{{blocksNumber}}</span>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <el-col class="el-col__bottom-margin" :xs="24" :sm="8">
          <el-card shadow="never">
            <el-row  type="flex" align="middle" justify="space-between">
              <el-col class="counters-card__title">
                <h3>Transactions</h3>
              </el-col>
              <el-col class="text-right">
                <i class="counters-card__icon el-icon-coin"></i>
                <span class="counters-card__number">{{transactionsNumber}}</span>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <el-col class="el-col__bottom-margin" :xs="24" :sm="8">
          <el-card shadow="never">
            <el-row  type="flex" align="middle" justify="space-between" :gutter="20">
              <el-col class="counters-card__title">
                <h3>Peers</h3>
              </el-col>
              <el-col class="text-right">
                <i class="counters-card__icon el-icon-user"></i>
                <span class="counters-card__number">{{peersNumber}}</span>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>

      <div class="spacer"></div>
      <h2>Search</h2>
      <div class="spacer"></div>
      <el-form label-position="top" @submit="submitSearch">
        <el-form-item>
          <el-input v-model="searchValue" placeholder="Search an address, delegate, transaction or block"></el-input>
        </el-form-item>
      </el-form>

      <div class="spacer"></div>

      <h2>Last Transactions</h2>
      <div class="spacer"></div>
      <TransactionsTable/>
      <div class="spacer"></div>
      <el-button type="primary">Load more transactions</el-button>

    </div>
  </div>
</template>
<script>
import api from '@/services/api/'
import TransactionsTable from '@/components/transactions-table'
export default {
  name: 'HomePage',
  components: {
    TransactionsTable
  },
  data() {
    return {
      searchValue: '',
      peersNumber: 0,
      blocksNumber: 0,
      transactionsNumber: 0,
      lastBlockId: undefined
    }
  },
  asyncOperations: {
    getNodeInfo () {
      return api.getNodeInfo()
    },
    getBlockData (blockId) {
      return api.getBlockById(blockId)
    },
  },
  methods: {
    submitSearch () {
      console.log('submitSearch')
    }
  },
  async created () {
    try {
      const nodeInfo = await this.$async.getNodeInfo.$perform()
      console.log(nodeInfo)
      this.peersNumber = nodeInfo.data.network.seedPeers.length
      this.blocksNumber = nodeInfo.data.height
      this.lastBlockId = nodeInfo.data.lastBlockID
      this.transactionsNumber = '---'
      const blockData = await this.$async.getBlockData.$perform(this.lastBlockId)
      console.log(blockData)
    } catch (e) {
      console.error(e)
    }
  }
}
</script>
