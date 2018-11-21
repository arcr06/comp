import React, { Component } from 'react'
import axios from 'axios';
import {server} from '../../config/keys';
import jwt_decode from 'jwt-decode';
import iziToast from 'izitoast';

import {getValue} from '../../App';

class AddEvent extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      desc: '',
      people: [],
      value: ''
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeArray = this.onChangeArray.bind(this);
    this.removeChild = this.removeChild.bind(this);
    this._goBack = this._goBack.bind(this);
  }
  componentWillMount() {
    if(localStorage.admin && localStorage.auth) {
        const decoded = jwt_decode(localStorage.auth);
        const currentTime = Date.now() /1000;
        if(decoded.exp <  currentTime) {
            this.props.history.push('/admin/login');    
        } 
    } else {
        this.props.history.push('/admin/login');
    } 
  }
  onChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }
  onSubmit(e) {
    e.preventDefault();
    if(this.state.title === '' || this.state.desc === '') {
        iziToast.error({
            title: 'Error',
            message: 'Fields are empty'
        });
    } else {
        axios.post(`${server}/admin/create`,{title: this.state.title, desc: this.state.desc, people: this.state.people, round: 1} , {
            headers: {
              'Authorization': localStorage.auth
            }
          })
          .then(res => {
              iziToast.success({
                  title: 'Saved',
                  message: res.data.success
              })
              this.setState({title: '',desc: '',people: [],value: ''})
              getValue();
          })
          .catch(err => iziToast.error({
              title: 'Error',
              message: err.response.data
          }));
    }
  }
  onChangeArray(e) {
    e.preventDefault();
    let value = this.state.value;
    if(value === '') {
        iziToast.error({
            title: 'Empty Field',
            message: 'Peope field is empty'
        });
    } else {    
        let people =  this.state.people;
        people.push(value);
        this.setState({people,value: ''})
    }
  }
  removeChild(e) {
    let array = this.state.people;
    array = array.filter(val => {
        return val !== e.target.id
    });
    this.setState({people: array});
  }
    _goBack(e) {
        this.props.history.push('/admin/dashboard')
    }
  render() {
    const jsx_array = this.state.people.map(val => {
        return (
            <div className="Add-content-2-list-grp flex-h" key={Math.random()}>
                <div className="Add-content-2-list-grp-one flex-h" key={Math.random()}><h1 className="list-content">{val}</h1></div>
                <button id={val} className="btn btn-two" key={Math.random()} onClick={this.removeChild}>Del</button>
            </div>
        )
    })
    let title = `${this.state.title}` ;
    let desc = `${this.state.desc}`;
    return (
      <div className="Add flex-h ">
      <button className="btn-back btn" onClick={this._goBack}>Back</button>
        <div className="Add-content-1 flex-v">
            <h1 className="Add-content-1-head">Add Event</h1>
            <form onSubmit={this.onSubmit} className="Add-content-1-form flex-v">
                <input 
                    type="text" 
                    name="title" 
                    value={this.state.title} 
                    className="input input-edit" 
                    onChange={this.onChange}
                    placeholder="Title"
                />
                <input 
                    type="text" 
                    name="desc" 
                    value={this.state.desc} 
                    className="input input-edit" 
                    onChange={this.onChange} 
                    placeholder="Description"
                />
                <div className="input-grp">
                    <input 
                        type="text" 
                        name="value"
                        value={this.state.value}
                        className="input input-one"
                        onChange={this.onChange}
                        placeholder="Add value to array"
                    />
                    <button className="btn btn-two" onClick={this.onChangeArray}>Add</button>
                </div>
                <input type="submit" vlaue="submit" className="btn btn-submit" />
            </form>
        </div>
        <div className="Add-content-2 flex-v">
            <h1 className="Add-content-1-head">Event Detail</h1>
            <div className="spacer"></div>
            <div className="Add-content-2-head flex-h">
                <span className="Add-content-2-head-sub-title">Title</span>
                <span className="Add-content-2-head-sub-content">{title}</span>
            </div>
            <div className="Add-content-2-head flex-h">
                <span className="Add-content-2-head-sub-title">Description</span>
                <span className="Add-content-2-head-sub-content">{desc}</span>
            </div>
            <div className="Add-content-2-list flex-h">
                {jsx_array}
            </div>
        </div>
      </div>
    )
  }
}

export default AddEvent;