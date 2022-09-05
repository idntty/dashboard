<template>
  <div class="flex flex-col min-h-screen overflow-hidden">
    <Header/>
    <!-- Page content -->
    <main class="grow">

      <!-- Page illustration -->
      <div class="relative max-w-6xl mx-auto h-0 pointer-events-none" aria-hidden="true">
        <PageIllustration />
      </div>
      <div class="py-12 md:py-20 pt-32 md:pt-40 pb-12 md:pb-20">
        <div class="max-w-6xl mx-auto px-4 sm:px-6">
          <slot></slot> <!-- page content will be rendered instead of <slot></slot> -->
        </div>
      </div>

      <CtaContact />

    </main>
    <Footer/>
  </div>
</template>
<script>
import Header from './header'
import Footer from './footer'
import PageIllustration from '@/components/page-illustration'
import CtaContact from '@/components/cta-contact'
export default {
  name: 'LayoutDefault',
  components: {
    Header,
    Footer,
    PageIllustration,
    CtaContact
  }
}
</script>
