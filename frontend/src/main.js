import Vue from 'vue'
import App from './App.vue'
import router from './router'

import {http} from "../src/assets/js/http-common.js"

Vue.config.productionTip = false

Vue.mixin({
  methods: {
    async clearItem(id){
      console.log('start', id);
      //CLEAR VENTE STATE
      await http.put('collections/'+id+'', 
      {
          "data":{
              Vente: false,
              dispo_echange: false
          }
      },
      {
          headers: {
              Authorization:
              'Bearer '+localStorage.getItem('token')+'',
          },
      })
      .then(function (res) {
        console.log(res.data);
      })
      //CLEAR ECHANGES
      var idArr = []
      await http.get('echanges/?filters[chaussure_a_id][$eq]='+id+'',{
          headers: {
              Authorization:
              'Bearer '+localStorage.getItem('token')+'',
          },
      })
      .then(function (res) {
         console.log(res.data);
         res.data.data.forEach(item => {
            idArr.push(item.id)
         });
         console.log(idArr);
         idArr.forEach(item =>{
            http.delete('echanges/'+item+'',{
              headers: {
                  Authorization:
                  'Bearer '+localStorage.getItem('token')+'',
              },
            }).then(function (res) {
              console.log(res.data);
            })
         })
      })
      await http.get('echanges/?filters[chaussure_b_id][$eq]='+id+'',{
        headers: {
            Authorization:
            'Bearer '+localStorage.getItem('token')+'',
        },
      })
      .then(function (res) {
        console.log(res.data);
        res.data.data.forEach(item => {
            idArr.push(item.id)
        });
        console.log(idArr);
        idArr.forEach(item =>{
            http.delete('echanges/'+item+'',{
              headers: {
                  Authorization:
                  'Bearer '+localStorage.getItem('token')+'',
              },
            }).then(function (res) {
              console.log(res.data);
            })
        })
      })
    },

    async Transaction(price, destinataire_id) {
      price = parseInt(price)

      //BENEFICE
      if(destinataire_id !==null){
        var current_prop_credit = 0
        await http.get('users/'+destinataire_id+'', {
            headers: {
                Authorization:
                'Bearer '+localStorage.getItem('token')+'',
            },
        })
        .then(function (res) {
          current_prop_credit = parseInt(res.data.credits)
        })
        
        var new_current_prop_credit = current_prop_credit + price
        console.log(typeof(new_current_prop_credit), new_current_prop_credit, destinataire_id);
  
        await http.put('users/'+destinataire_id+'', 
        {
          "credits": new_current_prop_credit
        },
        {
            headers: {
                Authorization:
                'Bearer '+localStorage.getItem('token')+'',
            },
        }).then(function (res) {console.log(res)})
      }
      
      //DEPENSE
      var new_credits = parseInt(localStorage.getItem('credit')) - price
      await http.put('users/'+localStorage.getItem('id')+'', 
      {
        "credits": new_credits
      },
      {
          headers: {
              Authorization:
              'Bearer '+localStorage.getItem('token')+'',
          },
      }).then(function (res) {
        console.log(res)
        localStorage.setItem('credit', new_credits)
      })
    },
  },
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
