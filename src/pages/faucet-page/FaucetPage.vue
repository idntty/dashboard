<template>
  <div>
    <div class="max-w-3xl mx-auto text-center pb-12 md:pb-4">
      <h1 class="h2 mb-4" data-aos="fade-up">Experiment now with testnet token</h1>
      <p class="text-xl text-gray-400 mb-8" data-aos="fade-up" data-aos-delay="200">With this token you can perform any operation in the test network absolutely free of charge. If you run out of them - don't worry, you can always always get more.</p>
      <div class="inline-flex text-sm font-semibold py-1 px-3 m-2 text-green-600 bg-green-200 rounded-full mb-4">lskw7488a9nqy6m3zkg68x6ynsp6ohg4y7wazs3mw</div>
      <div class="my-6">
        <div class="border-t border-gray-700" aria-hidden="true"></div>
      </div>
    </div>
    <!-- Form -->
    <div class="max-w-md mx-auto">
      <form>
        <div class="flex flex-wrap -mx-3 mb-4">
          <div class="w-full px-3">
            <label class="block text-gray-300 text-sm font-medium mb-1" for="full-name">Idntty address<span class="text-red-600">*</span></label>
            <input id="idnty-address" type="text" class="form-input w-full text-gray-300" placeholder="A0987654321BCDEF" required />
          </div>
          <div class="w-full px-3">
            <p class="block text-gray-400 text-sm font-medium text-right">
              If you don't have an address, <a class="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out" href="#generate-address">generate it</a>
            </p>
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-4">
          <div class="w-full px-3">
            <label class="block text-gray-300 text-sm font-medium mb-1" for="email">Email adrress<span class="text-red-600">*</span></label>
            <input id="email" type="email" class="form-input w-full text-gray-300" placeholder="some@gmail.com" required />
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-4">
          <div class="w-full px-3">
            <label class="block text-gray-300 text-sm font-medium mb-1" for="text">Verification code<span class="text-red-600">*</span></label>
            <input id="verification-code" type="text" class="form-input w-full text-gray-300" placeholder="A0987654321BCDEF" required />
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mt-6">
          <div class="w-full px-3">
            <button class="btn text-white bg-purple-600 hover:bg-purple-700 w-full">Get verification code</button>
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mt-6">
          <div class="w-full px-3">
            <button class="btn text-white bg-purple-600 hover:bg-purple-700 w-full">Get tokens</button>
          </div>
        </div>
      </form>
      <div class="text-gray-400 mt-6">
        <div class="flex items-center">
          <svg class="w-3 h-3 fill-current text-green-500 mr-2 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
          </svg>
          Tokens was successfully sended, check transaction
        </div>
      </div>

      <!-- Avatar -->
      <div class="text-gray-400 text-sm mt-6 text-center">
          <div class="mt-6 mb-6">
            <GeneratedAvatar/>
          </div>
          <span>Grab your </span>
          <a class="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out" href="#passphrase">passphrase</a>
      </div>
    </div>

  </div>
</template>

<script>
import GeneratedAvatar from '@/components/generated-avatar'

export default {
  name: 'FaucetPage',
  components: {
    GeneratedAvatar
  },
};
</script>
