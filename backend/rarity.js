/*
async Rarity(){
    for (let i = 1; i < 1836; i++) {
        await http.get('sneakers/'+i+'', {
            headers: {
            Authorization:
            'Bearer '+localStorage.getItem('token')+'',
            },
        })
        .then(async function (res) {
            var price_shoe = res.data.data.attributes.Price;
            var rar = 'Commun'
            if(price_shoe > 200 && price_shoe < 300 ){rar = 'Peu commun'}
            else if(price_shoe >= 300 && price_shoe < 400 ){rar = 'Rare'}
            else if(price_shoe >= 400 && price_shoe < 500 ){rar = 'Trés rare'}
            else if(price_shoe >= 500 && price_shoe < 600 ){rar = 'Super rare'}
            else if(price_shoe >= 600 && price_shoe < 700 ){rar = 'Ultra rare'}
            else if(price_shoe >= 700 && price_shoe < 800 ){rar = 'Épique'}
            else if(price_shoe >= 800 && price_shoe < 900 ){rar = 'Super épique'}
            else if(price_shoe >= 900 && price_shoe < 1000 ){rar = 'Ultra épique'}
            else if(price_shoe >= 1000 && price_shoe < 3000 ){rar = 'Légendaire'}
            else if(price_shoe >= 3000){rar = 'Mythique'}

            await http.put('sneakers/'+i+'', 
            {
                "data":{
                    Rarete: rar,
                }
            },
            {
                headers: {
                    Authorization:
                    'Bearer '+localStorage.getItem('token')+'',
                },
            })

            console.log(price_shoe, rar);
        })   
    }
},
*/
    
