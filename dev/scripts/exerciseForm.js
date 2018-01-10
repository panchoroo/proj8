import React from 'react';


class ExerciseForm extends React.Component {
    constructor() {
        super();
        this.state = {
            currentDate: '',
            currentItem: 'squats',
            currentDescription: 'pistol squats',
            currentReps: '3',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log('submit')
        this.props.submitForm(this.state);
        // reset the state after submitting 
        this.setState({
            currentDate: '',
            currentDescription: '',
        })
    }

    render() {
        return (
            <form action="" onSubmit={this.handleSubmit}>
                <div className="textInputs">
                    <label htmlFor="currentDate" className="hidden">enter date</label>
                    <input
                        id="currentDate"
                        placeholder="enter date"
                        type="text"
                        value={this.state.currentDate}
                        onChange={this.handleChange}
                        required="required"
                    />
                    <label htmlFor="currentDescription" className="hidden">optional description</label>
                    <input
                        id="currentDescription"
                        placeholder="description (optional)"
                        type="text"
                        value={this.state.currentDescription}
                        onChange={this.handleChange}
                    />
                </div>

                <div className="radio">
                    <div className="radioInput">
                        <label htmlFor="squats">Squats</label>
                        <input
                            id="currentItem"
                            type="radio"
                            value="squats"
                            name="exercise"
                            onChange={this.handleChange}
                            defaultChecked
                        />
                    </div>

                    <div className="radioInput">
                        <label htmlFor="lsit">L sit</label>
                        <input
                            id="currentItem"
                            type="radio"
                            value="lsit"
                            name="exercise"
                            onChange={this.handleChange}
                        />
                    </div>

                    <div className="radioInput">
                        <label htmlFor="pushups">Push ups</label>
                        <input
                            id="currentItem"
                            type="radio"
                            value="pushups"
                            name="exercise"
                            onChange={this.handleChange}
                        />
                    </div>

                    <div className="radioInput">
                        <label htmlFor="rows">Rows</label>
                        <input
                            id="currentItem"
                            type="radio"
                            value="rows"
                            name="exercise"
                            onChange={this.handleChange}
                        />
                    </div>
                </div>
                
                <div className="radio">
                    <div className="radioInput">
                        <label htmlFor="3">3</label>
                        <input
                            type="radio"
                            id="currentReps"
                            name="reps"
                            value="3"
                            onChange={this.handleChange}
                            defaultChecked
                        />
                    </div>
                    <div className="radioInput">
                        <label htmlFor="4">4</label>
                        <input
                            type="radio"
                            id="currentReps"
                            name="reps"
                            value="4"
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="radioInput">
                        <label htmlFor="5">5</label>
                        <input
                            type="radio"
                            id="currentReps"
                            name="reps"
                            value="5"
                            onChange={this.handleChange}
                        />
                    </div>
                    
                </div>

                <button type="submit">Add exercise</button>
            </form>
        )
    }
}

export default ExerciseForm;