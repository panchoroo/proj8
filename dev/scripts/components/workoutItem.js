import React from 'react';

const WorkoutItem = (props) => {
    if (props) {
        console.log('props', props, props.item.currentItem);
        
        return (
            <ul className={`workout flex`}>
                <li>{props.item.currentItem + ', ' + props.item.currentDescription}</li>
                <li>{props.item.currentReps}</li>
            </ul>
        )}
}

export default WorkoutItem;