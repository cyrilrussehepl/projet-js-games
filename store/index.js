// store/index.js
import Vuex from 'vuex';

const createStore = () => {
   return new Vuex.Store({
      state: () => ({
         isAuthenticated: false,
         username: null,
      }),
      mutations: {
         login(state, username) {
            state.isAuthenticated = true;
            state.username = username;
         },
         logout(state) {
            state.isAuthenticated = false;
            state.username = null;
         },
      },
   });
};

export default createStore;
