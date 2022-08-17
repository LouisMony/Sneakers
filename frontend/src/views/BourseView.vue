<template>
    <div>
        <div class="profil_top">
                <h1>BOURSE</h1>
                <input type="text" placeholder="Rechercher un modèle ..."  v-model="searchvalue">
            </div>
        <div class="display_card" >
            <div class="card" v-for="rang in chaussure" :key="rang">
                <img :src="'https://'+rang.Image">
                <h2>{{rang.Name}}</h2>
                <span class="span_prix"> Prix: {{rang.Price}} $</span>
                <button class="button" v-if="rang.Proprietaire_name !== current_username" v-on:click="Achat(rang.ID, rang.Vente); Transaction(rang.Price, rang.Proprietaire)">Acheter</button>
                <button class="button__off" v-else>Votre vente</button>

            </div>
        </div> 
    </div>
</template>

<script>

import {http} from "../assets/js/http-common.js"

export default {
  name: 'BourseView',

    data(){
        return{
            chaussure: [],
            searchvalue:'',
            current_username: localStorage.getItem('username')
        }
    },
    watch: {
        searchvalue: function(val, oldVal) {
            const cards = document.querySelectorAll('.card')
            const cardsArr = Array.from(cards);
            if(val !== ''){
                val = val.toLowerCase()
                cardsArr.forEach(item => {
                    var name =item.querySelector('h2').textContent.toLowerCase();
                    if(name.includes(val)){
                        item.style.display = "flex"
                    }
                    else{
                        item.style.display = "none"
                    }
                })
            }else{
                cardsArr.forEach(item => {
                    item.style.display = "flex"
                })
            }
        }
    },
 
    async mounted(){
        await this.getSale()
    },
    methods:{
        async Achat(id, state){
            console.log(id, state);
            await http.put('collections/'+id+'', 
            {
                "data":{
                    Proprietaire: localStorage.getItem('username'),
                    Prop_id: parseInt(localStorage.getItem('id')),
                    Vente: false,
                }
            },
            {
                headers: {
                    Authorization:
                    'Bearer '+localStorage.getItem('token')+'',
                },
            })
            this.getSale()
        },

        async getSale(){
            var userChaussure = []
            await http.get('collections?filters[Vente][$eq]=true', {
                headers: {
                    Authorization:
                    'Bearer '+localStorage.getItem('token')+'',
                },
            })
            .then(function (res) {
                res.data.data.forEach( item => {
                    var name = item.attributes.Name;
                    var image = item.attributes.Image;
                    var prix = item.attributes.Price;
                    var vente = item.attributes.Vente;
                    var proprietaire = item.attributes.Proprietaire;
                    var prop = item.attributes.Prop_id
                    userChaussure.push({Name: name, Image : image, Price: prix, Vente: vente, ID: item.id, Proprietaire: prop, Proprietaire_name: proprietaire}) 
                })
            })
            this.chaussure = userChaussure
        }

    }
}
</script>

<style lang="scss" scopped>

.profil_top{
    display: flex;
    justify-content: space-between;
    align-items: center;

    h1{
        font-weight: 700;
        font-size: 64px;
        color: white;
        margin: 30px 0 20px 0 ;
    }
    input{
        color: #C7C7C7;
        width: 30%;
        padding: 10px 0;
        outline: none;
        background: transparent;
        border: none;
        font-family: 'Poppins';
        border-bottom: solid 1px rgba(255, 255, 255, 0.35); ;

    }
}

.display_card{
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-between;

    .card{
        margin: 25px 0 25px 0;
        width: 24%;
        // height: 360px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 20px 0 ;
        background: linear-gradient(0deg, rgba(0, 0, 0, 0.53) -32.96%, #141414 100%);
        border: 1px solid rgba(255, 255, 255, 0.13);
        border-radius: 25px;
        align-items: center;
        transition: all 200ms ease-out;

        &:hover{
            box-shadow: 0px 17px 50px 3px rgba(0,0,0,0.1);
            transform: scale(1.02);
        }

        img{
            max-width: 80%;
        }

        h2{
            max-width: 80%;
            font-weight: 600;
            font-size: 20px;
            line-height: 24px;
            color: #FFFFFF;
        }
        .span_prix{
            font-size: 20px;
            font-weight: bold;
            color: #F05E2F;
        }
        .span_rarete{
            margin-bottom: 25px;
        }
    }
}

</style>

