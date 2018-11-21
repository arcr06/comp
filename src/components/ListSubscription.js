import React, { Component } from 'react'
import {connect} from 'react-redux';
import {setTypes} from '../actions/authAction';
import PropTypes from 'prop-types';
import axios from 'axios';

import ListRenderer from './ListRenderer';
import {server} from '../config/keys';
import iziToast from 'izitoast';
import Loading from './Loading';

class ListSubscription extends Component {
  constructor() {
    super();
    this.state = {
      types: [],
      subscribed_types: [],
      loading: false
    }
    this.onChangeEvent = this.onChangeEvent.bind(this);
  }
  async componentWillMount() {
    if(!this.props.user.subscribed) {
      this.props.history.push('/');
    }
    await this.setState({types: this.props.user.types,subscribed_types: this.props.user.subscribed_types})
    setTimeout(() => {
      if(this.state.subscribed_types.length !== 0) {
        this.state.subscribed_types.map(val => {
          document.getElementById(val).checked = true;
          return 0;
        });
      }
    },100)
  }
  componentWillReceiveProps(nextProps) {
    this.setState({subscribed_types: nextProps.user.subscribed_types,types: nextProps.user.types});
  }
  onChangeEvent(e) {
    e.persist();
    const token = this.props.user.token;
    const type = e.target.name;
    let value = this.state.subscribed_types;
    this.setState({loading: true})
    if(e.target.checked) {
      axios.post(`${server}/subscribe`,{type,token})
        .then(res => {
          value.push(type);
          this.setState({subscribed_types: value}); 
          this.props.setTypes(value);
          localStorage.setItem('subscribed',value);
          this.setState({loading: false})
          iziToast.success({
            title: 'Registered',
            message: `Ull get notification ${type}`
          })
        })
        .catch(err => {
          document.getElementById(type).checked = false;
          this.setState({loading: false})
          iziToast.error({
            title: 'Error',
            message: 'Cannot subscribe Retry'
          })
        });
    } else {
      axios.post(`${server}/unsubscribe`,{type,token})
        .then(res => {
          console.log('done');
          value = value.filter(val => {
            return e.target.name !== val;
          });
          this.setState({subscribed_types: value});
          this.props.setTypes(value);
          localStorage.setItem('subscribed',value);
          this.setState({loading: false})
          iziToast.success({
            title: 'Revoked',
            message: 'Registration cancelled you wont\t get any notification'
          })
        })
        .catch(err => {
          console.log(err);
          document.getElementById(type).checked = true;
          this.setState({loading: false})
          iziToast.error({
            title: 'Error',
            message: 'Cannot revoke Retry'
          })
        });
    }
  }
  render() {
    const jsx = 
      this.state.types.length !== 0
        ?
      this.state.types.map(val => {
        return <ListRenderer value={val} onChange={this.onChangeEvent} key={val}/>
      })
        :
      <h1>Loading</h1> 
    return (
      <div> 
        {this.state.loading && <Loading />}
        <ul className="list_items">
            {jsx}
        </ul>
      </div>
    )
  }
}

ListSubscription.propType = {
  user: PropTypes.object.isRequired,
  setTypes: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
  user: state.user
});
const mapDispatchToProps = {
  setTypes,
}
export default connect(mapStateToProps,mapDispatchToProps)(ListSubscription);