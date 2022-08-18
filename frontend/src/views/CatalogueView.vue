<template>
    <div>
        <div class="profil_top">
            <h1>Catalogue</h1>
        </div>
        <div>
            <span>Page : </span>
            <button v-if="pagevalue>1" v-on:click="getCatalogue(pagevalue -1)">Previous</button>
            <span>{{pagevalue}}</span>
            <button v-if="pagevalue<77" v-on:click="getCatalogue(pagevalue + 1)">Next</button>
            <input type="number" v-model="pagevalue">
            <button v-on:click="getCatalogue(pagevalue)">Valider</button>
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
        }
    },

    async mounted(){
        await this.getCatalogue(1)    
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
                _this.getCatalogue(_this.pagevalue)
                
            })
        },

        async getCatalogue(pagenumber){
            console.log('tets');
            this.pagevalue = pagenumber
            this.catalogue = []
            var _this = this

            await http.get('sneakers?pagination[pageSize]=24&&pagination[page]='+pagenumber+'', {
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
