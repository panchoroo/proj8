import React from 'react';


class ExerciseForm extends React.Component {
    constructor(props) {
        super();
        this.state = {
            displayModal: true,
            displaySubmitMessage: false,
            displayOtherReps: false,
            displayErrorMessage: false,
            currentItem: 'squats',
            currentDescription: 'pistol',
            currentReps: '3',
            currentOther: '',
            lastDescription: '',
            lastReps: [],
            lastWorkout: props.lastWorkout,
            date: props.date,
            lastEntered: 'pistol',
            squats: 'pistol',
            lsit: 'foot-assisted',
            rows: 'horizontal',
            pushups: 'chair',
            other: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.displayModal = this.displayModal.bind(this);
        this.getLast = this.getLast.bind(this);
        this.getLastEntered = this.getLastEntered.bind(this);
        this.validateSubmission = this.validateSubmission.bind(this);
    }

    componentDidMount() {
        this.getLast('squats');
    }

    displayModal(e) {
        e.preventDefault()
        const displayModal = false;
        this.props.toggleAdd();
        this.setState ({
            displayModal
        })
    }

    getLast(e) {
        let counter = 0;
        let lastDescription = '';
        let lastReps = [];
        let exerciseName = '';
        if (typeof(e) === 'string') {
            exerciseName = e;
        } else {
            exerciseName = e.target.value;
        }

        for (let exercise in this.state.lastWorkout) {

            if (this.state.lastWorkout[exercise].currentItem === exerciseName) {

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

        if (counter > 0) {
            lastReps[counter - 1] = lastReps[counter - 1].substr(0, lastReps[counter - 1].length - 2) + ')';
        }

        this.setState({
            lastDescription,
            lastReps
        })
    }

    getLastEntered(e) {

        let lastItem = e.target.value;
        if (lastItem === 'l-sit') {
            lastItem = 'lsit';
        } 

        const lastDescEntered = this.state[lastItem];

        this.setState({
            lastEntered: lastDescEntered,
            currentDescription: lastDescEntered
        })
    }

    handleChange(e) {
        let lastEntered = '';

        if (e.target.name === 'exercise' && e.target.value !== 'other') {
            this.getLast(e);
            this.getLastEntered(e);
        } else if (e.target.name === 'exercise') {
            this.getLastEntered(e);
        }

        if (e.target.value === 'otherReps') {
            this.setState({
                displayOtherReps: true
            })
        }

        this.setState({
            [e.target.id]: e.target.value,
            displaySubmitMessage: false,
            displayErrorMessage: false
        })
    }

    validateSubmission(inputText) {
        
        if (/[^A-Za-z0-9]/.test(inputText)) {
            this.setState ({
                displayErrorMessage: true
            })
            return false
        }
        return true
    }

    handleSubmit(e) {
        e.preventDefault();
        let validSubmit = false;
        const textValue = e.target.elements[12].value;
        const submission = e.target.elements;

        if (submission.length === 15) {
            validSubmit = this.validateSubmission(textValue);
            
        } else if (submission.length > 15) {
            validSubmit = this.validateSubmission(textValue) && this.validateSubmission(submission[13].value);
        
        } else {
            validSubmit = true;
        }

        if (validSubmit) {
            this.getLastEntered(e);
            this.props.submitForm(this.state);
            const lastDesc = this.state.currentDescription;
            let lastItem = this.state.currentItem;
            const currentDescription = this.state.lastEntered
    
            if (lastItem === 'l-sit') {
                lastItem = 'lsit';
            }
            
            this.setState({
                currentDescription,
                currentOther: '',
                displaySubmitMessage: true,
                [lastItem]: lastDesc
            })
        }
    }

    render() {
        return (
            <div>
            {this.state.displayModal ? 
                <form action='submit' className={`modal flex`} onSubmit={this.handleSubmit}>
                    {this.state.displaySubmitMessage ? 
                        <h3>*Your exercise has been added!</h3>    
                    : ''}
                    {this.state.displayErrorMessage ?
                        <h3>*Only numbers and letters please</h3>
                    : ''}
                    <section className={`exerciseForm flex`}>
                        <div className='exerciseInput'>
                            <label className='primaryLabel'>Exercise:</label>
                            <div className='radio'>
                                <div className='radioInput'>
                                    <input
                                        id='currentItem'
                                        type='radio'
                                        value='squats'
                                        name='exercise'
                                        onChange={this.handleChange}
                                        defaultChecked
                                    />
                                    <label htmlFor='squats'>Squats</label>
                                </div>

                                <div className='radioInput'>
                                    <input
                                        id='currentItem'
                                        type='radio'
                                        value='l-sit'
                                        name='exercise'
                                        onChange={this.handleChange}
                                    />
                                    <label htmlFor='lsit'>L sit</label>
                                </div>

                                <div className='radioInput'>
                                    <input
                                        id='currentItem'
                                        type='radio'
                                        value='pushups'
                                        name='exercise'
                                        onChange={this.handleChange}
                                    />
                                    <label htmlFor='pushups'>Push ups</label>
                                </div>

                                <div className='radioInput'>
                                    <input
                                        id='currentItem'
                                        type='radio'
                                        value='rows'
                                        name='exercise'
                                        onChange={this.handleChange}
                                    />
                                    <label htmlFor='rows'>Rows</label>
                                </div>

                                <div className='radioInput'>
                                    <input
                                        id='currentItem'
                                        type='radio'
                                        value='other'
                                        name='exercise'
                                        onChange={this.handleChange}
                                    />
                                    <label htmlFor='other'>Other</label>
                                </div>
                            </div>
                        </div>
                        {/* end exercise and description */}

                        <div className='repsSection'>
                            <label className={`primaryLabel`}>Reps:</label>
                            <div className='repsInput'>
                            <div className='radioInput'>
                                <input
                                    type='radio'
                                    id='currentReps'
                                    name='reps'
                                    value='3'
                                    onChange={this.handleChange}
                                    defaultChecked
                                />
                                <label htmlFor='3'>3</label>
                            </div>
                            <div className='radioInput'>
                                <input
                                    type='radio'
                                    id='currentReps'
                                    name='reps'
                                    value='4'
                                    onChange={this.handleChange}
                                />
                                <label htmlFor='4'>4</label>
                            </div>
                            <div className='radioInput'>
                                <input
                                    type='radio'
                                    id='currentReps'
                                    name='reps'
                                    value='5'
                                    onChange={this.handleChange}
                                />
                                <label htmlFor='5'>5</label>
                            </div>
                            <div className='radioInput'>
                                <input
                                    type='radio'
                                    id='currentReps'
                                    name='reps'
                                    value='6'
                                    onChange={this.handleChange}
                                />
                                <label htmlFor='6'>6</label>
                            </div>
                            <div className='radioInput'>
                                <input
                                    type='radio'
                                    id='currentReps'
                                    name='reps'
                                    value='7'
                                    onChange={this.handleChange}
                                />
                                <label htmlFor='7'>7</label>
                            </div>
                            <div className='radioInput'>
                                <input
                                    type='radio'
                                    id='currentReps'
                                    name='reps'
                                    value='8'
                                    onChange={this.handleChange}
                                />
                                <label htmlFor='8'>8</label>
                            </div>
                            <div className={`radioInput otherInput`}>
                                <input type='radio' id='currentReps' name='reps' value='otherReps' onChange={this.handleChange}/> 
                                <label htmlFor='other'>Other</label>
                                {this.state.displayOtherReps ?
                                    <div>
                                        <input type='text' id='currentOther' maxLength='6' value={this.state.currentOther} onChange={this.handleChange} />​​​​​​​​​​​​​​​​​​
                                    </div>
                                : ''}
                            </div>
                        </div>  
                    </div>

                    <div className='textInputs'>
                        <label htmlFor='currentDescription' className={`hidden primaryLabel`}>Progression Description:</label>
                        <input
                            id='currentDescription'
                            type='text'
                            maxLength='16'
                            placeholder={this.state.lastEntered}
                            value={this.state.currentDescription}
                            onChange={this.handleChange}
                            required='required'
                        />
                        {this.state.currentItem !== 'other' && this.state.lastDescription ? 
                            <h4>Last time you did {this.state.lastReps} of {this.state.lastDescription} {this.state.currentItem}</h4>
                        : <h4>Enter your own exercise</h4>}
                    </div>

                <div className={`flex modalButtons`}>
                    <button type='submit'>
                        <i className='fa fa-check-circle' aria-hidden='true'></i>
                        <span className=''>Submit </span> 
                    </button>
                    <button type='button' onClick={this.displayModal}>
                        <i className='fa fa-times-circle' aria-hidden='true'></i><span className=''>Close</span>     
                    </button>   
                </div>

                </section>

            </form> : ''}
            
            </div>
        )
    }
}

export default ExerciseForm;