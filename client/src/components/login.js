import React, { Component} from 'react'
import firebase from "firebase"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import Button from 'react-bootstrap/Button';

firebase.initializeApp({
    apiKey: 'AIzaSyAC8BHfAAFHKEofGKev8kIAx4JW639h_zk',
    authDomain: 'fir-auth-a4e48.firebaseapp.com'
})

class login extends Component {
    state = {isSignIn : false}
    uiConfig = {
        SignInFlow : "popup",
        SignInOptions :[
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            // firebase.auth.EmailAuthProvider.PROVIDER_ID,
        ],
        callbacks: {
            SignInSuccess: () => false
        }
    }

    componentDidMount = () => {

        firebase.auth().onAuthStateChanged(user => {
            this.setState({isSignIn: !!user})
            console.log('user', user)
        })

    }

    

    render(){
        
        return (
            <div>
                {this.state.isSignIn ? (
                    <span>
                        {/* <div>SignIn !</div> */}
                        <Button onClick = {()=> firebase.auth().signOut()}>Sign Out</Button>
                        {/* <h1>{firebase.auth().currentUser.displayName}</h1>
                        <img alt = 'profile picture' src={firebase.auth().currentUser.photoURL}></img> */}
                    </span>
                ):
                (
                    <div>
                    <StyledFirebaseAuth
                           uiConfig = {this.uiConfig}
                          firebaseAuth={firebase.auth()}
                    />
                    </div>
                )}
            </div>
        )
    }
}

export default login;