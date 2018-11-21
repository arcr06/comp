importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

var config = {
    apiKey: "AIzaSyCIp50Q5bBtj_I2P9Bve6ENa94Oak4hywc",
    authDomain: "comp-push.firebaseapp.com",
    databaseURL: "https://comp-push.firebaseio.com",
    projectId: "comp-push",
    storageBucket: "comp-push.appspot.com",
    messagingSenderId: "711039652461"
  };
firebase.initializeApp(config);

const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler((payload) => {
    const title = 'Hello world';
    const options = {   
        body: payload.data.status
    }
    return self.registration.showNotification(title,options);
});