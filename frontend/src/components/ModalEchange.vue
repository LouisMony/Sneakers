<template>
    <div class="modal">
        <div class="modal_main">
            <img src="@/assets/img/ico/ico_close.png" class="close" v-on:click="close()" alt="close">
            <h2>Choisis un modèle à échanger</h2>
            <div class="ligne" v-for="rang in chaussure" :key="rang" v-on:click="submitEchange(rang.Image, rang.Id)">
                <img :src="'https://'+rang.Image">
                <span>{{rang.Name}}</span>
            </div>
        </div>
    </div>
</template>


<script>
import {http} from "../assets/js/http-common.js"

export default {
    name: 'ModaleEchange',
    data(){
        return{
            chaussure:[]
        }
    },

    async mounted(){
        await this.getCollection()
    },

    methods:{
        close(){
            location.reload()
        },
        async submitEchange(image, id){
            var id_a = localStorage.getItem('id_echange')
            var user_a = localStorage.getItem('prop_echange')
            var img_a = localStorage.getItem('img_echange')
            var user_b = localStorage.getItem('username')

            console.log(id_a, user_a, img_a, id, user_b, image );
            
            http.post('echanges', 
            {
                "data":{
                    chaussure_a_prop: user_a,
                    chaussure_a_id: id_a,
                    chaussure_a_img: img_a,
                    chaussure_b_prop: user_b,
                    chaussure_b_id: id.toString(),
                    chaussure_b_img: image
                }
            },
            {
                headers: {
                    Authorization:
                    'Bearer '+localStorage.getItem('token')+'',
                },
            })
            .then((res) => {
                console.log(res)
                localStorage.removeItem('img_echange')
                localStorage.removeItem('id_echange')
                localStorage.removeItem('prop_echange')
                location.reload()
            })
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
                    var vente = item.attributes.Vente
                    var id = item.id
                    userChaussure.push({Id: id, Name: name, Image : image, Price: prix, Vente: vente, ID: item.id, Rarete: rarity}) 
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
    .modal{
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0, 0, 0, 0.743);
        backdrop-filter: blur(10px);
        z-index: 100;

        .modal_main{
            position: relative;
            width: 30%;
            height: 50vh;
            background: #131313;
            box-shadow: none;
            border-radius: 20px;
            text-align: center;
            overflow-x: hidden;
            overflow-y: scroll;
            -ms-overflow-style: none; 
            scrollbar-width: none;

            &::-webkit-scrollbar {
                display: none;
            }

            .close{
                position: absolute;
                top: 10px;
                left: 10px;
                cursor: pointer;
            }

            .ligne{
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 90%;
                margin: auto;
                height: 50px;
                padding: 10px 0;
                border-bottom: solid 1px #c4c4c44a;
                text-align: right;
                font-size: 12px;
                transition: all 200ms linear;
                cursor: pointer;

                &:hover{
                    background: #ffffff34;
                }

                img{
                    height: 100%;
                }
            }
        }
    }
</style>