const admin = require('firebase-admin');
module.exports.sendMsg = function(value) {
  console.log(value);
    var message = {
      topic: value.topic,
      notification: {
        title: value.title,
        body: value.desc
      },
      android: {  
        ttl: 3600 * 1000,
        notification: {
          icon: 'https://firebasestorage.googleapis.com/v0/b/lacker-89773.appspot.com/o/LOGO-IT-MANAGER-PNG.png?alt=media&token=b0c16116-3dee-4666-87a4-2f9d990792cc',
          color: '#f45342',
          sound: 'default'
        },
      },
      apns: {
        payload: {
          aps: {
            badge: 42,
            sound:'default'
          },
        },
      } 
    };
    admin.messaging().send(message)
      .then((response) => {
        console.log('Successfully sent message:', response);
      })
      .catch((error) => {
        console.log('Error sending message:', error);
      });
    console.log(value);
  };