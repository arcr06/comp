import React, { Component } from 'react';
import {Provider} from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom'; 
import * as firebase from 'firebase/app';
import 'firebase/messaging';

import store from './store';
import './style/style.scss';
import {config} from './config/config';


import Landing from './components/Landing';
import Starter from './components/Starter';
import ListSubscription  from './components/ListSubscription';

firebase.initializeApp(config);
class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <div>
        <Router>
          <div>
            <Route exact path="/" component={Starter}></Route>
            <Route exact path="/load" component={Landing}></Route>
            <Route exact path="/events" component={ListSubscription}></Route>
          </div>
        </Router>
      </div>
      </Provider>
    )
  }
}

export default App;
