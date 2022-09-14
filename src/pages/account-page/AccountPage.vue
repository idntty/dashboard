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

      <div v-if="$async.getAccountInfo.$rejected">
        <div class="flex bg-red-100 rounded-lg p-4 text-red-700" role="alert">
          <svg class="w-5 h-5 inline mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
          <div>
            <span class="font-medium">Error!</span> Can not get account data. Try again later.
          </div>
        </div>
      </div>

      <div v-if="$async.getAccountInfo.$resolved">
        <!-- Account header box -->
        <div class="bg-gray-800 pt-8 pb-6 px-8 mb-12">
          <div class="flex flex-col items-left">
            <div class="mb-6">
              <ul class="flex flex-wrap text-xs font-medium -m-1">
                <li class="m-1">
                  <a class="inline-flex text-center text-gray-100 py-1 px-3 rounded-full bg-purple-600" href="#0">{{account.sequence.nonce}}</a>
                </li>
              </ul>
            </div>
            <div class="mb-6">
              <h4 class="h4 text-purple-600 overflow-ellipsis overflow-hidden">{{account.address}}</h4>
              <p class="text-gray-400 text-sm">Address</p>
            </div>
            <div class="mb-6">
              <h4 class="h4 text-white overflow-ellipsis overflow-hidden">
                {{accountUsername}}
              </h4>
              <p class="text-gray-400 text-sm">Username</p>
            </div>
            <div class="mb-6">
              <h3 class="h3 text-white">{{account.token.balance}}<span class="text-sm text-gray-400">/idn</span></h3>
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
            <div v-if="account.identity.features.length">
              <div class="mb-6"
                v-for="(item, index) in account.identity.features" :key="index"
              >
                <label class="block text-gray-300 text-sm font-medium mb-1">{{item.label}}</label>
                <input
                  type="text"
                  class="form-input w-full text-gray-300"
                  :class="{'border-purple-600': checkFeatureValidated(item.label)}"
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

        <!-- Account validations box -->
        <div class="bg-gray-800 pt-8 pb-6 px-8 mb-12">
          <div class="flex flex-col items-left">
            <div class="mb-6">
              <h4 class="h4 text-purple-600 overflow-ellipsis overflow-hidden">Validations</h4>
            </div>
            <div v-if="account.identity.verifications.length">
              <div class="mb-6"
                v-for="(item, index) in account.identity.verifications" :key="index"
              >
                <label class="block text-gray-300 text-sm font-medium mb-1">{{item.label}} by
                  <router-link
                    class="underline"
                    :to="{name: 'transaction', params: { id: item.tx} }">
                    {{ item.tx }}
                  </router-link>
                </label>
                <input
                  type="text"
                  class="form-input w-full text-gray-300"
                  :value="item.account"
                  readonly
                />
              </div>
            </div>
            <div v-else class="mb-6">
              <p class="text-gray-300">No Validations Found</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import api from '@/services/api/'
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
      // transactions: [],
    }
  },
  computed: {
    accountUsername () {
      return this.account.dpos.delegate.username.length ? this.account.dpos.delegate.username : '-'
    }
  },
  asyncOperations: {
    getAccountInfo (id) {
      return api.getAccountInfo(id)
    }
    // getAccountTransactions (id) {
    //   return api.getAccountTransactions(id)
    // },
  },
  methods: {
    checkFeatureValidated (itemLabel) {
      if (this.account.identity.verifications.length === 0) return false
      return this.account.identity.verifications.filter(el => el.label === itemLabel).length
    }
  },
  async created () {
    const accountResponse = await this.$async.getAccountInfo.$perform(this.id)
    this.account = accountResponse.data
    // const transactionsResponse = await this.$async.getAccountTransactions.$perform(this.id)
    // this.transactions = transactionsResponse.data

  }
}
</script>
