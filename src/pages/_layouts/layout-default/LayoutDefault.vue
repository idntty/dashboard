<template>
  <div class="main">
    <LayoutHeader/>
    <slot></slot> <!-- page content will be rendered instead of <slot></slot> -->
  </div>
</template>
<script>
import LayoutHeader from './header'
export default {
  name: 'LayoutDefault',
  components: {
    LayoutHeader
  }
}
</script>
