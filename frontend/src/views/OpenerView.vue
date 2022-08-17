<template>
  <div class="Main">
    <h1>BOX SHOP</h1>
    <div class="info">
        <span v-if="date === false">Prochaine BOX gratuite dans : {{date_string}}</span><br/>

        <button v-if="date === true" class="button" v-on:click="modifDate()" id="free_box">Box gratuite disponible</button>
    </div>
    <div class="display_card" >
        <div class="card">
            <img src="@/assets/img/BOX_Nike.png" alt="Nike Box">
            <h2>Nike Box</h2>
            <span>Contient un chaussure nike</span>
            <button class="button" v-on:click="OpenPack('Nike'); Transaction(1000, null)">Acheter : 1000 $</button>
        </div>

        <div class="card">
            <img src="@/assets/img/BOX_Yeezy.png" alt="Yeezy Box">
            <h2>Adidas / Yeezy Box</h2>
            <span>Contient un chaussure Adidas / Yeezy</span>
            <button class="button" v-on:click="OpenPack('Adidas'); Transaction(1000, null)">Acheter : 1000 $</button>
        </div>

        <div class="card">
            <img src="@/assets/img/BOX_Jordan.png" alt="Jordan Box">
            <h2>Jordan Box</h2>
            <span>Contient un chaussure Jordan</span>
            <button class="button" v-on:click="OpenPack('Jordan'); Transaction(1000, null)">Acheter : 1000 $</button>
        </div>
        <div class="card">
            <img src="@/assets/img/BOX_NB.png" alt="New Balance Box">
            <h2>New Balance Box</h2>
            <span>Contient un chaussure New Balance</span>
            <button class="button" v-on:click="OpenPack('New Balance'); Transaction(1000, null)">Acheter : 1000 $</button>
        </div>
        <div class="card">
            <img src="@/assets/img/BOX_Converse.png" alt="Converse Box">
            <h2>Converse Box</h2>
            <span>Contient un chaussure Converse</span>
            <button class="button" v-on:click="OpenPack('Converse'); Transaction(1000, null)">Acheter : 1000 $</button>
        </div>
    </div>
  </div>
</template>

<script>

import {http} from "../assets/js/http-common.js"


export default {
  name: 'OpenerView',

    data(){
        return{
            chaussure:[],
            date: false,
            date_string:""
        }
    },
    async mounted(){
        this.getTime();
        
    },

    /* PROPORTION
     - DE 200 : 565/1836 => 31 // COMMUN
     - DE 300 : 696/1836 => 31 -> 68 // PEU COMMUN
     - DE 400 : 272/1836 => 68 -> 83 // RARE
     - DE 500 : 108/1836 => 83 -> 89 // TRES RARE
     - DE 600 : 55/1836 => 89 -> 92 // SUPER RARE
     - DE 700 : 47/1836 => 92 -> 95 // ULTRA RARE
     - DE 800 : 27/1836 => 95 -> 96.5 // EPIQUE
     - DE 900 : 16/1836 => 96.5 -> 97.5 // SUPER EPIQUE
     - DE 1000 : 9/1836 => 97.5 -> 98.7 // ULTRA EPIQUE
     - DE 3000 : 30/1836 => 98.7 -> 99.7 // LEGENDAIRE
       RESTE : 10/1836 => 99.7 -> 100 // MYTHIQUE
    */

     methods:{
        async getTime(){
            var _this = this

            setInterval(function () {
                var nextdate = new Date(localStorage.getItem('nextdate'))
                var today = new Date()
                if(nextdate < today){_this.date =  true}
                else{
                    _this.date = false
                    var Difference_In_Time = (Math.abs(nextdate - today))/1000
                    _this.date_string = _this.secondsToDhms(Difference_In_Time);
                }
            }, 1000)
        },
        secondsToDhms(seconds) {
            seconds = Number(seconds);
            var d = Math.floor(seconds / (3600*24));
            var h = Math.floor(seconds % (3600*24) / 3600);
            var m = Math.floor(seconds % 3600 / 60);
            var s = Math.floor(seconds % 60);

            var dDisplay = d > 0 ? d + " Jours " : "";
            var hDisplay = h > 0 ? h + " h " : "";
            var mDisplay = m > 0 ? m + " min " : "";
            var sDisplay = s > 0 ? s + " sec " : "";
            return dDisplay + hDisplay + mDisplay + sDisplay;
        },
        async modifDate(){
            var _this = this
            var today = new Date()
            var nextdate = new Date(today.setTime(today.getTime() + 1 * 60 * 60 * 1000));
            localStorage.setItem('nextdate', nextdate);

            await http.put('users/'+localStorage.getItem('id')+'', 
            {
                "Date_nextpack": nextdate
            },
            {
                headers: {
                    Authorization:
                    'Bearer '+localStorage.getItem('token')+'',
                },
            }).then(function (res) {
                console.log(res)
                _this.OpenPack(' ')
            })
        },
        async OpenPack(marque){
            var ShoesArr = []
            for (let i = 0; i < 1; i++) {
                var id = Math.floor(Math.random() * 1836);
                if(id === 0){id = 1}

                await http.get('sneakers/'+id+'')
                .then((res) => {
                    var nom = res.data.data.attributes.Name;
                    var check_marque = nom.includes(marque)
                    if(check_marque === true){
                        ShoesArr.push({
                            id : res.data.data.id,
                            name: res.data.data.attributes.Name, 
                            image: res.data.data.attributes.Image, 
                            prix: res.data.data.attributes.Price,
                            rarity: res.data.data.attributes.Rarete
                        })
                    
                        this.chaussure = ShoesArr;
                    }
                    else{this.OpenPack(marque)}
                })
            }
            this.addPack(ShoesArr)
        },

        async addPack(array){
            const user_id = localStorage.getItem('username')
            array.forEach(item =>{
                http.post('collections', 
                {
                    "data":{
                        Name: item.name,
                        Image: item.image,
                        Price: item.prix,
                        Rarete: item.rarity,
                        Proprietaire: user_id,
                        Prop_id: localStorage.getItem('id')
                    }
                })
                .then((res) => {
                    this.$router.push('/result/'+array[0].id+'')
                })
            })
        }
    }
}

</script>

<style lang="scss" scopped>

    h1{
        font-weight: 700;
        font-size: 64px;
        color: white;
        margin: 30px 0 20px 0 ;
    }
    .info{
        display: flex;
        align-items: center;
        height: fit-content;
        padding: 25px;
        background: rgba(0, 0, 0, 0.35);
        border-radius: 30px;

        .chrono{
            font-weight: 700;
            font-size: 64px;
            line-height: 96px;
            color: #FFFFFF;
            text-align: center;
        }
        .button{
            width: 30%;
            margin: auto;
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
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 20px 0 ;
            background: linear-gradient(0deg, rgba(0, 0, 0, 0.53) -32.96%, #141414 100%);
            border: 1px solid rgba(255, 255, 255, 0.13);
            border-radius: 25px;
            align-items: center;
            transition: all 200ms ease-out;

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
            button{
                margin-top: 20px;
            }
        }
    }
</style>
