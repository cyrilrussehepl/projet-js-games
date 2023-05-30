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
            <div class="flex justify-between">
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
               <div class="flex mt-10">
                  <NuxtLink
                     :to="`/play/${games.slug}`"
                     style="
                        background-image: url(/images/others/btn-bg_contours-roses.webp);
                     "
                     class="w-230 md:text-2xl md:leading-12 h-73 flex items-center text-white font-bold justify-center font-exo group hover:opacity-80 leading-70 text-xl"
                  >
                     Play
                     <img
                        class="ml-3 w-5 h-5 group-hover:ml-4 transition-all"
                        src="/images/icon/arrrow-icon.webp"
                        alt="Arrow Icon"
                     />
                  </NuxtLink>
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
                  <p
                     v-for="username in players"
                     :key="username"
                     class="text-gray-400"
                  >
                     {{ username }}
                  </p>
               </div>
               <div class="additional_information_text">
                  <h4 class="font-bold mb-5">Score</h4>
                  <p
                     v-for="score in scores"
                     :key="score"
                     class="text-gray-400"
                  >
                     {{ score }}
                  </p>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import { Disqus } from 'vue-disqus';
import router from  "vue-router";
export default {
   components: {
      PrimaryButton: () => import('@/components/Button/PrimaryButton'),
      Swiper,
      SwiperSlide,
      Disqus,
   },
   props: ['games'],
   data() {
     
      return {
         swiperOption: {
            slidesPerView: 1,
            spaceBetween: 30,
            pagination: false,
            navigation: {
               nextEl: '.gameslide .gameslide-button-next',
               prevEl: '.gameslide .gameslide-button-prev',
            },
         },
         gameslide: [
            {
               gamingBg: '/images/others/game-details-thumb.webp',
            },
            {
               gamingBg: '/images/others/game-details-thumb.webp',
            },
            {
               gamingBg: '/images/others/game-details-thumb.webp',
            },
         ],
         scores : [],
         players : [],
      };
   },
   created() {
      this.fetchData();
   },

   beforeRouteUpdate(to, from, next) {
      this.fetchData();
      next();
   },

   methods: {
      fetchData() {
         fetch(
            'https://europe-west1.gcp.data.mongodb-api.com/app/application-0-ptcis/endpoint/getScores',
            {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json',
               },
               body: JSON.stringify({
                  name: this.games.title,
               }),
            }
         )
            .then((response) => {
               if (response.ok) {
                  console.log(this.games.title)
                  return response.json();
                 
               }
               else {
                  console.log("merde")
               throw new Error('Error while fetching data');
               }
              
            })
            .then((data) => {
               console.log(data)
               if (Array.isArray(data) && data.length > 0) {
                  // Parcourir chaque objet dans la liste
                  console.log(data)
                  data.forEach(obj => {
                     // Accéder aux propriétés score et username de chaque objet
                     const score = obj.score;
                     const username = obj.username;

                     // Ajouter les valeurs aux tableaux scores et players
                     this.scores.push(score);
                     this.players.push(username);
                  });
               }
            })
            .catch((err) => {
               console.log('Error while get pb request : ', err);
            });
      },
   },
};
</script>
