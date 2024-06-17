import React, { useState } from "react";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { app } from "../firebase";
const auth = getAuth(app);

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signinUser = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((value) => {
        console.log(value);
        alert("success");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="signup-page">
      <h1>SignIn page</h1>
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
      <button onClick={signinUser}>SignUp</button>
    </div>
  );
}

export default SignIn;
