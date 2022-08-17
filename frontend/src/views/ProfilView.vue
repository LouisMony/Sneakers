<template>
    <div>
        <div class="profil">
            <div class="profil_top">
                <h1>COLLECTION</h1>
                <input type="text" placeholder="Rechercher un modèle ..."  v-model="searchvalue">
            </div>
            
            <div class="info">
                <div>{{description}}</div>
                <div class="jauge_collection">
                    <span>Modèle possédé : {{collection_size}} / 1836</span>
                    <div class="global_jauge">
                        <div id="personal_jauge" class="personal_jauge"></div>
                    </div>

                </div>
            </div>
            <div class="display_card" >
                <div class="card" v-for="rang in chaussure" :key="rang">
                    <img :src="'https://'+rang.Image">
                    <h2>{{rang.Name}}</h2>
                    <span class="span_prix">Estimation: {{rang.Price}} $</span>
                    <span class="span_rarete">Rareté : {{rang.Rarete}}</span>
                    <button class="button" v-on:click="ToggleState(rang.ID, rang.Vente)" v-if="rang.Vente === false">Vendre</button>
                    <button class="button__off" v-on:click="ToggleState(rang.ID, rang.Vente)" v-else>Stopper la vente</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import {http} from "../assets/js/http-common.js"

export default {
  name: 'ProfilView',

    data(){
        return{
            credits: localStorage.getItem('credit'),
            collection_size : 0,
            chaussure: [],
            searchvalue:'',
            description: localStorage.getItem('description')
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
        await this.getCollection()
        const progressbar = document.getElementById("personal_jauge")
        var progress_width = Math.round((this.collection_size / 1836)*100)
        progressbar.style.width = progress_width+"%"
    },
    methods:{
        disconnect() {
            localStorage.clear();
            this.$router.replace('/login')
        },
        Search: function(event){
            console.log(event.target.value)
        },
        async ToggleState(id, state){
            var new_state = true
            if(state === true){new_state = false}

            console.log(id, state);
            await http.put('collections/'+id+'', 
            {
                "data":{
                    Vente: new_state,
                }
            },
            {
                headers: {
                    Authorization:
                    'Bearer '+localStorage.getItem('token')+'',
                },
            })
            this.getCollection()
        },

        async getCollection(){
            var userChaussure = []
            await http.get('collections?filters[proprietaire][$eq]='+localStorage.getItem('username')+'', {
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
                    var rarity = item.attributes.Rarete
                    console.log(rarity);
                    var vente = item.attributes.Vente
                    userChaussure.push({Name: name, Image : image, Price: prix, Vente: vente, ID: item.id, Rarete: rarity}) 
                })
            })
            this.collection_size = userChaussure.length
            userChaussure.sort(function (a, b) {
                return b.Price - a.Price;
            });
            this.chaussure = userChaussure
        }

    }
}
</script>

<style lang="scss" scopped>
.profil{

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
    
    .info{
        height: 100px;
        padding: 25px;
        background: rgba(0, 0, 0, 0.35);
        border-radius: 30px;
        display: flex;
        align-items: center;


        div{
            width: 50%;
            font-weight: 400;
            font-size: 14px;
            line-height: 24px;

            .global_jauge{
                margin-top: 10px;
                width: 100%;
                height: 4px;
                background: #1E1E1E;
                overflow: hidden;
                border-radius: 3px;

                .personal_jauge{
                    border-radius: 3px;
                    height: 100%;
                    width: 20%;
                    background: #FF8843;
                }
            }
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
            .span_rarete{
                margin-bottom: 25px;
            }
        }
    }
    
}
</style>