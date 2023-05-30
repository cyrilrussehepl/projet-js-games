<template>
   <div
      class="bg-cover bg-gray-800"
      style="background-image: url(/images/bg/body-bg.webp)"
   >
      <HeaderSection />

      <OffCanvasMobileMenu
         :class="{ 'show-mobile-menu': navOpen }"
         @togglenav="navOpen = !navOpen"
      />

      <HeroBanner />

      <PopularGame />

      <CounterUp />

      <ContactBanner :paddingTop="paddingTop" />

      <!-- <div>
         <p v-if="isAuthenticated">Welcome, {{ username }}!</p>
         <p v-else>Please log in.</p>
         <button v-if="isAuthenticated" @click="handleLogout">Logout</button>
         <button v-else @click="handleLogin">Login</button>
      </div>   -->

      <Footer />
   </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
   components: {
      HeaderSection: () => import('@/components/HeaderSection'),
      HeroBanner: () => import('@/components/HeroBanner'),
      OffCanvasMobileMenu: () =>
         import('@/components/Header/OffCanvasMobileMenu'),
      CounterUp: () => import('@/components/CounterUp'),
      PopularGame: () => import('@/components/Games/PopularGame'),
      ContactBanner: () => import('@/components/ContactBanner'),
      Footer: () => import('@/components/Footer'),
   },
   data() {
      return {
         navOpen: false,
         paddingTop: 'pt-32',
      };
   },
   /* computed: {
      ...mapState(['isAuthenticated', 'username']),
   },
    methods: {
      ...mapMutations(['login', 'logout']),
      handleLogin() {
         this.login('utilisateur123');
      },
      handleLogout() {
         this.logout();
      },
   },*/
};
</script>
