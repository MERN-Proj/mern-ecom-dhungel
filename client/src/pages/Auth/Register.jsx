import React, { useState } from "react";
import {
  MDBBox,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBIcon,
  MDBInput,
  MDBRow,
} from "mdbreact";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { sendSignInLinkToEmail } from "firebase/auth";
import { auth } from "../../util";

// import "./auth.css";

export const Register = () => {
  const [email, setEmail] = useState("mehedi609@gmail.com");

  function handleSubmit(e) {
    e.preventDefault();

    const actionCodeSettings = {
      url: process.env.REACT_APP_REGISTER_REDICRECT_URL,
      // This must be true.
      handleCodeInApp: true,
    };

    sendSignInLinkToEmail(auth, email, actionCodeSettings)
      .then(() => {
        window.localStorage.setItem("emailForSignIn", email);
        toast.success(
          `An email is sent to ${email}. Click the link to complete the registration.`
        );
        setEmail("");
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
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
              <strong>Registration</strong>
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
                    onChange={(e) => setEmail(e.target.value)}
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
