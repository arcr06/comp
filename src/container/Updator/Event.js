import React ,{Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import jwt_decode from 'jwt-decode';
import mark from '../../img/bookmarks.svg';
import Nav from './Nav'; 

class Event extends Component {
    constructor() {
        super();
        this.state = {
            current: '',
            eventDetail: {
                data: null
            }
        }
        this._redirect = this._redirect.bind(this);
        this._logout = this._logout.bind(this);
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
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps) {
            this.setState({eventDetail: nextProps.eventDetail});
        }
    }
    _logout() {
        localStorage.setItem('auth', '');
        this.props.history.push('/events')
    }
    _redirect(e) {
        if(e.target.id === 'view') {
            this.props.history.push('/admin/dashboard/view-event');
        } else if(e.target.id === 'create'){
            this.props.history.push('/admin/dashboard/create-event');
        } else if(e.target.id === 'update') {
            this.props.history.push('/admin/dashboard/update-event');
        } else if(e.target.id === 'delete') {
            this.props.history.push('/admin/dashboard/delete-event');
        } else {
            this.porps.hisory.push('/admin/dashboard')
        }
    }
    render() {
        return (
            <div className="Admin flex-h">
                <div className="Admin-active-grp">
                    <h1 className="Admin-active-head">Events Active</h1>
                    {
                        this.state.eventDetail.data
                            ? 
                        <Nav types={this.state.eventDetail.data} changeCurrent={this.changeCurrent}/> 
                            : 
                        <h1>Loading</h1>
                    }
                </div>
                <div className="Event flex-v">
                    <div className="Event-simple-block flex-h">
                        <h1 className="Event-simple-block-head">Admin Dashboard</h1>
                        <img src={mark} alt="icon" className="Event-simple-block-img"></img>
                        <button className="Event-simple-block-btn btn" onClick={this._logout}>Logout</button>
                    </div>
                    <div className="flex-h">
                        <button className="btn Event-btn-control" onClick={this._redirect} id="view">View</button>
                        <button className="btn Event-btn-control" onClick={this._redirect} id="create">Create</button>
                        <button className="btn Event-btn-control" onClick={this._redirect}id="update">Update</button>
                        <button className="btn Event-btn-control" onClick={this._redirect}id="delete">Delete</button>
                    </div>
                    <div></div>
                </div>
            </div>
        )
    }
}
Event.propTypes = {
    eventDetail: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    eventDetail: state.eventDetail
});
export default connect(mapStateToProps)(Event);