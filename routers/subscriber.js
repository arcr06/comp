const express = require('express');
const router = express();
const admin = require('firebase-admin');
const fetch = require('node-fetch');

var serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://lacker-89773.firebaseio.com"
  });
  
router.post('/subscribe', (req,res) => {
    const {type,token} = req.body;
    admin.messaging().subscribeToTopic(token, type)
    .then(function(response) { 
        res.send({success: 'done'})
    })
    .catch(function(error) {
        console.log('Error subscribing to topic:', error);
        res.status(400).send({err: 'some err try again'})
    });

}); 

router.post('/unsubscribe',(req,res) => {
    const {type,token} = req.body; 
    admin.messaging().unsubscribeFromTopic(token, type)
        .then(function(response) { 
            console.log(response);
            res.send({success: 'done for unsubscribe'})
        })
        .catch(function(error) { 
            console.log(error);
            res.status(400).send({data: 'some err try again'})
        });
});
module.exports = router;