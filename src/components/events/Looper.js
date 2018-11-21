import React from 'react'
import PropTypes from 'prop-types';


const Looper = ({value}) => {
    const jsx = value.map(val => {
        if(val.status) {
          return <li className="Slider-list-grp-content" key={`${val.name}`}>{val.name}</li>
        }
    });
  return (
    <div className="Slider-list-grp flex-h">
      {jsx}
    </div>
  )
}
Looper.propTypes = {
    value: PropTypes.array.isRequired
}
export default Looper;