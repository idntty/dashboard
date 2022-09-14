<template>
  <div>
    <div class="overflow-x-auto relative">
      <table class="w-full text-sm text-left text-gray-400">
        <thead class="text-xs uppercase bg-gray-700">
          <tr>
            <th class="py-3 px-6"> Height</th>
            <th class="py-3 px-6"> Type</th>
            <th class="py-3 px-6"> Account</th>
            <th class="py-3 px-6"> Transaction</th>
            <th class="py-3 px-6"> Fee</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in tableDataPaginated.data" :key="index"
            class="border-b bg-gray-800 border-gray-700"
          >
            <td class="py-4 px-6">
                {{item.height}}
            </td>
            <td class="py-4 px-6">
                {{item.type}}
            </td>
            <td class="py-4 px-6 whitespace-nowrap	">
              <router-link
                v-if="linkToAccount"
                class="text-purple-600"
                :to="{name: 'account', params: { id: item.account }}">
                {{shortString(item.account)}}
              </router-link>
              <div v-else>{{shortString(item.account)}}</div>
            </td>
            <td class="py-4 px-6 whitespace-nowrap	">
              <router-link
                class="text-purple-600"
                :to="{name: 'transaction', params: { id: item.transaction }}">
                  {{shortString(item.transaction)}}
              </router-link>
            </td>
            <td class="py-4 px-6">
                {{item.fee}}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="mb-6"
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
import { defineTransactionType, transactionNameByType } from '@/modules/transaction-types.js'
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
      default: 25
    }
  },
  data () {
    return {
      currentPage: 1,
    }
  },
  computed: {
    tableData () {
      return this.transactions.map((row) => {
         return {
          height: row.blockHeight || row.height || '-',
          type: transactionNameByType[defineTransactionType(row.moduleID, row.assetID)],
          account: getAccountFromKey(row.senderPublicKey),
          transaction: row.id,
          fee: `${row.fee || 0}`
        }
      })
    },
    tableDataPaginated () {
      return this.paginator(this.tableData, this.currentPage, this.itemsPerPage)
    }
  },
  methods: {
    shortString,
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
