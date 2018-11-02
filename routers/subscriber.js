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
    admin.messaging().subscribeToTopic(token, type)
    .then(function(response) {
        // See the MessagingTopicManagementResponse reference documentation
        // for the contents of response.
        console.log('Successfully subscribed to topic:', response);
    })
    .catch(function(error) {
        console.log('Error subscribing to topic:', error);
    });

}); 
router.post('/unsubscribe',(req,res) => {
    const {type,token} = req.body;
    console.log('______________________________________________');
    console.log(type,token);
    admin.messaging().unsubscribeFromTopic(token, type)
        .then(function(response) {
            // See the MessagingTopicManagementResponse reference documentation
            // for the contents of response.
            console.log('Successfully unsubscribed from topic:', response);
        })
        .catch(function(error) {
            console.log('Error unsubscribing from topic:', error);
        });
});
module.exports = router;