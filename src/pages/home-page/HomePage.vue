<template>
  <div>
    <!-- Statistics -->
    <div class="grid md:grid-cols-3 bg-gray-800 divide-y md:divide-y-0 md:divide-x divide-gray-700 px-6 md:px-0 md:py-8 text-center">
      <div class="py-6 md:py-0 md:px-8">
        <div class="text-4xl font-bold leading-tight tracking-tighter text-purple-600 mb-2" data-aos="fade-up">{{blocksNumber}}</div>
        <div class="text-lg text-gray-400" data-aos="fade-up" data-aos-delay="200">Blocks</div>
      </div>
      <div class="py-6 md:py-0 md:px-8">
        <div class="text-4xl font-bold leading-tight tracking-tighter text-purple-600 mb-2" data-aos="fade-up">-</div>
        <div class="text-lg text-gray-400" data-aos="fade-up" data-aos-delay="200">Transactions</div>
      </div>
      <div class="py-6 md:py-0 md:px-8">
        <div class="text-4xl font-bold leading-tight tracking-tighter text-purple-600 mb-2" data-aos="fade-up">{{peersNumber}}</div>
        <div class="text-lg text-gray-400" data-aos="fade-up" data-aos-delay="200">Peers</div>
      </div>
    </div>
    <!-- Bottom infobox -->
    <div class="flex flex-col lg:flex-row justify-between items-center mt-12 lg:mt-6 lg:py-8 lg:border-t lg:border-b lg:border-gray-800 mb-6">
      <div class="font-medium text-lg text-center lg:text-left mb-4 lg:mb-0">Get the native token of the Idntty blockchain and is used in all services and pay transaction fees</div>
      <div>
      <a class="btn-sm text-white bg-purple-600 hover:bg-purple-700" href="#">
          <span class="text-sm">Get it</span>
          <svg class="w-3 h-3 fill-current text-purple-400 shrink-0 ml-2" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 5H0v2h6v4l6-5-6-5z" />
          </svg>
        </a>
      </div>
    </div>
    <!-- Search -->
    <div class="pt-12 md:pt-16 pb-12 md:pb-16">
      <div class="max-w-3xl mx-auto text-center">
        <h2 class="h2 mb-4">
          Search for transactions
        </h2>
      </div>
      <form @submit.prevent="submitSearch">
        <input
          type="text"
          class="form-input w-full text-gray-300"
          placeholder="Search an address or transaction"
          v-model="searchQuery"
          />
      </form>
    </div>

    <!-- Search result -->
    <div v-if="searchResult" class="text-center">
      <div>{{searchResult.title}}
      <router-link
        class="text-purple-600"
        :to="{
          name: searchResult.type,
          params: { id: searchResult.data.id }
        }">
          {{searchResult.data.id}}
        </router-link>
      </div>
    </div>

    <!-- Transsactions data -->
    <div v-if="transactionsList.length">
      <div class="pt-12 md:pt-16 pb-12 md:pb-16">
        <div class="max-w-3xl mx-auto text-center">
          <h2 class="h2 mb-4">
            Last Transactions
          </h2>
        </div>
        <TransactionsTable
          :transactions="transactionsList"
          :loading="$async.getTransactionsList.$pending"
          />
      </div>
      <button @click="getMoreTransactions" class="btn text-white bg-purple-600 hover:bg-purple-700">
        Load more transactions
      </button>
    </div>


  </div>
</template>
<script>

import api from '@/services/api/'
import { apiClient, cryptography } from '@liskhq/lisk-client';
import { shortString, getAccountFromKey } from '@/modules/short-string.js'
import { defineTransactionType, transactionNameByType } from '@/modules/transaction-types.js'
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
      searchResult: null,
      transactionNameByType
    }
  },
  asyncOperations: {
    getNodeInfo () {
      return api.getNodeInfo()
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
    defineTransactionType,
    shortString,
    getAccountFromKey,
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
      this.transactionsList = newTransactions.concat(this.transactionsList)
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
    // try {
    //   const transactionsQuantity = await this.$async.getTransactionsQuantity.$perform()
    //   this.transactionsNumber = transactionsQuantity.meta.total
    // } catch (e) {
    //   console.error(e)
    // }
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
      client.subscribe('app:block:new', (data) => {
        const block = data.block
        const buffBlock = cryptography.hexToBuffer(block)
        const decodedBlock = client.block.decode(buffBlock);
        const blockJSON = client.block.toJSON(decodedBlock);
        if (blockJSON.header) {
          this.blocksNumber = blockJSON.header.height
        }
        if (blockJSON.payload && blockJSON.payload.length) {
          this.updateTransactionsList(blockJSON.payload)
        }
      })

    } catch (e) {
      console.error(e)
    }
  },
  beforeDestroy () {
    client.disconnect().then(() => {
    }).catch((err) => {
      console.error(err)
    });
  }
}
</script>
