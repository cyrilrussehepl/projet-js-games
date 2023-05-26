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
      :BreadcrumbTitle="BreadcrumbTitle"
      :BreadcrumbSubTitle="BreadcrumbSubTitle"
    />

    <div class="flex justify-center">
    <iframe src="https://preeminent-eclair-ec06b7.netlify.app" 
      frameborder="2" 
      height="820" width="700"
      onload="handleIframeLoad"></iframe>
    </div>
    <Footer />
  </div>
</template>

<script>
  import matchesData from "@/data/matches.json";
  export default {
    components: {
      HeaderSection: () => import("@/components/HeaderSection"),
      OffCanvasMobileMenu: () =>
        import("@/components/Header/OffCanvasMobileMenu"),
      Breadcrumb: () => import("@/components/Breadcrumb"),
      Footer: () => import("@/components/Footer"),
    },
    data() {
      return {
        matchesData,
        navOpen: false,
        BreadcrumbTitle: "All Games",
        BreadcrumbSubTitle: "Games",
        paddingTop: "pt-0",
      };
    },
    mounted(){
      const iframe = document.querySelector("iframe");
      iframe.onload = this.handleIframeLoad;
    },
    methods: {
    handleIframeLoad() {
      const username = 'Hexalthy'; // Remplacez par votre nom d'utilisateur réel ou obtenez-le à partir de vos données de session
      const iframe = document.querySelector("iframe");
      const message = {
        username: username
      };
      iframe.contentWindow.postMessage(message, '*');
    }
  }
  };

  
</script>
