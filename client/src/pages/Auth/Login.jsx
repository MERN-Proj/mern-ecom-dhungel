import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';

import {
  MDBBox,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBIcon,
  MDBInput,
  MDBRow,
} from 'mdbreact';

import { auth, googleAuthProvider } from '../../util';
import { loadingFinish, loadingStart } from '../../state/loading';
// import { addAuthenticatedUser } from '../../state';

// import "./auth.css";

export const Login = () => {
  const [email, setEmail] = useState('mehedi609@gmail.com');
  const [password, setPassword] = useState('password');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  let history = useHistory();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading);

  function handleSubmit(e) {
    e.preventDefault();

    if (!email) {
      toast.error('Email is required');
      return;
    }

    if (!password) {
      toast.error('Password is required');
      return;
    }

    if (password.length < 5) {
      toast.error('Password must be at least 6 character');
      return;
    }

    dispatch(loadingStart());

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        if (userCredential.user) {
          // const { user } = userCredential;

          // console.log(user);
          // const payload = {
          //   email: currentUser.email,
          //   token: currentUser.accessToken,
          // };
          //
          // dispatch(addAuthenticatedUser(payload));
          // setEmail('');
          // setPassword('');

          toast.success('Logged In Successfully');

          // redirect to home
          history.push('/');
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage =
          errorCode === 'auth/user-not-found' ||
          errorCode === 'auth/wrong-password'
            ? 'Invalid Credentials!'
            : error.message;

        // errorMessage =
        //   errorCode === 'auth/wrong-password'
        //     ? 'User with this email not exists!'
        //     : error.message;
        console.error(error);
        // console.error('code', error.code);
        // console.error('message', error.message);
        toast.error(errorMessage);
      })
      .finally(() => {
        dispatch(loadingFinish());
      });
  }

  function handleGoogleSignIn() {
    dispatch(loadingStart());

    signInWithPopup(auth, googleAuthProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;

        console.log(user);

        toast.success('Logged In Successfully');

        // redirect to home
        history.push('/');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage =
          errorCode === ('auth/user-not-found' || 'auth/wrong-password')
            ? 'Invalid Credentials!'
            : error.message;

        // errorMessage =
        //   errorCode === 'auth/wrong-password'
        //     ? 'User with this email not exists!'
        //     : error.message;
        console.error(error);
        // console.error('code', error.code);
        // console.error('message', error.message);
        toast.error(errorMessage);
      })
      .finally(() => {
        dispatch(loadingFinish());
      });
  }

  return (
    <>
      <MDBRow>
        <MDBCol md="10" className="offset-md-1">
          <MDBCard>
            <h2 className="card-header peach-gradient white-text text-center py-3">
              <strong>Sign In</strong>
            </h2>

            <MDBCardBody className=" px-5 py-4">
              <form onSubmit={handleSubmit} autoComplete="off">
                <MDBBox tag="p" className="text-center pb-4 lead">
                  Don't have an account?
                  <Link to="/register" className="pl-2">
                    Register
                  </Link>
                </MDBBox>

                <div className="grey-text">
                  <MDBInput
                    label="Type your email"
                    icon="envelope"
                    type="email"
                    validate
                    error="wrong"
                    success="right"
                    outline
                    size="lg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <MDBInput
                    label="Type your password"
                    icon="lock"
                    type="password"
                    validate
                    error="wrong"
                    success="right"
                    outline
                    size="lg"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div
                  className="d-flex justify-content-end mb-3"
                  style={{ marginTop: '-20px' }}
                >
                  <Link to="/forgot/password">Forgot password?</Link>
                </div>

                <MDBBox
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  mb="4"
                >
                  {!loading ? (
                    <MDBBtn
                      gradient="peach"
                      type="submit"
                      disabled={!email && !password && password.length < 5}
                    >
                      Login
                    </MDBBtn>
                  ) : (
                    <MDBBtn gradient="peach" disabled>
                      <span
                        className="spinner-border spinner-border-sm mr-1"
                        role="status"
                        aria-hidden="true"
                      />
                      Loading...
                    </MDBBtn>
                  )}
                </MDBBox>
                <hr />
              </form>

              <MDBBox className="text-center">
                <p className="lead">or sign in with:</p>
                <MDBBtn className="btn-gplus" onClick={handleGoogleSignIn}>
                  <MDBIcon fab icon="google-plus-g" className="pr-1" /> Google
                </MDBBtn>
              </MDBBox>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </>
  );
};
