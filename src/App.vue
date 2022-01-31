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
  }
}
</script>
