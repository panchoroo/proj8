import React from 'react';

const ExerciseItem = (props) => {
    if (props) {
        console.log(props);
        const item = props.item;
        console.log('item', item);
        console.log('desc', props.desc);
        console.log('reps', props.reps);
        return (
            <li className='exerciseItem'>
                <h4>{item}</h4>
                <h6>{props.desc}</h6>
                <h6>{props.reps}</h6>
            </li>
        )
    }
}

export default ExerciseItem;