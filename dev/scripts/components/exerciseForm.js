import React from 'react';


class ExerciseForm extends React.Component {
    constructor(props) {
        super();
        this.state = {
            displayModal: true,
            currentItem: 'squats',
            currentDescription: 'pistol',
            currentReps: '3',
            lastDescription: 'pistol',
            lastReps: [],
            date: props.date,
            lastWorkout: props.lastWorkout
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.displayModal = this.displayModal.bind(this);

    }

    displayModal(e) {
        e.preventDefault()
        const displayModal = false;
        this.props.toggleAdd();
        this.setState ({
            displayModal
        })
    }

    handleChange(e) {
        let lastDescription = this.state.lastDescription;
        let lastReps = [];
        if (e.target.name === "exercise") {

            let counter = 0;
            for (let exercise in this.state.lastWorkout) {
                
                if (this.state.lastWorkout[exercise].currentItem === e.target.value) {

                    lastDescription = this.state.lastWorkout[exercise].currentDescription;

                    if (counter === 0) {
                        lastReps.push('(' + this.state.lastWorkout[exercise].currentReps + ', ');
                    }
                    else {
                        lastReps.push(this.state.lastWorkout[exercise].currentReps + ', ');
                    }
                    counter += 1;
                }
            }
            lastReps[counter - 1] = lastReps[counter - 1].substr(0, lastReps[counter - 1].length - 2) + ')';
        }
        
        this.setState({
            [e.target.id]: e.target.value,
            lastDescription,
            lastReps
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.submitForm(this.state);
        this.setState({
            currentDescription: '',
        })
    }

    render() {
        return (
            <div>
            {this.state.displayModal ? 
            <form action="" className={`modal flexColumn`} onSubmit={this.handleSubmit}>
                <section className={`exerciseForm flex`}>
                    <div className="exerciseInput">
                        <label className="primaryLabel">Exercise:</label>
                        <div className="radio">
                            <div className="radioInput">
                                <input
                                    id="currentItem"
                                    type="radio"
                                    value="squats"
                                    name="exercise"
                                    onChange={this.handleChange}
                                    defaultChecked
                                />
                                <label htmlFor="squats">Squats</label>
                            </div>

                            <div className="radioInput">
                                <input
                                    id="currentItem"
                                    type="radio"
                                    value="l-sit"
                                    name="exercise"
                                    onChange={this.handleChange}
                                />
                                <label htmlFor="lsit">L sit</label>
                            </div>

                            <div className="radioInput">
                                <input
                                    id="currentItem"
                                    type="radio"
                                    value="pushups"
                                    name="exercise"
                                    onChange={this.handleChange}
                                />
                                <label htmlFor="pushups">Push ups</label>
                            </div>

                            <div className="radioInput">
                                <input
                                    id="currentItem"
                                    type="radio"
                                    value="rows"
                                    name="exercise"
                                    onChange={this.handleChange}
                                />
                                <label htmlFor="rows">Rows</label>
                            </div>

                            <div className="radioInput">
                                <input
                                    id="currentItem"
                                    type="radio"
                                    value="other"
                                    name="exercise"
                                    onChange={this.handleChange}
                                />
                                <label htmlFor="other">Other</label>
                            </div>
                        </div>

                        <div className="textInputs">
                            <label htmlFor="currentDescription" className={`hidden primaryLabel`}>Enter a description</label>
                            <input
                                id="currentDescription"
                                placeholder={this.state.lastDescription}
                                type="text"
                                value={this.state.currentDescription}
                                onChange={this.handleChange}
                                required="required"
                            />
                            {this.state.currentItem !== 'other' ? 
                                <h4>Last time you did {this.state.lastReps} of {this.state.lastDescription} {this.state.currentItem}</h4>
                            : <h4>Enter your own exercise</h4>}
                        </div>
                    </div>
                    {/* end exercise and description */}
                    <div className="">
                        <label className="primaryLabel">Number of Reps:</label>
                        <div className="repsInput">
                        <div className="radioInput">
                            <input
                                type="radio"
                                id="currentReps"
                                name="reps"
                                value="3"
                                onChange={this.handleChange}
                                defaultChecked
                            />
                            <label htmlFor="3">3</label>
                        </div>
                        <div className="radioInput">
                            <input
                                type="radio"
                                id="currentReps"
                                name="reps"
                                value="4"
                                onChange={this.handleChange}
                            />
                            <label htmlFor="4">4</label>
                        </div>
                        <div className="radioInput">
                            <input
                                type="radio"
                                id="currentReps"
                                name="reps"
                                value="5"
                                onChange={this.handleChange}
                            />
                            <label htmlFor="5">5</label>
                        </div>
                        <div className="radioInput">
                            <input
                                type="radio"
                                id="currentReps"
                                name="reps"
                                value="6"
                                onChange={this.handleChange}
                            />
                            <label htmlFor="6">6</label>
                        </div>
                        <div className="radioInput">
                            <input
                                type="radio"
                                id="currentReps"
                                name="reps"
                                value="7"
                                onChange={this.handleChange}
                            />
                            <label htmlFor="7">7</label>
                        </div>
                        <div className="radioInput">
                            <input
                                type="radio"
                                id="currentReps"
                                name="reps"
                                value="8"
                                onChange={this.handleChange}
                            />
                            <label htmlFor="8">8</label>
                        </div>
                    </div>  
                    </div>
                </section>

                <div className={`flex modalButtons`}>
                    <button type="submit"><i className="fa fa-check-circle" aria-hidden="true"></i> Submit</button>
                    <button type="button" onClick={this.displayModal} ><i className="fa fa-times-circle" aria-hidden="true"></i> Close</button>   
                </div>
            </form> : ''}
            
            </div>
        )
    }
}

export default ExerciseForm;