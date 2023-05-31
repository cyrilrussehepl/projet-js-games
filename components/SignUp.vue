<template>
   <!-- SignUp Section Start -->
   <div class="container">
      <div id="contact-form" class="flex flex-col max-w-lg mx-auto">
         <label for="passwordCk">*Username</label>
         <p v-if="usernameIsUsed" class="Error">This username already exist</p>
         <p v-if="isValidUsername == false" class="Error">
            Please enter only alphabetical characters.
         </p>
         <div class="single-fild">
            <input
               type="text"
               class="px-6 h-14 mb-6 text-white border-secondary-80 bg-secondary-100 hover:border-primary transition-all border-2 border-solid block rounded-md w-full focus:outline-none"
               placeholder="Username"
               name="username"
               v-model="username"
               required
            />
         </div>
         <label for="passwordCk">*Password</label>
         <p v-if="!isValidPassword" class="Error">
            must contain at least one uppercase letter and one lowercase letter.
         </p>
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
         <label for="passwordCk">*Password confirmation</label>
         <p v-if="passwordMismatch" class="Error">Passwords do not match.</p>

         <div class="single-fild">
            <input
               type="password"
               class="px-6 h-14 mb-6 text-white border-secondary-80 bg-secondary-100 hover:border-primary transition-all border-2 border-solid block rounded-md w-full focus:outline-none"
               placeholder="Password"
               name="passwordCk"
               v-model="password2"
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
                  Register
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
   <!-- SignUp Section End -->
</template>
<style></style>
<script>
import { mapState, mapMutations } from 'vuex';
export default {
   data() {
      return {
         username: '',
         password: '',
         password2: '',
         usernameIsUsed: false,
      };
   },
   computed: {
      passwordMismatch() {
         if (this.password === '' || this.password2 === '') return false;
         return this.password !== this.password2;
      },
      isValidPassword() {
         if (this.password === '') {
            return true;
         }
         const regex = /^(?=.*[a-z])(?=.*[A-Z]).+$/;
         return regex.test(this.password);
      },
      isValidUsername() {
         if (this.username === '') return true;
         const regex = /^[a-zA-Z]+$/;
         return regex.test(this.username);
      },
      ...mapState(['isAuthenticated', 'username']),
   },
   methods: {
      ...mapMutations(['login', 'logout']),
      mySubmit() {
         if (
            this.password === this.password2 &&
            this.password != '' &&
            this.isValidUsername
         ) {
            fetch(
               'https://europe-west1.gcp.data.mongodb-api.com/app/application-0-ptcis/endpoint/register',
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
                  if (data.inserted == true) {
                     this.$router.replace('/');
                     this.login(this.username);
                  } else {
                     this.usernameIsUsed = true;
                  }
               })
               .catch((err) => {
                  console.log('Error while get pb request : ', err);
               });
         } else {
            console.log("erreur lors de l'enregistrement");
         }
      },
   },
};
</script>
