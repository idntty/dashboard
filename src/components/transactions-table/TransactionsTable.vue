<template>
      <el-table
        :data="tableData"
        style="width: 100%">
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
                class="el-link el-link--primary"
                :to="{name: 'account', params: { id: scope.row.account }}">
                {{scope.row.account}}
              </router-link>
          </template>
        </el-table-column>
        <el-table-column
          width="400"
          prop="transaction"
          label="Transaction">
          <template slot-scope="scope">
              <router-link
                class="el-link el-link--primary"
                :to="{name: 'transaction', params: { id: scope.row.transaction }}">
                  {{scope.row.transaction}}
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
export default {
  name: 'TransactionsTable',
  data () {
    return {
      tableData: [{
        date: '21/01/2022 - 16:01:10',
        type: 'No type',
        account: 'e3ef067a7107e035fca246b101b03289d7738649',
        transaction: 'e3ef067a7107e035fca246b101b03289d7738649',
        fee: 0.0157
      }, {
        date: '21/01/2022 - 16:01:10',
        type: 'No type',
        account: 'e3ef067a7107e035fca246b101b03289d7738649',
        transaction: 'e3ef067a7107e035fca246b101b03289d7738649',
        fee: 0.0157
      }, {
        date: '21/01/2022 - 16:01:10',
        type: 'No type',
        account: 'e3ef067a7107e035fca246b101b03289d7738649',
        transaction: 'e3ef067a7107e035fca246b101b03289d7738649',
        fee: 0.0157
      }, {
        date: '21/01/2022 - 16:01:10',
        type: 'No type',
        account: 'e3ef067a7107e035fca246b101b03289d7738649',
        transaction: 'e3ef067a7107e035fca246b101b03289d7738649',
        fee: 0.0157
      }, {
        date: '21/01/2022 - 16:01:10',
        type: 'No type',
        account: 'e3ef067a7107e035fca246b101b03289d7738649',
        transaction: 'e3ef067a7107e035fca246b101b03289d7738649',
        fee: 0.0157
      }, {
        date: '21/01/2022 - 16:01:10',
        type: 'No type',
        account: 'e3ef067a7107e035fca246b101b03289d7738649',
        transaction: 'e3ef067a7107e035fca246b101b03289d7738649',
        fee: 0.0157
      }, {
        date: '21/01/2022 - 16:01:10',
        type: 'No type',
        account: 'e3ef067a7107e035fca246b101b03289d7738649',
        transaction: 'e3ef067a7107e035fca246b101b03289d7738649',
        fee: 0.0157
      }],
    }
  }
}
</script>
