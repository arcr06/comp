import React, { Component } from 'react';
import {connect} from 'react-redux'; 
import PropTypes from 'prop-types';

import {setToken} from '../actions/authAction';
import {messaging} from  '../App';
import iziToast from 'izitoast';
import Loading from './Loading';
import bell from '../img/bell.svg';

class Starter extends Component {
  constructor() {
    super();
    this.state = {
      subscribed: false,
      loading: false
    }
    this.showPermission = this.showPermission.bind(this);
  }
  componentWillMount() {
    this.setState({user: this.props.user});
    if(this.props.user.subscribed) {
      this.props.history.push('/events')
    }
    
  }
  showPermission(e) {
    this.setState({loading: true})
    messaging.usePublicVapidKey("BD2johvT-Yk43FrZ0BE3Dea87_-FjgYatli_Giw1Tfy1ERs0d3yMBLzl3NuaXoEoSJulvcT1qcBCGTXLyvWmhdA");
    messaging.requestPermission()
      .then(() => {
        return messaging.getToken()
          .then(token => {
            if(token) {
              this.setState({subscribed: true})
              this.setState({loading: false})
              this.props.setToken(token);
              localStorage.setItem('token',JSON.stringify(token));
              if(!this.state.loading) {
                this.props.history.push('/subscribe');  
              }
            } else {
              this.setState({loading: false})
            }
          })
          .catch(err => {
            this.setState({loading: false})
            iziToast.error({
              title: 'Error:',
              message: 'Some network issue didnt get your token Retry'
            })
          });
      })
      .catch(err => {
        this.setState({loading: false})
        iziToast.error({
          title: 'Error:',
          message: 'Some network issue didnt get your token Retry'
        })
      });
  }
  nothing(e) {
    iziToast.error({
      title: 'Error',
      message: 'You didn\'t gave permission to push message'
    })
  }
  render() {
    const value = this.state.subscribed === true ? this.nothing : this.showPermission;
    return (
      <div> 
        {this.state.loading && <Loading />}
        <div className="starter_container">
            <h1 className="starter_head">Welcome to Composite updates?</h1>
            <h3 className="starter_p">Subscribe to get notification</h3>
              <div className="content_button btn" onClick={value}>
                  <img  alt="bell" src={bell} className="img_bell" />
                  <h1 className="head_button">Subscribe</h1>
              </div>
        </div>
      </div>
    )
  }
}
Starter.propTypes = {
  setToken: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
  user: state.user
});
const mapDispatchToProps = {
  setToken,
}
export default connect( mapStateToProps, mapDispatchToProps)(Starter);
