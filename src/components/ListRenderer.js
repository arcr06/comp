import React from 'react';
import PropTypes from 'prop-types';


const ListRenderer = ({value,onChange}) => {
    return (
        <li className="list_item" key={value}>
            <span className="list_item_icon"></span>
            <p className="list_item_head">{value}</p>
            <div className="wrap">
                <input type="checkbox" name={value} id={value} className="input_check" onChange={onChange}/>
                <label className="slider-v1"></label>
            </div>
        </li>
    )
}
ListRenderer.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}
export default ListRenderer;