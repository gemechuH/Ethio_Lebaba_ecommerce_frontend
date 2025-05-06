import React from 'react'

const RetingStar = ({ rating ,index }) => {
    const starts = []
    for (let i = 1; i <= 5; i++){
        starts.push(<span className={`ri-star${i <=rating ?'-fill': '-line'}`} key={index}> </span>);
    }
        
        
    return <div className='product__rating'>{ starts}</div>;
}

export default RetingStar
