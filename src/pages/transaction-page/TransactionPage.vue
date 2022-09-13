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

      <div v-if="$async.getTransactionInfo.$rejected" class="mb-12">
        <el-alert
          title="Error"
          type="error"
          description="Can not get transaction data. Try again later."
          :closable="false"
          show-icon
        >
        </el-alert>
      </div>

      <div v-if="$async.getTransactionInfo.$resolved">
        <!-- Transaction header box -->
        <div class="bg-gray-800 pt-8 pb-6 px-8 mb-12">
          <div class="flex flex-col items-left">
            <div class="mb-6">
              <ul class="flex flex-wrap text-xs font-medium -m-1">
                <li class="m-1">
                  <a class="inline-flex text-center text-gray-100 py-1 px-3 rounded-full bg-purple-600" href="#0">Identity</a>
                </li>
                <li class="m-1">
                  <a class="inline-flex text-center text-gray-100 py-1 px-3 rounded-full bg-blue-500" href="#0">Verification</a>
                </li>
              </ul>
            </div>
            <div class="mb-6">
              <h4 class="h4 text-purple-600 overflow-ellipsis overflow-hidden">5127f39c3757009a9f2eba0961f5e9792e6c9dac51e51e3d633c2a52eb008649</h4>
              <p class="text-gray-400 text-sm">Transaction ID</p>
            </div>
            <div class="mb-6">
              <h4 class="h4 text-white overflow-ellipsis overflow-hidden">
                <a href="#" class="underline">58a31e982f7838afc2b64e55216355be7273abeb4140f65f5a2d655ea18c85c4</a>
              </h4>
              <p class="text-gray-400 text-sm">Sender Public Key</p>
            </div>
            <div class="mb-6">
              <h3 class="h3 text-white">0.056<span class="text-sm text-gray-400">/tx</span></h3>
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
            <div class="mb-6">
              <label class="block text-gray-300 text-sm font-medium mb-1">First name</label>
              <input
                type="text"
                class="form-input w-full text-gray-300 border-purple-600"
                value="0d5897b05c83ea27a01fdfd5ab7a533df9051d6069c991251e20e95d436dbe25"
                readonly
              />
            </div>
            <div class="mb-6">
              <label class="block text-gray-300 text-sm font-medium mb-1">Second name</label>
              <input
                type="text"
                class="form-input w-full text-gray-300 border-green-400"
                value="0d5897b05c83ea27a01fdfd5ab7a533df9051d6069c991251e20e95d436dbe25"
                readonly
              />
            </div>
            <div class="mb-6">
              <label class="block text-gray-300 text-sm font-medium mb-1">Removed\Invalidated field</label>
              <input
                type="text"
                class="form-input w-full text-gray-300 border-red-600"
                value="0d5897b05c83ea27a01fdfd5ab7a533df9051d6069c991251e20e95d436dbe25"
                readonly
              />
            </div>
          </div>
        </div>
      </div>

    </section>

    <!-- <div class="container">
      <h1>Transaction</h1>
      <div class="spacer2x"></div>

      <div v-if="$async.getTransactionInfo.$resolved">
        <TransactionDataHeader
          :transaction="transaction"
          :transactionType="transactionType"
        />
        <el-card
          shadow="never">
          <div slot="header" class="clearfix">
            <h3>Info</h3>
          </div>
          <el-row  :gutter="20">
            <el-col :md="4" :xs="12">
              <h4>Id</h4>
            </el-col>
            <el-col :md="20" :xs="12">
              {{ shortString(transaction.id) }}
            </el-col>
          </el-row>
          <div class="spacer"></div>
          <el-row :gutter="20">
            <el-col :md="4" :xs="12">
              <h4>Type</h4>
            </el-col>
            <el-col :md="20" :xs="12">
              <el-popover
                placement="top-start"
                title="Transaction type"
                width="200"
                trigger="hover"
                :content="transactionType">
                <img slot="reference" width="25" :src="transactionTypesIcons[transactionType]" :alt="transactionType">
              </el-popover>
            </el-col>
          </el-row>
          <div class="spacer"></div>
          <el-row  :gutter="20">
            <el-col :md="4" :xs="12">
              <h4>Fee</h4>
            </el-col>
            <el-col :md="20" :xs="12">
              {{ transaction.fee }} T
            </el-col>
          </el-row>
          <div class="spacer"></div>
          <el-row  :gutter="20">
            <el-col :md="4" :xs="12">
              <h4>Sender</h4>
            </el-col>
            <el-col :md="20" :xs="12">
              {{ shortString(getAccountFromKey(transaction.senderPublicKey)) }}
            </el-col>
          </el-row>
          <div class="spacer"></div>
          <div class="hr"></div>
          <div class="spacer"></div>


          <el-row :gutter="20">
            <el-col :md="4" :xs="12">
              <h4>Signatures</h4>
            </el-col>
            <el-col :md="20" :xs="12">
              <div>
                <el-row
                  v-for="signature in transaction.signatures"
                  :key="signature"
                  :gutter="20">
                  <el-col>
                    {{ shortString(signature) }}
                    <div class="spacer"></div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </div>

      <div v-if="$async.getTransactionInfo.$rejected">
        <el-alert
          title="Error"
          type="error"
          description="Can not get transaction data. Try again later."
          :closable="false"
          show-icon
        >
        </el-alert>
      </div>

      <div class="spacer4x"></div>


    </div> -->
  </div>
</template>
<script>
import api from '@/services/api/'
import { shortString, getAccountFromKey } from '@/modules/short-string.js'
import { defineTransactionType, transactionTypesIcons } from '@/modules/transaction-types.js'
// import TransactionDataHeader from '@/components/transaction-data-header'
export default {
  name: 'TransactionPage',
  components: {
    // TransactionDataHeader
  },
  props: {
    id: {
      type: String
    }
  },
  data() {
    return {
      transaction: undefined,
      transactionTypesIcons
    }
  },
  computed: {
    transactionType () {
      return defineTransactionType(this.transaction.moduleID, this.transaction.assetID)
    }
  },
  asyncOperations: {
    getTransactionInfo (id) {
      return api.getTransactionInfo(id)
    },
  },
  methods: {
    shortString,
    getAccountFromKey
  },
  async created () {
    const {data} = await this.$async.getTransactionInfo.$perform(this.id)
    this.transaction = data
  }
}
</script>
