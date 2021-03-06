<template>
  <div>
    <el-table
      :data="tableDataPaginated.data"
        v-loading="loading"
      style="width: 100%">
      <div slot="empty">
        NO DATA
      </div>
      <el-table-column
        width="200"
        prop="height"
        label="Height">
      </el-table-column>
      <el-table-column
        prop="type"
        label="Type">
        <template slot-scope="scope">
          <el-popover
            placement="top-start"
            title="Transaction type"
            width="200"
            trigger="hover"
            :content="scope.row.type">
            <img slot="reference" width="25" :src="transactionTypesIcons[scope.row.type]" :alt="scope.row.type">
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        width="320"
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
        width="320"
        prop="transaction"
        label="Transaction">
        <template slot-scope="scope">
        <router-link
          class="el-link el-link--primary"
          :to="{name: 'transaction', params: { id: scope.row.transaction }}">
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
    <div class="spacer"
      v-if="tableData.length > itemsPerPage"
    ></div>
    <el-pagination
      background
      hide-on-single-page
      layout="prev, pager, next"
      :page-size="itemsPerPage"
      :total="tableData.length"
      @current-change="onPageChange">
    </el-pagination>
  </div>
</template>
<script>
import { defineTransactionType, transactionTypesIcons } from '@/modules/transaction-types.js'
import { shortString, getAccountFromKey } from '@/modules/short-string.js'
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
    },
    itemsPerPage: {
      type: Number,
      default: 10
    }
  },
  data () {
    return {
      currentPage: 1,
      transactionTypesIcons
    }
  },
  computed: {
    tableData () {
      return this.transactions.map((row) => {
         return {
          height: row.blockHeight || row.height || '-',
          type: defineTransactionType(row.moduleID, row.assetID),
          account: row.senderAccount || this.getAccountFromKey(row.senderPublicKey),
          transaction: row.id,
          fee: `${row.fee || 0} Ⱡ`
        }
      })
    },
    tableDataPaginated () {
      return this.paginator(this.tableData, this.currentPage, this.itemsPerPage)
    }
  },
  methods: {
    shortString,
    getAccountFromKey,
    onPageChange (page) {
      this.currentPage = page
    },
    paginator (items, page, perPage) {
      const curPage = page || 1
      const offset = (curPage - 1) * perPage
      const paginatedItems = items.slice(offset).slice(0, perPage)
      const totalPages = Math.ceil(items.length / perPage)
      this.paginationData = {
        page: curPage,
        perPage,
        totalPages,
        prevPage: curPage - 1 ? curPage - 1 : null,
        nextPage: (totalPages > curPage) ? curPage + 1 : null,
        data: paginatedItems
      }
      return this.paginationData
    },
  }
}
</script>
