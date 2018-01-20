import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';

import ExerciseForm from './components/exerciseForm';
import WorkoutItem from './components/workoutItem';
import ExerciseItem from './components/exerciseItem';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAfAXV9F7xqOalWzBPFRXzfnb6G1H7oBlw",
  authDomain: "workout-app-4f669.firebaseapp.com",
  databaseURL: "https://workout-app-4f669.firebaseio.com",
  projectId: "workout-app-4f669",
  storageBucket: "",
  messagingSenderId: "701827082182"
};
firebase.initializeApp(config);

const provider = new firebase.auth.GoogleAuthProvider();

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null,
      loggedIn: false,
      allWorkouts: [],
      allDates:[],
      toggleAdd: false,
      dateString: null,
      dateFooter: '',
      lastWorkout: []
    }
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.addItem = this.addItem.bind(this);
    this.toggleAddFunction = this.toggleAddFunction.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.getDate = this.getDate.bind(this);

  }

  componentDidMount() {
    this.getDate();
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const workoutApp = firebase.database().ref(`/users/${user.uid}`);
        
        workoutApp.on('value', (snapshot) => {
          const allWorkouts = [];
          const allDates = [];
          
          let workoutInfo = snapshot.val();

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
          if (allDates[0] === this.state.dateString) {
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
        });
      }
    });    
  }

  login(e) {
    e.preventDefault();
    firebase.auth().signInWithPopup(provider)
      .then((user) => {
        // console.log('all workouts', this.state.allWorkouts);
      });
  }

  logout(e) {
    e.preventDefault();
    firebase.auth().signOut()
      .then(() => {
        this.setState({
          user: null,
          loggedIn: false,
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
    if (this.state.toggleAdd) {
      toggleAdd = false;
    }
    this.setState({
      toggleAdd
    })
  }

  deleteItem(date, index) {
    firebase.database().ref(`/users/${this.state.user.uid}/${date}/${index}`).remove();
  }
  
  render() {
    return (
      <div>
        <header className='flex'>
          <h1>💪 Workout App</h1>

          <button onClick={this.toggleAddFunction} className="addButton"> <i className="fa fa-plus-circle" aria-hidden="true"></i><span className='buttonTextSpan'>add workout</span></button>

          {this.state.toggleAdd ? <ExerciseForm submitForm={this.addItem} date={this.state.dateString} lastWorkout={this.state.lastWorkout} toggleAdd={ this.toggleAddFunction}/> : ''} 
          
          <div className="flex">
            {this.state.user ? <h3>{`Welcome, ${this.state.user.displayName.split(' ')[0]}!  `}</h3>: ''}

            {this.state.loggedIn ? <a href='' onClick={this.logout}><i className="fa fa-times-circle-o" aria-hidden="true"></i><span className='buttonTextSpan'>Log out </span></a> : <a href='' onClick={this.login}>Log in</a>}
          </div>
        
        </header>

        {/* <i class="fa fa-bars"></i> */}

        <section className='workouts'>
          <ul className='workoutsByDate'>
            {this.state.allDates.map((eachDate, index) => {
              return <WorkoutItem item={this.state.allWorkouts} date={eachDate} key={eachDate} index={index} delete= {this.deleteItem}/>
            })}
          </ul>
        </section>

        <footer>
          <p>Copyright © {this.state.dateFooter} Amie Everett</p>
        </footer>

      </div>
    )
  }
  
}

ReactDOM.render(<App />, document.getElementById('app'));
