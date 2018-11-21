import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import {server} from '../../config/keys';
import iziToast from 'izitoast';

import Loading from '../../components/Loading';
class UpdateEvent extends Component {
    constructor() {
        super();
        this.state = {
            current: '',
            eventDetail: null,
            currentDetail: undefined,
            value: {
                name: ''
            }
        }
        this.changeCurrent = this.changeCurrent.bind(this);
        this.changeCurrentDetail = this.changeCurrentDetail.bind(this);
        this._removeChild = this._removeChild.bind(this);
        this._changeRound = this._changeRound.bind(this);
        this._clearInput = this._clearInput.bind(this);
        this._addChild = this._addChild.bind(this);
        this.addValue = this.addValue.bind(this);
        this._onSubmit = this._onSubmit.bind(this);
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
            let val = this.props.eventDetail;
            this.setState({current: val.data[0].title, currentDetail: val.data[0],round: val.data[0].round})
        }
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps) {
            this.setState({eventDetail: nextProps.eventDetail});
        }
        if(nextProps.eventDetail.data.length !== 0) {
            let val = nextProps.eventDetail;
            console.log(val);
            this.setState({current: val.data[0].title, currentDetail: val.data[0], round: val.data[0].round})
        }
    }
    changeCurrent(e) { 
        this.setState({current: e.target.value});
        let value = this.state.eventDetail.data.filter(val => {
            return val.title === e.target.value;
        })
        this.setState({currentDetail: value[0]});
    }
    changeCurrentDetail(e) {
        let value = this.state.currentDetail;
        value[e.target.name] = e.target.value;
        this.setState({currentDetail: value});  
    }
    addValue(e) {
        let res = this.state.value;
        res.name = e.target.value;
        res.name = e.target.value;
        this.setState({value: res});
    }
    _removeChild(e) {
        let value = this.state.currentDetail;
        value.people = this.state.currentDetail.people.filter(val => {
            if(val.name === e.target.id) {
                val.status  = false;
                return val;
            } else {
                return val;
            }
        }) 
        this.setState({currentDetail: value});
    }
    _addChild(e) {
        let val = this.state.currentDetail; 
        if(this.state.value.name === '') {
            iziToast.error({
                title: 'Empty',
                message: 'List field is empty'
            })
        } else {    
            let res = this.state.value;
            res.status = true;
            res.round = this.state.round;
            this.setState({value: res}); 
            val.people.push(this.state.value);
            this.setState({currentDetail: val});
            this._clearInput();
        }
    }
    _clearInput() {
        let val = {
            name: '',
            status: false
        }
        this.setState({value: val});
    }
    async _onSubmit(e) {
        e.preventDefault();  
        let res = this.state.currentDetail;
        res.people = res.people.filter(val => {
            if(val.status === true) {
                return val.round = res.round
            } else {
                return val;
            }
        });
        await this.setState({currentDetail: res});
        axios.post(`${server}/admin/update`,this.state.currentDetail , {
            headers: {
              'Authorization': localStorage.auth
            }
          })
          .then(res => {
              iziToast.success({
                  title: 'DONE!.',
                  message: res.data.data
              })
          })
          .catch(err => {
              iziToast.error({
                  title: 'Error!',
                  message: err.response.data
              })
          });
    }
    _goBack(e) {
        this.props.history.push('/admin/dashboard')
    }
    _changeRound(e) {
        if(e.target.value !== '') {
            let res = this.state.currentDetail;
            res.round = parseInt(res.round);
            res.round = parseInt(e.target.value);
            this.setState({currentDetail: res});
        }  else {
            let val = this.state.currentDetail;
            val.round = '';
            this.setState({currentDetail: val});
        }
    }
    render() {  
        let jsx = '';
        if(this.state.eventDetail.data) {
            jsx = this.state.eventDetail.data.map(type => {
                return <option  key={Math.random()} value={type.title} >{type.title} </option>
            })
        } 
        let value = this.state.currentDetail 
            ?
        <div className="Update flex-h">
            <div className="Update-one flex-v"> 
                <h1 className="Update-one-head">Round Number</h1>
                <input type="number" value={this.state.currentDetail.round} name="round" className="input" onChange={this._changeRound} />
                <h1 className="Update-one-head">Title</h1>
                <input type="text" value={this.state.currentDetail.title} name="title" className="input" onChange={this.changeCurrentDetail}/>
                <h1 className="Update-one-head">Description</h1>
                <input type="text" value={this.state.currentDetail.desc} name="desc" className="input" onChange={this.changeCurrentDetail}/>
                <div className="input-grp">
                    <input 
                        type="text" 
                        name="value"
                        value={this.state.value.name}
                        className="input input-one"
                        onChange={this.addValue}
                        placeholder="Add value to array"
                    />
                    <button className="btn btn-two" onClick={this._addChild} key={Math.random()}>Add</button>
                </div>
                {this.state.currentDetail && <button className="btn btn-submit" onClick={this._onSubmit}>Update</button>}
            </div>
            <div className="Update-two flex-h">
                {this.state.currentDetail.people.map(val => (
                    val.status
                        ?
                    <div className="Update-two-list-grp flex-h" key={Math.random()}>
                        <div className="Update-two-list-grp-one" key={Math.random()}><h1 className="list-content">{val.name}</h1></div>
                        <button className="btn btn-two" onClick={this._removeChild} id={val.name}>Remove</button>
                    </div>
                        :
                    <div key={Math.random()}></div>
                ))}
            </div>
        </div>
            :
        <Loading />
        return (
            <div>
                <button className="btn-back btn" onClick={this._goBack}>Back</button>
                <div className="Shade flex-h">
                    <select className="input" onChange={this.changeCurrent} value={this.state.current}>
                        {jsx}
                    </select>
                </div>
                {value}
            </div>
        )
    }
}
UpdateEvent.proptypes = {
    eventDetail: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    eventDetail: state.eventDetail
});
export default connect(mapStateToProps)(UpdateEvent)
