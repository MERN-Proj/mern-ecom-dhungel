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
import {
  signInWithEmailLink,
  isSignInWithEmailLink,
  updatePassword,
} from 'firebase/auth';
import { auth } from '../../util';

// import "./auth.css";

export const CompleteRegistration = () => {
  let history = useHistory();
  let [email, setEmail] = useState('');

  const [password, setPassword] = useState('password');

  useEffect(() => {
    setEmail(window.localStorage.getItem('emailForSignIn'));
    console.log(auth.currentUser);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    // history.push('/');

    if (isSignInWithEmailLink(auth, window.location.href)) {
      if (!email) {
        // User opened the link on a different device. To prevent session fixation
        // attacks, ask the user to provide the associated email again. For example:
        email = window.prompt('Please provide your email for confirmation');
      }
      // The client SDK will parse the code from the link for you.
      signInWithEmailLink(auth, email, window.location.href)
        .then((result) => {
          // Clear email from storage.
          window.localStorage.removeItem('emailForSignIn');
          // console.log(result.user);
          // console.log(auth.currentUser);
          return result.user;
        })
        .then((currentUser) => {
          updatePassword(currentUser, password).then(() => {
            if (currentUser.emailVerified) {
              toast.success('Set Password Successfully');

              // redirect to home
              // history.push('/')
            }
          });
        })
        .catch((error) => {
          console.error(error);
          toast.error(error.message);
        });
    }

    // const actionCodeSettings = {
    //   url: process.env.REACT_APP_REGISTER_REDICRECT_URL,
    //   // This must be true.
    //   handleCodeInApp: true,
    // };
    //
    // sendSignInLinkToEmail(auth, email, actionCodeSettings)
    //   .then(() => {
    //     window.localStorage.setItem("emailForSignIn", email);
    //     toast.success(
    //       `An email is sent to ${email}. Click the link to complete the registration.`
    //     );
    //     setEmail("");
    //   })
    //   .catch((error) => {
    //     // const errorCode = error.code;
    //     // const errorMessage = error.message;
    //     console.error(error);
    //     toast.error(error.message);
    //   });
  }

  return (
    <>
      <MDBRow>
        <MDBCol md="10" className="offset-md-1">
          <MDBCard>
            <h2 className="card-header peach-gradient white-text text-center py-3">
              <strong>Complete Registration</strong>
            </h2>

            <MDBCardBody className=" px-5 py-4">
              <form onSubmit={handleSubmit}>
                <MDBBox tag="p" className="text-center pb-4 lead">
                  Already a member?
                  <Link to="/login" className="pl-2">
                    Login
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
                    disabled
                    // onChange={(e) => setEmail(e.target.value)}
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
