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
            console.log('index[i]', index[i]);
            workouts.push(index[i]);
        }
            return (
                <div className="allWorkouts">
                    <h2>{date}</h2>
                    <ul className={`workout flex`}>
                        {workouts.map((eachEx, index) => {
                            return <ExerciseItem item={eachEx.currentItem} desc={eachEx.currentDescription}  reps={eachEx.currentReps} date={eachEx} key={index} index={index}/>
                        // delete= { this.deleteItem } edit={this.editItem}
                        })}

                    </ul>
                </div>
                
            )  
        }
        
}

export default WorkoutItem;