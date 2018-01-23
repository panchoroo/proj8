import React from 'react';

import ExerciseItem from './exerciseItem';

const WorkoutItem = (props) => {
    console.log('props workoutitem',props);
    if (props) {
        const date = props.date;
        const item = props.item;
        const index = item[props.index];
        const workouts = [];
        
        for (let i=0; i < index.length; i++) {
            workouts.push(index[i]);
        }
            return (
                <div className='allWorkouts'>
                    <h2>{date}</h2>
                    <ul className={`workout flex`}>
                        {workouts.map((eachEx, index) => {
                            return <ExerciseItem item={eachEx.currentItem} desc={eachEx.currentDescription} reps={eachEx.currentReps} date={date} key={index} index={eachEx.key} delete= {props.delete}/>
                        })}

                    </ul>
                </div>
                
            )  
        }
        
}

export default WorkoutItem;