<template>
   <div class="container">
      <div id="contact-form" class="flex flex-col max-w-lg mx-auto">
         <p v-if="errorConnection" class="Error">
            Invalid connection. Please check your username or password.
         </p>
         <label for="passwordCk" :class="{ Error: username === '' }"
            >*Username</label
         >
         <div class="single-fild">
            <input
               type="text"
               class="px-6 h-14 mb-6 text-white border-secondary-80 bg-secondary-100 hover:border-primary transition-all border-2 border-solid block rounded-md w-full focus:outline-none"
               placeholder="Username"
               name="username"
               id="username"
               v-model="username"
               required
            />
         </div>
         <label for="passwordCk" :class="{ Error: password === '' }"
            >*Password</label
         >
         <div class="single-fild">
            <input
               type="password"
               class="px-6 h-14 mb-6 text-white border-secondary-80 bg-secondary-100 hover:border-primary transition-all border-2 border-solid block rounded-md w-full focus:outline-none"
               placeholder="Password"
               name="password"
               v-model="password"
               required
            />
         </div>
         * Required fields
         <div class="single-fild col-span-2">
            <div class="form-btn-wrap flex justify-center w-full mt-16">
               <button
                  @click="mySubmit"
                  class="form-btn group primary-btn opacity-100 transition-all uppercase"
                  style="
                     background-image: url(/images/others/btn-bg_contours-roses.webp);
                  "
               >
                  Connexion
                  <img
                     src="/images/icon/arrrow-icon.webp"
                     alt="Arrow Icon"
                     class="ml-3 w-5 h-5 group-hover:ml-4 transition-all"
                  />
               </button>
               <p class="form-messege"></p>
            </div>
         </div>
      </div>
   </div>
</template>
<style></style>
<script>
import { mapState, mapMutations } from 'vuex';
export default {
   data() {
      return {
         username: '',
         password: '',
         errorConnection: false,
      };
   },
   computed: {
      ...mapState(['isAuthenticated', 'username']),
   },
   methods: {
      ...mapMutations(['login', 'logout']),
      mySubmit() {
         {
            fetch(
               'https://europe-west1.gcp.data.mongodb-api.com/app/application-0-ptcis/endpoint/login',
               {
                  method: 'POST',
                  headers: {
                     'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                     username: this.username,
                     password: this.password,
                  }),
               }
            )
               .then((response) => {
                  return response.json();
               })
               .then((data) => {
                  console.log(data);
                  if (data.login == true) {
                     this.$router.replace('/');
                     this.login(this.username);
                  } else {
                     console.log(data);
                     this.errorConnection = true;
                  }
               })
               .catch((err) => {
                  console.log('Error while get pb request : ', err);
               });
         }
      },
   },
};
</script>
