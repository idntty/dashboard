<template>
  <div>
    <div class="container">
      <h1>Account</h1>
      <div class="spacer2x"></div>
      <div v-if="$async.getAccountInfo.$resolved">
        <el-card shadow="never">
          <div slot="header" class="clearfix">
            <h3>Identity</h3>
          </div>
          <el-row  type="flex" align="middle" justify="space-between" :gutter="20">
            <el-col :md="4" :xs="12">
              <h4>General</h4>
            </el-col>
            <el-col :md="20" :xs="12">
              {{shortString(account.identity.general)}}
            </el-col>
          </el-row>
          <div class="spacer"></div>
          <el-row  type="flex" align="middle" justify="space-between" :gutter="20">
            <el-col :md="4" :xs="12">
              <h4>Nationality</h4>
            </el-col>
            <el-col :md="20" :xs="12">
              {{shortString(account.identity.nationality)}}
            </el-col>
          </el-row>
        </el-card>
        <div class="spacer2x"></div>

        <el-card shadow="never">
          <div slot="header" class="clearfix">
            <h3>Validators</h3>
          </div>
          <el-row
            v-for="(validator, index) in account.identity.validators" :key="index"
            type="flex" align="middle" justify="space-between" :gutter="20">
            <el-col v-for="(validatorItem, index) in validator.split(':')" :key="index">
              {{validatorItem.length > 20 ? shortString(validatorItem) : validatorItem}}
            </el-col>
          </el-row>
        </el-card>
        <div class="spacer2x"></div>

        <el-card shadow="never">
          <div slot="header" class="clearfix">
            <h3>Info</h3>
          </div>
          <el-row  type="flex" align="middle" justify="space-between" :gutter="20">
            <el-col :md="4" :xs="12">
              <h4>Balance</h4>
            </el-col>
            <el-col :md="20" :xs="12">
              {{account.token.balance}} T
            </el-col>
          </el-row>
          <div class="spacer"></div>
          <el-row  type="flex" align="middle" justify="space-between" :gutter="20">
            <el-col :md="4" :xs="12">
              <h4>Nonce</h4>
            </el-col>
            <el-col :md="20" :xs="12">
              {{account.sequence.nonce}}
            </el-col>
          </el-row>
          <div class="spacer"></div>
          <el-row  type="flex" align="middle" justify="space-between" :gutter="20">
            <el-col :md="4" :xs="12">
              <h4>Address</h4>
            </el-col>
            <el-col :md="20" :xs="12">
              {{shortString(account.address)}}
            </el-col>
          </el-row>
        </el-card>
        <div class="spacer2x"></div>


        <h2>Transactions</h2>
        <div class="spacer"></div>
        <TransactionsTable
          :transactions="transactions"
          :loading="$async.getAccountTransactions.$pending"
          :linkToAccount="false"
        />
        <div class="spacer4x"></div>
      </div>

      <div v-if="$async.getAccountInfo.$rejected">
        <el-alert
          title="Error"
          type="error"
          description="Can not get account data. Try again later."
          :closable="false"
          show-icon
        >
        </el-alert>
      </div>

    </div>
  </div>
</template>
<script>
import api from '@/services/api/'
import { shortString } from '@/modules/short-string.js'
import TransactionsTable from '@/components/transactions-table'
export default {
  name: 'AccountPage',
  components: {
    TransactionsTable
  },
  props: {
    id: {
      type: String
    }
  },
  data () {
    return {
      account: {},
      transactions: [],
    }
  },
  asyncOperations: {
    getAccountInfo (id) {
      return api.getAccountInfo(id)
    },
    getAccountTransactions (id) {
      return api.getAccountTransactions(id)
    },
  },
  methods: {
    shortString
  },
  async created () {
    const accountResponse = await this.$async.getAccountInfo.$perform(this.id)
    this.account = accountResponse.data
    const transactionsResponse = await this.$async.getAccountTransactions.$perform(this.id)
    this.transactions = transactionsResponse.data

  }
}
</script>
