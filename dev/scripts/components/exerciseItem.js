import React from 'react';

const ExerciseItem = (props) => {
    if (props) {
        const item = props.item;
        const date = props.date;
        
        return (
            <li className='exerciseItem flex'>
                <h4 className='exerciseName'><span>{props.reps}</span>{item + ': '}</h4>
                <h4>{ props.desc}</h4>
                <button onClick={() => props.delete(date, props.index)}><i className="fa fa-times-circle" aria-hidden="true"></i>delete</button>
            </li>
        )
    }
}

export default ExerciseItem;