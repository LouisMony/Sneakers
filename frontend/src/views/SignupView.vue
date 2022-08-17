<template>
  <div>
  <form @submit.prevent="submitForm">
        <div class="form">
            <h1>Créer mon compte</h1>
            <p>Créer ton compte et rejoins la plus grande communauté de collectionneurs de sneakers !</p>
            <input type="text" v-model="username" placeholder="Nom d'utilisateur" />
            <input type="text" v-model="email" placeholder="Adresse e-mail" />
            <input type="password" v-model="password" placeholder="Mot de passe"/>
            <input type="text" v-model="description" placeholder="Description"/>
            <button class="button">Continuer</button>
            <router-link class="redirect" to="/login">J'ai déja un compte</router-link>
        </div>
    </form>
  </div>
</template>

<script>

import {http} from "../assets/js/http-common.js"

export default {
  name: 'SignupView',

  data(){
      return{
          username: "",
          email:"",
          password:"",
          description:""
      }
  },
 
    mounted(){
        if(localStorage.getItem('username') !== null){
            this.$router.replace('/opener')
        }
    },
    methods:{
        submitForm(){
            http.post('auth/local/register', {
                username: this.username,
                email: this.email,
                password: this.password,
                description: this.description,
                Date_nextpack: new Date(),
                credits: 5000

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

<style lang="scss" scopped>
.form{
    min-width: 400px;
    display: flex;
    flex-direction: column;
    margin: auto;
    width: fit-content;

    h1, p, .redirect{
        text-align: center;
    }
    h1{
        font-size: 30px;
    }
    p{
        padding: 0;
        margin: 0 0 30px 0;
    }
    .redirect{
        margin-top: 20px;
        color: #C7C7C7;
        text-decoration: none;
        font-size: 14px;
        &:hover{
            text-decoration: underline;
        }
    }
    input{
        width: 70%;
        margin: auto;
        font-family: 'Poppins';
        background: #131313;
        border: 1px solid #2b2b2b;
        padding: 15px;
        margin-bottom: 20px;
        outline: none;
        color: #C7C7C7;
        border-radius: 50px;
    }

    .button{
        width: 30%;
        margin: auto;
    }
}
</style>