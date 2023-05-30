<template>
   <div class="flex justify-center">
      <iframe
         :src="game.gameUrl"
         frameborder="2"
         :height="game.gameHeight"
         :width="game.gameWidth"
         @onload="handleIframeLoad"
      ></iframe>
   </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
   props: ['game'],
   mounted() {
      const iframe = document.querySelector('iframe');
      iframe.onload = this.handleIframeLoad;
   },
   computed: {
      ...mapState(['username']),
   },
   methods: {
      handleIframeLoad() {
         const iframe = document.querySelector('iframe');
         const message = {
            username: this.username,
         };
         iframe.contentWindow.postMessage(message, '*');
      },
   },
};
</script>
