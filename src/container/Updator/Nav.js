import React from 'react';
import PropTypes from 'prop-types';


const Nav = ({types, changeCurrent}) => {
    return (
        types.map(val => {
            return (
                <div className="Admin-active-div flex-h" key={Math.random()}>
                    <button 
                        className="Admin-active-btn" onClick={changeCurrent} name={val.title} key={Math.random()}>{val.title}
                    </button>
                    <span className="Admin-active-icon">  </span>
                </div>
            )
        })
    )
}
Nav.porpTypes = {
    types: PropTypes.array.ieRequired,
    click: PropTypes.func.isRequired
}

export default Nav;