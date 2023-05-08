<template>
  <div class="container relative">
    <p class="date text-primary font-bold mb-3">08 May, 2023</p>
    <h2
      class="text-white font-bold uppercase xl:text-title lg:text-5xl md:text-4xl sm:text-3xl text-2xl xl:leading-70 lg:leading-12 leading-10"
    >
      {{ games.title }}
    </h2>
    <div class="content-details">
      <div class="description mt-6">
        <p v-for="description in games.descriptions" class="leading-8">
          {{ description }}
        </p>
      </div>

      <div class="gameslide my-15">
        <swiper class="swiper" :options="swiperOption">
          <swiper-slide
            v-for="gameImg in games.presentationImg"
            :key="imageIndex"
          >
            <div class="relative">
              <img
                class="sm:h-full h-64 w-full object-cover"
                :src="`${gameImg}`"
              />
            </div>
          </swiper-slide>
        </swiper>

        <!-- Testimonial Arrows -->

        <div class="flex mt-10">
          <div
            class="gameslide-button-prev swipper-arrow text-white md:w-68 w-55 md:h-55 h-11 bg-cover flex items-center justify-center hover:bg-arrow-hover-shape bg-arrow-shape transition-all z-50 mr-2"
          >
            <img
              class="w-4 h-6"
              src="/images/icon/navigation-arrow2.webp"
              alt=""
            />
          </div>
          <div
            class="gameslide-button-next swipper-arrow text-white md:w-68 w-55 md:h-55 h-11 flex items-center justify-center hover:bg-arrow-hover-shape bg-arrow-shape bg-cover transition-all z-50 ml-2"
          >
            <img
              class="w-4 h-6"
              src="/images/icon/navigation-arrow1.webp"
              alt=""
            />
          </div>
        </div>
      </div>

      <div
        class="additional-information-area bg-secondary-100 px-9 py-9 rounded-2xl mb-9"
      >
        <h3 class="text-2xl text-white uppercase font-bold mb-6">
          Leaderboard
        </h3>
        <div class="grid grid-cols-2 gap-5 text-white">
          <div class="additional_information_text">
            <h4 class="font-bold mb-5">Player</h4>
            <p class="text-gray-400">Hexalthy</p>
          </div>
          <div class="additional_information_text">
            <h4 class="font-bold mb-5">Score</h4>
            <p class="text-gray-400">1253</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import { Disqus } from "vue-disqus";
export default {
  components: {
    Swiper,
    SwiperSlide,
    Disqus,
  },
  props: ["games"],
  data() {
    return {
      swiperOption: {
        slidesPerView: 1,
        spaceBetween: 30,
        pagination: false,
        navigation: {
          nextEl: ".gameslide .gameslide-button-next",
          prevEl: ".gameslide .gameslide-button-prev",
        },
      },
      gameslide: [
        {
          gamingBg: "/images/others/game-details-thumb.webp",
        },
        {
          gamingBg: "/images/others/game-details-thumb.webp",
        },
        {
          gamingBg: "/images/others/game-details-thumb.webp",
        },
      ],
    };
  },
};
</script>
