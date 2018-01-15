import React from 'react';

const ExerciseItem = (props) => {
    if (props) {
        const item = props.item;
        const date = props.date;
        
        return (
            <li className='exerciseItem'>
                <h4>{item}</h4>
                <h6>{props.desc}</h6>
                <h6>{props.reps}</h6>
                <button onClick={() => props.delete(date, props.index)}>delete</button>
            </li>
        )
    }
}

export default ExerciseItem;