<template>
  <div>
    <section>
      <div class="pb-12 md:pb-16">
        <div class="max-w-3xl mx-auto text-center">
          <h2 class="h2 mb-4">
            Account
          </h2>
        </div>
      </div>

      <div v-if="$async.getAccountInfo.$rejected" class="mb-12">
        <el-alert
          title="Error"
          type="error"
          description="Can not get account data. Try again later."
          :closable="false"
          show-icon
        >
        </el-alert>
      </div>

      <div v-if="$async.getAccountInfo.$resolved">
        <!-- Account header box -->
        <div class="bg-gray-800 pt-8 pb-6 px-8 mb-12">
          <div class="flex flex-col items-left">
            <div class="mb-6">
              <ul class="flex flex-wrap text-xs font-medium -m-1">
                <li class="m-1">
                  <a class="inline-flex text-center text-gray-100 py-1 px-3 rounded-full bg-purple-600" href="#0">16</a>
                </li>
              </ul>
            </div>
            <div class="mb-6">
              <h4 class="h4 text-purple-600 overflow-ellipsis overflow-hidden">71ccaeefe22050abc9b36ce0c1744316c11c49e1</h4>
              <p class="text-gray-400 text-sm">Address</p>
            </div>
            <div class="mb-6">
              <h4 class="h4 text-white overflow-ellipsis overflow-hidden">
                <a href="#" class="underline">Some name</a>
              </h4>
              <p class="text-gray-400 text-sm">Username</p>
            </div>
            <div class="mb-6">
              <h3 class="h3 text-white">999000<span class="text-sm text-gray-400">/idn</span></h3>
              <p class="text-gray-400 text-sm">Account balance</p>
            </div>

          </div>
        </div>

        <!-- Account identty box -->
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
                class="form-input w-full text-gray-300 border-purple-600"
                value="0d5897b05c83ea27a01fdfd5ab7a533df9051d6069c991251e20e95d436dbe25"
                readonly
              />
            </div>
            <div class="mb-6">
              <label class="block text-gray-300 text-sm font-medium mb-1">Birthdate</label>
              <input
                type="text"
                class="form-input w-full text-gray-300"
                value="0d5897b05c83ea27a01fdfd5ab7a533df9051d6069c991251e20e95d436dbe25"
                readonly
              />
            </div>
          </div>
        </div>

        <!-- Account validations box -->
        <div class="bg-gray-800 pt-8 pb-6 px-8 mb-12">
          <div class="flex flex-col items-left">
            <div class="mb-6">
              <h4 class="h4 text-purple-600 overflow-ellipsis overflow-hidden">Validations</h4>
            </div>
            <div class="mb-6">
              <label class="block text-gray-300 text-sm font-medium mb-1">firstname by
                <a href="#" class="underline">b444b7ff3118cf2a30cbd54cfcdb8fd5d805017a</a>
              </label>
              <input
                type="text"
                class="form-input w-full text-gray-300"
                value="0d5897b05c83ea27a01fdfd5ab7a533df9051d6069c991251e20e95d436dbe25"
                readonly
              />
            </div>
            <div class="mb-6">
              <label class="block text-gray-300 text-sm font-medium mb-1">secondname by
                <a href="#" class="underline">b444b7ff3118cf2a30cbd54cfcdb8fd5d805017a</a>
              </label>
              <input
                type="text"
                class="form-input w-full text-gray-300"
                value="0d5897b05c83ea27a01fdfd5ab7a533df9051d6069c991251e20e95d436dbe25"
                readonly
              />
            </div>
          </div>
        </div>
      </div>

    </section>

    <!-- <div class="container">
      <h1>Account</h1>
      <div class="spacer2x"></div>
      <div v-if="$async.getAccountInfo.$resolved">
        <div v-if="showIdentitySection">
          <el-card shadow="never">
            <div slot="header" class="clearfix">
              <h3>Identity</h3>
            </div>
            <div v-if="account.identity.general">
              <el-row type="flex" align="middle" justify="space-between" :gutter="20">
                <el-col :md="4" :xs="12">
                  <h4>General</h4>
                </el-col>
                <el-col :md="20" :xs="12">
                  {{shortString(account.identity.general)}}
                </el-col>
              </el-row>
              <div class="spacer"></div>
            </div>
            <div v-if="account.identity.nationality">
              <el-row  type="flex" align="middle" justify="space-between" :gutter="20">
                <el-col :md="4" :xs="12">
                  <h4>Nationality</h4>
                </el-col>
                <el-col :md="20" :xs="12">
                  {{shortString(account.identity.nationality)}}
                </el-col>
              </el-row>
              <div class="spacer"></div>
            </div>
            <div v-if="account.identity.signature">
              <el-row  type="flex" align="middle" justify="space-between" :gutter="20">
                <el-col :md="4" :xs="12">
                  <h4>Signature</h4>
                </el-col>
                <el-col :md="20" :xs="12">
                  {{shortString(account.identity.signature)}}
                </el-col>
              </el-row>
              <div class="spacer"></div>
            </div>
            <div v-if="account.identity.biometrics">
              <el-row  type="flex" align="middle" justify="space-between" :gutter="20">
                <el-col :md="4" :xs="12">
                  <h4>Biometrics</h4>
                </el-col>
                <el-col :md="20" :xs="12">
                  {{shortString(account.identity.biometrics)}}
                </el-col>
              </el-row>
            </div>
          </el-card>
          <div class="spacer2x"></div>
        </div>

        <div v-if="showValidatorsSection">
          <el-card
          shadow="never">
            <div slot="header" class="clearfix">
              <h3>Validators</h3>
            </div>
            <el-row
              v-for="(validator, index) in account.identity.validators" :key="index"
              type="flex" align="middle" justify="space-between" :gutter="20">
              <el-col v-for="(validatorItem, index) in validator.split(':')" :key="index">
                <span v-if="index === 0">{{shortString(validatorItem)}}</span>
                <router-link
                  v-else-if="index === 1"
                  class="el-link el-link--primary"
                  :to="{name: 'transaction', params: { id: validatorItem }}">
                  {{shortString(validatorItem)}}
                </router-link>
                <span v-else>{{validatorItem}}</span>
                <div class="spacer"></div>
              </el-col>
            </el-row>
          </el-card>
          <div class="spacer2x"></div>
        </div>

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

    </div> -->
  </div>
</template>
<script>
import api from '@/services/api/'
import { shortString } from '@/modules/short-string.js'
// import TransactionsTable from '@/components/transactions-table'
export default {
  name: 'AccountPage',
  components: {
    // TransactionsTable
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
  computed: {
    showValidatorsSection () {
      return this.account.identity.validators.length
    },
    showIdentitySection () {
      return this.account.identity.biometrics ||
      this.account.identity.general ||
      this.account.identity.nationality ||
      this.account.identity.signature
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
