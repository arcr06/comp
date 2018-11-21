import React, { Component } from 'react'
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import {server} from '../../config/keys';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import iziToast from 'izitoast';
import {getValue} from '../../App';

class DeleteEvent extends Component {
  constructor() {
    super();
    this.state = {
      current: ''
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this._goBack = this._goBack.bind(this);
  }
  componentWillMount() {
    if(localStorage.admin && localStorage.auth) {
      const decoded = jwt_decode(localStorage.auth);
      const currentTime = Date.now() /1000;
      if(decoded.exp <  currentTime) {
          this.props.history.push('/admin/login');    
      } else {
        this.setState({eventDetail: this.props.eventDetail});          
      }
    } else {
        this.props.history.push('/admin/login');
    }
    if(this.props.eventDetail.data.length !== 0) {
      this.setState({current: this.props.eventDetail.data[0].title})
    }
  }
  componentWillReceiveProps(nextProps) {
      if(nextProps) {
        this.setState({eventDetail: nextProps.eventDetail});
      } 
      if(nextProps.eventDetail.data.length !== 0) {
        this.setState({current: nextProps.eventDetail.data[0].title})
      }
  }
  onChange(e) {
    this.setState({current: e.target.value})
  }
  onSubmit(e) {
    e.preventDefault();
    axios.post(`${server}/admin/delete`,{type: this.state.current} , {
      headers: {
        'Authorization': localStorage.auth
      }
    })
    .then(res => {
        iziToast.success({
          title: 'deleted',
          message: res.data.success
        })
        getValue(); 
      })
    .catch(err => iziToast.error({
      title: 'error',
      message: err.response.data
    }));
  }
  _goBack(e) {
    this.props.history.push('/admin/dashboard')
  }
  render() {  
    let jsx = '';
    if(this.state.eventDetail.data) {
      jsx = this.state.eventDetail.data.map(type => {
          return <option  key={Math.random()} value={type.title} >{type.title} </option>
      })
    } 
    return (
      <div> 
        <button className="btn btn-back" onClick={this._goBack}>Back</button>
        <div className="Shade flex-h">
              <select className="input" onChange={this.onChange} value={this.state.current}>
                  {jsx}
              </select>
          </div>
          <div className="flex-h">
              {this.state.current && <button className="btn btn-submit mg-2" onClick={this.onSubmit}>Delete</button>}
          </div>
      </div>
    )
  }
}
DeleteEvent.proptypes = {
  eventDetail: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  eventDetail: state.eventDetail
});
export default connect(mapStateToProps)(DeleteEvent);