<template>
  <div>
    <div class="max-w-3xl mx-auto text-center pb-12 md:pb-4">
      <h1 class="h2 mb-4">Experiment now with testnet token</h1>
      <p class="text-xl text-gray-400 mb-8">With this token you can perform any operation in the test network absolutely free of charge. If you run out of them - don't worry, you can always always get more.</p>
      <p class="mx-auto max-w-max text-sm font-semibold py-1 px-3 text-green-600 bg-green-200 rounded-full mb-4 overflow-ellipsis overflow-hidden">lskw7488a9nqy6m3zkg68x6ynsp6ohg4y7wazs3mw</p>
      <div class="my-6">
        <div class="border-t border-gray-700" aria-hidden="true"></div>
      </div>
    </div>
    <!-- Form -->
    <div class="max-w-md mx-auto mb-12">
      <form @submit.prevent="submitForm">
        <div class="flex flex-wrap -mx-3 mb-4">
          <div class="w-full px-3">
            <label class="block text-gray-300 text-sm font-medium mb-1" for="full-name">Idntty address<span class="text-red-600">*</span></label>
            <input
              id="idntty-address"
              type="text"
              class="form-input w-full text-gray-300"
              :class="{'border-2 border-rose-500': $v.$dirty && !$v.idnttyAddress.required}"
              placeholder="Your address"
              v-model.trim="$v.idnttyAddress.$model"
              />
              <div class="text-red-600 text-sm" v-if="$v.$dirty && !$v.idnttyAddress.required">Address is required</div>
          </div>
          <div class="w-full px-3">
            <p class="block text-gray-400 text-sm font-medium text-right">
              If you don't have an address, <button type="button" @click="generatePassphrase" class="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out">generate it</button>
            </p>
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-4">
          <div class="w-full px-3">
            <label class="block text-gray-300 text-sm font-medium mb-1" for="email">Email adrress<span class="text-red-600">*</span></label>
            <input
              id="email"
              type="email"
              class="form-input w-full text-gray-300"
              :class="{'border-2 border-rose-500': $v.$dirty && !$v.email.required}"
              placeholder="Email"
              v-model.trim="$v.email.$model"
            />
            <div class="text-red-600 text-sm" v-if="$v.$dirty && !$v.email.required">Email is required</div>
          </div>
        </div>
        <div v-if="formStep === 2" class="flex flex-wrap -mx-3 mb-4">
          <div class="w-full px-3">
            <label class="block text-gray-300 text-sm font-medium mb-1" for="text">Verification code<span class="text-red-600">*</span></label>
            <input
            id="verification-code"
            type="text"
            class="form-input w-full text-gray-300"
            :class="{'border-2 border-rose-500': $v.$dirty && !$v.code.required}"
            placeholder="Your code"
            v-model.trim="$v.code.$model"
          />
          <div class="text-red-600 text-sm" v-if="$v.code.$dirty && !$v.code.required">Code is required</div>
          </div>
        </div>
        <div v-if="formStep === 1" class="flex flex-wrap -mx-3 mt-6">
          <div class="w-full px-3">
            <button
            type="submit"
            class="btn text-white bg-purple-600 hover:bg-purple-700 w-full"
            :disabled="$async.getVerificationCode.$pending"
            >
            <svg v-if="$async.getVerificationCode.$pending" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{$async.getVerificationCode.$pending ? 'Processing': 'Get verification code'}}
            </button>
          </div>
        </div>
        <div v-if="formStep === 2" class="flex flex-wrap -mx-3 mt-6">
          <div class="w-full px-3">
            <button
            type="submit"
            class="btn text-white bg-purple-600 hover:bg-purple-700 w-full"
            :disabled="$async.getTokens.$pending"
            >
            <svg v-if="$async.getTokens.$pending" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{$async.getTokens.$pending ? 'Processing': 'Get tokens'}}
            </button>
          </div>
        </div>
      </form>
      <div v-if="$async.getTokens.$resolved" class="text-gray-400 mt-6">
        <div class="flex items-center">
          <svg class="w-3 h-3 fill-current text-green-500 mr-2 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
          </svg>
          Tokens was successfully sended, check transaction
        </div>
      </div>
      <div v-if="$async.getVerificationCode.$rejected || $async.getTokens.$rejected" class="mt-6">
        <div class="flex items-center text-red-600 text-sm">
          {{errorStatus}}
        </div>
      </div>

      <!-- Avatar -->
      <div v-if="publicKey" class="text-gray-400 text-sm mt-6 text-center">
          <div class="mt-6 mb-6">
            <GeneratedAvatar :publicKey="publicKey"/>
          </div>
          <span>Grab your </span>
          <button type="button" @click="copyPassphrase" class="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out">passphrase</button>
      </div>
    </div>

  </div>
</template>

<script>
import {getAddressAndPublicKeyFromPassphrase, bufferToHex} from '@liskhq/lisk-cryptography';
import { Mnemonic } from '@liskhq/lisk-passphrase'
import api from '@/services/api/'
import GeneratedAvatar from '@/components/generated-avatar'
import Vue from 'vue'
import Vuelidate from 'vuelidate'
import { required, requiredIf } from 'vuelidate/lib/validators'
Vue.use(Vuelidate)

export default {
  name: 'FaucetPage',
  components: {
    GeneratedAvatar
  },
  data () {
    return {
      email: '',
      idnttyAddress: '',
      code: '',
      formStep: 1,
      errorStatus: '',
      passphrase: undefined,
      publicKey: undefined,
    }
  },
  computed: {
    codeOnlyNumbers () {
      return this.code.replace(/\D/g, "")
    }
  },
  watch: {
    idnttyAddress (val) {
      if (!val.length) {
        this.passphrase = undefined
        this.publicKey = undefined
      }
    }
  },
   validations: {
    email: {
      required
    },
    idnttyAddress: {
      required
    },
    code: {
      required: requiredIf(function () {
        return this.formStep === 2
      })
    }
  },
  asyncOperations: {
    getVerificationCode (account, email) {
      return api.getVerificationCode(account, email)
    },
    getTokens (account, email, code) {
      return api.getTokens(account, email, code)
    }
  },
  methods: {
    async submitForm () {
      this.errorStatus = ''
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.errorStatus = 'Form is invalid.'
      } else {
        if (this.formStep !== 2) {
          try {
            await this.$async.getVerificationCode.$perform(this.idnttyAddress, this.email)
            this.formStep = 2
            this.$v.$reset()
          } catch (e) {
            this.errorStatus = 'Something went wrong, try again.'
          }
        } else {
          try {
            await this.$async.getTokens.$perform(this.idnttyAddress, this.email, this.codeOnlyNumbers)
            this.$v.$reset()
            this.formStep
            this.email = '',
            this.idnttyAddress = '',
            this.code = ''
          } catch (e) {
            this.errorStatus = 'Something went wrong, try again.'
          }
        }
      }
    },
    generatePassphrase () {
      this.publicKey = undefined
      this.passphrase = Mnemonic.generateMnemonic()
      const object = getAddressAndPublicKeyFromPassphrase(this.passphrase)
      this.idnttyAddress = bufferToHex(object.address)
      this.publicKey = bufferToHex(object.publicKey)
    },
    async copyPassphrase () {
      try {
        await navigator.clipboard.writeText(this.passphrase)
        console.log('Copying to clipboard was successful!');
      } catch (e) {
        console.error('Could not copy text: ', e);
      }
    }
  }
};
</script>
