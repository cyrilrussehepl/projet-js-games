<template>
   <div class="flex items-center">
      <!-- Button Start -->
      <NuxtLink
         to="/login"
         style="
            background-image: url(/images/others/btn-signup_contours-roses.webp);
         "
         class="signup-btn transition-all group hidden sm:flex"
      >
         Log In
         <img
            class="w-4 h-4 ml-2 group-hover:ml-3 transition-all"
            src="/images/icon/arrrow-icon2.webp"
            alt="Arrow Icon"
         />
      </NuxtLink>
      <!-- Button End -->

      <!-- Offcanvas Button Start -->
      <div class="lg:hidden block">
         <button
            class="icofont-navigation-menu text-white text-4xl ml-9"
            @click="mobiletoggleClass('addClass', 'show-mobile-menu')"
         ></button>
      </div>
      <!-- Offcanvas Button End -->
   </div>
</template>

<script>
export default {
   methods: {
      // offcanvas mobile-menu
      mobiletoggleClass(addRemoveClass, className) {
         const el = document.querySelector('#offcanvas-menu');
         if (addRemoveClass === 'addClass') {
            el.classList.add(className);
         } else {
            el.classList.remove(className);
         }
      },
   },
};
</script>
