<template>
  <div>
  <form @submit.prevent="submitForm">
        <div class="form">
            <h1>Me connecter</h1>
            <input type="text" v-model="username" placeholder="Email"/>
            <input type="password" v-model="password" placeholder="Mot de passe"/>
            <button class="button">Continuer</button>
            <router-link class="redirect" to="/signup">Je n'ai pas encore de compte</router-link>
        </div>
    </form>
  </div>
</template>

<script>

import {http} from "../assets/js/http-common.js"

export default {
  name: 'LoginView',

  data(){
      return{
          username: "",
          password:"",
      }
  },
 
    mounted(){
        if(localStorage.getItem('username') !== null){
            this.$router.replace('/opener')
        }
    },
    methods:{
        submitForm(){
            http.post('auth/local', {
                identifier: this.username,
                password: this.password
            }).then(res => {
                console.log(res.data)
                localStorage.setItem('token', res.data.jwt)
                localStorage.setItem('id', res.data.user.id)
                localStorage.setItem('username', res.data.user.username)
                localStorage.setItem('credit', res.data.user.credits)
                localStorage.setItem('nextdate', res.data.user.Date_nextpack)
                localStorage.setItem('description', res.data.user.description)
                
                if(localStorage.getItem('username') !== null){
                    this.$router.replace('/opener')
                }
                })
        }
    }
}
</script>