<template>
  <div id="app">
    <LayoutBroker
      :layouts="layouts"
      :current="$route.meta.layout"
    />
  </div>
</template>

<script>
import LayoutBroker from 'vue-layout-broker'
import LayoutDefault from '@/pages/_layouts/layout-default'
import AOS from 'aos'

const layouts = {
  LayoutDefault
}
export default {
  name: 'App',
  components: {
    LayoutBroker
  },
  data () {
    return {
      layouts
    }
  },
  mounted() {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 600,
      easing: 'ease-out-sine',
    })
  }
}
</script>
