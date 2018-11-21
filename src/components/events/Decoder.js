import React from 'react';
import PropTypes from 'prop-types';
import Looper from './Looper';
import Slider from './Slider';

const Decoder = ({value}) => {
    const jsx = value.map(val => {
        return (
            <div className="Slider-content flex-v">
                <h1 className="Slider-content-head">{val.title}</h1>
                <h2 className="Slider-content-desc">{val.desc}</h2>
                <Looper value={val.people}/> 
            </div>
        )
    })
  return (
    <div>
        <Slider value={jsx} />
    </div>
  )
}
Decoder.proptype = {
    value: PropTypes.array.isRequired
}
export default Decoder;
