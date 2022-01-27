<template>
  <div>
    <div class="container">
      <h1>Account</h1>
      <br>
      <h2>Transactions</h2>
      <br>
      <TransactionsTable/>

    </div>
  </div>
</template>
<script>
import TransactionsTable from '@/components/transactions-table'
export default {
  name: 'AccountPage',
  components: {
    TransactionsTable
  },
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>
