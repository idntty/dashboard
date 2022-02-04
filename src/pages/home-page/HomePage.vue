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
      <el-form label-position="top" @submit.native.prevent="submitSearch">
        <el-form-item>
          <el-input v-model="searchQuery" placeholder="Search an address or transaction"></el-input>
        </el-form-item>
      </el-form>

      <div v-if="searchResult">
        <div>{{searchResult.title}}
        <router-link
          class="el-link el-link--primary"
          :to="{
            name: searchResult.type,
            params: { id: searchResult.data.id }}">
            {{searchResult.data.id}}
          </router-link>
        </div>
      </div>
      <div class="spacer2x"></div>

      <h2>Last Transactions</h2>
      <div class="spacer"></div>

      <TransactionsTable
        :transactions="transactionsList"
        :loading="$async.getTransactionsList.$pending"
        />
      <div class="spacer2x"></div>

      <el-button @click="getMoreTransactions" type="primary">LOAD MORE TRANSACTIONS</el-button>
      <div class="spacer4x"></div>

    </div>
  </div>
</template>
<script>

import api from '@/services/api/'
import { apiClient, cryptography } from '@liskhq/lisk-client';
import TransactionsTable from '@/components/transactions-table'
let client
export default {
  name: 'HomePage',
  components: {
    TransactionsTable
  },
  data() {
    return {
      searchQuery: '',
      peersNumber: 0,
      blocksNumber: 0,
      transactionsNumber: 0,
      lastBlockId: undefined,
      transactionsList: [],
      limit: 25,
      searchResult: null
    }
  },
  asyncOperations: {
    getNodeInfo () {
      return api.getNodeInfo()
    },
    getBlockData (blockId) {
      return api.getBlockById(blockId)
    },
    getTransactionsList (limit, offset) {
      return api.getTransactionsList(limit, offset)
    },
    getAccountInfo (id) {
      return api.getAccountInfo(id)
    },
    getTransactionInfo (id) {
      return api.getTransactionInfo(id)
    },
    getTransactionsQuantity () {
      return api.getTransactionsQuantity()
    }
  },
  watch: {
    searchQuery (val) {
      if (!val.length) {
        this.searchResult = null
      }
    }
  },
  methods: {
    async submitSearch () {
      if (this.searchQuery.length === 64) {
        try {
          const {data} = await api.getTransactionInfo(this.searchQuery)
          this.searchResult = {
            type: 'transaction',
            title: 'Transaction found: ',
            data: {
              id: data.id
            }
          }
        } catch (e) {
          //
        }
      }
      else if (this.searchQuery.length === 40) {
        try {
          const {data} = await api.getAccountInfo(this.searchQuery)
          this.searchResult = {
            type: 'account',
            title: 'Account found: ',
            data: {
              id: data.address
            }
          }
        } catch (e) {
          //
        }
      }
      else {
          this.searchResult = {
            type: 'noresult',
            title: 'Nothing found.',
            data: {
              id: ''
            }
          }
      }
    },
    updateTransactionsList (newTransactions) {
      this.transactionsList.unshift(newTransactions)
    },
    async getMoreTransactions () {
      try {
        const result = await this.$async.getTransactionsList.$perform(this.limit, this.transactionsList.length)
        if (result.meta.total > this.transactionsList.length) {
          this.transactionsList.push(...result.data)
        }
      } catch (e) {
        console.error(e)
      }
    }
  },
  async created () {
    try {
      const nodeInfo = await this.$async.getNodeInfo.$perform()
      this.peersNumber = nodeInfo.data.network.seedPeers.length
      this.blocksNumber = nodeInfo.data.height
    } catch (e) {
      console.error(e)
    }
    try {
      const transactionsQuantity = await this.$async.getTransactionsQuantity.$perform()
      this.transactionsNumber = transactionsQuantity.data.transactionscount
    } catch (e) {
      console.error(e)
    }
    try {
      const transactionsResponse = await this.$async.getTransactionsList.$perform(this.limit, 0)
      this.transactionsList = transactionsResponse.data
    } catch (e) {
      console.error(e)
    }
  },
  async mounted () {
    try {
      client = await apiClient.createWSClient(process.env.VUE_APP_WS_BASE);
      console.warn('WSclient created')
      client.subscribe('app:block:new', (data) => {
      const block = data.block
      console.log('block length', block.length)
      console.log('block', block)
      const buffBlock = cryptography.hexToBuffer(block)
      console.log('buffBlock by cryptography', buffBlock)
      const decodedBlock = client.block.decode(buffBlock);
      console.log(`decodedBlock`, decodedBlock)
      //   const blockJSON = client.block.toJSON(decodedBlock);
      //   console.log(blockJSON)
      //   console.log(blockJSON.payload)
      //   console.log(blockJSON.payload.length)
      //   if (blockJSON.payload.length) {
      //     console.log('Get updated transactions list')
      //     this.updateTransactionsList(blockJSON.payload)
      //   }
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
