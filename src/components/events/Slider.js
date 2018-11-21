import React, {Component} from 'react'
import PropTypes from 'prop-types';

class Slider extends Component {
    constructor() {
        super();
        this.state = {
            val: 0,
            jsx: ''
        }
        this.onSwitch = this.onSwitch.bind(this);
    }
    componentWillMount() {
        const res = this.props.value.length;
        setInterval(() => {
            let inc = this.state.val + 1;
            if(inc >= res) {
                inc = 0;
            }
            this.setState({val: inc});
        },3000)
        let rand = -1;
        const jsx = this.props.value.map((val) => {
            rand += 1;
            return (
                <div className="Swicth-grp flex-h" id={rand} onClick={this.onSwitch} key={rand}>
                    <div className="Switch-grp-content" id={rand} onClick={this.onSwitch}></div>
                </div>
            );
        });
        this.setState({jsx})
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps) {
            let rand = -1;
            const jsx = nextProps.value.map((val) => {
                rand += 1;
                return (
                    <div className="Switch-grp flex-h" id={rand} onClick={this.onSwitch} key={rand}>
                        <div className="Switch-grp-content" id={rand} onClick={this.onSwitch}></div>
                    </div>
                );
            });
            this.setState({jsx})
        }
    }
    onSwitch(e) {
        let val = e.target.id;
        val = parseInt(val);
        if(val >= 0 && val < this.props.value.length) {
            this.setState({val});
        }
    }
    Slider(e) {
        
    }
    render() {
        return (
            <div className="Slider">
                {this.props.value[this.state.val]}
                <div className="Switch flex-h">
                    {this.state.jsx}
                </div>
            </div>
        )
    }
}
Slider.proptypes = {
    value: PropTypes.array.isrequired
}
export default Slider;
