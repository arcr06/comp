importScripts('fire-app.js');
importScripts('fire.js');

var config = {
    apiKey: "AIzaSyAF36tTPv2e3s44oebncjDv5gtwcQhv09o",
    authDomain: "lacker-89773.firebaseapp.com",
    databaseURL: "https://lacker-89773.firebaseio.com",
    projectId: "lacker-89773",
    storageBucket: "lacker-89773.appspot.com",
    messagingSenderId: "984496280842"
};
firebase.initializeApp(config);

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler((payload) => {
    const title = 'Hello world';
    const options = {   
        body: payload.data.status,
        icon: './logo.png'
    }
    return self.registration.showNotification(title,options);
});