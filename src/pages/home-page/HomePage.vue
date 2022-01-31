<template>
  <div>
    <div class="container">
      <h1>Info</h1>
      <div class="spacer2x"></div>
      <el-row :gutter="20">
        <el-col class="el-col__bottom-margin" :xs="24" :sm="8">
          <el-card class="counters-card" shadow="never">
            <el-row  type="flex" align="middle" justify="space-between" :gutter="20">
              <el-col class="counters-card__title">
                <h3>Blocks</h3>
              </el-col>
              <el-col class="text-right">
                <span class="counters-card__number">{{blocksNumber}}</span>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <el-col class="el-col__bottom-margin" :xs="24" :sm="8">
          <el-card class="counters-card" shadow="never">
            <el-row type="flex" align="middle" justify="space-between">
              <el-col class="counters-card__title">
                <h3>Transactions</h3>
              </el-col>
              <el-col class="text-right">
                <span class="counters-card__number">{{transactionsNumber}}</span>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <el-col class="el-col__bottom-margin" :xs="24" :sm="8">
          <el-card class="counters-card" shadow="never">
            <el-row  type="flex" align="middle" justify="space-between" :gutter="20">
              <el-col class="counters-card__title">
                <h3>Peers</h3>
              </el-col>
              <el-col class="text-right">
                <span class="counters-card__number">{{peersNumber}}</span>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
      <div class="spacer2x"></div>

      <h2>Search</h2>
      <div class="spacer"></div>
      <el-form label-position="top" @submit="submitSearch">
        <el-form-item>
          <el-input v-model="searchValue" placeholder="Search an address, delegate, transaction or block"></el-input>
        </el-form-item>
      </el-form>
      <div class="spacer2x"></div>

      <h2>Last Transactions</h2>
      <div class="spacer"></div>

      <TransactionsTable :transactions="transactionsList" :loading="$async.getTransactionsList.$pending"/>
      <div class="spacer2x"></div>

      <el-button type="primary">Load more transactions</el-button>
      <div class="spacer4x"></div>

    </div>
  </div>
</template>
<script>

import api from '@/services/api/'
// import { getClient } from '@/services/lisk-api/'
import { apiClient } from '@liskhq/lisk-client';
import TransactionsTable from '@/components/transactions-table'
let client
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
      lastBlockId: undefined,
      transactionsList: [],
      client: undefined
    }
  },
  asyncOperations: {
    getNodeInfo () {
      return api.getNodeInfo()
    },
    getBlockData (blockId) {
      return api.getBlockById(blockId)
    },
    getTransactionsList () {
      return api.getTransactionsList()
    },
  },
  methods: {
    submitSearch () {
      console.log('submitSearch')
    },
    updateTransactionsList (newTransactions) {
      this.transactionsList.unshift(newTransactions)
    }
  },
  async created () {
    try {
      const nodeInfo = await this.$async.getNodeInfo.$perform()
      this.peersNumber = nodeInfo.data.network.seedPeers.length
      this.blocksNumber = nodeInfo.data.height
      this.transactionsNumber = '---'
      const transactionsResponse = await this.$async.getTransactionsList.$perform()
      this.transactionsList = transactionsResponse.data
    } catch (e) {
      console.error(e)
    }
  },
  async mounted () {
    try {
      client = await apiClient.createWSClient(process.env.VUE_APP_WS_BASE);
      console.warn('WSclient created')
      client.subscribe('app:block:new', ({block}) => {
        const decodedBlock = client.block.decode(Buffer(block));
        const blockJSON = client.block.toJSON(decodedBlock);
        if (blockJSON.payload.length) {
          console.log('Get updated transactions list')
          this.updateTransactionsList(blockJSON.payload)
        }
      })

    } catch (e) {
      console.error(e)
    }
  },
  beforeDestroy () {
    client.disconnect().then(() => {
      console.warn('WSclient disconnected')
    }).catch((err) => {
      console.error(err)
    });
  }
}
</script>
