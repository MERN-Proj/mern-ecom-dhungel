import React, { useEffect, useState } from 'react';
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
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../util';
// import { useDispatch } from 'react-redux';
// import { addAuthenticatedUser } from '../../state';

// import "./auth.css";

export const Login = () => {
  let [email, setEmail] = useState('mehedi609@gmail.com');
  const [password, setPassword] = useState('password');

  let history = useHistory();
  // const dispatch = useDispatch();

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
        console.error(error);
        toast.error(error.message);
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
              <form onSubmit={handleSubmit}>
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

                <MDBBox
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  mb="4"
                >
                  <MDBBtn gradient="peach" type="submit">
                    Login
                  </MDBBtn>
                </MDBBox>
                <hr />
              </form>

              <MDBBox className="text-center">
                <p className="lead">or sign up with:</p>
                <MDBBtn className="btn-gplus">
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
