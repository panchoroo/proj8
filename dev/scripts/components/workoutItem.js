import React from 'react';

import ExerciseItem from './exerciseItem';

const WorkoutItem = (props) => {
    if (props) {
        const date = props.date;
        const item = props.item;
        const index = item[props.index];
        console.log(index.length);
        const workouts = [];
        
        for (let i=0; i < index.length; i++) {
            console.log('index[i]', index[i].currentItem);
            workouts.push(index[i].currentItem);
        }
            return (
                <ul className={`workout flex`}>
                    <li>{date}</li>
                    {workouts.map((eachEx, index) => {
                        return <ExerciseItem item={eachEx} date={eachEx} key={index} index={index}/>
                    // delete= { this.deleteItem } edit={this.editItem}
                    })}

                </ul>
            )  
        }
        
}

export default WorkoutItem;