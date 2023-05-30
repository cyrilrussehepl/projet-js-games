<template>
   <!-- CounterUp Section Start -->
   <div class="container mt-32 pb-32">
      <div v-observe-visibility="{ callback: visibilityChanged, once: true }">
         <div
            v-if="commentsVisible"
            class="grid md:grid-cols-3 grid-cols-1 gap-9"
         >
            <div
               v-for="(count, imageIndex) in counter"
               :key="imageIndex"
               class="text-white text-center"
            >
               <countTo
                  class="text-white text-5xl lg:text-10xl uppercase font-normal block"
                  :class="count.className"
                  :startVal="count.startVal"
                  :endVal="count.endVal"
                  :duration="2000"
                  :autoplay="true"
               ></countTo>
               <p class="uppercase mt-3 sm:mt-5 text-base lg:text-lg">
                  {{ count.text }}
               </p>
            </div>
         </div>
      </div>
   </div>
   <!-- CounterUp Section End -->
</template>

<script>
import countTo from 'vue-count-to';
export default {
   components: {
      countTo,
   },
   data() {
      return {
         commentsVisible: false,
         counter: [
            {
               startVal: 0,
               endVal: 0,
               className: 'text-bright',
               text: 'Players',
            },
            {
               startVal: 0,
               endVal: 4,
               className: 'text-bright',
               text: 'Total Games',
            },
            {
               startVal: 0,
               endVal: 654,
               className: 'text-yellow',
               text: 'Game Played',
            },
         ],
      };
   },
   mounted() {
      this.fetchNBPlayer();
   },
   methods: {
      fetchNBPlayer() {
         fetch(
            'https://europe-west1.gcp.data.mongodb-api.com/app/application-0-ptcis/endpoint/getNbrPlayers',
            {
               method: 'GET',
            }
         )
            .then((response) => response.json())
            .then((data) => {
               this.counter[0].endVal = data.nbr_players;
               console.log(data.nbr_players);
            })
            .catch((error) => {
               console.log('erreur:', error);
            });
      },
      visibilityChanged(isVisible) {
         this.commentsVisible = isVisible;
      },
   },
};
</script>
