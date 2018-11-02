const express = require('express');
const router = express();
const admin = require('firebase-admin');
const fetch = require('node-fetch');

const User = require('../models/User');
var serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://lacker-89773.firebaseio.com"
  });
router.post('/subscribe', (req,res) => {
    const {type,token} = req.body;
    console.log('______________________________________________');
    console.log(type,token);
    res.json({type,token});
    // User.findOneAndUpdate({token},{subscribed},{new: true})
    //     .then(data => {
    //         if(subscribed.length > data.subscribed.length) {
    //             console.log('subscribe');
    //         } else if(subscribed.length < data.subscribed.length) {
    //             console.log('unscribed');
    //         }
    //     })
    //     .catch(err => console.log(err));
    // subscribed.map(val => {
    //     fetch(`https://iid.googleapis.com/iid/v1/${token}/rel/topics/${val}`, {
    //         'method': 'POST',
    //         'headers': {
    //         'Authorization': 'key=AAAA5TiNFQo:APA91bEzxGiz5SAAgsHVfuNevP_ABeRfXsPKjEES2Hg29LfFHVHd7NaqqfJZk9cq8G-vMs_l3eZC2ZEt4yK5K221sq0LMD8gzzY90neUMZFNSZISR6VUlw40O0TuoV-VNS5b_DOgWXFB',
    //         'Content-Type': 'application/json'
    //         }
    //     })
    //     .then(data =>  {
    //         console.log(data.status);
    //         sendMSg();
    //         })
    //     .catch(err => console.log(err));
    // });
//     
}); 
router.post('/unsubscribe',(req,res) => {
    const {type,token} = req.body;
    console.log('______________________________________________');
    console.log(type,token);
    res.json({type,token});
});
module.exports = router;