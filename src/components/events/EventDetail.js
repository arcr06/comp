import React ,{Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import Decoder from './Decoder';
import Loading from '../Loading';

class EventDetail extends Component {
    constructor() {
        super();
        this.state = {
            events: null,
            loading: false
        }
    }
    componentWillMount() {
        this.setState({events:  this.props.eventDetail.data})
        if(this.state.events === null) {
            this.setState({loading: true})
        } else {
            this.setState({loading: false})
        }
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps) {
            this.setState({events: nextProps.eventDetail.data});
        }
        if(this.state.events === null) {
            this.setState({loading: true})
        } else {
            this.setState({loading: false})
        }
    }
    render() {
        const value = this.state.events;
        const jsx = this.state.events !== null 
            ? 
        <div>
            <Decoder value={value}/>
        </div> 
            : 
        <div>
            <Loading />
        </div>
        return (
            <div>
                {this.state.loading  && <Loading />}
                {jsx}
            </div>
        )
    }
}
EventDetail.propTypes = {
    eventDetail: PropTypes.object.isRequired
};
const mapStateToProps = state  => ({
    eventDetail: state.eventDetail
});
export default connect(mapStateToProps)(EventDetail);