<template>
   <div
      class="bg-cover bg-gray-800"
      style="background-image: url(/images/bg/body-bg2.webp)"
   >
      <HeaderSection />

      <OffCanvasMobileMenu
         :class="{ 'show-mobile-menu': navOpen }"
         @togglenav="navOpen = !navOpen"
      />

      <Breadcrumb
         :BreadcrumbTitle="gameHome.title"
         :BreadcrumbSubTitle="BreadcrumbSubTitle"
      />

      <div class="flex justify-center">
         <iframe
            :src="gameHome.gameUrl"
            frameborder="2"
            :height="gameHome.gameHeight"
            :width="gameHome.gameWidth"
            onload="handleIframeLoad"
         ></iframe>
      </div>
      <Footer />
   </div>
</template>

<script>
import gameHome from '@/data/games.json';
export default {
   components: {
      HeaderSection: () => import('@/components/HeaderSection'),
      OffCanvasMobileMenu: () =>
         import('@/components/Header/OffCanvasMobileMenu'),
      Breadcrumb: () => import('@/components/Breadcrumb'),
      Footer: () => import('@/components/Footer'),
   },
   data() {
      return {
         navOpen: false,
         gameHome,
         BreadcrumbSubTitle: 'Games',
         paddingTop: 'pt-0',
         slug: this.$route.params.slug,
      };
   },
   mounted() {
      this.gameHome = gameHome.find(
         (games) => games.slug == this.$route.params.slug
      );
      const iframe = document.querySelector('iframe');
      iframe.onload = this.handleIframeLoad;
   },
   methods: {
      handleIframeLoad() {
         const username = 'Hexalthy';
         const iframe = document.querySelector('iframe');
         const message = {
            username: username,
         };
         iframe.contentWindow.postMessage(message, '*');
      },
   },
};
</script>
