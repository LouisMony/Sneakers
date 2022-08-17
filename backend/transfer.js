console.log('start');

var axios = require('axios');
var Airtable = require('airtable');
var base = new Airtable({apiKey: 'key58f1MQG4qTe8dJ'}).base('appGfpZMEjuYMI28C');

const shoes_arr = []

base('Sheet1').select({view: "Grid view"}).eachPage(
    function page(records, fetchNextPage) {
        records.forEach(function(record) {
            const name_shoes = record.get('Titre')
            const price = record.get('Prix')
            const img = record.get('Image-src')
            shoes_arr.push({name_shoes, price, img})
        });

        fetchNextPage();

    }, function done(err) {
        sendtoStrapi();
        if (err) { console.error(err); return; }
    },
);

function sendtoStrapi(){
    shoes_arr.forEach(item => {
        //console.log(item.name_shoes);
        axios.post('http://localhost:1337/api/sneakers', {
            "data":{
                Name: item.name_shoes,
                Image: item.img,
                Price: item.price
            }
        })
        .then(function (response) {
            console.log('good');
        })
        .catch(function (error) {
            console.log(error);
        });
    })
}