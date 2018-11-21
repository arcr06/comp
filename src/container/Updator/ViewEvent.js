import React, { Component } from 'react'
import jwt_decode from 'jwt-decode';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class ViewEvent extends Component {
  constructor() {
    super();
    this.state = {
      current: false,
      filter: true
    }
        this._goBack = this._goBack.bind(this);
        this._changeStatus = this._changeStatus.bind(this);
        this._onChange = this._onChange.bind(this);
        this._changeCurrent = this._changeCurrent.bind(this);
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
            let val = this.props.eventDetail;
            this.setState({current: val.data[0].title, currentDetail: val.data[0],round: val.data[0].round})
        }
    }
    _changeCurrent(e) { 
        this.setState({current: e.target.value});
        let value = this.state.eventDetail.data.filter(val => {
            return val.title === e.target.value;
        })
        this.setState({currentDetail: value[0]});
    }
  _changeStatus(e) {
      if(e.target.value === "true") {
        this.setState({filter: true})
      } else {
        this.setState({filter: false})
      }
  }
  componentWillReceiveProps(nextProps) {
      if(nextProps) {
        this.setState({eventDetail: nextProps.eventDetail});
      } 
      if(nextProps.eventDetail.data.length !== 0) {
        let val = nextProps.eventDetail;
        this.setState({current: val.data[0].title, currentDetail: val.data[0], round: val.data[0].round})
        }
  }
  _onChange(e) {
    this.setState({current: e.target.value})
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
    let value = ''; 
    if(this.state.currentDetail) {
        if(this.state.filter) {
            value = this.state.currentDetail.people.map(val => {
                if(val.status) {
                    return (
                        <div className="List-box flex-h">
                            <h1 className="List-box-head-1">Name: {val.name}</h1> 
                            <h2 className="List-box-head-2">Round: {val.round}</h2>
                        </div>
                    ) 
                }
            })
        } else {
            value = this.state.currentDetail.people.map(val => {
                return (
                    <div className="List-box flex-h">
                        <h1 className="List-box-head-1">Name: {val.name}</h1> 
                        <h2 className="List-box-head-2">Round: {val.round}</h2>
                    </div>
                ) 
            })
        }
    } 
    return (
        <div> 
            <button className="btn btn-back" onClick={this._goBack}>Back</button>
            <div className="Shade flex-h">
                <select className="mg-2 input-small" onChange={this._changeCurrent} value={this.state.current}>
                    {jsx}
                </select>
                <select onChange={this._changeStatus} className="mg-2 input-small"value={this.state.filter}>
                    <option value="false">All</option>
                    <option value="true">Only selected</option>
                </select>
            </div>
            <div className="List flex-h">
                {value}
            </div>
        </div>
    )
  }
}
ViewEvent.proptypes = {
  eventDetail: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  eventDetail: state.eventDetail
});
export default connect(mapStateToProps)(ViewEvent);