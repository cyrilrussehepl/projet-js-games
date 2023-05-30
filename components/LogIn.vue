<template>
   <div class="container">
      <form
         id="contact-form"
         class="flex flex-col max-w-lg mx-auto"
         @submit="mySubmit"
      >
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
                  type="submit"
                  value="submit"
                  name="submit"
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
      </form>
   </div>
</template>
<style>
.Error {
   color: red;
}
</style>
<script>
export default {
   data() {
      return {
         username: '',
         password: '',
      };
   },
   methods: {
      mySubmit() {
         // Vous pouvez ajouter ici la logique de traitement du formulaire
         // Par exemple, envoyer les données au serveur ou effectuer des validations supplémentaires.
         console.log('ID:', this.id);
         console.log('Mot de passe:', this.password);
      },
   },
};
</script>
