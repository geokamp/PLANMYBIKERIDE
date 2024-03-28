import React from 'react'
import Button from '@mui/material/Button';
import {GoogleAuthProvider, getAuth, signInWithPopup} from "firebase/auth";
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const handleGoogleClick = async () => {
        try {
          const provider = new GoogleAuthProvider();
          const auth = getAuth(app);
    
          const result = await signInWithPopup(auth, provider);
    
          const res = await fetch('/backend/auth/google', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: result.user.displayName,
              email: result.user.email,
              photo: result.user.photoURL,
            }),
          });
          const data = await res.json();
          dispatch(signInSuccess(data));
          navigate('/');
        } catch (error) {
          console.log('could not sign in with google', error);
        }
      };
  
    return (
    <Button
    type="button"
    fullWidth
    onClick={handleGoogleClick}
    variant="contained"
    sx={{ mt: 1, mb: 2,bgcolor: '#3f448e' }}
     >
        Continue with Google
     </Button>
  )
}
