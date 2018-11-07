import React, { Component } from 'react';
import {Provider} from 'react-redux';
import { BrowserRouter as Router, Route , Switch} from 'react-router-dom'; 
import * as firebase from 'firebase/app';
import 'firebase/messaging';
import axios from 'axios';
import iziToast from 'izitoast';

import store from './store';
import './style/style.scss';
import {config} from './config/config';
import {server} from './config/keys';
import {setEventDetail,setTypes,setToken} from './actions/authAction';
import '../node_modules/izitoast/dist/css/iziToast.css';

import NotFound from './components/NotFound';
import Starter from './components/Starter';
import ListSubscription  from './components/ListSubscription';
import EventDetail  from './components/events/EventDetail';
import Login from './container/Login';
import Event from './container/Updator/Event';
import AddEvent from './container/Updator/AddEvent';
import UpdateEvent from './container/Updator/UpdateEvent';
import DeleteEvent from './container/Updator/DeleteEvent';


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

export async function getValue() {
  await axios.get(`${server}/eventupdates`)
    .then(res =>   {
      store.dispatch(setEventDetail(res.data.value))
    })
    .catch(err => iziToast.warning({title: 'RETRY', message: 'server did\'nt send any data'}));
  }
  getValue();
  messaging.onMessage(function(payload) {
  window.location.reload();
  iziToast.info({
    title: payload.title,
    body: payload.body
  })
});
class App extends Component {
  state = {
    Login: <NotFound />
  };
  componentWillMount() {
    // if(localStorage.admin) {
    //   // import('./container/Login')
    //   //   .then(Login => {
    //   //     this.setState({Login: Login.default})
    //   //   })
    //   //   .catch(err => {
    //   //     iziToast.error({
    //   //       title: 'App Crashed!!',
    //   //       message: 'Error from Login system!.'
    //   //     });
    //   //   });
    // } else {
    //   Login = NotFound;
    // }
  }
  render() {
    return (
      <Provider store={store}>
      <div>
        <Router>
          <div>
            <Switch>
              <Route exact path="/" component={Starter}></Route> 
              <Route exact path="/subscribe" component={ListSubscription}></Route>
              <Route exact path="/events" component={EventDetail}></Route>
              <Route exact path="/admin/login" component={Login}></Route>
              <Route exact path="/admin/dashboard" component={Event}></Route>
              <Route exact path="/admin/dashboard/create-event" component={AddEvent}></Route>
              <Route exact path="/admin/dashboard/delete-event" component={DeleteEvent}></Route>
              <Route exact path="/admin/dashboard/update-event" component={UpdateEvent}></Route>
              <Route path='*' component={NotFound} />
            </Switch>
          </div>
        </Router>
      </div>
      </Provider>
    )
  }
}

export default App;
