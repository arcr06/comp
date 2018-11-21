import React, { Component } from 'react'
import axios from 'axios';
import {server} from '../config/keys';
import jwt_decode from 'jwt-decode';
import iziToast from 'izitoast';
 
class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: ''
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillMount() {
    if(localStorage.admin && localStorage.auth) {
      const decoded = jwt_decode(localStorage.auth);
      const currentTime = Date.now() /1000;
      if(decoded.exp >=  currentTime) {
        this.props.history.push('/admin/dashboard');
      }
    } 
  }
  onChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }
  
  onSubmit(e) {
    e.preventDefault();
    if(this.state.username === '' || this.state.password === '') {
      iziToast.info({
        title: 'Error',
        message: "Fileds are empty"
      })
    } else {
    axios.post(`${server}/admin/login`,{username: this.state.username, password: this.state.password})
      .then(res =>  {
        if(localStorage.admin) {
          let value = localStorage.admin;
          value = value.split('.');
          value = value.filter(val => {
            return val !== '';
          });
          value = value[0];
          if(res.data.success) {
            if(res.data.auth === value) {
              localStorage.setItem('auth', res.data.token);
              iziToast.success({
                title: 'LOGGED IN',
                message: 'idoit start to edit now'
              }) 
              this.props.history.push('/admin/dashboard');
            }
          }
        } else {
          iziToast.error({
            title: 'SOORY!!',
            message: 'Sry buddy your not Authorised to access!.......Ask admin about this error'
          })
          this.props.history.push('/');
        }
      })
      .catch(err => {
        if(err) {
          let val = err.response.data.data || 'Server Error:';
          iziToast.warning({
            title: 'ERROR',
            message: val
          })
        } else {
          iziToast.warning({
            title: 'SERVER',
            message: 'Check the server'
          });
        }  
      });
    }
  }
  render() {
    return (
      <div className="form-container">
        <div className="form-content">
          <h1 className="form-head">Admin Login</h1>
          <form onSubmit={this.onSubmit} className="form-data">
            <input name="username" type="text" placeholder="Username" value={this.state.username} onChange={this.onChange} className="input"/>
            <input name="password" type="password" placeholder="Password" value={this.state.password} onChange={this.onChange} className="input"/>
            <input type="submit" value="submit" className="form-submit btn" />
          </form>
        </div>
      </div>
    )
  }
}

export default Login;
