<template>
    <div>
        <div class="profil_top">
            <h1>Catalogue</h1>
            <input type="text" placeholder="Rechercher un modèle ..."  v-model="searchvalue">
        </div>

        <div class="display_card" >
            <div class="card" :class="[rang.collec ? 'collec' : 'pas-collec']"  v-for="rang in catalogue" :key="rang">
                <img :src="'https://'+rang.image">
                <h2>{{rang.name}}</h2>
                <span class="span_prix">Estimation: {{rang.price}} $</span>
                <span class="span_rarete">Rareté : {{rang.rarete}}</span>
                <button v-if="!rang.collec" v-on:click="Transaction(rang.price*10, null); Achat(rang.name, rang.rarete, rang.price, rang.image)" class="button">Acheter - {{rang.price*10}}$</button>
                <button v-else class="button__off">Obtenu</button>
            </div>
        </div>

        <div class="pagination">
            <span>Page : </span>
            
            <span class="icon active" v-if="pagevalue>1" v-on:click="getCatalogue(pagevalue -1,searchvalue)"><img src="@/assets/img/ico/ico_previous.png" alt="Previous"></span>
            <span class="icon" v-else ><img src="@/assets/img/ico/ico_previous.png" alt="Previous"></span>

            <span style="font-weight:bold">{{pagevalue}}</span>
            <span class="icon active" v-if="pagevalue<77" v-on:click="getCatalogue(pagevalue + 1, searchvalue)"><img src="@/assets/img/ico/ico_next.png" alt="Previous"></span>
            <span class="icon" v-else><img src="@/assets/img/ico/ico_next.png" alt="Next"></span>

            <input type="number" max="77" min="1" v-model="pagevalue">
            <button class='go' v-on:click="getCatalogue(pagevalue, searchvalue)">Valider</button>
        </div>
    </div>
</template>

<script>

import {http} from "../assets/js/http-common.js"

export default {
    name: 'CatalogueView',

    data(){
        return{
          catalogue:[],
          collection:[],
          pagevalue: 1,
          searchvalue:''
        }
    },
    watch: {
        searchvalue: function(val, oldVal) {
            this.getCatalogue(1, val)  
        }
    },

    async mounted(){
        await this.getCatalogue(1, '')    
    },   
    
    methods:{
        async Achat(name, rarete, prix, img){
            var _this = this
            var username = localStorage.getItem('username')
            var id = localStorage.getItem('id')
            await http.post('collections', 
            {
                "data":{
                    Proprietaire: username,
                    Prop_id: id,
                    Name: name,
                    Rarete: rarete,
                    Price: prix,
                    Image: img
                }
            },
            {
                headers: {
                    Authorization:
                    'Bearer '+localStorage.getItem('token')+'',
                },
            })
            .then(function (res) {
                console.log(res)
                _this.getCatalogue(_this.pagevalue, _this.searchvalue)
                
            })
        },

        async getCatalogue(pagenumber, name){
            console.log('tets');
            pagenumber = parseInt(pagenumber)
            this.pagevalue = pagenumber
            this.catalogue = []
            var _this = this

            await http.get('sneakers?pagination[pageSize]=24&&pagination[page]='+pagenumber+'&filters[Name][$contains]='+name+'', {
                headers: {
                    Authorization:
                    'Bearer '+localStorage.getItem('token')+'',
                },
            })
            .then(function (res) {
                console.log(res);
                res.data.data.forEach( item => {
                    var collec = false
                    http.get('collections?filters[Proprietaire][$eq]='+localStorage.getItem('username')+'&filters[Image][$eq]='+item.attributes.Image+'', {
                        headers: {
                            Authorization:
                            'Bearer '+localStorage.getItem('token')+'',
                        },
                    })
                    .then(function (res) {
                        console.log(res.data.data);
                        if(res.data.data.length === 1){collec = true}
                        console.log(collec);
                    })
                    .then(function() {
                        _this.catalogue.push({
                            id: item.id, 
                            collec: collec,
                            name: item.attributes.Name,
                            rarete: item.attributes.Rarete,
                            price : item.attributes.Price,
                            image : item.attributes.Image,
                        })
                    })
                })
            })
        }, 
    }
}
</script>

<style lang="scss" scoped>

.pagination{
    width: fit-content;
    margin: 30px auto;
    display: flex;
    align-items: center;
    gap: 10px;

    .icon{
        display: flex;
        align-items: center;
        img{
            height: 20px;
            opacity: 0.25;
        }
    }

    .active{
        cursor: pointer;
        img{
            opacity: 1;
        }
    }
    input, .go{
        width: 30px;
        height: 30px;
        background: transparent;
        border: solid 1px #c4c4c48f;
        outline: none;
        color: white;
        font-family: 'Poppins';
        text-align: center;
        border-radius: 5px;
        padding: 0 5px;
        transition: all 200ms linear;

        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
        }
    }

    .go{
        cursor: pointer;
        width: fit-content;
        border: none;
        &:hover{
            background: #C4C4C4;
            color: #1E1E1E;;
        }
    }

    input{
        margin-left:20px;
    }
}

.card{
    img{
        filter: brightness(0%);
    }
}

.collec{
    img{
        filter: brightness(100%)
    }
}
</style>
