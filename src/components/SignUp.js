import React, { useState } from "react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { app } from "../firebase";
import { useFirebase } from "../context/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const googleprovider = new GoogleAuthProvider();

const auth = getAuth(app);

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //   const signupUser = () => {
  //     createUserWithEmailAndPassword(auth, email, password).then((value) => {
  //       console.log(value);
  //       alert("success");
  //     });
    //   };
    
    const signUpWithGoogle = () => {
        signInWithPopup(auth, googleprovider)
    }

  const firebaseCon = useFirebase();
  //   console.log(firebaseCon);

  return (
    <div className="signup-page">
      <h1>SignUp page</h1>

      <label htmlFor="">Email</label>
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        name=""
        id=""
        required
        placeholder="Enter emial"
      />

      <label htmlFor="">Password</label>
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="passwprd"
        name=""
        id=""
        required
        placeholder="Enter password"
      />
      <button
        onClick={() => {
          firebaseCon.signUpUserWithEmailAndPassword(email, password);
          firebaseCon.putData("users/" + "kumar", { email, password });
        }}
      >
        SignUp
      </button>

      <br />
      <button onClick={signUpWithGoogle}>Sign Up with google</button>
    </div>
  );
}

export default SignUp;
