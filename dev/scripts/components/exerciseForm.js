import React from 'react';


class ExerciseForm extends React.Component {
    constructor() {
        super();
        this.state = {
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
        this.props.submitForm(this.state);
        this.setState({
            currentDescription: '',
        })
    }

    render() {
        return (
            <form action="" className={`modal flexColumn`} onSubmit={this.handleSubmit}>
                <section className={`exerciseForm flex`}>
                    <div className="exercise">
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
                            <label htmlFor="currentDescription" className="hidden">enter a description</label>
                            <input
                                id="currentDescription"
                                placeholder="enter a description"
                                type="text"
                                value={this.state.currentDescription}
                                onChange={this.handleChange}
                                required="required"
                            />
                        </div>
                    </div>
                    {/* end exercise and description */}
                    
                    <div className="radio">
                        <label>Number of Reps</label>
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
                </section>
                <button type="submit">Submit</button>
            </form>
        )
    }
}

export default ExerciseForm;