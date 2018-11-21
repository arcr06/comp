const admin = require('firebase-admin');
module.exports.sendMsg = function(value) {
    var message = {
      topic: value.topic,
      notification: {
        title: value.title,
        body: value.desc
      },
      webpush: {
        headers : {
          Urgency: 'high'
        },
        notification: {
          body: value.desc,
          badge:'https://firebasestorage.googleapis.com/v0/b/lacker-89773.appspot.com/o/LOGO-IT-MANAGER-PNG.png?alt=media&token=b0c16116-3dee-4666-87a4-2f9d990792cc',
          icon: 'https://firebasestorage.googleapis.com/v0/b/lacker-89773.appspot.com/o/LOGO-IT-MANAGER-PNG.png?alt=media&token=b0c16116-3dee-4666-87a4-2f9d990792cc',
          tag: 'renotify-tag',
          renotify: true,
          sound: 'https://firebasestorage.googleapis.com/v0/b/lacker-89773.appspot.com/o/to-the-point.mp3?alt=media&token=bb0c2188-e778-4080-ac79-5bd689b62539',
          vibrate: [500,110,500,110,450,110,200,110,170,40,450,110,200,110,170,40,500],
          click_action: 'https://updates.compositefest.in/events',
          data: {
            click_action: 'https://updates.compositefest.in/events'
          }
        }
      },
      android: {  
        ttl: 3600 * 1000,
        notification: {
          icon: 'https://firebasestorage.googleapis.com/v0/b/lacker-89773.appspot.com/o/LOGO-IT-MANAGER-PNG.png?alt=media&token=b0c16116-3dee-4666-87a4-2f9d990792cc',
          color: '#f45342',
          sound: 'https://firebasestorage.googleapis.com/v0/b/lacker-89773.appspot.com/o/to-the-point.mp3?alt=media&token=bb0c2188-e778-4080-ac79-5bd689b62539'
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
  };