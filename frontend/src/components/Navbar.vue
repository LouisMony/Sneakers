<template>
    <div>
        <ul>
            <li>
                <router-link to="/players" class="profil_li">
                    <img src="https://picsum.photos/id/684/400/400" alt="">
                    <span><span class="username">{{username}}</span><br/>{{credits}} $</span>
                </router-link>
            </li>
            <li><router-link class="redirect" to="/my-profil"><img src="@/assets/img/ico/ico_collection.png" alt="Collection">Collection</router-link></li>
            <li><router-link class="redirect" to="/opener"><img src="@/assets/img/ico/ico_shop.png" alt="Shop">Box</router-link></li>
            <li><router-link class="redirect" to="/echange"><img src="@/assets/img/ico/ico_echange.png" alt="Echange">Echanges</router-link></li>
            <li><router-link class="redirect" to="/bourse"><img src="@/assets/img/ico/ico_bourse.png" alt="Bourse">Bourse</router-link></li>
            <li><router-link class="redirect" to="/catalogue"><img src="@/assets/img/ico/ico_catalogue.png" alt="Catalogue">Catalogue</router-link></li>
            <li><router-link class="redirect" to="/players"><img src="@/assets/img/ico/ico_players.png" alt="Shop">Joueurs</router-link></li>
        </ul>
        <span v-on:click="disconnect" class="disconnect">Me deconnecter</span>
    </div>
</template>


<script>

export default {
    name: 'ProfilView',
    data(){
        return{
            username:localStorage.getItem('username'),
            credits: localStorage.getItem('credit'),
        }
    },

    async mounted(){
        this.getCredit()
    },

    methods:{
        disconnect() {
            localStorage.clear();
            this.$router.replace('/login')
        },
        async getCredit(){
            var _this = this

            setInterval(function () {
                _this.credits = localStorage.getItem('credit')
                _this.username = localStorage.getItem('username')
            }, 1000)
        },
    }
}
</script>

<style lang="scss" scopped>
ul{
  margin-left: 30px;
  margin-top: 30px;
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 40px;

  .profil_li{
    text-decoration: none;
    border-radius: 60px;
    width: fit-content;
    font-weight: 300;
    font-size: 16px;
    color: white;
    margin-bottom: 30px;
    display: flex;
    align-items: center;
    gap: 15px;
    cursor: pointer;

    .username{
        font-weight: 500;
        color: #C7C7C7;
        font-size: 14px;
    }
    img{
        border-radius: 50%;
        width: 40px;
        aspect-ratio: 1/1;
    }
  }
  
  .redirect{
    img{
        width: 25px;
    }
    text-decoration: none;
    color:rgba(255, 255, 255, 0.71);
    transition: all 200ms linear;
    font-style: normal;
    font-weight: 300;
    font-size: 16px;
    line-height: 30px;
    display: flex;
    align-items: center;
    gap: 15px;
    

    &:hover{
        color: #F05E2F;
    }
  }
}
.disconnect{
    color: #F05E2F;
    text-decoration: none;
    position: absolute;
    bottom: 30px;
    margin-left: 30px;
    cursor: pointer;
}
</style>