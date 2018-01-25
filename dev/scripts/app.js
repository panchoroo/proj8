import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';

import ExerciseForm from './components/exerciseForm';
import WorkoutItem from './components/workoutItem';
import ExerciseItem from './components/exerciseItem';

// Initialize Firebase
var config = {
  apiKey: 'AIzaSyAfAXV9F7xqOalWzBPFRXzfnb6G1H7oBlw',
  authDomain: 'workout-app-4f669.firebaseapp.com',
  databaseURL: 'https://workout-app-4f669.firebaseio.com',
  projectId: 'workout-app-4f669',
  storageBucket: 'workout-app-4f669.appspot.com',
  messagingSenderId: '701827082182'
};
firebase.initializeApp(config);

const provider = new firebase.auth.GoogleAuthProvider();

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null,
      loggedIn: false,
      allDates:[],
      allWorkouts: [],
      lastWorkout: [],
      displayInstructions: true,
      displayError: false,
      toggleAdd: false,
      dateString: null,
      dateFooter: '',
    }
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.addItem = this.addItem.bind(this);
    this.toggleAddFunction = this.toggleAddFunction.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.getDate = this.getDate.bind(this);
    this.toggleInstructions = this.toggleInstructions.bind(this);
  }

  componentDidMount() {
    this.getDate();

    firebase.auth().onAuthStateChanged((user) => {

      if (user) {
        
        const workoutApp = firebase.database().ref(`/users/${user.uid}`);
        workoutApp.on('value', (snapshot) => {
  
          let workoutInfo = snapshot.val();
          
          if (workoutInfo) {
            let allWorkouts = [];
            let allDates = [];

            for (let date in workoutInfo) {           
              const workoutsOnDate = [];
              const workouts = workoutInfo[date];
              allDates.push(date);
              for (let ex in workouts) {
                let exercise = workouts[ex];
                exercise['key'] = ex;
                workoutsOnDate.push(exercise);
              }

              allWorkouts.push(workoutsOnDate);
            } 

            allWorkouts.reverse();
            allDates.reverse();

            let lastWorkout = [];
            if (allDates[0] === this.state.dateString && allWorkouts.length > 1) {
              lastWorkout = allWorkouts[1];
            } else {
              lastWorkout = allWorkouts[0];
            }

            this.setState({
              user,
              loggedIn: true,
              allWorkouts,
              allDates,
              lastWorkout
            })

          } else {

            this.setState({
              user,
              loggedIn: true,
              displayInstructions: true
            })
            
            for (let i = 1; i < 13; i++) {

              let currentItem = 'squats';
              let currentDescription = 'pistol';
              let currentReps = '4';

              if (i <= 6 && i % 2 === 0) {
                currentItem = 'l-sit';
                currentDescription = 'foot-assisted';
                currentReps = '3';
              } else if (i > 6 && i % 2 === 0) {
                currentItem = 'rows';
                currentDescription = 'horizontal';
                currentReps = '5';
              } else if (i > 6) {
                currentItem = 'pushups';
                currentDescription = 'chair';
                currentReps = '3';
              }

              const exerciseExample = {
                currentItem: currentItem,
                currentDescription: currentDescription,
                currentReps: currentReps
              }

              const workoutApp = firebase.database().ref(`/users/${this.state.user.uid}/1-1-2018 Workout Example`);
              workoutApp.push(exerciseExample);
              
            } 
          }
        });
      }
    });    
  }

  login(e) {
    e.preventDefault();
    firebase.auth().signInWithPopup(provider)
      .then((user) => {
        this.setState({
          displayError: false,
          displayInstructions: false
        })
      });
  }

  logout(e) {
    e.preventDefault();
    firebase.auth().signOut()
      .then(() => {
        this.setState({
          user: null,
          loggedIn: false,
          displayInstructions: true,
          allWorkouts: [],
          allDates: []
        })
      });
  }

  getDate() {
    const newDate = new Date();
    let dateString = '';
    let dateFooter = '';
    // Get the month, day, and year  
    dateString += (newDate.getMonth() + 1) + '-';
    dateString += newDate.getDate() + '-';
    dateString += newDate.getFullYear(); 
    dateFooter = newDate.getFullYear();

    this.setState({
      dateString,
      dateFooter
    })
  }

  addItem(item) {
    let date = this.state.dateString;
    
    this.setState({
      displayInstructions: false,
    })

    const newItem = {
      currentItem: item.currentItem,
      currentDescription: item.currentDescription,
      currentReps: item.currentReps
    }

    const workoutApp = firebase.database().ref(`/users/${this.state.user.uid}/${date}`);
    workoutApp.push(newItem);
  }

  toggleAddFunction() {
    let toggleAdd = true;
    let displayError = false;

    if (this.state.toggleAdd) {
      toggleAdd = false;
    } else if (!this.state.loggedIn) {
      toggleAdd = false;
      displayError = true;
    }
    this.setState({
      toggleAdd,
      displayError,
      displayInstructions: false
    })
  }

  toggleInstructions(e) {
    e.preventDefault();
    let displayInstructions = true;
    if (this.state.displayInstructions) {
      displayInstructions = false;
    } 
    this.setState({
      displayInstructions
    })
  }
  
  deleteItem(date, index) {
    firebase.database().ref(`/users/${this.state.user.uid}/${date}/${index}`).remove();
  }
  
  render() {
    return (
      <div>
        <header id='header' className='flex'>
          <h1>💪 Workout App</h1>

          <button onClick={this.toggleAddFunction} className='addButton'> <i className='fa fa-plus-circle' aria-hidden='true'></i><span className='buttonTextSpan'>add workout</span></button>

          {this.state.toggleAdd ?
            <ExerciseForm submitForm={this.addItem} date={this.state.dateString} lastWorkout={this.state.lastWorkout} toggleAdd={ this.toggleAddFunction}/> 
            : ''}

          {this.state.displayError ? 
            <h5>*Please Log In to add a workout</h5>
            : <h6>*Click to add a workout</h6> 
          }
          
          <div className='flex'>
            {this.state.user ? <h3>{`Welcome, ${this.state.user.displayName.split(' ')[0]}!  `}</h3>: <h3>Please Log In to begin</h3>}

            {this.state.loggedIn ? <a href='' onClick={this.logout}><i className='fa fa-times' aria-hidden='true'></i><span className='buttonTextSpan'>Log out </span></a> : <a href='' onClick={this.login}>Log in</a>}
          </div>
        
        </header>

        <a href='#header' className='backToTop'><i className='fa fa-arrow-up'> </i><span className='buttonTextSpan'>Back to Top</span></a>

        <button onClick={this.toggleInstructions} className='instructionsButtons'>Instructions</button>
        {this.state.displayInstructions ?  
          <section className='instructions'><p>
            This workout app was created to track <a href='https://www.reddit.com/r/bodyweightfitness/'>Bodyweight Fitness</a> workouts. They alternate between Squats, L-sits, Pushups, and Rows in order to build muscle in a safe, balanced way. There is a progression in difficulty for each workout, where you work your way up to three sets of eight reps before moving on to the next exercise. For example, you might start with wall pushups, then move to pushups on a table or other high surface, then on a chair, then an ottoman, then the floor.</p>
            <p>As you add workouts, they will be added to the database by today's date. When add a workout on a subsequent day, the app will automatically recall which type of exercise you did last time (e.g. pistol squats or diamond pushups)</p>
            <button onClick={this.toggleInstructions} className='instructionsButtons'>Got It</button>
          </section>
          : ''
        }

        <section className='workouts'>
          <ul className='workoutsByDate'>
            {this.state.allDates.map((eachDate, index) => {
              return <WorkoutItem item={this.state.allWorkouts} date={eachDate} key={eachDate} index={index} delete= {this.deleteItem}/>
            })}
          </ul>
        </section>

        <footer className='flex'>
          <p>Copyright © {this.state.dateFooter} Amie Everett</p> 
          <p>Learn more about <a href='https://www.reddit.com/r/bodyweightfitness/'>Bodyweight fitness</a></p>
          
        </footer>

      </div>
    )
  }
  
}

ReactDOM.render(<App />, document.getElementById('app'));
