<template>
    <div>
        <div class="profil_top">
            <h1>Joueurs</h1>
            <input type="text" placeholder="Rechercher une personne ..."  v-model="searchvalue">
        </div>
        <table>
            <tbody>
                <tr v-for="rang in users" :key="rang">
                    <td><img src="https://picsum.photos/id/684/40/40" alt=""></td>
                    <td class="td_username">{{rang.username}}</td>
                    <td>{{rang.credits}}</td>
                    <td><router-link :to="{ name: 'player', params: {username: rang.username } }">Voir la collection</router-link></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

import {http} from "../assets/js/http-common.js"

export default {
  name: 'PlayersView',

    data(){
        return{
            searchvalue: '',
            users:[]
        }
    },
    watch: {
        searchvalue: function(val, oldVal) {
            const users = document.querySelectorAll('tr')
            const usersArr = Array.from(users);
            if(val !== ''){
                val = val.toLowerCase()
                usersArr.forEach(item => {
                    var name =item.querySelector('.td_username').textContent.toLowerCase();
                    if(name.includes(val)){
                        item.style.display = "block"
                    }
                    else{
                        item.style.display = "none"
                    }
                })
            }else{
                usersArr.forEach(item => {
                    item.style.display = "block"
                })
            }
        }
    },
 
    async mounted(){
        await this.getUsers()
    },   
    
    methods:{
        async getUsers(){
            var _this = this
            await http.get('users',
            {
                headers: {
                    Authorization:
                    'Bearer '+localStorage.getItem('token')+'',
                },
            })
            .then((res) => {
                console.log(res.data);
                res.data.forEach(item => {
                    _this.users.push({username: item.username, credits: item.credits})
                });
                console.log(_this.users)
                
            })
        }
    }
}
</script>

<style lang="scss" scoped>

table{
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.53) -32.96%, #141414 100%);
    width: 100%;
    border-radius:20px;
    padding: 20px;

    tr{
        border-bottom: 1px solid #C7C7C7;
        margin-bottom: 10px;

        td{
            img{
                border-radius: 50%;
            }
        }
    }
}
</style>
