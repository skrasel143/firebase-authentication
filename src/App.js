import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, signOut } from 'firebase/auth';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import initializeAuthentication from './firebase/firebase.initialize';
import { useState } from 'react';
import googleImg from './Images/google.png';
import githubImg from './Images/github.png';

initializeAuthentication();

const googleProvider = new GoogleAuthProvider();
const gitHubProvider = new GithubAuthProvider();


function App() {
  const [user, setUser] = useState({});
  const auth = getAuth();

  const handleSignInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        const { displayName, email, photoURL } = result.user;
        const loggedInUser = {
          name: displayName,
          email: email, 
          photo: photoURL
        }
        setUser(loggedInUser);
      })
  }

  const handleSignInWithGitHub = () => {
    signInWithPopup(auth, gitHubProvider)
      .then(result => {
        const { displayName, email, photoURL } = result.user;
        const loggedInUser = {
          name: displayName,
          email: email, 
          photo: photoURL
        }
        setUser(loggedInUser);
      })
  }

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser({});
      })
  }

  return (
    <div className="App">
      <div className="container rounded-pill mt-3 p-3 bg-success">
        <h1 className='text-white'>Welcome to Sk Rasel's website</h1>
      </div>
      {
       user.name ? <div className="container mt-5">
        <img src={user.photo} alt="" />
        <h1 className='mt-3'>Welcome  {user.name}</h1>
        {user.email ? <h3 className='mt-3'>Email {user.email}</h3> : <h3>Email not available</h3>}
        </div>
            :
          <div className="container mt-3">
            <h1 className='text-primary'>Sign In to visit site</h1>
            <h3 className='text-success  mt-5'>With</h3>
          </div>
      }
      {
        !user.name ? <div className="container mt-4 d-flex justify-content-center">
        <Button onClick={handleSignInWithGoogle} className='bg-white me-3'><img width='50' height='50' src={googleImg} alt=""/></Button>
        <h3>or</h3>
        <Button onClick={handleSignInWithGitHub} className='bg-white ms-3'><img width='50' height='40' src={githubImg} alt=""/></Button>
        </div>
          :
        <div className="container mt-5 mb-5 pb-5">
        <Button onClick={handleSignOut} className='btn-warning'>Sign out</Button>
      </div>
      }
    </div>
  );
}

export default App;
