import React, { Component } from 'react';
import {Provider} from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom'; 
import * as firebase from 'firebase/app';
import 'firebase/messaging';
import axios from 'axios';

import store from './store';
import './style/style.scss';
import {config} from './config/config';
import {server} from './config/keys';
import {setEventDetail,setTypes,setToken} from './actions/authAction';


import Landing from './components/Landing';
import Starter from './components/Starter';
import ListSubscription  from './components/ListSubscription';
import EventDetail  from './components/events/EventDetail';
import Navbar from './components/Navbar';

if(localStorage.subscribed) {
  let val = localStorage.subscribed;
  val = val.split(',');
  store.dispatch(setTypes(val));
}
if(localStorage.token) {
  let token = localStorage.token;
  token = JSON.parse(token);
  store.dispatch(setToken(token));
}
firebase.initializeApp(config);
export const messaging = firebase.messaging();

async function getValue() {
  await axios.get(`${server}/eventupdates`)
    .then(res =>   {
      store.dispatch(setEventDetail(res.data.value))
    })
    .catch(err => console.log(err));
  }
  getValue();

messaging.onMessage(function(payload) {
  window.location.reload();
  console.log('Message received. ', payload);
  console.log(`<h1>Messaage recived referesh and close tab to get notiy </h1>`);
});
class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <div>
        <Router>
          <div>
            <Navbar />
            <Route exact path="/" component={Starter}></Route>
            <Route exact path="/load" component={Landing}></Route>
            <Route exact path="/events" component={ListSubscription}></Route>
            <Route exact path="/eventDetail" component={EventDetail}></Route>
          </div>
        </Router>
      </div>
      </Provider>
    )
  }
}

export default App;
