import React from 'react';

const ExerciseItem = (props) => {
    if (props) {
        const item = props.item;
        console.log('item', item);
        return (
            <li>{item}</li>
        )
    }
}

export default ExerciseItem;