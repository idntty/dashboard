<template>
  <div>
    <section>
      <div class="pb-12 md:pb-16">
        <div class="max-w-3xl mx-auto text-center">
          <h2 class="h2 mb-4">
            Transaction
          </h2>
        </div>
      </div>

      <div v-if="$async.getTransactionInfo.$rejected">
        <div class="flex bg-red-100 rounded-lg p-4 text-red-700" role="alert">
          <svg class="w-5 h-5 inline mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
          <div>
            <span class="font-medium">Error!</span> Can not get transaction data. Try again later.
          </div>
        </div>
      </div>

      <div v-if="$async.getTransactionInfo.$resolved">
        <!-- Transaction header box -->
        <div class="bg-gray-800 pt-8 pb-6 px-8 mb-12">
          <div class="flex flex-col items-left">
            <div class="mb-6">
              <ul class="flex flex-wrap text-xs font-medium -m-1">
                <li class="m-1">
                  <a class="inline-flex text-center text-gray-100 py-1 px-3 rounded-full" :class="transactionBgClass" href="#0">{{transactionName}}</a>
                </li>
              </ul>
            </div>
            <div class="mb-6">
              <h4 class="h4 text-purple-600 overflow-ellipsis overflow-hidden">
                {{transaction.id}}
              </h4>
              <p class="text-gray-400 text-sm">Transaction ID</p>
            </div>
            <div class="mb-6">
              <h4 class="h4 text-white overflow-ellipsis overflow-hidden">
                <router-link
                  class="underline"
                  :to="{name: 'account', params: { id: getAccountFromKey(transaction.senderPublicKey)} }">
                  {{ transaction.senderPublicKey }}
                </router-link>
              </h4>
              <p class="text-gray-400 text-sm">Sender Public Key</p>
            </div>
            <div class="mb-6">
              <h3 class="h3 text-white">{{transaction.fee}}<span class="text-sm text-gray-400">/tx</span></h3>
              <p class="text-gray-400 text-sm">Transaction Fee</p>
            </div>

          </div>
        </div>

        <!-- Transaction identty box -->
        <div class="bg-gray-800 pt-8 pb-6 px-8 mb-12">
          <div class="flex flex-col items-left">
            <div class="mb-6">
              <h4 class="h4 text-purple-600 overflow-ellipsis overflow-hidden">Identity</h4>
            </div>
            <div v-if="transaction.asset.features.length">
              <div class="mb-6"
                v-for="(item, index) in transaction.asset.features" :key="index"
              >
                <label class="block text-gray-300 text-sm font-medium mb-1">{{item.label}}</label>
                <input
                  type="text"
                  class="form-input w-full text-gray-300"
                  :class="transactionBorderClass"
                  :value="item.value"
                  readonly
                />
              </div>
            </div>
            <div v-else class="mb-6">
              <p class="text-gray-300">No Identity Items Found</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import api from '@/services/api/'
import { getAccountFromKey } from '@/modules/short-string.js'
import { defineTransactionType, transactionNameByType, transactionColorByType } from '@/modules/transaction-types.js'
export default {
  name: 'TransactionPage',
  props: {
    id: {
      type: String
    }
  },
  data() {
    return {
      transaction: undefined
    }
  },
  computed: {
    transactionType () {
      return defineTransactionType(this.transaction.moduleID, this.transaction.assetID)
    },
    transactionName () {
      return transactionNameByType[this.transactionType]
    },
    transactionColor () {
      return transactionColorByType[this.transactionType]
    },
    transactionBgClass () {
      return `bg-${this.transactionColor.bg}`
    },
    transactionBorderClass () {
      return `border-${this.transactionColor.border}`
    }
  },
  asyncOperations: {
    getTransactionInfo (id) {
      return api.getTransactionInfo(id)
    },
  },
  methods: {
    getAccountFromKey
  },
  async created () {
    const {data} = await this.$async.getTransactionInfo.$perform(this.id)
    this.transaction = data
  }
}
</script>
