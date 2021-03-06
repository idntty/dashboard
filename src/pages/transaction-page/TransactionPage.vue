<template>
  <div>
    <div class="container">
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


    </div>
  </div>
</template>
<script>
import api from '@/services/api/'
import { shortString, getAccountFromKey } from '@/modules/short-string.js'
import { defineTransactionType, transactionTypesIcons } from '@/modules/transaction-types.js'
import TransactionDataHeader from '@/components/transaction-data-header'
export default {
  name: 'TransactionPage',
  components: {
    TransactionDataHeader
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
