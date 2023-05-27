<template>
   <div class="flex justify-center">
      <iframe
         :src="game.gameUrl"
         frameborder="2"
         :height="game.gameHeight"
         :width="game.gameWidth"
         onload="handleIframeLoad"
      ></iframe>
   </div>
</template>

<script>
export default {
   components: {
      HeaderSection: () => import('@/components/HeaderSection'),
      OffCanvasMobileMenu: () =>
         import('@/components/Header/OffCanvasMobileMenu'),
      Breadcrumb: () => import('@/components/Breadcrumb'),
      Footer: () => import('@/components/Footer'),
   },
   props: ['game'],
   mounted() {
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
