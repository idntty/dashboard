<template>
  <header class="absolute w-full z-30">
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <div class="flex items-center justify-between h-20">

        <!-- Site branding -->
        <div class="shrink-0 mr-4">
          <!-- Logo -->
          <router-link to="/" class="block" aria-label="Cruip">
            <svg width="91" height="33" viewBox="0 0 91 33" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.6734 31.0487C18.565 31.0487 22.2973 29.5028 25.0491 26.751C27.8009 23.9992 29.3468 20.2669 29.3468 16.3753C29.3468 12.4837 27.8009 8.75144 25.0491 5.99964C22.2973 3.24785 18.565 1.70191 14.6734 1.7019L14.6734 16.3753L14.6734 31.0487Z" fill="white"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M0 3.38848V31.0487H9.78227V1.7019H9.56507L0 3.38848Z" fill="white"/>
              <rect x="48.0732" y="1.677" width="9.78227" height="29.3468" fill="white"/>
              <rect x="62.7461" y="1.677" width="9.78227" height="29.3468" fill="white"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M80.7505 1.8167L75.6005 31.0237H85.5336L90.6836 1.8167H80.7505ZM90.9762 0.157616L91.0001 0.0216824L90.9762 0.0174561V0.157616ZM75.3245 32.5886V32.7333L75.2998 32.7289L75.3245 32.5886Z" fill="white"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M34.8132 31.0064L29.6386 1.65964H39.5717L44.7464 31.0064H34.8132ZM45.023 32.7158L45.047 32.7116L45.023 32.5756V32.7158ZM29.3467 0.00436038L29.3714 0V0.144605L29.3467 0.00436038Z" fill="white"/>
            </svg>
          </router-link>
        </div>

        <!-- Desktop navigation -->
        <nav class="hidden md:flex md:grow">

          <!-- Desktop menu links -->
          <ul class="flex grow justify-end flex-wrap items-center">
            <li v-for="(item, index) in menuItems" :key="index">
              <router-link :to="item.route" class="text-gray-300 hover:text-gray-200 px-4 py-2 flex items-center transition duration-150 ease-in-out">{{item.title}}</router-link>
            </li>
          </ul>
          <!-- <ul class="flex grow justify-end flex-wrap items-center">
            <div class="flex items-center">
            <span class="mr-3 text-sm text-gray-300">Testnet</span>
            <label class="inline-flex relative items-center cursor-pointer">
              <input @change="toggleNet" type="checkbox" :value="isMainnet" class="sr-only peer">
              <div class="
                w-11 h-6
                rounded-full
                bg-purple-600
                peer
                peer-checked:after:translate-x-full
                peer-checked:after:border-white
                peer-checked:bg-green-400
                after:content-['']
                after:absolute
                after:top-0.5
                after:left-[2px]
                after:bg-white
                after:border-white
                after:border
                after:rounded-full
                after:h-5
                after:w-5
                after:transition-all"
              ></div>
            </label>
              <span class="ml-3 text-sm text-gray-300">Mainnet</span>
            </div>
          </ul> -->


        </nav>

        <!-- Mobile menu -->
        <div class="md:hidden">

          <!-- Hamburger button -->
          <button class="hamburger" ref="hamburger" :class="{ active: mobileNavOpen }" aria-controls="mobile-nav" :aria-expanded="mobileNavOpen" @click="mobileNavOpen = !mobileNavOpen">
            <span class="sr-only">Menu</span>
            <svg class="w-6 h-6 fill-current text-gray-300 hover:text-gray-200 transition duration-150 ease-in-out" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <rect y="4" width="24" height="2" rx="1" />
              <rect y="11" width="24" height="2" rx="1" />
              <rect y="18" width="24" height="2" rx="1" />
            </svg>
          </button>

          <!-- Mobile navigation -->
          <nav id="mobile-nav" ref="mobileNav" class="absolute top-full z-20 left-0 w-full px-4 sm:px-6 overflow-hidden transition-all duration-300 ease-in-out" :style="[ mobileNavOpen ? { maxHeight: $refs.mobileNav.scrollHeight + 'px', opacity: 1 } : { maxHeight: 0, opacity: .8 } ]">
            <ul class="bg-gray-800 px-4 py-2">
              <li v-for="(item, index) in menuItems" :key="index">
                <router-link :to="item.route" class="flex text-gray-300 hover:text-gray-200 py-2">{{item.title}}</router-link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'LayoutHeader',
  data: function () {
    return {
      mobileNavOpen: false,
      menuItems: [
        // {
        //   title: 'Transactions',
        //   route: '/transactions'
        // },
        // {
        //   title: 'Delegates',
        //   route: '/delegates'
        // },
        // {
        //   title: 'Peers',
        //   route: '/peers'
        // },
        {
          title: 'Faucet',
          route: '/faucet'
        },
      ],
      isMainnet: false
    }
  },
  methods: {
    clickOutside(e) {
      if (!this.mobileNavOpen || this.$refs.mobileNav.contains(e.target) || this.$refs.hamburger.contains(e.target)) return
      this.mobileNavOpen = false
    },
    keyPress() {
      if (!this.mobileNavOpen || event.keyCode !== 27) return
      this.mobileNavOpen = false
    },
    toggleNet () {
      this.isMainnet = !this.isMainnet
    }
  },
  mounted() {
    document.addEventListener('click', this.clickOutside)
    document.addEventListener('keydown', this.keyPress)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.clickOutside)
    document.removeEventListener('keydown', this.keyPress)
  }
};
</script>
