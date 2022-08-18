<template>
    <div>
        <div class="profil_top">
            <h1>Echanges</h1>
        </div>
        <h2>Offre recues :</h2>
        <div class="echange_card" v-for="rang in echange" :key="rang">
            <div>
                <img :src="'https://'+rang.chaussure_a_img">
                <span>Toi</span>
            </div>
            <img src="@/assets/img/ico/ico_echange.png" alt="ico">
            <div>
                <img :src="'https://'+rang.chaussure_b_img">
                <span>{{rang.chaussure_b_prop}}</span> 
            </div>
            <div>
                <button class="button" v-on:click="acceptOffre(rang.id, rang.chaussure_a_id, rang.chaussure_a_prop, rang.chaussure_b_id, rang.chaussure_b_prop ); clearItem(rang.chaussure_a_id); clearItem(rang.chaussure_b_id)">Accepter l'offre</button>
                <button class="button__off" v-on:click="deleteOffre(rang.id)">Refuser l'offre</button>
            </div>
        </div>
        <h2>Offre envoyées :</h2>
        <div class="echange_card" v-for="rang in mes_echange" :key="rang">
            <div>
                <img :src="'https://'+rang.chaussure_a_img">
                <span>{{rang.chaussure_a_prop}}</span>
            </div>
            <img src="@/assets/img/ico/ico_echange.png" alt="ico">
            <div>
                <img :src="'https://'+rang.chaussure_b_img">
                <span>Toi</span> 
            </div>
            <div>
                <button class="button__off" v-on:click="deleteOffre(rang.id);">Annulter l'offre</button>
            </div>
        </div>
    </div>
</template>

<script>

import {http} from "../assets/js/http-common.js"

export default {
    name: 'PlayersDetailsView',

    data(){
        return{
            username: localStorage.getItem('username'),
            echange:[], 
            mes_echange:[], 
        }
    },

    async mounted(){
        var tab = await this.getCollection('chaussure_a_prop')
        this.echange = tab
        var tab_2 = await this.getCollection('chaussure_b_prop')
        this.mes_echange = tab_2
    },   
    
    methods:{
        async getCollection(param){
            console.log('tets');
            var userEchange = []

            await http.get('echanges?filters['+param+'][$eq]='+this.username+'', {
                headers: {
                    Authorization:
                    'Bearer '+localStorage.getItem('token')+'',
                },
            })
            .then(function (res) {
                console.log(res);
                res.data.data.forEach( item => {
                    var id = item.id
                    var chaussure_a_prop = item.attributes.chaussure_a_prop;
                    var chaussure_b_prop = item.attributes.chaussure_b_prop;
                    var chaussure_a_id = item.attributes.chaussure_a_id;
                    var chaussure_b_id = item.attributes.chaussure_b_id;
                    var chaussure_a_img = item.attributes.chaussure_a_img;
                    var chaussure_b_img = item.attributes.chaussure_b_img;
                    
                    userEchange.push({
                        id: id, 
                        chaussure_a_prop: chaussure_a_prop, 
                        chaussure_b_prop: chaussure_b_prop,
                        chaussure_a_id : chaussure_a_id,
                        chaussure_b_id : chaussure_b_id,
                        chaussure_a_img : chaussure_a_img,
                        chaussure_b_img : chaussure_b_img
                    }) 
                })
            })
            return userEchange
        }, 
        async acceptOffre(id, chaussure_a_id, chaussure_a_prop, chaussure_b_id, chaussure_b_prop){
            await http.put('collections/'+chaussure_a_id+'', 
            {
                "data":{
                    "Proprietaire": chaussure_b_prop
                }   
            },
            {
                headers: {
                    Authorization:
                    'Bearer '+localStorage.getItem('token')+'',
                },
            }).then(function (res) {
                console.log(res)
            })
            await http.put('collections/'+chaussure_b_id+'', 
             {
                "data":{
                    "Proprietaire": chaussure_a_prop
                }   
            },
            {
                headers: {
                    Authorization:
                    'Bearer '+localStorage.getItem('token')+'',
                },
            }).then(function (res) {
                console.log(res)
            })
            this.deleteOffre(id)
        },
        async deleteOffre(id){
            var _this = this
            await http.delete('echanges/'+id+'', {
                headers: {
                    Authorization:
                    'Bearer '+localStorage.getItem('token')+'',
                },
            })
            .then(async function (res) {
                console.log(res);
                var tab = await _this.getCollection('chaussure_a_prop')
                _this.echange = tab
                var tab_2 = await  _this.getCollection('chaussure_b_prop')
                _this.mes_echange = tab_2
            })
        }
    }
}
</script>

<style lang="scss" scoped>

.echange_card{
    background: #131313;
    border-radius: 20px;
    padding: 10px;
    width: 70%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;

    div{
        width: 33%;
        display: flex;
        flex-direction: column;
        text-align: center;
        gap: 10px;
        img{
            width: 100%;
            max-width: 300px;
        }

    }
}
</style>
