<template>
      <el-table
        :data="tableData"
         v-loading="loading"
        style="width: 100%">
        <div slot="empty">
          NO DATA
        </div>
        <el-table-column
          width="200"
          prop="date"
          label="Date">
        </el-table-column>
        <el-table-column
          prop="type"
          label="Type">
        </el-table-column>
        <el-table-column
          width="400"
          prop="account"
          label="Account">
          <template slot-scope="scope">
              <router-link
                v-if="linkToAccount"
                class="el-link el-link--primary"
                :to="{name: 'account', params: { id: scope.row.account }}">
                {{shortString(scope.row.account)}}
              </router-link>
              <div v-else>{{shortString(scope.row.account)}}</div>
          </template>
        </el-table-column>
        <el-table-column
          width="400"
          prop="transaction"
          label="Transaction">
          <template slot-scope="scope">
              <router-link
                class="el-link el-link--primary"
                :to="{name: 'transaction', params: { id: scope.row.transaction, blockHeight: scope.row.height }}">
                  {{shortString(scope.row.transaction)}}
                </router-link>
          </template>
        </el-table-column>
        <el-table-column
          width="100"
          prop="fee"
          label="Fee">
        </el-table-column>
      </el-table>
</template>
<script>
import hashJs from 'hash.js'
import { shortString } from '@/modules/short-string.js'
export default {
  name: 'TransactionsTable',
  props: {
    transactions: {
      type: Array,
      default: () => {return []}
    },
    loading: {
      type: Boolean,
      default: false
    },
    linkToAccount: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    tableData () {
      return this.transactions.map((row) => {
         return {
          date: 'no date',
          type: 'no type',
          account: row.senderAccount || this.hash(row.senderPublicKey),
          transaction: row.id,
          height: row.height,
          fee: `${row.fee || 0} Ⱡ`
        }
      })
    }
  },
  methods: {
    shortString,
    hash (string) {
      const pkBuf = Buffer.from(string, 'hex')
      const hash = hashJs.sha256().update(pkBuf).digest('hex')
      return hash.slice(0, 40)

    }
  }
}
</script>
