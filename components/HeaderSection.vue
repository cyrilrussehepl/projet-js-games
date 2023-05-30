<template>
   <!-- Header Section Start -->
   <header class="fixed left-0 right-0 z-99" :class="{ 'is-sticky': isSticky }">
      <div class="container">
         <div class="flex py-3 items-center justify-between">
            <HeaderLogo />

            <MainMenu />

            <div v-if="isAuthenticated" class="flex justify-center">
               <p class="signup-btn my-1">{{ username }}</p>
               <LogOutButton />
            </div>
            <div v-else class="flex">
               <SignupButton class="px-5" />
               <LogInButton />
            </div>
         </div>
      </div>
   </header>
   <!-- Header Section End -->
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
   components: {
      HeaderLogo: () => import('@/components/Header/HeaderLogo'),
      MainMenu: () => import('@/components/Header/MainMenu'),
      SignupButton: () => import('@/components/Button/SignupButton'),
      LogInButton: () => import('@/components/Button/LogInButton'),
      LogOutButton: () => import('@/components/Button/LogOutButton'),
   },
   computed: {
      ...mapState(['isAuthenticated', 'username']),
   },
   methods: {
      ...mapMutations(['logout']),
      handleLogout() {
         this.logout();
      },
   },

   data() {
      return {
         isSticky: false,
      };
   },

   mounted() {
      window.addEventListener('scroll', () => {
         let scrollPos = window.scrollY;
         if (scrollPos >= 100) {
            this.isSticky = true;
         } else {
            this.isSticky = false;
         }
      });
   },
};
</script>
