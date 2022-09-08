<template>
<div class="font-inter antialiased bg-gray-900 text-gray-200 tracking-tight">
  <div class="flex flex-col min-h-screen overflow-hidden">
    <LayoutHeader/>
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
    <LayoutFooter/>
  </div>
  </div>
</template>
<script>
import LayoutHeader from './header'
import LayoutFooter from './footer'
import PageIllustration from '@/components/page-illustration'
import CtaContact from '@/components/cta-contact'
export default {
  name: 'LayoutDefault',
  components: {
    LayoutHeader,
    LayoutFooter,
    PageIllustration,
    CtaContact
  }
}
</script>
