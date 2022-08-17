<template>
    <section>
        <div class="card_result" id="card" data-tilt-glare data-tilt-max-glare="0.05" data-tilt-scale="1.05">
            <img :src="'https://'+img_link" alt="">
            <div>
                <h2>{{name}}</h2>
                <p class="prix">Estimation : <span class="orange">{{price}} $</span></p>
                <p class="rarete">Rareté : <span class="orange">{{rarity}}</span></p>
                <span class="num_id">#{{id}}/1826</span>
            </div> 
        </div>
        <router-link class="button__off" to="/opener">Retourner a la boutique</router-link>
    </section>
    
</template>

<script>

import {http} from "../assets/js/http-common.js"
import VanillaTilt from 'vanilla-tilt';

export default {
  name: 'ResultView',

    data(){
        return{
            id : this.$route.params.id, 
            name:'Nom de la chaussure',
            img_link: '',
            price: 0,
            rarity: '',
        }
    },
 
    async mounted(){
        await this.getResult(this.$route.params.id)
        const card = document.getElementById("card");
        VanillaTilt.init(card);
    },   
    
    methods:{
        async getResult(id){
            console.log(id);
            var _this = this

            await http.get('sneakers/'+id+'')
            .then((res) => {
                _this.name = res.data.data.attributes.Name;
                _this.img_link = res.data.data.attributes.Image;
                _this.price = res.data.data.attributes.Price;
                _this.rarity = res.data.data.attributes.Rarete;
                
            })
        },
    }
}
</script>

<style lang="scss" scoped>

section{
    height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    gap: 50px;

    .button__off{
        text-align: center;
        width: fit-content;
        text-decoration: none;
    }
    .card_result{
        position: relative;
        background: rgba(224, 224, 224, 1);
        width: 18%;
        border-radius: 20px;
        min-width: 300px;
        overflow: hidden;
        box-shadow: 0px 17px 50px 3px rgba(0,0,0,0.27);

        @keyframes fadein {
            from { opacity: 0; }
            to   { opacity: 1; }
        }

        img{
            width: 100%;
            opacity: 0;
            animation: 3s 3s fadein ease-in forwards;
        }
        div{
            position: relative;
            border: 1px solid rgb(63, 63, 63);
            background: #141414;
            padding: 25px;
            border-radius: 20px 20px 0px 0px;

            .num_id{
                opacity: 0;
                animation: 3s 3s fadein ease-in forwards;
                position: absolute;
                right: 10px;
                bottom: 10px;
                font-size: 12px;
                font-weight: 300;
                font-style: italic;
            }

            .orange{
                color: #F05E2F;;
            }

            .prix{
                opacity: 0;
                animation: 1s 2s fadein ease-in forwards;
            }

            .rarete{
                opacity: 0;
                animation: 1s 1s fadein ease-in forwards;
            }
            h2{
                opacity: 0;
                animation: 3s 4s fadein ease-in forwards;
                max-width: 80%;
                font-weight: 600;
                font-size: 20px;
                line-height: 24px;
                color: #FFFFFF;
            }
        }
        
    }
}

    

</style>
