import React from 'react';

const WorkoutItem = (props) => {
    if (props) {
        const date = props.date;
        const item = props.item;
        const index = item[props.index];
        console.log(index.length);

        for (let i=0; i < index.length; i++) {
            console.log('index[i]', index[i]);
            {/* <li>{index[i].currentItem}</li> */}
            {/* <li>{props.item[0].currentItem + ', ' + props.item[0].currentDescription}</li>
            <li>{props.item[0].currentReps}</li> */}
        }
            return (
                <ul className={`workout flex`}>
                    <li>{date}</li>
                    {/* <li>{index[i].currentItem}</li>  */}
                </ul>
            )  
        }
        
}

export default WorkoutItem;